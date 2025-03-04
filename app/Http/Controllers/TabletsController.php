<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\DepartmentsResource;
use App\Http\Resources\TabletsResource;
use App\Models\AccountUsers;
use App\Models\Computers;
use App\Models\Departments;
use App\Models\Tablets;
use App\Http\Requests\StoreTabletsRequest;
use App\Http\Requests\UpdateTabletsRequest;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class TabletsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = Tablets::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $tablets = $query
            ->with(['createdBy', 'updatedBy']) // eto yung kulang mo
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('tablet_name', 'like', "%{$search}%")
                    ->orWhere('fullName', 'like', "%{$search}%")
                    ->orWhere('tablet_model', 'like', "%{$search}%")
                    ->orWhere('tablet_asset', 'like', "%{$search}%")
                    ->orWhere('tablet_serial', 'like', "%{$search}%")
                    ->orWhere('tablet_address', 'like', "%{$search}%")
                    ->orWhere('tablet_user', 'like', "%{$search}%");
            })
            ->when(request('tablet_status'), function (Builder $query, $tabletStatus) {
                $query->where('tablet_status', $tabletStatus);
            })
            ->when(request('asset_class'), function (Builder $query, $assetClass) {
                $query->where('asset_class', $assetClass);
            })
            ->when(request('tablet_gen'), function (Builder $query, $tabletGen) {
                $query->where('tablet_gen', $tabletGen);
            })
            ->when(request('department_tablet'), function (Builder $query, $depTablet) {
                $query->where('department_tablet', $depTablet);
            })
            ->paginate(10)->onEachSide(1);
        //end

        $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $tabletUsersList = AccountUsers::orderBy('initial')->get();
        $tabletUsersFnameList = AccountUsers::orderBy('name')->get();
        $tabletsAllData = Tablets::orderBy('tablet_id')->get();

        // echo $tabletsAllData;

        return inertia("Tablets/Index", [
            'tablets' => TabletsResource::collection($tablets),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            'tabletUsersList' => AccountUsersResource::collection($tabletUsersList),
            'tabletUsersFnameList' => AccountUsersResource::collection($tabletUsersFnameList),
            'tabletsAllData' => TabletsResource::collection($tabletsAllData),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function printAssetTag($assetId) {
        // Find the full asset record by ID
        $asset = Tablets::findOrFail($assetId);
    
        try {
            // Load the Excel template
            $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load(resource_path('js/Components/hooks/Asset Tag Format.xlsx'));
        } catch (\Exception $e) {
            return back()->with('error', 'Asset tag template not found.');
        }
    
        // Get the active sheet
        $sheet = $spreadsheet->getActiveSheet();
    
        // Populate the Excel template with data from the asset
        $sheet->setCellValue('F7',($asset->tablet_asset ?? ''));
        $sheet->setCellValue('C10',($asset->tablet_model ?? ''));
        $sheet->setCellValue('C12',($asset->tablet_model ?? ''));
        $sheet->setCellValue('C14',($asset->tablet_serial ?? ''));
        // Format datePurchased to 'm/d/y' (e.g., 4/25/2024)
        $datePurchased = $asset->datePurchased ? Carbon::parse($asset->datePurchased)->format('m/d/Y') : '';
        $sheet->setCellValue('G8', $datePurchased);
        $sheet->setCellValue('G10',($asset->department_tablet ?? ''));
        $sheet->setCellValue('G11', 'Issued To: ' . ($asset->fullName ?? ''));
    
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
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTabletsRequest $request)
    {
        //
        $data = $request->validated();
        /** @var $img_path \Illuminate\Http\UploadedFile */
        $img_path = $data['img_path'] ?? null;
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();
        if($img_path){
            $data['img_path'] = $img_path->store('Tablets/'.Str::random(), 'public');
        }

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new Tablet
        Tablets::create($data);

        return to_route('tablets.index')->with('success', 'New Tablet was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tablets $tablets)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tablets $tablets)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTabletsRequest $request, Tablets $tablet)
    {
        //
        $data = $request->validated();
        // \Log::info('Update data: ', $data);

        // Handle img_path if it exists
        $img_path = $request->file('img_path');

        if($img_path){
            if($tablet->img_path){
                Storage::disk('public')->deleteDirectory(dirname($tablet->img_path));
            }
            $data['img_path'] = $img_path->store('Tablets/'.Str::random(), 'public');
        } else {
            unset($data['img_path']);
        }

        // dd($data);
        $data['updated_by'] = Auth::id();
        $tablet->update($data);
        // \Log::info('Updated tablet: ', $tablets->toArray());
        return to_route('tablets.index')->with('success', "Tablet \" $tablet->tablet_name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tablets $tablet)
    {
        //
        $tablet->delete();
        if($tablet->img_path){
            Storage::disk('public')->deleteDirectory(dirname($tablet->img_path));
        }
        return to_route('tablets.index')->with('success', "Tablet - \" $tablet->tablet_name\" successfully deleted!");
    }
}
