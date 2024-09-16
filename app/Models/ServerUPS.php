<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServerUPS extends Model
{
    use HasFactory;

    protected $primaryKey = 'S_UID';
    protected $fillable = [
        'S_UName', 'img_path', 'S_UModel', 'S_UType', 'S_UUser', 'department_S_U', 'S_UOs', 'S_UStorage', 'S_USerial',
        'S_UAsset', 'asset_class', 'S_UCpu', 'S_UGen', 'S_UAddress', 'S_UPrdctkey', 'S_UStatus', 'S_URemarks', 'datePurchased', 'created_by', 'updated_by'
    ];
    public function createdBy(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy(){
        return $this->belongsTo(User::class, 'updated_by');
    }
}
