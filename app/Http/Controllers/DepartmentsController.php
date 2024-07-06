<?php

namespace App\Http\Controllers;

use App\Http\Resources\DepartmentsResource;
use App\Models\Departments;
use App\Http\Requests\StoreDepartmentsRequest;
use App\Http\Requests\UpdateDepartmentsRequest;

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

        if(request("dept_list")){
            $query->where("dept_list","like","%". request("dept_list") .'%');
        }

        // if(request('status')){
        //     $query->where('status', request('status'));
        // }

        $departments = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)->onEachSide(1);

        return inertia("Departments/Index", [
            'departments' => DepartmentsResource::collection($departments),
            'queryParams' => request()->query() ?: null,
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
    public function update(UpdateDepartmentsRequest $request, Departments $departments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departments $departments)
    {
        //
    }

    //
    public function list()
    {
        $departments = Departments::select('dept_id', 'dept_list as name')->get();
        return response()->json($departments);
    }

}
