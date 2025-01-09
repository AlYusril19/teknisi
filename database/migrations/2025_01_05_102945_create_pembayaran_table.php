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
        Schema::create('pembayaran', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bank_id')->nullable(); // Menghubungkan ke id bank
            $table->unsignedBigInteger('penagihan_id');
            $table->unsignedBigInteger('customer_id'); // Menghubungkan ke id mitra
            $table->date('tanggal_bayar');
            $table->date('tanggal_konfirmasi');
            $table->decimal('jumlah_dibayar', 15, 0); // Format untuk harga jual
            $table->string('status');
            $table->string('bukti_bayar');
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
        Schema::dropIfExists('pembayaran');
    }
};
