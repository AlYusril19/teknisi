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
        Schema::create('gaji_detail_default', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('teknisi_id');
            $table->foreignId('item_gaji_id')->constrained('item_gaji')->onDelete('cascade');
            $table->enum('jenis', ['tambah', 'potong']);
            $table->integer('jumlah')->default(0);
            $table->boolean('aktif')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gaji_detail_default');
    }
};
