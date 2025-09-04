<?php

namespace App\Http\Controllers;

use App\Models\CCTV;
use App\Http\Resources\CCTVResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CCTVController extends Controller
{
    public function index(Request $request)
    {
        $query = CCTV::query();

        // Sorting
        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');

        $cctvs = $query
            ->with(['createdBy'])
            ->orderBy($sortField, $sortDirection)
            ->when($request->search, function (Builder $query, $search) {
                $search = (string)$search;
                $query->where('cctv_name', 'like', "%{$search}%")
                    ->orWhere('hikvision_model', 'like', "%{$search}%")
                    ->orWhere('ip_address', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%");
            })
            ->paginate(10)->onEachSide(1);

        return Inertia::render('CCTV/Index', [
            'cctvs' => CCTVResource::collection($cctvs),
            'queryParams' => $request->query() ?: null,
            'success' => session('success')
        ]);
    }

    public function create()
    {
        return Inertia::render('CCTV/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'hikvision_model' => 'required|string|max:255',
            'cctv_name' => 'required|string|max:255',
            'ip_address' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'installer_supplier' => 'required|string|max:255',
        ]);

        $validated['created_by'] = Auth::id();

        CCTV::create($validated);

        return redirect()->route('cctv.index')->with('success', 'CCTV added successfully.');
    }

    public function show(CCTV $cctv)
    {
        return Inertia::render('CCTV/Show', [
            'cctv' => new CCTVResource($cctv->load('createdBy'))
        ]);
    }

    public function edit(CCTV $cctv)
    {
        return Inertia::render('CCTV/Edit', ['cctv' => $cctv, 'selectedCctv' => $cctv]);
    }

    public function update(Request $request, CCTV $cctv)
    {
        $validated = $request->validate([
            'hikvision_model' => 'required|string|max:255',
            'cctv_name' => 'required|string|max:255',
            'ip_address' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'installer_supplier' => 'required|string|max:255',
        ]);

        $cctv->update($validated);

        return redirect()->route('cctv.index')->with('success', 'CCTV updated successfully.');
    }

    public function destroy(CCTV $cctv)
    {
        $cctv->delete();
        return redirect()->route('cctv.index')->with('success', 'CCTV deleted.');
    }
}