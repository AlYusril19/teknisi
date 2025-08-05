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
        Schema::table('gaji_detail_default', function (Blueprint $table) {
            $table->unique(['teknisi_id', 'item_gaji_id']); // 👈 Cegah duplikasi
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gaji_detail_default', function (Blueprint $table) {
            //
        });
    }
};
