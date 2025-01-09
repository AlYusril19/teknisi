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
        Schema::table('tagihan', function (Blueprint $table) {
            $table->unsignedBigInteger('penagihan_id')->after('laporan_id')->nullable();

            // Relasi ke tabel penagihan
            $table->foreign('penagihan_id')->references('id')->on('penagihan')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tagihan', function (Blueprint $table) {
            $table->dropColumn('penagihan_id');
        });
    }
};
