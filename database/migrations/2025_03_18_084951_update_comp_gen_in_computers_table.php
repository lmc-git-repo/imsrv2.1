<?php

use App\Helpers\GenerationHelper;
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
        Schema::table('computers', function (Blueprint $table) {
            //
            $table->dropColumn('comp_gen');
        });

        Schema::table('computers', function (Blueprint $table) {
            $table->enum('comp_gen', GenerationHelper::getGenerations());
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('computers', function (Blueprint $table) {
            //
            $table->enum('comp_gen', [
                '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', 'Pentium', 'N/A'
            ])->change();
        });
    }
};
