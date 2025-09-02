<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FirewallResource extends JsonResource
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
            'firewall_id' => $this->id,
            'device_name' => $this->device_name,
            'model' => $this->model,
            'ip_address' => $this->ip_address,
            'username' => $this->username,
            'password' => $this->password,
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