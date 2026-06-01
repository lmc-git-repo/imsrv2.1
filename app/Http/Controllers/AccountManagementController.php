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

    public function index()
    {
        $query = AccountManagement::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $accountManagement = $query
            ->with(['createdBy', 'updatedBy']) 
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('equipmentName', 'like', "%{$search}%")
                    ->orWhere('managementIp', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('password', 'like', "%{$search}%")
                    ->orWhere('localPassword', 'like', "%{$search}%");
            })
            ->paginate(10)->onEachSide(1);

        $accountManagementAllData = AccountManagement::orderBy('id')->get();

        return inertia("AccountManagement/Index", [
            'accountManagement' => AccountManagementResource::collection($accountManagement),
            'accountManagementAllData' => AccountManagementResource::collection($accountManagementAllData),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        return inertia("AccountManagement/Create");
    }

    public function store(StoreAccountManagementRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id(); 
        $data['updated_by'] = Auth::id();


        AccountManagement::create($data);

        return to_route('accountManagement.index')->with('success', 'New account was created');
    }

    public function show($id)
    {
        $accountManagement = AccountManagement::where('id', $id)->firstOrFail();

        return inertia("AccountManagement/Show", [
            'accountManagement' => new AccountManagementResource($accountManagement),
        ]);
    }

    public function edit(AccountManagement $accountManagement)
    {

    }

    public function update(UpdateAccountManagementRequest $request, AccountManagement $accountManagement)
    {
        $data = $request->validated();

        $data['updated_by'] = Auth::id();
        $accountManagement->update($data);
        return to_route('accountManagement.index')->with('success', "Account \" $accountManagement->equipmentName\" was updated");
    }

    public function destroy(AccountManagement $accountManagement)
    {
        $accountManagement->delete();
        return to_route('accountManagement.index')->with('success', "Account - \" $accountManagement->equipmentName\" successfully deleted!");
    }
}
