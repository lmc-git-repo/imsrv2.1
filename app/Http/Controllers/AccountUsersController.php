<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\DepartmentsResource;
use App\Models\AccountUsers;
use App\Http\Requests\StoreAccountUsersRequest;
use App\Http\Requests\UpdateAccountUsersRequest;
use App\Models\Departments;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
class AccountUsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = AccountUsers::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if(request("name")){
            $query->where("name","like","%". request("name") .'%');
        }

        if(request('status')){
            $query->where('status', request('status'));
        }

        $accountUsers = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)->onEachSide(1);

        $departmentsList = Departments::orderBy('dept_list')->get(); // Fetch all departments
        $accountUsersAllData = AccountUsers::orderBy('account_id')->get();

        return inertia("AccountUsers/Index", [
            'accountUsers' => AccountUsersResource::collection($accountUsers),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            'accountUsersAllData' => AccountUsersResource::collection($accountUsersAllData),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function Create()
    {
        //This code block can work even without this only works for separate page.
        return inertia("AccountUsers/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountUsersRequest $request)
    {
        //
        $data = $request->validated();
        /** @var $profile_path \Illuminate\Http\UploadedFile */
        $profile_path = $data['profile_path'] ?? null;
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();
        if($profile_path){
            $data['profile_path'] = $profile_path->store('accountUsers/'.Str::random(), 'public');
        }

        //?Checking if there's a data is posted after submission 
        // dd($data);

        //*This is for passing the data to create a new employee
        AccountUsers::create($data);

        return to_route('accountUsers.index')->with('success', 'New employee was created');
    }

    /**
     * Display the specified resource.
     */

    public function show($account_id)
    {
        //
        // $accountUser = AccountUsers::findOrFail($account_id);
        $accountUser = AccountUsers::where('account_id', $account_id)->firstOrFail();

        return inertia("AccountUsers/Show", [
            'accountUsers' => new AccountUsersResource($accountUser),
        ]);

        //This code block can work even without this only works for separate page.
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AccountUsers $accountUsers)
    {
        //
        return inertia('AccountUsers/Edit', [
            'accountUsers' => new AccountUsersResource($accountUsers),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountUsersRequest $request, AccountUsers $accountUsersEdit)
    {
        //
        $data = $request->validated();
        \Log::info('Update data: ', $data);
        // Handle profile_path if it exists
        $profile_path = $data['profile_path'] ?? null;
        $data['updated_by'] = Auth::id();
        if($profile_path){
            if($accountUsersEdit->profile_path){
                Storage::disk('public')->deleteDirectory(dirname($accountUsersEdit->profile_path));
            }
            $data['profile_path'] = $profile_path->store('accountUsers/'.Str::random(), 'public');
        }
        $name = $accountUsersEdit->name;
        $accountUsersEdit->update($data);
        return to_route('accountUsers.index')->with('success', "Employee \" $name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AccountUsers $accountUser)
    {
        $name = $accountUser->name;
        $accountUser->delete();
        if($accountUser->profile_path){
            Storage::disk('public')->deleteDirectory(dirname($accountUser->profile_path));
        }
        return to_route('accountUsers.index')->with('success', "Employee - \" $name\" successfully deleted!");
    }
}
