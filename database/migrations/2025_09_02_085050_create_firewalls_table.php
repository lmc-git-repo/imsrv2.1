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
    Schema::create('firewalls', function (Blueprint $table) {
        $table->id();
        $table->string('device_name');
        $table->string('model')->nullable();
        $table->string('ip_address');
        $table->string('username')->nullable();
        $table->string('password')->nullable();
        $table->string('created_by')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('firewalls');
    }
};