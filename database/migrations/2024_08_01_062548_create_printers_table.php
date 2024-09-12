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
        Schema::create('printers', function (Blueprint $table) {
            $table->id('printer_id');
            $table->string('printer_user');
            $table->foreign('printer_user')->references('name')->on('account_users');
            $table ->string('img_path')->nullable();
            $table->string('printer_department');
            $table->foreign('printer_department')->references('dept_list')->on('departments');
            $table->string('printer_model');
            $table->string('printer_serial');
            $table->string('printer_asset')->nullable();
            $table->enum('asset_class',['Office Supplies','Consumables','Repair and Maintenance','Capital','N/A']);
            $table->string('remarks');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('printers');
    }
};
