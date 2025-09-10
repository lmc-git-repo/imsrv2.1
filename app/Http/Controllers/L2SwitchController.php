<?php

namespace App\Http\Controllers;

use App\Models\L2Switch;
use App\Http\Resources\L2SwitchResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class L2SwitchController extends Controller
{
    public function index()
    {
        $query = L2Switch::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $l2switches = $query
            ->with(['createdBy'])
            ->orderBy($sortField, $sortDirection)
            ->when(request('search'), function ($query, $search) {
                $search = (string)$search;
                $query->where('device_name', 'like', "%{$search}%")
                    ->orWhere('model', 'like', "%{$search}%")
                    ->orWhere('ip_address', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%");
            })
            ->paginate(10)->onEachSide(1);

        return Inertia::render('L2Switch/Index', [
            'l2switches' => $l2switches,
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        return Inertia::render('L2Switch/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'device_name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'ip_address' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'serial_number' => 'required|string|max:255',
        ]);

        // Automatically set created_by
        $validated['created_by'] = Auth::id();

        L2Switch::create($validated);

        return redirect()->route('l2sw.index')->with('success', 'L2 Switch added successfully.');
    }

    public function show(L2Switch $l2sw)
    {
        return Inertia::render('L2Switch/Show', [
            'l2switch' => new L2SwitchResource($l2sw->load('createdBy'))
        ]);
    }

    public function edit(L2Switch $l2sw)
    {
        return Inertia::render('L2Switch/Edit', [
            'l2switch' => $l2sw
        ]);
    }

    public function update(Request $request, L2Switch $l2sw)
    {
        $validated = $request->validate([
            'device_name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'ip_address' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'serial_number' => 'required|string|max:255',
        ]);

        $l2sw->update($validated);

        return redirect()->route('l2sw.index')->with('success', 'L2 Switch updated successfully.');
    }

    public function destroy(L2Switch $l2sw)
    {
        $l2sw->delete();

        return redirect()->route('l2sw.index')->with('success', 'L2 Switch deleted.');
    }
}