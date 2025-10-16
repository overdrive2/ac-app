<?php

namespace App\Http\Controllers;

use App\Models\AssetItem;
use App\Models\Brand;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AssetItemController extends Controller
{
    public function update(Request $request, AssetItem $assetItem)
    {

        $validated = $request->validate([
            'asset_item_code' => [
                'required',
                'string',
                'max:100',
                Rule::unique('asset_items', 'asset_item_code')->ignore($assetItem->id),
            ],
            'asset_item_name' => 'required|string',
            'vendor_id' => 'nullable|integer|exists:vendors,id',
            'brand_id' => 'nullable|integer|exists:brands,id',
            'buy_date' => 'nullable|date',
            'price' => 'nullable|numeric',
            'warranty_months' => 'nullable|integer|min:0',
            'serial_number' => 'nullable|string|max:100',
            'status' => ['required', Rule::in(['active', 'repair', 'disposed'])],
            'remark' => 'nullable|string|max:500',
        ]);
        
        $assetItem->update($validated);

        return redirect()->back()->with('success', 'อัปเดตข้อมูลครุภัณฑ์ย่อยเรียบร้อยแล้ว');
    }

    public function show(AssetItem $assetItem)
    {        
        return inertia('asset/asset-item-detail', [
            'asset' => $assetItem->asset,
            'assetItem' => $assetItem->load('vendor', 'brand'),
            'images' => $assetItem->asset->images,
            'vendors' => Vendor::all(),
            'brands' => Brand::all(),
        ]);
    }
}
