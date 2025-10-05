<?php

namespace App\Http\Controllers;

use App\Models\AssetCategory;
use App\Models\AssetKind;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetKindController extends Controller
{
    public function index(Request $request, AssetCategory $category)
    {
        $categories = AssetKind::when(
            $request->search,
            fn($q) =>
            $q->where('name', 'like', '%' . $request->search . '%')
        )
            ->where('asset_category_id', $category->id)
            ->orderBy('code')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('asset/asset-kind/index', [
            'rows' => $categories,
            'filters' => request()->only('search'),
            'category' => $category
        ]);
    }

    public function nextCode($category)
    {
        // ดึงรหัสล่าสุดในหมวดนี้
        $lastCode = AssetKind::where('asset_category_id', $category)
            ->orderBy('asset_code', 'desc')
            ->value('asset_code');

        if ($lastCode) {
            // แยก prefix กับเลข เช่น 9999-012
            [$prefix, $number] = explode('-', $lastCode);
            $nextNumber = str_pad(((int) $number + 1), 3, '0', STR_PAD_LEFT);
            $nextCode = "{$prefix}-{$nextNumber}";
        } else {
            // ถ้ายังไม่มีเลยในหมวดนั้น
            $prefix = str_pad($category, 4, '0', STR_PAD_LEFT);
            $nextCode = "{$prefix}-001";
        }

        return response()->json(['next_code' => $nextCode]);
    }

    public function show(AssetKind $row)
    {
        return response()->json($row);
    }

    public function store(Request $request)
    {
        // ✅ ตรวจสอบข้อมูลก่อนบันทึก
        $validated = $request->validate([
            'asset_category_id'   => 'required|exists:asset_categories,id', // ต้องมีในตาราง asset_categories
            'asset_code'          => 'required|string|max:20|unique:asset_kinds,asset_code',
            'type_name'           => 'required|string|max:255',
            'useful_life'         => 'nullable|numeric|min:0',
            'depreciation_rate'   => 'nullable|numeric|min:0|max:100',
        ]);

        // ✅ บันทึกข้อมูลใหม่
        AssetKind::create($validated);

        // ✅ ส่งกลับพร้อมข้อความ
        return redirect()->back()->with('success', 'เพิ่มชนิดทรัพย์สินเรียบร้อย');
    }


    public function update(Request $request, AssetKind $row)
    {
        $validated = $request->validate([
            'asset_code' => 'required|string|max:20|unique:asset_kinds,asset_code,' . $row->id,
            'type_name' => 'required|string|max:255',
            'useful_life' => 'nullable',
            'depreciation_rate' => 'nullable',
        ]);
        $validated['asset_category_id'] = $row->asset_category_id;
        $row->update($validated);

        return redirect()->back()->with('success', 'อัปเดตชนิดทรัพย์สินเรียบร้อย');
    }

    public function destroy(AssetKind $row)
    {
        $row->delete();

        return redirect()->back()->with('success', 'ลบชนิดทรัพย์สินเรียบร้อย');
    }
}
