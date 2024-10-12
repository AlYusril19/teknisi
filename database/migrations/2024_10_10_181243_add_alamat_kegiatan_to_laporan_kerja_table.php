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
            $table->string('alamat_kegiatan')->nullable(); // Tambahkan kolom status dengan default 'draft'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('laporan_kerja', function (Blueprint $table) {
            $table->dropColumn('alamat_kegiatan');
        });
    }
};
