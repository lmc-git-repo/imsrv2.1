<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ComputersResource extends JsonResource
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
            'CID' => $this->CID,
            'comp_name' => $this->comp_name,
            'img_path' => $this->img_path ? Storage::url($this->img_path) : '',
            'comp_model' => $this->comp_model,
            'comp_type' => $this->comp_type,
            'comp_user' => $this->comp_user,
            'fullName' => $this->fullName,
            'department_comp' => $this->department_comp,
            'comp_os' => $this->comp_os,
            'comp_storage' => $this->comp_storage,
            'comp_serial' => $this->comp_serial,
            'comp_asset' => $this->comp_asset,
            'asset_class' => $this->asset_class,
            'comp_cpu' => $this->comp_cpu,
            'comp_gen' => $this->comp_gen,
            'comp_address' => $this->comp_address,
            'comp_prdctkey' => $this->comp_prdctkey,
            'comp_status' => $this->comp_status,
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
