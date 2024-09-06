<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TabletsResource extends JsonResource
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
            'tablet_id' => $this->tablet_id,
            'tablet_name' => $this->tablet_name,
            'img_path' => $this->img_path ? Storage::url($this->img_path) : '',
            'tablet_model' => $this->tablet_model,
            'tablet_user' => $this->tablet_user,
            'fullName' => $this->fullName,
            'department_tablet' => $this->department_tablet,
            'tablet_os' => $this->tablet_os,
            'tablet_storage' => $this->tablet_storage,
            'tablet_serial' => $this->tablet_serial,
            'tablet_asset' => $this->tablet_asset,
            'tablet_cpu' => $this->tablet_cpu,
            'tablet_gen' => $this->tablet_gen,
            'tablet_address' => $this->tablet_address,
            'tablet_prdctkey' => $this->tablet_prdctkey,
            'tablet_status' => $this->tablet_status,
            'remarks' => $this->remarks,
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
