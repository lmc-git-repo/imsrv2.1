<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class CCTVResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'hikvision_model' => $this->hikvision_model,
            'cctv_name' => $this->cctv_name,
            'ip_address' => $this->ip_address,
            'username' => $this->username,
            'password' => $this->password,
            'installer_supplier' => $this->installer_supplier,
            'createdBy' => [
                'name' => Auth::user()->name
            ],
            'created_at' => (new Carbon($this->created_at))->setTimezone('Asia/Singapore')->format('Y-m-d'),
        ];
    }
}