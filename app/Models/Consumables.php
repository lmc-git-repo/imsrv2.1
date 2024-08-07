<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consumables extends Model
{
    use HasFactory;
    protected $primaryKey = 'consumables_id';
    protected $fillable = [
        'po_num', 'serial_no', 'img_path', 'si_code', 'brand', 'model', 'storage_capacity', 'qty', 'price', 'total', 'dateIssued', 
        'installedTo', 'department_consumables', 'remarks', 'created_by', 'updated_by'
    ];
    public function createdBy(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy(){
        return $this->belongsTo(User::class, 'updated_by');
    }
}
