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
        Schema::create('monitors', function (Blueprint $table) {
            $table->id('monitor_id');
            $table->string('compName');
            $table->foreign('compName')->references('comp_name')->on('computers');
            $table ->string('img_path')->nullable();
            $table->string('mntr_user');
            $table->foreign('mntr_user')->references('name')->on('account_users');
            $table->string('mntr_department');
            $table->foreign('mntr_department')->references('dept_list')->on('departments');
            $table->string('mntr_model');
            $table->string('mntr_serial');
            $table->string('mntr_asset')->nullable();
            $table->enum('asset_class',['Office Supplies','Consumables','Repair and Maintenance','Capital','N/A'])->nullable();
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
        Schema::dropIfExists('monitors');
    }
};
