<?php

namespace App\Http\Controllers;

use App\Models\L3Switch;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Resources\L3SwitchResource;

class L3SwitchController extends Controller
{
    public function index()
    {
        $query = L3Switch::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $l3switches = $query
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

        return Inertia::render('L3Switch/Index', [
            'l3switches' => L3SwitchResource::collection($l3switches),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        return Inertia::render('L3Switch/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'device_name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'ip_address' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'password' => 'required|string|max:255',
        ]);

        // Automatically set created_by
        $validated['created_by'] = Auth::id() ?? 1; // Fallback to user ID 1 if not authenticated

        L3Switch::create($validated);

        return redirect()->route('l3sw.index')->with('success', 'L3 Switch added successfully.');
    }

    public function show(L3Switch $l3sw)
    {
        return Inertia::render('L3Switch/Show', [
            'l3switch' => $l3sw->load('createdBy')
        ]);
    }

    public function edit(L3Switch $l3sw)
    {
        return Inertia::render('L3Switch/Edit', [
            'l3switch' => $l3sw
        ]);
    }

    public function update(Request $request, L3Switch $l3sw)
    {
        $validated = $request->validate([
            'device_name' => 'required|string|max:255',
            'model' => 'nullable|string|max:255',
            'ip_address' => 'required|string|max:255',
            'username' => 'nullable|string|max:255',
            'password' => 'nullable|string|max:255',
        ]);

        $l3sw->update($validated);

        return redirect()->route('l3sw.index')->with('success', 'L3 Switch updated successfully.');
    }
public function destroy(L3Switch $l3sw)
{
    $l3sw->delete();

    return redirect()->route('l3sw.index')->with('success', 'L3 Switch deleted.');
}
}