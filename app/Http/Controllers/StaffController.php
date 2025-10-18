<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');

        $query = Staff::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('position', 'like', "%{$search}%")
                  ->orWhere('department', 'like', "%{$search}%");
            });
        }

        $rows = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('staff/index', [
            'rows' => $rows,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
        ]);

        Staff::create($validated);

        return redirect()->route('staff.index')->with('success', 'เพิ่มเจ้าหน้าที่เรียบร้อยแล้ว');
    }

    public function show(Staff $staff)
    {
        return response()->json($staff);
    }

    public function update(Request $request, Staff $staff)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
        ]);

        $staff->update($validated);

        return redirect()->route('staff.index')->with('success', 'อัปเดตข้อมูลเจ้าหน้าที่เรียบร้อยแล้ว');
    }

    public function destroy(Staff $staff)
    {
        $staff->delete();

        return redirect()->route('staff.index')->with('success', 'ลบเจ้าหน้าที่เรียบร้อยแล้ว');
    }
}
