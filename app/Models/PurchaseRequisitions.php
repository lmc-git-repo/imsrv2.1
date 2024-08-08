<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseRequisitions extends Model
{
    use HasFactory;
    protected $primaryKey = 'pr_id';
    protected $fillable = [
        'control_num', 'po_num', 'img_path', 'description', 'qty', 'unit_price', 'total', 'date_required', 
        'department_pr', 'purpose', 'item_category', 'remarks', 'created_by', 'updated_by'
    ];
    public function createdBy(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy(){
        return $this->belongsTo(User::class, 'updated_by');
    }
}
