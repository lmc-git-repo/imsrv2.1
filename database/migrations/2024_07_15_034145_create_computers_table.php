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
        Schema::create('computers', function (Blueprint $table) {
            $table->id('CID')->unique();
            $table->string('comp_name')->unique();
            $table ->string('img_path')->nullable();
            $table->string('comp_model');
            $table->enum('comp_type',['Desktop','Laptop']);   
            $table->string('comp_user');
            $table->foreign('comp_user')->references('initial')->on('account_users');
            $table->string('fullName')->nullable();
            $table->foreign('fullName')->references('name')->on('account_users');
            $table->string('department_comp');
            $table->foreign('department_comp')->references('dept_list')->on('departments');
            $table->string('comp_os');
            $table->string('comp_storage');
            $table->string('comp_serial');
            $table->string('comp_asset');
            $table->longText('comp_cpu');
            $table->enum('comp_gen',['3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','Pentium','N/A']);
            $table->longText('comp_address');
            $table->longText('comp_prdctkey');
            $table->enum('comp_status',['Deployed','Spare','For Disposal','Already Disposed','Barrow']);
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
        Schema::dropIfExists('computers');
    }
};
