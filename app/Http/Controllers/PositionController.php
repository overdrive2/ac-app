<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PositionController extends Controller
{
    public function index(Request $request)
    {
        // 🔍 JSON API สำหรับ dropdown
        if ($request->boolean('json')) {
            return Position::select('id', 'name')->orderBy('id', 'asc')->get();
        }

        $search = $request->get('search');

        $query = Position::query();

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        $rows = $query->orderBy('id', 'asc')->paginate(10)->withQueryString();

        return Inertia::render('position/index', [
            'rows' => $rows,
            'filters' => ['search' => $search],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Position::create($validated);

        return redirect()->back()->with('success', 'เพิ่มตำแหน่งเรียบร้อยแล้ว');
    }

    public function show(Position $position)
    {
        return response()->json($position);
    }

    public function update(Request $request, Position $position)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $position->update($validated);

        return redirect()->back()->with('success', 'อัปเดตข้อมูลตำแหน่งเรียบร้อยแล้ว');
    }

    public function destroy(Position $position)
    {
        $position->delete();

        return redirect()->back()->with('success', 'ลบตำแหน่งเรียบร้อยแล้ว');
    }
}
