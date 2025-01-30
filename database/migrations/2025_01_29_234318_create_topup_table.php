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
        Schema::create('topup', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->decimal('amount', 15, 0); // Format untuk biaya
            $table->string('metode_bayar');
            $table->enum('status', ['pending', 'success', 'failed'])->default('pending');
            $table->string('bukti_bayar')->nullable();
            $table->string('id_transaksi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('topup');
    }
};
