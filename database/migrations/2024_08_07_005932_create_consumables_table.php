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
        Schema::create('consumables', function (Blueprint $table) {
            $table->id('consumables_id')->unique();
            $table->string('po_num');
            $table->string('serial_no');
            $table ->string('img_path')->nullable();
            $table->string('si_code')->nullable();
            $table->string('brand');
            $table->string('model');
            $table->string('storage_capacity');
            $table->integer('qty');
            $table->decimal('price', 8, 2); // 8 total digits, 2 of which are after the decimal point
            $table->decimal('total', 8, 2); // 8 total digits, 2 of which are after the decimal point
            $table->date('dateIssued');
            $table->string('installedTo');
            $table->string('deliveryRecieptDate')->nullable();
            $table->foreign('installedTo')->references('name')->on('account_users');
            $table->string('department_consumables');
            $table->foreign('department_consumables')->references('dept_list')->on('departments');
            $table->longText('remarks');
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
        Schema::dropIfExists('consumables');
    }
};
