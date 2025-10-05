<?php

namespace App\Http\Controllers;

use App\Models\AssetCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetCategoryController extends Controller
{
    /**
     * แสดงรายการทั้งหมด
     */
    public function index(Request $request)
    {
        $categories = AssetCategory::when($request->search, fn($q) => 
                $q->where('name', 'like', '%'.$request->search.'%')
            )
            ->orderBy('code')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('asset/category/index', [
            'rows' => $categories,
            'filters' => request()->only('search'),
        ]);
    }

    /**
     * เพิ่มประเภทใหม่
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:20|unique:asset_categories,code',
            'name' => 'required|string|max:255',
            'name_en' => 'nullable|string|max:255',
        ]);

        $category = AssetCategory::create($validated);

        return response()->json([
            'message' => 'สร้างประเภททรัพย์สินเรียบร้อย',
            'data' => $category,
        ], 201);
    }

    /**
     * แสดงประเภทตาม id
     */
    public function show(AssetCategory $category)
    {
        return response()->json($category);
    }

    /**
     * อัปเดตข้อมูล
     */
    public function update(Request $request, AssetCategory $assetCategory)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:20|unique:asset_categories,code,' . $assetCategory->id,
            'name' => 'required|string|max:255',
            'name_en' => 'nullable|string|max:255',
        ]);

        $assetCategory->update($validated);

         return redirect()->back()->with('success', 'อัปเดตประเภททรัพย์สินเรียบร้อย');
    }

    /**
     * ลบข้อมูล
     */
    public function destroy(AssetCategory $assetCategory)
    {
        $assetCategory->delete();

        return redirect()->back()->with('success', 'ลบประเภททรัพย์สินเรียบร้อย');
    }
}
