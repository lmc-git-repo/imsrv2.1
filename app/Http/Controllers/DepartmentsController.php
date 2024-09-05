<?php

namespace App\Http\Controllers;

use App\Http\Resources\DepartmentsResource;
use App\Models\Departments;
use App\Http\Requests\StoreDepartmentsRequest;
use App\Http\Requests\UpdateDepartmentsRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DepartmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // $query = Departments::query();

        // $departments = $query->paginate(10)->onEachSide(1);

        // return inertia("Departments/Index", [
        //     'departments' => DepartmentsResource::collection($departments)
        // ]);
        $query = Departments::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $departments = $query
            ->with(['createdBy', 'updatedBy']) // eto yung kulang mo
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('dept_list', 'like', "%{$search}%");
            })
            ->paginate(10)->onEachSide(1);
        //end

        $departmentsAllData = Departments::orderBy('dept_id')->get();


        return inertia("Departments/Index", [
            'departments' => DepartmentsResource::collection($departments),
            'departmentsAllData' => DepartmentsResource::collection($departmentsAllData),
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
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartmentsRequest $request)
    {
        //
        $data = $request->validated();
        
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();
        

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new Department
        Departments::create($data);

        return to_route('departments.index')->with('success', 'New Department was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Departments $departments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Departments $departments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentsRequest $request, Departments $department)
    {
        //
        $data = $request->validated();

        // dd($data);
        $data['updated_by'] = Auth::id();
        $department->update($data);
        // \Log::info('Updated department: ', $departments->toArray());
        return to_route('departments.index')->with('success', "Department \" $department->dept_list\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departments $department)
    {
        //
        $department->delete();
        // if($department->img_path){
        //     Storage::disk('public')->deleteDirectory(dirname($department->img_path));
        // }
        return to_route('departments.index')->with('success', "Department - \" $department->dept_list\" successfully deleted!");
    }

    //

}
