<?php

namespace App\Http\Controllers;

use App\Models\Firewall;
use App\Models\Departments;
use App\Http\Resources\DepartmentsResource;
use App\Http\Resources\FirewallResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FirewallController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Firewall::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $firewalls = $query
            ->with(['createdBy'])
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('device_name', 'like', "%{$search}%")
                    ->orWhere('model', 'like', "%{$search}%")
                    ->orWhere('ip_address', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%");
            })
            ->when(request('firewall_status'), function (Builder $query, $status) {
                // Assuming we might add a status field later, for now this is a placeholder
                // $query->where('status', $status);
            })
            ->when(request('firewall_model'), function (Builder $query, $model) {
                $query->where('model', $model);
            })
            ->when(request('firewall_type'), function (Builder $query, $type) {
                // Assuming we might add a type field later, for now this is a placeholder
                // $query->where('type', $type);
            })
            ->when(request('department'), function (Builder $query, $department) {
                // Assuming we might add a department relationship later
                // $query->where('department_id', $department);
            })
            ->paginate(10)->onEachSide(1);

        // Get unique models and types from existing data
        $firewallModels = Firewall::whereNotNull('model')
            ->distinct()
            ->pluck('model')
            ->filter()
            ->values()
            ->toArray();

        // For now, provide static firewall types (can be made dynamic later)
        $firewallTypes = ['Hardware', 'Software', 'UTM', 'Next-Gen'];

        $departmentsList = Departments::orderBy('dept_list')->get();

        return Inertia::render('Firewall/Index', [
            'firewalls' => FirewallResource::collection($firewalls),
            'departmentsList' => DepartmentsResource::collection($departmentsList),
            'firewallModels' => $firewallModels,
            'firewallTypes' => $firewallTypes,
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Firewall/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'device_name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'ip_address' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'serial_number' => 'required|string|max:255',
            'switch_connected' => 'required|string|max:255',
            'port_number' => 'required|string|max:255',
        ]);

        $validated['created_by'] = Auth::id();

        Firewall::create($validated);

        return redirect()->route('firewall.index')->with('success', 'Firewall device added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Firewall $firewall)
    {
        return Inertia::render('Firewall/Show', [
            'firewall' => new FirewallResource($firewall->load('createdBy'))
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Firewall $firewall)
    {
        return Inertia::render('Firewall/Edit', [
            'firewall' => $firewall
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Firewall $firewall)
    {
        $validated = $request->validate([
            'device_name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'ip_address' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'serial_number' => 'required|string|max:255',
            'switch_connected' => 'required|string|max:255',
            'port_number' => 'required|string|max:255',
        ]);

        $firewall->update($validated);


        return redirect()->route('firewall.index')->with('success', 'Firewall device updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Firewall $firewall)
    {
        $firewall->delete();

        return redirect()->route('firewall.index')->with('success', 'Firewall device deleted.');
    }

    public function bulkFetch(Request $request)
    {
        $ids = $request->input('ids');
        $firewalls = Firewall::whereIn('id', $ids)->get();
        return response()->json($firewalls);
    }
}