<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class WAP extends Model
{
    use HasFactory;

    protected $fillable = [
        'device_name',
        'model',
        'ip_address',
        'username',
        'password',
        'created_by',
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}