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
        Schema::create('gaji_staff', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('teknisi_id');
            $table->string('periode');
            $table->integer('gaji_pokok');
            $table->integer('gaji_tambahan');
            $table->integer('total_potongan');
            $table->integer('total_dibayar');
            $table->text('keterangan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gaji_staff');
    }
};
