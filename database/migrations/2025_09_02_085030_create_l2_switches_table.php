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
        Schema::create('l2_switches', function (Blueprint $table) {
            $table->id();
            $table->string('device_name');
            $table->string('model')->nullable();
            $table->string('ip_address');
            $table->string('username')->nullable();
            $table->string('password')->nullable();

            // ✅ Correct 'created_by' as foreign key
            $table->foreignId('created_by')->nullable()->constrained('users')->after('password');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('l2_switches');
    }
};