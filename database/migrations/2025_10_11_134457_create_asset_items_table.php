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
        Schema::create('asset_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained()->cascadeOnDelete();
            $table->string('asset_item_code', 100)->unique();
            $table->foreignId('vendor_id')->nullable()->constrained()->nullOnDelete();
            $table->date('buy_date')->nullable();
            $table->decimal('price', 12, 2)->nullable();
            $table->integer('warranty_months')->nullable();
            $table->string('serial_number', 100)->nullable();
            $table->enum('status', ['active', 'repair', 'disposed'])->default('active');
            $table->text('remark')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_items');
    }
};
