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
        Schema::table('server_u_p_s', function (Blueprint $table) {
            //
            $table->dropForeign(['S_UUser']); // Remove the existing foreign key
            $table->foreign('S_UUser')
                ->references('initial')
                ->on('account_users')
                ->onUpdate('CASCADE'); // Apply cascade updates

            $table->dropForeign(['department_S_U']); // Remove the existing foreign key
            $table->foreign('department_S_U')
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
        Schema::table('server_u_p_s', function (Blueprint $table) {
            //
            $table->dropForeign(['S_UUser']); // Remove modified constraint
            $table->foreign('S_UUser')
                ->references('initial')
                ->on('account_users'); // Restore original constraint without cascade
                
            $table->dropForeign(['department_S_U']); // Remove modified constraint
            $table->foreign('department_S_U')
                ->references('dept_list')
                ->on('departments'); // Restore original constraint without cascade
        });
    }
};
