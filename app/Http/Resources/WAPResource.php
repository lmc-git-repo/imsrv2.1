<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WAPResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'device_name' => $this->device_name,
            'model' => $this->model,
            'ip_address' => $this->ip_address,
            'username' => $this->username,
            'password' => $this->password,
            'serial_number' => $this->serial_number,
            'switch_connected' => $this->switch_connected,
            'port_number' => $this->port_number,
            'created_by' => $this->createdBy?->name ?? 'N/A',
            'created_at' => $this->created_at?->format('Y-m-d'),
            'updated_at' => $this->updated_at,
        ];
    }
}
