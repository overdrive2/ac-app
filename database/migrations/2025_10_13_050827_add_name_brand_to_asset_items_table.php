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
        Schema::table('asset_items', function (Blueprint $table) {
            $table->string('asset_item_name', 255)->nullable()->after('asset_item_code');
            $table->foreignId('brand_id')->nullable()->after('asset_item_name')->constrained()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('asset_items', function (Blueprint $table) {
            $table->dropColumn('asset_item_name');
            $table->dropConstrainedForeignId('brand_id');
        });
    }
};
