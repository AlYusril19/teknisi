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
            $table->unsignedBigInteger('teknisi_id')->nullable()->change();
            $table->string('role')->nullable()->after('teknisi_id'); // contoh: 'magang', 'staff'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gaji_detail_default', function (Blueprint $table) {
            $table->unsignedBigInteger('teknisi_id');
            $table->dropColumn('role');
        });
    }
};
