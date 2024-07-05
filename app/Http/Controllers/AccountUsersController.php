<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountUsersResource;
use App\Models\AccountUsers;
use App\Http\Requests\StoreAccountUsersRequest;
use App\Http\Requests\UpdateAccountUsersRequest;

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

        return inertia("AccountUsers/Index", [
            'accountUsers' => AccountUsersResource::collection($accountUsers),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function CreateModalComponent()
    {
        //
        return inertia("AccountUsers/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountUsersRequest $request)
    {
        //
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
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AccountUsers $accountUsers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountUsersRequest $request, AccountUsers $accountUsers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AccountUsers $accountUsers)
    {
        //
    }
}
