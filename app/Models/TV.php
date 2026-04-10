<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class TV extends Model
{
    use HasFactory;

    protected $table = 'tv';
    protected $primaryKey = 'TID';

    protected $fillable = [
        'brand',
        'model',
        'asset_tag',
        'location',
        'serial_number',
        'status',
        'datePurchased',
        'created_by',
        'updated_by'
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}