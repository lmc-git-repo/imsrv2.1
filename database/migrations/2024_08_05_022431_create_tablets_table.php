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
        Schema::create('tablets', function (Blueprint $table) {
            $table->id('tablet_id')->unique();
            $table->string('tablet_name')->unique();
            $table ->string('img_path')->nullable();
            $table->string('tablet_model');
            $table->string('tablet_user');
            $table->foreign('tablet_user')->references('initial')->on('account_users');
            $table->string('fullName')->nullable();
            $table->foreign('fullName')->references('name')->on('account_users');
            $table->string('department_tablet');
            $table->foreign('department_tablet')->references('dept_list')->on('departments');
            $table->string('tablet_os');
            $table->string('tablet_storage');
            $table->string('tablet_serial');
            $table->string('tablet_asset');
            $table->longText('tablet_cpu');
            $table->enum('tablet_gen',['3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','Pentium','N/A']);
            $table->longText('tablet_address');
            $table->longText('tablet_prdctkey');
            $table->enum('tablet_status',['Deployed','Spare','For Disposal','Already Disposed','Barrow']);
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
        Schema::dropIfExists('tablets');
    }
};
