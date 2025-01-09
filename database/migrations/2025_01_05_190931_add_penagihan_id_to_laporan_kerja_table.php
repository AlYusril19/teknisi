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
        Schema::table('laporan_kerja', function (Blueprint $table) {
            $table->unsignedBigInteger('penagihan_id')->after('user_id')->nullable();

            // Relasi ke tabel penagihan
            $table->foreign('penagihan_id')->references('id')->on('penagihan')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('laporan_kerja', function (Blueprint $table) {
            $table->dropForeign(['penagihan_id']);
            $table->dropColumn('penagihan_id');
        });
    }
};
