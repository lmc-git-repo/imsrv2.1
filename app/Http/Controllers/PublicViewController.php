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

        $accountUsers = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)->onEachSide(1);

        $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $accountUsersAllData = AccountUsers::orderBy('account_id')->get();

        return inertia("PublicView/Index", [
            'accountUsers' => AccountUsersResource::collection($accountUsers),
            // 'departmentsList' => DepartmentsResource::collection($departmentsList),
            'accountUsersAllData' => AccountUsersResource::collection($accountUsersAllData),
            'queryParams' => request()->query() ?: null,
        ]);
    }
}
