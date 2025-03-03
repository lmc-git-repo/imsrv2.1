<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountUsers extends Model
{
    use HasFactory;

    protected $primaryKey = 'account_id';
    protected $fillable = ['name', 'department_users', 'initial', 'outlookEmail', 'password', 'status', 'profile_path', 'created_by', 'updated_by'];
    public function createdBy(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy(){
        return $this->belongsTo(User::class, 'updated_by');
    }
}
