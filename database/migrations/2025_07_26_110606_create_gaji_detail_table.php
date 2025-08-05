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
        Schema::create('gaji_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gaji_staff_id')->constrained('gaji_staff')->onDelete('cascade');
            $table->enum('jenis',['tambah', 'potong']);
            $table->string('nama');
            $table->integer('jumlah');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gaji_detail');
    }
};
