<?php

use App\Http\Controllers\AssetCategoryController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\AssetImageController;
use App\Http\Controllers\AssetItemController;
use App\Http\Controllers\AssetKindController;
use App\Http\Controllers\AssetQrController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
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
    
    //Get Kind next code
    Route::get('assetkind/next-code/{category}', [AssetKindController::class, 'nextCode'])->name('assetkind.nextcode');
    
    // Image upload and delete routes
    Route::post('/assets/{asset}/images', [AssetImageController::class, 'store'])->name('assets.images.store');
    Route::delete('/assets/images/{imageId}', [AssetImageController::class, 'destroy'])->name('assets.images.destroy');
    Route::put('/assets/images/{imageId}/alt-text', [AssetImageController::class, 'updateAltText'])->name('assets.images.updateAltText');

    Route::get('assets/{assetkind}', [AssetController::class, 'index'])->name('assets.index');
    Route::get('assets/detail/{id}', [AssetController::class, 'detail'])->name('assets.detail');
    Route::resource('assets', AssetController::class)->only(['show','store', 'edit', 'update', 'destroy']);
    Route::get('/assets/next-code/{assetKind}', [AssetController::class, 'nextCode'])->name('assets.next-code');
    Route::get('/assets/next-item-code/{asset}', [AssetController::class, 'NextItemCode'])->name('assets.next-item-code');
    
    Route::post('/assets/{asset}/generate-items', [AssetController::class, 'generateItems'])->name('assets.generate-items');
    Route::put('/asset-items/{assetItem}', [AssetItemController::class, 'update'])->name('asset-items.update');
    Route::get('/asset-item-show/{assetItem}', [AssetItemController::class, 'show'])->name('asset-items.show');

    Route::resource('vendors', VendorController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::get('vendors-json', [VendorController::class, 'json'])->name('vendors.json');
    
    // routes/web.php
    Route::post('/assets/qr/batch-pdf', [AssetQrController::class, 'batchPdf'])->name('assets.qr.batch.pdf');
    Route::get('/private/{path}', function (Request $request, $path) {
        $disk = Storage::disk('local'); // local -> storage/app/private
        return response()->file($disk->path($path));
    })->name('private.file')->where('path', '.*');

    Route::resource('staff', StaffController::class)->only(['show', 'store', 'update', 'destroy']);
    Route::get('staffs', [StaffController::class, 'index'])->name('staffs.index');

    Route::resource('department', DepartmentController::class)->only(['show', 'store', 'update', 'destroy']);
    Route::get('departments', [DepartmentController::class, 'index'])->name('departments.index');

    Route::resource('position', PositionController::class)->only(['show', 'store', 'update', 'destroy']);
    Route::get('positions', [PositionController::class, 'index'])->name('positions.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
