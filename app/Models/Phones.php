<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phones extends Model
{
    use HasFactory;
    protected $primaryKey = 'phone_id';
    protected $fillable = [
        'phone_name', 'phone_num', 'img_path', 'phone_model', 'fullName', 'department_phone', 'phone_storage', 'phone_ram', 'phone_serial',
        'phone_asset', 'phone_cpu', 'phone_address', 'phone_imei', 'phone_status', 'remarks', 'created_by', 'updated_by'
    ];
    public function createdBy(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy(){
        return $this->belongsTo(User::class, 'updated_by');
    }
}
