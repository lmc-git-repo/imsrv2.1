<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class L2SwitchResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'device_name' => $this->device_name,
            'model' => $this->model,
            'ip_address' => $this->ip_address,
            'username' => $this->username,
            'password' => $this->password,
            'serial_number' => $this->serial_number,
            'switch_connected' => $this->switch_connected, // ✅ NEW
            'port_number' => $this->port_number,             // ✅ NEW
            'createdBy' => $this->whenLoaded('createdBy', function () {
                return [
                    'id' => $this->createdBy->id,
                    'name' => $this->createdBy->name,
                    'email' => $this->createdBy->email,
                    'role' => $this->createdBy->role,
                ];
            }),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
        ];
    }
}