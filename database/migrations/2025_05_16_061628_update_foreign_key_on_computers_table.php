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
        Schema::table('computers', function (Blueprint $table) {
            //
            $table->dropForeign(['fullName']); // Remove the existing foreign key
            $table->foreign('fullName')
                ->references('name')
                ->on('account_users')
                ->onUpdate('CASCADE'); // Apply cascade updates

            // Note: You can also add onDelete('CASCADE') if you want to apply cascade deletes
            // $table->foreign('fullName')
            //     ->references('name')
            //     ->on('account_users')
            //     ->onDelete('CASCADE'); // Apply cascade deletes
            // If you want to keep the original foreign key without cascade, you can comment out the above lines
            // and uncomment the following lines to restore the original constraint

            $table->dropForeign(['comp_user']); // Remove the existing foreign key
            $table->foreign('comp_user')
                ->references('initial')
                ->on('account_users')
                ->onUpdate('CASCADE'); // Apply cascade updates

            $table->dropForeign(['department_comp']); // Remove the existing foreign key
            $table->foreign('department_comp')
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
        Schema::table('computers', function (Blueprint $table) {
            //
            $table->dropForeign(['fullName']); // Remove modified constraint
            $table->foreign('fullName')
                ->references('name')
                ->on('account_users'); // Restore original constraint without cascade

            $table->dropForeign(['comp_user']); // Remove modified constraint
            $table->foreign('comp_user')
                ->references('initial')
                ->on('account_users'); // Restore original constraint without cascade

            $table->dropForeign(['department_comp']); // Remove modified constraint
            $table->foreign('department_comp')
                ->references('dept_list')
                ->on('departments'); // Restore original constraint without cascade

        });
    }
};
