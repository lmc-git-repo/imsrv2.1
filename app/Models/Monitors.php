<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Monitors extends Model
{
    use HasFactory;

    protected $primaryKey = 'monitor_id';
    protected $fillable = [
        'compName', 'img_path', 'mntr_user', 'mntr_department', 'mntr_model', 'mntr_asset', 'asset_class', 'mntr_serial', 'datePurchased', 'remarks', 'created_by', 'updated_by'
    ];
    public function createdBy(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy(){
        return $this->belongsTo(User::class, 'updated_by');
    }
}
