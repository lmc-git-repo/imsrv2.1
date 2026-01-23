<?php

namespace App\Http\Controllers;

use App\Helpers\GenerationHelper;
use App\Http\Resources\AccountUsersResource;
use App\Http\Resources\ComputersResource;
use App\Http\Resources\DepartmentsResource;
use App\Models\AccountUsers;
use App\Models\Computers;
use App\Http\Requests\StoreComputersRequest;
use App\Http\Requests\UpdateComputersRequest;
use App\Models\Departments;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ComputersController extends Controller
{
    public function index()
    {
        $query = Computers::query();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        $computers = $query
            ->with(['createdBy', 'updatedBy'])
            ->orderBy($sortField, $sortDirection)

            // 🔍 SEARCH (EXISTING – UNTOUCHED)
            ->when(request('search'), function (Builder $query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('comp_name', 'like', "%{$search}%")
                      ->orWhere('comp_model', 'like', "%{$search}%")
                      ->orWhere('fullName', 'like', "%{$search}%")
                      ->orWhere('comp_asset', 'like', "%{$search}%")
                      ->orWhere('comp_address', 'like', "%{$search}%")
                      ->orWhere('comp_serial', 'like', "%{$search}%")
                      ->orWhere('comp_storage', 'like', "%{$search}%")
                      ->orWhere('comp_user', 'like', "%{$search}%");
                });
            })

            // ✅ FIX: DROPDOWN FILTERS (THIS WAS MISSING)
            ->when(request('comp_status'), fn ($q, $v) => $q->where('comp_status', $v))
            ->when(request('comp_storage'), fn ($q, $v) => $q->where('comp_storage', $v))
            ->when(request('asset_class'), fn ($q, $v) => $q->where('asset_class', $v))
            ->when(request('comp_type'), fn ($q, $v) => $q->where('comp_type', $v))
            ->when(request('comp_gen'), fn ($q, $v) => $q->where('comp_gen', $v))
            ->when(request('department_comp'), fn ($q, $v) => $q->where('department_comp', $v))
            ->when(request('comp_os'), fn ($q, $v) => $q->where('comp_os', $v))

            ->paginate(10);

        $departmentsList = Cache::remember('departments_list', 3600, function () {
            return Departments::orderBy('dept_list')->get();
        });

        $compUsersFnameList = Cache::remember('comp_users_fname_list', 3600, function () {
            return AccountUsers::orderBy('name')->get();
        });

        $compUsersList = $compUsersFnameList->sortBy('initial')->values();

        // ✅ REQUIRED (already correct)
        $generations = GenerationHelper::getGenerations();

        return inertia('Computers/Index', [
            'computers' => ComputersResource::collection($computers),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            'compUsersList' => AccountUsersResource::collection($compUsersList),
            'compUsersFnameList' => AccountUsersResource::collection($compUsersFnameList),
            'generations' => $generations,
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function store(StoreComputersRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if (!empty($data['img_path'])) {
            $data['img_path'] = $data['img_path']->store('Computers/' . Str::random(), 'public');
        }

        Computers::create($data);

        Cache::forget('departments_list');
        Cache::forget('comp_users_fname_list');

        return to_route('computers.index')->with('success', 'New computer was created');
    }

    public function update(UpdateComputersRequest $request, Computers $computer)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        if ($request->hasFile('img_path')) {
            if ($computer->img_path) {
                Storage::disk('public')->deleteDirectory(dirname($computer->img_path));
            }
            $data['img_path'] = $request->file('img_path')->store('Computers/' . Str::random(), 'public');
        }

        $computer->update($data);

        Cache::forget('departments_list');
        Cache::forget('comp_users_fname_list');

        return to_route('computers.index')->with('success', 'Computer updated');
    }

    public function destroy(Computers $computer)
    {
        if ($computer->img_path) {
            Storage::disk('public')->deleteDirectory(dirname($computer->img_path));
        }

        $computer->delete();

        Cache::forget('departments_list');
        Cache::forget('comp_users_fname_list');

        return to_route('computers.index')->with('success', 'Computer deleted');
    }
}