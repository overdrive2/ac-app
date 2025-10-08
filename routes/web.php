<?php

use App\Http\Controllers\AssetCategoryController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\AssetKindController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () { return Inertia::render('dashboard'); })->name('dashboard');
    Route::get('repository', function () { return Inertia::render('repositories/index'); })->name('repository');

    Route::get('users', [UserController::class, 'index'])->name('users');
    Route::get('/user/{user}', [UserController::class, 'show'])->name('user.show');
    Route::put('/user/{user}', [UserController::class, 'update'])->name('user.update');

    Route::get('categories', [AssetCategoryController::class, 'index'])->name('categories');
    Route::get('category/{category}', [AssetCategoryController::class, 'show'])->name('category.show');
    Route::put('category/{assetCategory}', [AssetCategoryController::class, 'update'])->name('category.update');
    Route::delete('category/{assetCategory}', [AssetCategoryController::class, 'destroy'])->name('category.destroy');

    Route::get('assetkinds/{category}', [AssetKindController::class, 'index'])->name('assetkinds');
    Route::get('assetkind/{row}', [AssetKindController::class, 'show'])->name('assetkind.show');
    Route::post('assetkind', [AssetKindController::class, 'store'])->name('assetkind.store');
    Route::put('assetkind/{row}', [AssetKindController::class, 'update'])->name('assetkind.update');
    Route::delete('assetkind/{row}', [AssetKindController::class, 'destroy'])->name('assetkind.destroy');
    
    //Get next code
    Route::get('assetkind/next-code/{category}', [AssetKindController::class, 'nextCode'])->name('assetkind.nextcode');

    Route::get('assets/{assetkind}', [AssetController::class, 'index'])->name('assets.index');
    Route::resource('assets', AssetController::class)->only(['show','store', 'edit', 'update', 'destroy']);
    
    Route::resource('vendors', VendorController::class)->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::get('tests', function () {
        return Inertia::render('Test/Index');
    })->name('tests.index');

    Route::resource('tests', TestController::class)->except(['index', 'create', 'edit']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
