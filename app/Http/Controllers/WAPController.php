<?php

namespace App\Http\Controllers;

use App\Models\WAP;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Resources\WAPResource;

class WAPController extends Controller
{
    public function index()
    {
        $query = WAP::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $waps = $query
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

        return Inertia::render('Wap/Index', [
            'waps' => WAPResource::collection($waps),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Wap/Create');
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

        WAP::create($validated);

        return redirect()->route('wap.index')->with('success', 'WAP added successfully.');
    }

    public function show(WAP $wap)
    {
        return Inertia::render('Wap/Show', [
            'wap' => $wap->load('createdBy')
        ]);
    }

    public function edit(WAP $wap)
    {
        return Inertia::render('Wap/Edit', [
            'wap' => $wap
        ]);
    }

    public function update(Request $request, WAP $wap)
    {
        $validated = $request->validate([
            'device_name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'ip_address' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'password' => 'required|string|max:255',
        ]);

        $wap->update($validated);

        return redirect()->route('wap.index')->with('success', 'WAP updated successfully.');
    }

    public function destroy(WAP $wap)
    {
        $wap->delete();

        return redirect()->route('wap.index')->with('success', 'WAP deleted.');
    }
}