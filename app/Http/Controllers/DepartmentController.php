<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index(Request $request)
    {
        // 🔍 JSON API สำหรับ dropdown
        if ($request->boolean('json')) {
            return Department::select('id', 'name', 'short_name', 'parent_id')->get();
        }

        $search = $request->get('search');

        $query = Department::query()->with('parent');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('short_name', 'like', "%{$search}%");
            });
        }

        $rows = $query->orderBy('id', 'asc')->paginate(10)->withQueryString();

        return Inertia::render('department/index', [
            'rows' => $rows,
            'filters' => ['search' => $search],
            'parents' => Department::select('id', 'name')->whereNull('parent_id')->orderBy('id', 'asc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'short_name' => 'nullable|string|max:50',
            'parent_id' => 'nullable|exists:departments,id',
        ]);

        Department::create($validated);

        return redirect()->back()->with('success', 'เพิ่มหน่วยงานเรียบร้อยแล้ว');
    }

    public function show(Department $department)
    {
        return response()->json($department);
    }

    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'short_name' => 'nullable|string|max:50',
            'parent_id' => 'nullable|exists:departments,id',
        ]);

        $department->update($validated);

        return redirect()->back()->with('success', 'อัปเดตข้อมูลหน่วยงานเรียบร้อยแล้ว');
    }

    public function destroy(Department $department)
    {
        $department->delete();

        return redirect()->back()->with('success', 'ลบหน่วยงานเรียบร้อยแล้ว');
    }
}