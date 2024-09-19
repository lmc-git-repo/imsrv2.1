<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\ComputersResource;
use App\Http\Resources\DepartmentsResource;
use App\Http\Resources\MonitorsResource;
use App\Models\AccountUsers;
use App\Models\Computers;
use App\Models\Departments;
use App\Models\Monitors;
use App\Http\Requests\StoreMonitorsRequest;
use App\Http\Requests\UpdateMonitorsRequest;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class MonitorsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = Monitors::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        
        $monitors = $query
            ->with(['createdBy', 'updatedBy']) // eto yung kulang mo
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('compName', 'like', "%{$search}%")
                    ->orWhere('mntr_user', 'like', "%{$search}%")
                    ->orWhere('mntr_asset', 'like', "%{$search}%")
                    ->orWhere('mntr_model', 'like', "%{$search}%");
            })
            ->when(request('asset_class'), function (Builder $query, $assetClass) {
                $query->where('asset_class', $assetClass);
            })
            ->when(request('mntr_department'), function (Builder $query, $mntrDept) {
                $query->where('mntr_department', $mntrDept);
            })
            ->paginate(10)->onEachSide(1);
        //end

        $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $mntrUsersList = AccountUsers::orderBy('name')->get();
        $monitorsAllData = Monitors::orderBy('monitor_id')->get();
        $compNameList = Computers::orderBy('comp_name')->get();

        // echo $monitorsAllData;

        return inertia("Monitors/Index", [
            'monitors' => MonitorsResource::collection($monitors),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            'compNameList' => ComputersResource::collection($compNameList),
            'mntrUsersList' => AccountUsersResource::collection($mntrUsersList),
            'monitorsAllData' => MonitorsResource::collection($monitorsAllData),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function printAssetTag($assetId) {
        // Find the full asset record by ID
        $asset = Monitors::findOrFail($assetId);
    
        try {
            // Load the Excel template
            $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load(resource_path('js/Components/hooks/Asset Tag Format.xlsx'));
        } catch (\Exception $e) {
            return back()->with('error', 'Asset tag template not found.');
        }
    
        // Get the active sheet
        $sheet = $spreadsheet->getActiveSheet();
    
        // Populate the Excel template with data from the asset
        $sheet->setCellValue('F7',($asset->mntr_asset ?? ''));
        $sheet->setCellValue('C10',($asset->mntr_model ?? ''));
        $sheet->setCellValue('C12',($asset->mntr_model ?? ''));
        $sheet->setCellValue('C14',($asset->mntr_serial ?? ''));
        // Format datePurchased to 'm/d/y' (e.g., 4/25/2024)
        $datePurchased = $asset->datePurchased ? Carbon::parse($asset->datePurchased)->format('m/d/Y') : '';
        $sheet->setCellValue('G8', $datePurchased);
        $sheet->setCellValue('G10',($asset->mntr_department ?? ''));
        $sheet->setCellValue('G11', 'Issued To: ' . ($asset->mntr_user ?? ''));
    
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
        return inertia("Monitors/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMonitorsRequest $request)
    {
        //
        $data = $request->validated();
        /** @var $img_path \Illuminate\Http\UploadedFile */
        $img_path = $data['img_path'] ?? null;
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();
        if($img_path){
            $data['img_path'] = $img_path->store('Monitors/'.Str::random(), 'public');
        }

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new monitor
        Monitors::create($data);

        return to_route('monitors.index')->with('success', 'New monitor was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Monitors $monitors)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Monitors $monitors)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMonitorsRequest $request, Monitors $monitor)
    {
        //
        $data = $request->validated();
        // \Log::info('Update data: ', $data);

        // Handle img_path if it exists
        $img_path = $request->file('img_path');

        if($img_path){
            if($monitor->img_path){
                Storage::disk('public')->deleteDirectory(dirname($monitor->img_path));
            }
            $data['img_path'] = $img_path->store('Monitors/'.Str::random(), 'public');
        } else {
            unset($data['img_path']);
        }

        $data['updated_by'] = Auth::id();
        $monitor->update($data);
        // \Log::info('Updated monitor: ', $monitors->toArray());
        return to_route('monitors.index')->with('success', "Monitor \" $monitor->compName\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Monitors $monitor)
    {
        //
        $monitor->delete();
        if($monitor->img_path){
            Storage::disk('public')->deleteDirectory(dirname($monitor->img_path));
        }
        return to_route('monitors.index')->with('success', "Monitor - \" $monitor->compName\" successfully deleted!");
    }
}
