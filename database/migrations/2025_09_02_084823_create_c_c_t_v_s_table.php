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
   Schema::create('c_c_t_v_s', function (Blueprint $table) {
       $table->id();
       $table->string('hikvision_model');
       $table->string('cctv_name');
       $table->string('ip_address');
       $table->string('username')->nullable();
       $table->string('password')->nullable();
       $table->string('installer_supplier')->nullable();
       $table->unsignedBigInteger('created_by')->nullable();
       $table->unsignedBigInteger('updated_by')->nullable();
       $table->timestamps();

       $table->foreign('created_by')->references('id')->on('users');
       $table->foreign('updated_by')->references('id')->on('users');
   });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cctvs');
    }
};