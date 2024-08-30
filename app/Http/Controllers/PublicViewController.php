<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\DepartmentsResource;
use App\Models\AccountUsers;
use App\Models\Departments;
use Illuminate\Http\Request;

class PublicViewController extends Controller
{
    //
    public function index()
    {
        //
        $query = AccountUsers::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('outlookEmail', 'like', '%' . $search . '%');
            });
        } 

        if(request('status')){
            $query->where('status', request('status'));
        }

        $employees = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)->onEachSide(1);
        
        // dd($employees);

        $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $employeesAllData = AccountUsers::orderBy('account_id')->get();

        return inertia("PublicView/Index", [
            'employees' => AccountUsersResource::collection($employees),
            // 'departmentsList' => DepartmentsResource::collection($departmentsList),
            'employeesAllData' => AccountUsersResource::collection($employeesAllData),
            'queryParams' => request()->query() ?: null,
        ]);
    }
}
