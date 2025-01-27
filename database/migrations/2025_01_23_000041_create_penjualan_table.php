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
        Schema::create('penjualan', function (Blueprint $table) {
            $table->id();
            $table->string('penjualan_id');
            $table->unsignedBigInteger('penagihan_id');
            $table->decimal('total_biaya', 15, 0); // Format untuk biaya
            $table->timestamps();

            // Relasi ke tabel penagihan
            $table->foreign('penagihan_id')->references('id')->on('penagihan')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penjualan');
    }
};
