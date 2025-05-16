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
        Schema::table('tablets', function (Blueprint $table) {
            //
            $table->dropForeign(['tablet_user']); // Remove the existing foreign key
            $table->foreign('tablet_user')
                ->references('initial')
                ->on('account_users')
                ->onUpdate('CASCADE'); // Apply cascade updates

            $table->dropForeign(['fullName']); // Remove the existing foreign key
            $table->foreign('fullName')
                ->references('name')
                ->on('account_users')
                ->onUpdate('CASCADE'); // Apply cascade updates
            
            $table->dropForeign(['department_tablet']); // Remove the existing foreign key
            $table->foreign('department_tablet')
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
        Schema::table('tablets', function (Blueprint $table) {
            //
            $table->dropForeign(['tablet_user']); // Remove modified constraint
            $table->foreign('tablet_user')
                ->references('initial')
                ->on('account_users'); // Restore original constraint without cascade

            $table->dropForeign(['fullName']); // Remove modified constraint
            $table->foreign('fullName')
                ->references('name')
                ->on('account_users'); // Restore original constraint without cascade

            $table->dropForeign(['department_tablet']); // Remove modified constraint
            $table->foreign('department_tablet')
                ->references('dept_list')
                ->on('departments'); // Restore original constraint without cascade
        });
    }
};
