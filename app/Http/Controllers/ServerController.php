<?php

namespace App\Http\Controllers;

use App\Models\Server;
use App\Http\Resources\ServerResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ServerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Server::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $servers = $query
            ->with(['createdBy'])
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('device_name', 'like', "%{$search}%")
                    ->orWhere('model', 'like', "%{$search}%")
                    ->orWhere('ip_address', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%");
            })
            ->when(request('server_model'), function (Builder $query, $model) {
                $query->where('model', $model);
            })
            ->paginate(10)->onEachSide(1);

        // Get unique models from existing data
        $serverModels = Server::whereNotNull('model')
            ->distinct()
            ->pluck('model')
            ->filter()
            ->values()
            ->toArray();

        return Inertia::render('Server/Index', [
            'servers' => ServerResource::collection($servers),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Server/Create');
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
        'switch_connected' => 'nullable|string|max:255',
        'port_number' => 'nullable|string|max:255',
    ]);
    
    $validated['created_by'] = Auth::id();
    
    Server::create($validated);

        return redirect()->route('server.index')->with('success', 'Server added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Server $server)
    {
        return Inertia::render('Server/Show', [
            'server' => new ServerResource($server->load('createdBy'))
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Server $server)
    {
        return Inertia::render('Server/Edit', [
            'server' => $server
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Server $server)
    {
        $validated = $request->validate([
        'device_name' => 'required|string|max:255',
        'model' => 'required|string|max:255',
        'ip_address' => 'required|string|max:255',
        'username' => 'required|string|max:255',
        'password' => 'required|string|max:255',
        'serial_number' => 'required|string|max:255',
        'switch_connected' => 'nullable|string|max:255',
        'port_number' => 'nullable|string|max:255',
    ]);
    
    $server->update($validated);
    
    return redirect()->route('server.index')->with('success', 'Server updated successfully.');
    
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Server $server)
    {
        $server->delete();

        return redirect()->route('server.index')->with('success', 'Server deleted.');
    }

    public function bulkFetch(Request $request)
    {
        $ids = $request->input('ids');
        $servers = Server::whereIn('id', $ids)->get();
        return response()->json($servers);
    }
}