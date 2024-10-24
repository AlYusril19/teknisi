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
        Schema::create('biaya', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id')->nullable(); // Menghubungkan teknisi dengan laporan kerja
            $table->decimal('jam_kerja', 15, 0); // Format untuk harga jual
            $table->decimal('jam_lembur', 15, 0)->nullable(); // Format untuk harga jual
            $table->decimal('kabel', 15, 0)->nullable(); // Format untuk harga jual
            $table->decimal('transport', 15, 0)->nullable(); // Format untuk harga jual
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('biaya');
    }
};
