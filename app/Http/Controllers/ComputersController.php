<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\ComputersResource;
use App\Http\Resources\DepartmentsResource;
use App\Models\AccountUsers;
use App\Models\Computers;
use App\Http\Requests\StoreComputersRequest;
use App\Http\Requests\UpdateComputersRequest;
use App\Models\Departments;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class ComputersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Computers::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $computers = $query
            ->with(['createdBy', 'updatedBy']) // eto yung kulang mo
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('comp_name', 'like', "%{$search}%")
                    ->orWhere('fullName', 'like', "%{$search}%")
                    ->orWhere('comp_asset', 'like', "%{$search}%")
                    ->orWhere('comp_user', 'like', "%{$search}%");
            })
            ->when(request('comp_status'), function (Builder $query, $compStatus) {
                $query->where('comp_status', $compStatus);
            })
            ->when(request('asset_class'), function (Builder $query, $assetClass) {
                $query->where('asset_class', $assetClass);
            })
            ->when(request('comp_type'), function (Builder $query, $compType) {
                $query->where('comp_type', $compType);
            })
            ->when(request('comp_gen'), function (Builder $query, $compGen) {
                $query->where('comp_gen', $compGen);
            })
            ->when(request('department_comp'), function (Builder $query, $depComp) {
                $query->where('department_comp', $depComp);
            })
            ->paginate(10)->onEachSide(1);
        //end

        $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $compUsersList = AccountUsers::orderBy('initial')->get();
        $compUsersFnameList = AccountUsers::orderBy('name')->get();
        $computersAllData = Computers::orderBy('CID')->get();

        // echo $computersAllData;
        // dd($computersAllData);

        return inertia("Computers/Index", [
            'computers' => ComputersResource::collection($computers),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            'compUsersList' => AccountUsersResource::collection($compUsersList),
            'compUsersFnameList' => AccountUsersResource::collection($compUsersFnameList),
            'computersAllData' => ComputersResource::collection($computersAllData),
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
        return inertia("Computers/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreComputersRequest $request)
    {
        //
        $data = $request->validated();
        /** @var $img_path \Illuminate\Http\UploadedFile */
        $img_path = $data['img_path'] ?? null;
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();
        if($img_path){
            $data['img_path'] = $img_path->store('Computers/'.Str::random(), 'public');
        }

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new employee
        Computers::create($data);

        return to_route('computers.index')->with('success', 'New computer was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Computers $computers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Computers $computers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComputersRequest $request, Computers $computer)
    {
        //
        $data = $request->validated();
        // \Log::info('Update data: ', $data);

        // Handle img_path if it exists
        $img_path = $request->file('img_path');

        if($img_path){
            if($computer->img_path){
                Storage::disk('public')->deleteDirectory(dirname($computer->img_path));
            }
            $data['img_path'] = $img_path->store('Computers/'.Str::random(), 'public');
        } else {
            unset($data['img_path']);
        }

        // dd($data);
        $data['updated_by'] = Auth::id();
        $computer->update($data);
        // \Log::info('Updated computer: ', $computers->toArray());
        return to_route('computers.index')->with('success', "Computer \" $computer->comp_name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Computers $computer)
    {
        //
        $computer->delete();
        if($computer->img_path){
            Storage::disk('public')->deleteDirectory(dirname($computer->img_path));
        }
        return to_route('computers.index')->with('success', "Computer - \" $computer->comp_name\" successfully deleted!");
    }
}
