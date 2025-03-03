<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountManagementResource extends JsonResource
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
            'equipmentName' => $this->equipmentName,
            'managementIp' => $this->managementIp,
            'username' => $this->username,
            'password' => $this->password,
            'createdBy' => $this->whenLoaded('createdBy', function () {
                return new UserResource($this->createdBy);
            }),
            'updatedBy' => $this->whenLoaded('updatedBy', function () {
                return new UserResource($this->updatedBy);
            }),
            'created_at'=> (new Carbon($this->created_at))->format('Y-m-d'),
            // 'updated_at'=> (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
