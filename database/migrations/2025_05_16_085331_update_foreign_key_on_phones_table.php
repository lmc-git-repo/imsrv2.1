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
        Schema::table('phones', function (Blueprint $table) {
            //
            $table->dropForeign(['fullName']); // Remove the existing foreign key
            $table->foreign('fullName')
                ->references('name')
                ->on('account_users')
                ->onUpdate('CASCADE'); // Apply cascade updates
            
            $table->dropForeign(['department_phone']); // Remove the existing foreign key
            $table->foreign('department_phone')
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
        Schema::table('phones', function (Blueprint $table) {
            //
            $table->dropForeign(['fullName']); // Remove modified constraint
            $table->foreign('fullName')
                ->references('name')
                ->on('account_users'); // Restore original constraint without cascade

            $table->dropForeign(['department_phone']); // Remove modified constraint
            $table->foreign('department_phone')
                ->references('dept_list')
                ->on('departments'); // Restore original constraint without cascade
        });
    }
};
