<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Printers extends Model
{
    use HasFactory;

    protected $primaryKey = 'printer_id';
    protected $fillable = [
        'printer_user', 'img_path', 'printer_department', 'printer_model', 'printer_serial', 'printer_asset', 'remarks', 'created_by', 'updated_by'
    ];
    public function createdBy(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy(){
        return $this->belongsTo(User::class, 'updated_by');
    }
}
