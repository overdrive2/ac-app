<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::query()
            ->when(request('search'), fn($q) => 
                $q->where('name', 'like', '%'.request('search').'%')
            )
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('user/index', [
            'rows' => $users,
            'filters' => request()->only('search'),
        ]);
    }

    public function update(Request $request, User $user)
    {
        // ✅ ตรวจสอบข้อมูลก่อนอัปเดต
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => "required|email|unique:users,email,{$user->id}", // ตรวจซ้ำยกเว้น user นี้
          //  'password' => 'nullable|min:6|confirmed', // optional ถ้าไม่กรอกจะไม่เปลี่ยน
        ]);

        // ✅ อัปเดตข้อมูล
        $user->name = $validated['name'];
        $user->email = $validated['email'];

        // อัปเดตรหัสผ่านเฉพาะกรณีที่มีการส่งค่าเข้ามา
       /* if (!empty($validated['password'])) {
            $user->password = bcrypt($validated['password']);
        }*/

        $user->save();      
        // ✅ ส่งกลับ response
        return redirect()->back()->with('success', 'อัปเดตประเภททรัพย์สินเรียบร้อย');
    }

    public function show(User $user)
    {
        return response()->json($user);
    }
}
