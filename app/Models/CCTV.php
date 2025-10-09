<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CCTV extends Model
{
    use HasFactory;

    protected $table = 'c_c_t_v_s';

    protected $fillable = [
    'hikvision_model',
    'cctv_name',
    'ip_address',
    'username',
    'password',
    'installer_supplier',
    'switch_connected',
    'port_number',
    'created_by',
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}