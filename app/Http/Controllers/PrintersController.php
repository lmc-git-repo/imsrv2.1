<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\DepartmentsResource;
use App\Http\Resources\PrintersResource;
use App\Models\AccountUsers;
use App\Models\Departments;
use App\Models\Printers;
use App\Http\Requests\StorePrintersRequest;
use App\Http\Requests\UpdatePrintersRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PrintersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = Printers::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        // if(request("printer_user")){
        //     $query->where("printer_user","like","%". request("printer_user") .'%');
        // }
        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('printer_user', 'like', '%' . $search . '%')
                  ->orWhere('printer_model', 'like', '%' . $search . '%');
            });
        }              

        // if(request('printer_status')){
        //     $query->where('printer_status', request('printer_status'));
        // }

        $printers = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)->onEachSide(1);

        $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $printerUsersList = AccountUsers::orderBy('name')->get();
        $printersAllData = Printers::orderBy('printer_id')->get();
        // $compNameList = Computers::orderBy('comp_name')->get();

        // echo $printersAllData;

        return inertia("Printers/Index", [
            'printers' => PrintersResource::collection($printers),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            // 'compNameList' => ComputersResource::collection($compNameList),
            'prntrUsersList' => AccountUsersResource::collection($printerUsersList),
            'printersAllData' => PrintersResource::collection($printersAllData),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia("Printers/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePrintersRequest $request)
    {
        //
        $data = $request->validated();
        /** @var $img_path \Illuminate\Http\UploadedFile */
        $img_path = $data['img_path'] ?? null;
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();
        if($img_path){
            $data['img_path'] = $img_path->store('Printers/'.Str::random(), 'public');
        }

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new monitor
        Printers::create($data);

        return to_route('printers.index')->with('success', 'New printer was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Printers $printers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Printers $printers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePrintersRequest $request, Printers $printer)
    {
        //
        $data = $request->validated();
        // \Log::info('Update data: ', $data);

        // Handle img_path if it exists
        $img_path = $request->file('img_path');

        if($img_path){
            if($printer->img_path){
                Storage::disk('public')->deleteDirectory(dirname($printer->img_path));
            }
            $data['img_path'] = $img_path->store('Printers/'.Str::random(), 'public');
        } else {
            unset($data['img_path']);
        }

        $data['updated_by'] = Auth::id();
        $printer->update($data);
        // \Log::info('Updated printer: ', $printers->toArray());
        return to_route('printers.index')->with('success', "Printer \" $printer->printer_model\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Printers $printer)
    {
        //
        $printer->delete();
        if($printer->img_path){
            Storage::disk('public')->deleteDirectory(dirname($printer->img_path));
        }
        return to_route('printers.index')->with('success', "Printer - \" $printer->printer_user\" successfully deleted!");
    }
}
