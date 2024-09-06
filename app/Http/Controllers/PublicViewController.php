<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\DepartmentsResource;
use App\Models\AccountUsers;
use App\Models\Departments;
use Illuminate\Database\Eloquent\Builder;
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
        
        $employees = $query
            ->with(['createdBy', 'updatedBy']) // eto yung kulang mo
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('outlookEmail', 'like', "%{$search}%")
                    ->orWhere('initial', 'like', "%{$search}%");
            })
            ->paginate(10)->onEachSide(1);
        //end        
        
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
