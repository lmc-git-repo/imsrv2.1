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
        Schema::table('consumables', function (Blueprint $table) {
            //
            $table->dropForeign(['installedTo']); // Remove the existing foreign key
            $table->foreign('installedTo')
                ->references('name')
                ->on('account_users')
                ->onUpdate('CASCADE'); // Apply cascade updates
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('consumables', function (Blueprint $table) {
            //
            $table->dropForeign(['installedTo']); // Remove modified constraint
            $table->foreign('installedTo')
                ->references('name')
                ->on('account_users'); // Restore original constraint without cascade
        });
    }
};
