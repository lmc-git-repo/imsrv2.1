<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Computers extends Model
{
    use HasFactory;

    protected $primaryKey = 'CID';
    protected $fillable = [
        'comp_name', 'img_path', 'comp_model', 'comp_type', 'comp_user', 'department_comp', 'comp_os', 'comp_storage', 'comp_serial',
        'comp_asset', 'comp_cpu', 'comp_gen', 'comp_address', 'comp_prdctkey', 'comp_status', 'remakrs', 'created_by', 'updated_by'
    ];
    public function createdBy(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy(){
        return $this->belongsTo(User::class, 'updated_by');
    }
}
