<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PhonesResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'phone_id' => $this->phone_id,
            'phone_name' => $this->phone_name,
            'phone_num' => $this->phone_num,
            'img_path' => $this->img_path ? Storage::url($this->img_path) : '',
            'phone_model' => $this->phone_model,
            'fullName' => $this->fullName,
            'department_phone' => $this->department_phone,
            'phone_storage' => $this->phone_storage,
            'phone_ram' => $this->phone_ram,
            'phone_serial' => $this->phone_serial,
            'phone_asset' => $this->phone_asset,
            'phone_cpu' => $this->phone_cpu,
            'phone_address' => $this->phone_address,
            'phone_imei' => $this->phone_imei,
            'phone_status' => $this->phone_status,
            'remarks' => $this->remarks,
            'createdBy'=> new UserResource($this->createdBy),
            'updatedBy'=> new UserResource($this->updatedBy),
            'created_at'=> (new Carbon($this->created_at))->format('Y-m-d'),
            // 'updated_at'=> (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
