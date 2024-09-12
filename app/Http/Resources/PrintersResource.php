<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PrintersResource extends JsonResource
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
            'printer_id' => $this->printer_id,
            'printer_user' => $this->printer_user,
            'img_path' => $this->img_path ? Storage::url($this->img_path) : '',
            'printer_department' => $this->printer_department,
            'printer_model' => $this->printer_model,
            'printer_serial' => $this->printer_serial,
            'printer_asset' => $this->printer_asset,
            'asset_class' => $this->asset_class,
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
