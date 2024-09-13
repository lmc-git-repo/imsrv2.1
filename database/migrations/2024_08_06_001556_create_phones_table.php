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
        Schema::create('phones', function (Blueprint $table) {
            $table->id('phone_id')->unique();
            $table->string('phone_name')->unique();
            $table->string('phone_num');
            $table ->string('img_path')->nullable();
            $table->string('phone_model');
            // $table->string('phone_user');
            // $table->foreign('phone_user')->references('initial')->on('account_users');
            $table->string('fullName')->nullable();
            $table->foreign('fullName')->references('name')->on('account_users');
            $table->string('department_phone');
            $table->foreign('department_phone')->references('dept_list')->on('departments');
            // $table->string('phone_os');
            $table->string('phone_storage');
            $table->string('phone_ram');
            $table->string('phone_serial');
            $table->string('phone_asset');
            $table->enum('asset_class',['Office Supplies','Consumables','Repair and Maintenance','Capital','N/A'])->nullable();
            $table->longText('phone_cpu');
            // $table->enum('phone_gen',['3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','Pentium','N/A']);
            $table->longText('phone_address');
            $table->longText('phone_imei');
            $table->enum('phone_status',['Deployed','Spare','For Disposal','Already Disposed','Borrow']);
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
        Schema::dropIfExists('phones');
    }
};
