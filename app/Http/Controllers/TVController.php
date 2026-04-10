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

        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('brand', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%")
                  ->orWhere('asset_tag', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('serial_number', 'like', "%{$search}%")
                  ->orWhere('status', 'like', "%{$search}%")
                  ->orWhere('datePurchased', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $allowedSortFields = [
            'TID',
            'brand',
            'model',
            'asset_tag',
            'location',
            'serial_number',
            'status',
            'datePurchased',
            'created_at',
        ];

        if (!in_array($sortField, $allowedSortFields)) {
            $sortField = 'created_at';
        }

        if (!in_array($sortDirection, ['asc', 'desc'])) {
            $sortDirection = 'desc';
        }

        $tv = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString()
            ->through(function ($item) {
                $item->created_by_name = $item->createdBy ? $item->createdBy->name : 'N/A';
                $item->created_at_formatted = $item->created_at ? $item->created_at->format('Y-m-d') : 'N/A';
                return $item;
            });

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
            'datePurchased' => 'nullable|date',
        ]);

        $data['created_by'] = Auth::id();

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
            'datePurchased' => 'nullable|date',
        ]);

        $tv->update($data);

        return to_route('tv.index')->with('success', 'TV updated');
    }

    public function destroy(TV $tv)
    {
        $tv->delete();

        return to_route('tv.index')->with('success', 'TV deleted');
    }
}