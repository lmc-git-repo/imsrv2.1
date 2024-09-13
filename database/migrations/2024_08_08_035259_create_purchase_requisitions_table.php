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
        Schema::create('purchase_requisitions', function (Blueprint $table) {
            $table->id('pr_id');
            $table->string('control_num');
            $table->string('po_num')->nullable();
            $table ->string('img_path')->nullable();
            $table->longText('description');
            $table->integer('qty');
            $table->decimal('unit_price', 8, 2);
            $table->decimal('total', 8, 2);
            $table->date('date_required');
            $table->string('department_pr');
            $table->foreign('department_pr')->references('dept_list')->on('departments');
            $table->longText('purpose');
            $table->enum('item_category',['Office Supplies','Consumables','Repair and Maintenance','Capital'])->nullable(); 
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
        Schema::dropIfExists('purchase_requisitions');
    }
};
