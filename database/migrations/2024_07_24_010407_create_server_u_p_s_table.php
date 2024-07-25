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
        Schema::create('server_u_p_s', function (Blueprint $table) {
            $table->id('S_UID')->unique();
            $table->string('S_UName')->unique();
            $table ->string('img_path')->nullable();
            $table->string('S_UModel');
            $table->enum('S_UType',['SERVER','UPS']);   
            $table->string('S_UUser');
            $table->foreign('S_UUser')->references('initial')->on('account_users');
            $table->string('department_S_U');
            $table->foreign('department_S_U')->references('dept_list')->on('departments');
            $table->string('S_UOs');
            $table->string('S_UStorage');
            $table->string('S_USerial');
            $table->string('S_UAsset');
            $table->longText('S_UCpu');
            $table->enum('S_UGen',['3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','Pentium','N/A']);
            $table->longText('S_UAddress');
            $table->longText('S_UPrdctkey');
            $table->enum('S_UStatus',['Deployed','Spare','For Disposal','Already Disposed','Barrow']);
            $table->longText('S_URemarks');
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
        Schema::dropIfExists('server_u_p_s');
    }
};
