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
        Schema::table('account_users', function (Blueprint $table) {
            //
            $table->dropForeign(['department_users']); // Remove the existing foreign key
            $table->foreign('department_users')
                ->references('dept_list')
                ->on('departments')
                ->onUpdate('CASCADE'); // Apply cascade updates
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('account_users', function (Blueprint $table) {
            //
            $table->dropForeign(['department_users']); // Remove modified constraint
            $table->foreign('department_users')
                ->references('dept_list')
                ->on('departments'); // Restore original constraint without cascade
        });
    }
};
