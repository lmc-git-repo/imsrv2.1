<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('account_management', function (Blueprint $table) {
            $table->id();
            $table->string('equipmentName');
            $table->string('managementIp');
            $table->string('username');
            $table->string('password');
            $table->string('localPassword')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('account_management');
    }
};