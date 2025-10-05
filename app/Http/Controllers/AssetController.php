<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\AssetKind;
use App\Models\Vendor;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    public function index(Request $request)
    {
        $query = Asset::with(['kind.category', 'vendor']);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('asset_name', 'LIKE', "%{$search}%")
                  ->orWhere('asset_code', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('asset_kind_id')) {
            $query->where('asset_kind_id', $request->asset_kind_id);
        }

        if ($request->filled('vendor_id')) {
            $query->where('vendor_id', $request->vendor_id);
        }

        $assets = $query->latest()->paginate(20);

        return inertia('asset.index', [
            'assets' => $assets,
            'filters' => $request->only('search', 'asset_kind_id', 'vendor_id'),
            'kinds' => AssetKind::all(['id', 'type_name']),
            'vendors' => Vendor::all(['id', 'name']),
        ]);
    }

    public function create()
    {
        return inertia('Assets/Create', [
            'kinds' => AssetKind::all(['id', 'type_name']),
            'vendors' => Vendor::all(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'asset_code' => 'required|string|unique:assets',
            'asset_name' => 'required|string|max:255',
            'asset_kind_id' => 'required|exists:asset_kinds,id',
            'vendor_id' => 'nullable|exists:vendors,id',
            'buy_date' => 'nullable|date',
            'price' => 'nullable|numeric',
            'warranty_months' => 'nullable|integer',
        ]);

        $asset = Asset::create($validated);

        return redirect()->route('assets.index')->with('success', 'เพิ่มครุภัณฑ์แล้ว');
    }

    public function edit(Asset $asset)
    {
        return inertia('Assets/Edit', [
            'asset' => $asset->load('kind', 'vendor'),
            'kinds' => AssetKind::all(['id', 'type_name']),
            'vendors' => Vendor::all(['id', 'name']),
        ]);
    }

    public function update(Request $request, Asset $asset)
    {
        $validated = $request->validate([
            'asset_code' => 'required|string|max:100|unique:assets,asset_code,' . $asset->id,
            'asset_name' => 'required|string|max:255',
            'asset_kind_id' => 'required|exists:asset_kinds,id',
            'vendor_id' => 'nullable|exists:vendors,id',
            'buy_date' => 'nullable|date',
            'price' => 'nullable|numeric',
            'warranty_months' => 'nullable|integer',
        ]);

        $asset->update($validated);

        return redirect()->route('assets.index')->with('success', 'แก้ไขครุภัณฑ์แล้ว');
    }

    public function destroy(Asset $asset)
    {
        $asset->delete();

        return redirect()->back()->with('success', 'ลบครุภัณฑ์แล้ว');
    }
}
