<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\DepartmentsResource;
use App\Models\AccountUsers;
use App\Http\Requests\StoreAccountUsersRequest;
use App\Http\Requests\UpdateAccountUsersRequest;
use App\Models\Departments;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AccountUsersController extends Controller
{
    public function index()
    {
        $query = AccountUsers::query();

        // ✅ ONLY CHANGE: newest first (page 1 = latest)
        $accountUsers = $query
            ->with(['createdBy', 'updatedBy'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return inertia("AccountUsers/Index", [
            'accountUsers' => AccountUsersResource::collection($accountUsers),
            'departmentsList' => DepartmentsResource::collection(
                Departments::orderBy('dept_list')->get()
            ),
            'success' => session('success'),
        ]);
    }

    public function store(StoreAccountUsersRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if (!empty($data['profile_path'])) {
            $data['profile_path'] = $data['profile_path']->store('accountUsers/'.Str::random(), 'public');
        }

        AccountUsers::create($data);

        Cache::forget('comp_users_fname_list');

        return to_route('accountUsers.index')->with('success', 'New employee was created');
    }

    public function update(UpdateAccountUsersRequest $request, AccountUsers $accountUser)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        if ($request->hasFile('profile_path')) {
            if ($accountUser->profile_path) {
                Storage::disk('public')->deleteDirectory(dirname($accountUser->profile_path));
            }
            $data['profile_path'] = $request->file('profile_path')->store('accountUsers/'.Str::random(), 'public');
        }

        $accountUser->update($data);

        Cache::forget('comp_users_fname_list');

        return to_route('accountUsers.index')->with('success', 'Employee updated');
    }

    public function destroy(AccountUsers $accountUser)
    {
        if ($accountUser->profile_path) {
            Storage::disk('public')->deleteDirectory(dirname($accountUser->profile_path));
        }

        $accountUser->delete();

        Cache::forget('comp_users_fname_list');

        return to_route('accountUsers.index')->with('success', 'Employee deleted');
    }
}