<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AccountUsersResource extends JsonResource
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
            'account_id' => $this->account_id,
            'name' => $this->name,
            'profile_path' => $this->profile_path ? Storage::url($this->profile_path) : '',
            'department_users' => $this->department_users,
            'initial' => $this->initial,
            'outlookEmail' => $this->outlookEmail,
            'status' => $this->status,
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
