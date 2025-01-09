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
        Schema::create('penagihan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id')->nullable(); // Menghubungkan teknisi dengan laporan kerja
            $table->unsignedBigInteger('user_id'); // Menghubungkan teknisi dengan laporan kerja
            $table->date('tanggal_tagihan');
            $table->date('tanggal_jatuh_tempo')->nullable();
            $table->date('tanggal_tanggal_lunas');
            $table->decimal('diskon', 5, 2)->nullable(); // Format Diskon tagihan
            $table->string('status');
            $table->string('keterangan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penagihan');
    }
};
