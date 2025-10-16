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
        Schema::create('asset_repairs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_item_id')->constrained('asset_items')->cascadeOnDelete();
            $table->foreignId('vendor_id')->nullable()->constrained('vendors')->nullOnDelete();
            $table->date('sent_date');                     // วันที่ส่งซ่อม
            $table->integer('repair_days')->nullable();    // ระยะเวลาซ่อม (วัน)
            $table->text('symptom')->nullable();           // อาการเสีย
            $table->string('sender_name');                 // ผู้ส่งซ่อม
            $table->string('contact_person')->nullable();  // ชื่อผู้ติดต่อร้านซ่อม
            $table->string('contact_phone', 50)->nullable(); // เบอร์โทรร้านซ่อม
            $table->date('returned_date')->nullable();     // วันที่รับกลับ (ถ้ามี)
            $table->string('status')->default('sent');     // sent, repairing, completed, cancelled
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_repairs');
    }
};
