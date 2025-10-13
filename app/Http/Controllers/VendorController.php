<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    public function index(Request $request)
    {
        $query = Vendor::query();

        if ($request->filled('search')) {
            $query->where('name', 'ilike', '%' . $request->search . '%');
        }

        return Inertia::render('vendor/index', [
            'rows' => $query->latest()->paginate(10)->withQueryString(),
            'filters' => $request->only('search'),
        ]);
    }

    public function json()
    {
        $vendors = Vendor::orderBy('name', 'asc')->get();
        return response()->json(['vendors' => $vendors]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:1000',
            'phone' => 'nullable|string|max:50',
            'owner_name' => 'nullable|string|max:255',
            'tax_id' => 'nullable|string|max:50',
        ]);
        Vendor::create($validated);

        return redirect()->back()->with('success', 'Vendor created successfully.');
    }

    public function show(Vendor $vendor)
    {
        return response()->json($vendor); // ถ้าใช้ Inertia fetch จาก frontend
    }

    public function update(Request $request, Vendor $vendor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:1000',
            'phone' => 'nullable|string|max:50',
            'owner_name' => 'nullable|string|max:255',
            'tax_id' => 'nullable|string|max:50',
        ]);

        $vendor->update($validated);

        return redirect()->back()->with('success', 'Vendor updated successfully.');
    }

    public function destroy(Vendor $vendor)
    {
        $vendor->delete();

        return redirect()->back()->with('success', 'Vendor deleted successfully.');
    }
}
