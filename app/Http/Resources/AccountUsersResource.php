<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountUsersResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'account_id' => $this->account_id,
            'name' => $this->name,
            'profile_path' => $this->profile_path,
            'department_users' => $this->department_users,
            'initial' => $this->initial,
            'status' => $this->status,
            'createdBy'=> new UserResource($this->createdBy),
            'updatedBy'=> new UserResource($this->updatedBy),
            'created_at'=> (new Carbon($this->created_at))->format('Y-m-d'),
            // 'updated_at'=> (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
