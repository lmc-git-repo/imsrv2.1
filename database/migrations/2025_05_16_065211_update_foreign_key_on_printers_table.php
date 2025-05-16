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
        Schema::table('printers', function (Blueprint $table) {
            //
            $table->dropForeign(['printer_user']); // Remove the existing foreign key
            $table->foreign('printer_user')
                ->references('name')
                ->on('account_users')
                ->onUpdate('CASCADE'); // Apply cascade updates

            $table->dropForeign(['printer_department']); // Remove the existing foreign key
            $table->foreign('printer_department')
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
        Schema::table('printers', function (Blueprint $table) {
            //
            $table->dropForeign(['printer_user']); // Remove modified constraint
            $table->foreign('printer_user')
                ->references('name')
                ->on('account_users'); // Restore original constraint without cascade
                
            $table->dropForeign(['printer_department']); // Remove modified constraint
            $table->foreign('printer_department')
                ->references('dept_list')
                ->on('departments'); // Restore original constraint without cascade
        });
    }
};
