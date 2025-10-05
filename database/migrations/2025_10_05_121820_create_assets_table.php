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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('asset_code')->unique(); // หมายเลขครุภัณฑ์
            $table->string('asset_name');
            $table->foreignId('asset_kind_id')->constrained()->cascadeOnDelete(); // FK to asset_kinds
            $table->date('buy_date')->nullable();
            $table->decimal('price', 12, 2)->nullable();
            $table->foreignId('vendor_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
