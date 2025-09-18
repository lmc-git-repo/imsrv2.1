<?php

namespace App\Http\Controllers;

use App\Helpers\GenerationHelper;
use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\DepartmentsResource;
use App\Http\Resources\ServerUPSResource;
use App\Models\AccountUsers;
use App\Models\Departments;
use App\Models\ServerUPS;
use App\Http\Requests\StoreServerUPSRequest;
use App\Http\Requests\UpdateServerUPSRequest;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ServerUPSController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $query = ServerUPS::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $serverUps = $query
            ->with(['createdBy', 'updatedBy']) // eto yung kulang mo
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('S_UName', 'like', "%{$search}%")
                    ->orWhere('S_UUser', 'like', "%{$search}%")
                    ->orWhere('S_UAsset', 'like', "%{$search}%")
                    ->orWhere('S_UModel', 'like', "%{$search}%");
            })
            ->when(request('S_UStatus'), function (Builder $query, $serverUpsStatus) {
                $query->where('S_UStatus', $serverUpsStatus);
            })
            ->when(request('asset_class'), function (Builder $query, $assetClass) {
                $query->where('asset_class', $assetClass);
            })
            ->when(request('S_UType'), function (Builder $query, $serverUpsType) {
                $query->where('S_UType', $serverUpsType);
            })
            ->when(request('S_UGen'), function (Builder $query, $serverUpsGen) {
                $query->where('S_UGen', $serverUpsGen);
            })
            ->when(request('department_S_U'), function (Builder $query, $depSU) {
                $query->where('department_S_U', $depSU);
            })
            ->paginate(10)->onEachSide(1);
        //end
    
        $departmentsList = Cache::remember('departments_list', 3600, function () {
            return Departments::orderBy('dept_list')->get();
        });
    
        $serverUpsUsersList = Cache::remember('server_ups_users_list', 3600, function () {
            return AccountUsers::orderBy('initial')->get();
        });
    
        $generations = Cache::remember('generations', 3600, function () {
            return GenerationHelper::getGenerations();
        });

        return inertia("ServerUps/Index", [
            'serverUps' => ServerUPSResource::collection($serverUps),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            'generations' => $generations,
            'serverUpsUsersList' => AccountUsersResource::collection($serverUpsUsersList),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function printAssetTag($assetId) {
        // Find the full asset record by ID
        $asset = ServerUPS::findOrFail($assetId);
    
        try {
            // Load the Excel template
            $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load(resource_path('js/Components/hooks/Asset Tag Format.xlsx'));
        } catch (\Exception $e) {
            return back()->with('error', 'Asset tag template not found.');
        }
    
        // Get the active sheet
        $sheet = $spreadsheet->getActiveSheet();
    
        // Populate the Excel template with data from the asset
        $sheet->setCellValue('F7',($asset->S_UAsset ?? ''));
        $sheet->setCellValue('C10',($asset->S_UModel ?? ''));
        $sheet->setCellValue('C12',($asset->S_UModel ?? ''));
        $sheet->setCellValue('C14',($asset->S_USerial ?? ''));
        // Format datePurchased to 'm/d/y' (e.g., 4/25/2024)
        $datePurchased = $asset->datePurchased ? Carbon::parse($asset->datePurchased)->format('m/d/Y') : '';
        $sheet->setCellValue('G8', $datePurchased);
        $sheet->setCellValue('G10',($asset->department_S_U ?? ''));
        $sheet->setCellValue('G11', 'Issued To: ' . ($asset->S_UUser ?? ''));
    
        // Save the file to a temporary location
        $fileName = 'asset_tag_' . uniqid() . '.xlsx';
        $tempFile = sys_get_temp_dir() . '/' . $fileName;
        
        $writer = new Xlsx($spreadsheet);
        $writer->save($tempFile);
    
        // Download the file and delete it after sending
        return response()->download($tempFile)->deleteFileAfterSend(true);
    }  

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia("ServerUps/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServerUPSRequest $request)
    {
        //
        $data = $request->validated();
        /** @var $img_path \Illuminate\Http\UploadedFile */
        $img_path = $data['img_path'] ?? null;
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();
        if($img_path){
            $data['img_path'] = $img_path->store('ServerUps/'.Str::random(), 'public');
        }

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new employee
        ServerUPS::create($data);

        return to_route('serverUps.index')->with('success', 'New Server / UPS was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(ServerUPS $serverUPS)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServerUPS $serverUPS)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServerUPSRequest $request, ServerUPS $serverUp)
    {
        //
        $data = $request->validated();
        // \Log::info('Update data: ', $data);

        // Handle img_path if it exists
        $img_path = $request->file('img_path');

        if($img_path){
            if($serverUp->img_path){
                Storage::disk('public')->deleteDirectory(dirname($serverUp->img_path));
            }
            $data['img_path'] = $img_path->store('ServerUps/'.Str::random(), 'public');
        } else {
            unset($data['img_path']);
        }

        $data['updated_by'] = Auth::id();
        $serverUp->update($data);
        // \Log::info('Updated serverups: ', $serverUp->toArray());
        return to_route('serverUps.index')->with('success', "Server / UPS \" $serverUp->S_UName\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServerUPS $serverUp)
    {
        //
        $serverUp->delete();
        if($serverUp->img_path){
            Storage::disk('public')->deleteDirectory(dirname($serverUp->img_path));
        }
        return to_route('serverUps.index')->with('success', "Server / UPS - \" $serverUp->S_UName\" successfully deleted!");
    }
    public function bulkFetch(Request $request)
    {
        $ids = $request->input('ids');
        $serverUp = ServerUPS::whereIn('S_UID', $ids)->get();
        return response()->json($serverUp);
    }
}
