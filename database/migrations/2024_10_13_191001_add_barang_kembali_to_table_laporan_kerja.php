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
            $table->json('barang_kembali')->nullable(); // Kolom untuk menyimpan data barang sebagai JSON
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('laporan_kerja', function (Blueprint $table) {
            $table->dropColumn('barang_kembali');
        });
    }
};
