<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountManagement extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = ['equipmentName', 'managementIp', 'username', 'password', 'created_by', 'updated_by'];
    public function createdBy(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy(){
        return $this->belongsTo(User::class, 'updated_by');
    }
}
