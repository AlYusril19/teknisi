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
        Schema::table('biaya', function (Blueprint $table) {
            $table->unsignedBigInteger('customer_id')->change();
            $table->decimal('jam_kerja', 15, 0)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('biaya', function (Blueprint $table) {
            $table->unsignedBigInteger('customer_id')->nullable(); // Menghubungkan teknisi dengan laporan kerja
            $table->decimal('jam_kerja', 15, 0); // Format untuk harga jual
        });
    }
};
