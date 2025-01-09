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
        Schema::table('penagihan', function (Blueprint $table) {
            $table->string('keterangan')->nullable()->change(); // Mengubah kolom keterangan menjadi nullable
            $table->string('tanggal_lunas')->nullable()->change(); // Mengubah kolom tanggal_lunas menjadi nullable
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('penagihan', function (Blueprint $table) {
            $table->string('keterangan')->nullable(false)->change(); // Mengembalikan kolom keterangan menjadi tidak nullable
            $table->string('tanggal_lunas')->nullable(false)->change(); // Mengembalikan kolom tanggal_lunas menjadi tidak nullable
        });
    }
};
