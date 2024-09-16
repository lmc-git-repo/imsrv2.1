<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tablets extends Model
{
    use HasFactory;
    protected $primaryKey = 'tablet_id';
    protected $fillable = [
        'tablet_name', 'img_path', 'tablet_model', 'tablet_user', 'fullName', 'department_tablet', 'tablet_os', 'tablet_storage', 'tablet_serial',
        'tablet_asset', 'asset_class', 'tablet_cpu', 'tablet_gen', 'tablet_address', 'tablet_prdctkey', 'tablet_status', 'remarks', 'datePurchased', 'created_by', 'updated_by'
    ];
    public function createdBy(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy(){
        return $this->belongsTo(User::class, 'updated_by');
    }
}
