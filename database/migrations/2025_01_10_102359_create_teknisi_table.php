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
        Schema::create('teknisi', function (Blueprint $table) {
            $table->id();
            $table->string('teknisi_id');
            $table->unsignedBigInteger('laporan_id'); // Menghubungkan teknisi dengan laporan kerja
            $table->timestamps();

            // Relasi ke tabel laporan
            $table->foreign('laporan_id')->references('id')->on('laporan_kerja')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teknisi');
    }
};
