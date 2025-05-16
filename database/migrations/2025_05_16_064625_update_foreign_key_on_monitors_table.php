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
        Schema::table('monitors', function (Blueprint $table) {
            //
            $table->dropForeign(['mntr_user']); // Remove the existing foreign key
            $table->foreign('mntr_user')
                ->references('name')
                ->on('account_users')
                ->onUpdate('CASCADE'); // Apply cascade updates

            $table->dropForeign(['mntr_department']); // Remove the existing foreign key
            $table->foreign('mntr_department')
                ->references('dept_list')
                ->on('departments')
                ->onUpdate('CASCADE'); // Apply cascade updates

            $table->dropForeign(['compName']); // Remove the existing foreign key
            $table->foreign('compName')
                ->references('comp_name')
                ->on('computers')
                ->onUpdate('CASCADE'); // Apply cascade updates
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('monitors', function (Blueprint $table) {
            //
            $table->dropForeign(['mntr_user']); // Remove modified constraint
            $table->foreign('mntr_user')
                ->references('name')
                ->on('account_users'); // Restore original constraint without cascade

            $table->dropForeign(['mntr_department']); // Remove modified constraint
            $table->foreign('mntr_department')
                ->references('dept_list')
                ->on('departments'); // Restore original constraint without cascade

            $table->dropForeign(['compName']); // Remove modified constraint
            $table->foreign('compName')
                ->references('comp_name')
                ->on('computers'); // Restore original constraint without cascade
        });
    }
};
