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
        Schema::create('account__users', function (Blueprint $table) {
            $table->id('account_id');
            $table->string('name');
            $table->string('department');
            $table->foreign('department')->references('dept_list')->on('departments');
            $table->string('initial')->unique();
            $table->enum('status', ['Employed','Resigned','Terminated'])->unique();
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
        Schema::dropIfExists('account__users');
    }
};
