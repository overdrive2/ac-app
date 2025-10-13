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
        Schema::create('asset_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained('assets')->cascadeOnDelete(); // FK to assets table
            $table->string('file_path_original'); // Path to the original (large) image
            $table->string('file_path_thumbnail'); // Path to the thumbnail (small) image
            $table->string('alt_text')->nullable(); // Alternative text for accessibility
            $table->integer('order')->default(0); // To define the display order of images
            $table->timestamps();

            // Optional: If you want to ensure uniqueness for a combination, e.g., one primary image per asset
            // $table->unique(['asset_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_images');
    }
};
