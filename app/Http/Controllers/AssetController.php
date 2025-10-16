<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\AssetKind;
use App\Models\Brand;
use App\Models\Vendor;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    public function index(Request $request, AssetKind $assetkind)
    {
        $query = Asset::with(['kind.category', 'vendor'])
            ->where('asset_kind_id', $assetkind->id);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('asset_name', 'LIKE', "%{$search}%")
                    ->orWhere('asset_code', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('vendor_id')) {
            $query->where('vendor_id', $request->vendor_id);
        }

        $assets = $query->latest()->paginate(20);

        return inertia('asset/index', [
            'rows' => $assets,
            'filters' => $request->only('search', 'asset_kind_id', 'vendor_id'),
            'assetkind' => $assetkind,
            'category' => $assetkind->category,
            'vendors' => Vendor::all(['id', 'name', 'address', 'phone', 'owner_name', 'tax_id']),
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

        Asset::create($validated);

        return redirect()->back()->with('success', 'เพิ่มครุภัณฑ์แล้ว');
    }

    public function edit(Asset $asset)
    {
        return response()->json([
            'asset' => $asset->load('kind', 'vendor'),
            'kinds' => AssetKind::all(['id', 'type_name']),
            'vendors' => Vendor::all(['id', 'name']),
        ]);
        /*return inertia('Assets/Edit', [
            'asset' => $asset->load('kind', 'vendor'),
            'kinds' => AssetKind::all(['id', 'type_name']),
            'vendors' => Vendor::all(['id', 'name']),
        ]);*/
    }

    public function show(Asset $asset)
    {
        return response()->json($asset);
    }

    public function detail($id)
    {
        $asset = Asset::with(['kind', 'images', 'items'])->findOrFail($id);

        return inertia('asset/asset-detail', [
            'asset' => $asset,
            'assetItems' => $asset->items->load('vendor', 'brand'),
            'images' => $asset->images,
            'vendors' => Vendor::all(),
            'brands' => Brand::all(),
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

        return redirect()->back()->with('success', 'แก้ไขครุภัณฑ์แล้ว');
    }

    public function destroy(Asset $asset)
    {
        $asset->delete();

        return redirect()->back()->with('success', 'ลบครุภัณฑ์แล้ว');
    }

    public function nextCode($assetKindId)
    {
        try {
            $nextCode = Asset::generateNextCode($assetKindId);
            return response()->json(['next_code' => $nextCode]);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function NextItemCode(Asset $asset)
    {
         // หา asset_item ล่าสุดของ asset นี้
        $last = $asset->items()->orderByDesc('id')->first();
        $lastNo = 0;

        if ($last && preg_match('/-(\d{4})$/', $last->asset_item_code, $m)) {
            $lastNo = intval($m[1]);
        }

        $seq = str_pad($lastNo + 1, 4, '0', STR_PAD_LEFT);
        // ถ้าไม่มีรายการ ให้เริ่มต้นที่ 0001
        return response()->json(['next_code' => "{$asset->asset_code}-{$seq}"]);
    }

    public function generateItems(Request $request, Asset $asset)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
            'vendor_id' => 'nullable|integer',
            'buy_date' => 'nullable|date',
            'price' => 'required|nullable|numeric',
            'warranty_months' => 'nullable|integer'
        ]);

        $asset->generateItems(
            $request->quantity,
            $request->vendor_id,
            $request->asset_item_name,
            $request->buy_date,
            $request->price,
            $request->warranty_months,
            $request->remark,
            $request->brand_id
        );

        return back()->with('success', "สร้างรหัสครุภัณฑ์ย่อยจำนวน {$request->quantity} รายการเรียบร้อยแล้ว");
    }
}
