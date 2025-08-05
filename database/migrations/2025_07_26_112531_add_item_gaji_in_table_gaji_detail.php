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
        Schema::table('gaji_detail', function (Blueprint $table) {
            $table->unsignedBigInteger('item_gaji_id')->after('gaji_staff_id');
            // Relasi ke tabel item_gaji
            $table->foreign('item_gaji_id')->references('id')->on('item_gaji')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gaji_detail', function (Blueprint $table) {
            $table->dropForeign(['item_gaji_id']);
            $table->dropColumn('item_gaji_id');
        });
    }
};
