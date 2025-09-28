<?php

use App\Http\Controllers\AssetCategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('users', [UserController::class, 'index'])->name('users');
    Route::get('/user/{user}', [UserController::class, 'show'])->name('user.show');

    Route::get('categories', [AssetCategoryController::class, 'index'])->name('categories');
    Route::get('category/{category}', [AssetCategoryController::class, 'show'])->name('category.show');
    Route::put('category/{assetCategory}', [AssetCategoryController::class, 'update'])->name('category.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
