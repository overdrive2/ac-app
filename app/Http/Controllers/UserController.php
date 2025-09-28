<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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

    public function show(User $user)
    {
        return response()->json($user);
    }
}
