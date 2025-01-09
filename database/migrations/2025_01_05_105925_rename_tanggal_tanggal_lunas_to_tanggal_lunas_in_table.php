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
            $table->dropColumn('tanggal_tanggal_lunas');
            $table->date('tanggal_lunas')->after('tanggal_jatuh_tempo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('penagihan', function (Blueprint $table) {
            $table->dropColumn('tanggal_lunas');
            $table->date('tanggal_tanggal_lunas');
        });
    }
};
