<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('asset_kinds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_category_id')->constrained('asset_categories')->cascadeOnDelete();
            $table->string('asset_code', 50)->nullable();           // รหัสครุภัณฑ์
            $table->string('type_name');                           // ชื่อชนิดครุภัณฑ์
            $table->unsignedSmallInteger('useful_life')->nullable(); // อายุการใช้งาน (ปี)
            $table->decimal('depreciation_rate', 5, 2)->nullable();  // ค่าเสื่อม (% ต่อปี)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_kinds');
    }
};
