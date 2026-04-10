<?php

namespace App\Http\Controllers;

use App\Models\TV;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TVController extends Controller
{
    public function index(Request $request)
    {
        $query = TV::with('createdBy')->latest();

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('brand', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%")
                  ->orWhere('asset_tag', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('serial_number', 'like', "%{$search}%")
                  ->orWhere('status', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $tv = $query->paginate(10)->withQueryString();

        return inertia('TV/Index', [
            'tv' => $tv,
            'success' => session('success'),
            'queryParams' => $request->query() ?: null,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'brand' => 'required',
            'model' => 'required',
            'asset_tag' => 'required|unique:tv',
            'location' => 'required',
            'serial_number' => 'required',
            'status' => 'required',
        ]);

        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        TV::create($data);

        return to_route('tv.index')->with('success', 'TV added');
    }

    public function update(Request $request, TV $tv)
    {
        $data = $request->validate([
            'brand' => 'required',
            'model' => 'required',
            'asset_tag' => 'required|unique:tv,asset_tag,' . $tv->TID . ',TID',
            'location' => 'required',
            'serial_number' => 'required',
            'status' => 'required',
        ]);

        $data['updated_by'] = Auth::id();

        $tv->update($data);

        return to_route('tv.index')->with('success', 'TV updated');
    }

    public function destroy(TV $tv)
    {
        $tv->delete();

        return to_route('tv.index')->with('success', 'TV deleted');
    }
}