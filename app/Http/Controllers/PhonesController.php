<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\DepartmentsResource;
use App\Http\Resources\PhonesResource;
use App\Models\AccountUsers;
use App\Models\Departments;
use App\Models\Phones;
use App\Http\Requests\StorePhonesRequest;
use App\Http\Requests\UpdatePhonesRequest;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class PhonesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = Phones::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $phones = $query
            ->with(['createdBy', 'updatedBy']) // eto yung kulang mo
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('phone_name', 'like', "%{$search}%")
                    ->orWhere('phone_serial', 'like', "%{$search}%")
                    ->orWhere('phone_address', 'like', "%{$search}%")
                    ->orWhere('phone_num', 'like', "%{$search}%")
                    ->orWhere('fullName', 'like', "%{$search}%")
                    ->orWhere('phone_asset', 'like', "%{$search}%")
                    ->orWhere('phone_model', 'like', "%{$search}%");
            })
            ->when(request('phone_status'), function (Builder $query, $phoneStatus) {
                $query->where('phone_status', $phoneStatus);
            })
            ->when(request('asset_class'), function (Builder $query, $assetClass) {
                $query->where('asset_class', $assetClass);
            })
            ->when(request('department_phone'), function (Builder $query, $depPhone) {
                $query->where('department_phone', $depPhone);
            })
            ->paginate(10)->onEachSide(1);
        //end

        $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $phoneUsersFnameList = AccountUsers::orderBy('name')->get();
        $phonesAllData = Phones::orderBy('phone_id')->get();

        // echo $phonesAllData;

        return inertia("Phones/Index", [
            'phones' => PhonesResource::collection($phones),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            'phoneUsersFnameList' => AccountUsersResource::collection($phoneUsersFnameList),
            'phonesAllData' => PhonesResource::collection($phonesAllData),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function printAssetTag($assetId) {
        // Find the full asset record by ID
        $asset = Phones::findOrFail($assetId);
    
        try {
            // Load the Excel template
            $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load(resource_path('js/Components/hooks/Asset Tag Format.xlsx'));
        } catch (\Exception $e) {
            return back()->with('error', 'Asset tag template not found.');
        }
    
        // Get the active sheet
        $sheet = $spreadsheet->getActiveSheet();
    
        // Populate the Excel template with data from the asset
        $sheet->setCellValue('F7',($asset->phone_asset ?? ''));
        $sheet->setCellValue('C10',($asset->phone_model ?? ''));
        $sheet->setCellValue('C12',($asset->phone_model ?? ''));
        $sheet->setCellValue('C14',($asset->phone_serial ?? ''));
        // Format datePurchased to 'm/d/y' (e.g., 4/25/2024)
        $datePurchased = $asset->datePurchased ? Carbon::parse($asset->datePurchased)->format('m/d/Y') : '';
        $sheet->setCellValue('G8', $datePurchased);
        $sheet->setCellValue('G10',($asset->department_phone ?? ''));
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
    public function store(StorePhonesRequest $request)
    {
        //
        $data = $request->validated();
        /** @var $img_path \Illuminate\Http\UploadedFile */
        $img_path = $data['img_path'] ?? null;
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();
        if($img_path){
            $data['img_path'] = $img_path->store('Phones/'.Str::random(), 'public');
        }

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new Phone
        Phones::create($data);

        return to_route('phones.index')->with('success', 'New Phone was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Phones $phones)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Phones $phones)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePhonesRequest $request, Phones $phone)
    {
        //
        $data = $request->validated();
        // \Log::info('Update data: ', $data);

        // Handle img_path if it exists
        $img_path = $request->file('img_path');

        if($img_path){
            if($phone->img_path){
                Storage::disk('public')->deleteDirectory(dirname($phone->img_path));
            }
            $data['img_path'] = $img_path->store('Phones/'.Str::random(), 'public');
        } else {
            unset($data['img_path']);
        }

        // dd($data);
        $data['updated_by'] = Auth::id();
        $phone->update($data);
        // \Log::info('Updated phone: ', $phones->toArray());
        return to_route('phones.index')->with('success', "Phone \" $phone->phone_name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Phones $phone)
    {
        //
        $phone->delete();
        if($phone->img_path){
            Storage::disk('public')->deleteDirectory(dirname($phone->img_path));
        }
        return to_route('phones.index')->with('success', "Phone - \" $phone->phone_name\" successfully deleted!");
    }
    public function bulkFetch(Request $request)
    {
        $ids = $request->input('ids');
        $phone = Phones::whereIn('phone_id', $ids)->get();
        return response()->json($phone);
    }
}
