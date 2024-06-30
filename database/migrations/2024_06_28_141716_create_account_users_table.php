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
        Schema::create('account_users', function (Blueprint $table) {
            $table->id('account_id');
            $table->string('name');
            $table->string('profile_path')->nullable();
            $table->string('department_users');
            $table->foreign('department_users')->references('dept_list')->on('departments');
            $table->string('initial')->unique();
            $table->enum('status', ['Employed','Resigned','Terminated'])->nullable();
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
        Schema::dropIfExists('account_users');
    }
};
