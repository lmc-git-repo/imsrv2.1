<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MonitorsResource extends JsonResource
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
            'monitor_id' => $this->monitor_id,
            'compName' => $this->compName,
            'img_path' => $this->img_path ? Storage::url($this->img_path) : '',
            'mntr_user' => $this->mntr_user,
            'mntr_department' => $this->mntr_department,
            'mntr_model' => $this->mntr_model,
            'mntr_serial' => $this->mntr_serial,
            'mntr_asset' => $this->mntr_asset,
            'asset_class' => $this->asset_class,
            'datePurchased' => $this->datePurchased,
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
