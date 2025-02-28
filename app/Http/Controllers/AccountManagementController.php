<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountManagementResource;
use App\Models\AccountManagement;
use App\Http\Requests\StoreAccountManagementRequest;
use App\Http\Requests\UpdateAccountManagementRequest;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Storage;

class AccountManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = AccountManagement::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $accountManagement = $query
            ->with(['createdBy', 'updatedBy']) // eto yung kulang mo
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('equipmentName', 'like', "%{$search}%")
                    ->orWhere('managementIp', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('password', 'like', "%{$search}%");
            })
            ->paginate(10)->onEachSide(1);
        //end

        // $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $accountManagementAllData = AccountManagement::orderBy('id')->get();

        return inertia("AccountManagement/Index", [
            'accountManagement' => AccountManagementResource::collection($accountManagement),
            // 'departmentsList' => DepartmentsResource::collection($departmentsList),
            'accountManagementAllData' => AccountManagementResource::collection($accountManagementAllData),
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
        //This code block can work even without this only works for separate page.
        return inertia("AccountManagement/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountManagementRequest $request)
    {
        //
        $data = $request->validated();

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new data
        AccountManagement::create($data);

        return to_route('accountManagement.index')->with('success', 'New account was created');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $accountManagement = AccountManagement::where('id', $id)->firstOrFail();

        return inertia("AccountManagement/Show", [
            'accountManagement' => new AccountManagementResource($accountManagement),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AccountManagement $accountManagement)
    {
        //
        return inertia('AccountManagement/Edit', [
            'accountManagement' => new AccountManagementResource($accountManagement),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountManagementRequest $request, AccountManagement $accountManagement)
    {
        //
        $data = $request->validated();
        // \Log::info('Update data: ', $data);

        // Handle profile_path if it exists
        // $profile_path = $data['profile_path'] ?? null;
        // $profile_path = $request->file('profile_path');

        // if($profile_path){
        //     if($accountManagement->profile_path){
        //         Storage::disk('public')->deleteDirectory(dirname($accountManagement->profile_path));
        //     }
        //     $data['profile_path'] = $profile_path->store('accountUsers/'.Str::random(), 'public');
        // } else {
        //     unset($data['profile_path']);
        // }

        // $data['updated_by'] = Auth::id();
        $accountManagement->update($data);
        // \Log::info('Updated account user: ', $accountManagement->toArray());
        return to_route('accountManagement.index')->with('success', "Account \" $accountManagement->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AccountManagement $accountManagement)
    {
        //
        $accountManagement->delete();
        // if($accountManagement->profile_path){
        //     Storage::disk('public')->deleteDirectory(dirname($accountManagement->profile_path));
        // }
        return to_route('accountManagement.index')->with('success', "Account - \" $accountManagement->name\" successfully deleted!");
    }
}
