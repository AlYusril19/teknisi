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
        Schema::table('teknisi', function (Blueprint $table) {
            $table->boolean('helper')->default(false)->after('teknisi_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('teknisi', function (Blueprint $table) {
            $table->dropColumn('helper');
        });
    }
};
