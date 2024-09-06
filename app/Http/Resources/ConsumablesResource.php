<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ConsumablesResource extends JsonResource
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
            'consumables_id' => $this->consumables_id,
            'po_num' => $this->po_num,
            'serial_no' => $this->serial_no,
            'img_path' => $this->img_path ? Storage::url($this->img_path) : '',
            'si_code' => $this->si_code,
            'brand' => $this->brand,
            'model' => $this->model,
            'storage_capacity' => $this->storage_capacity,
            'qty' => $this->qty,
            'price' => $this->price,
            'total' => $this->total,
            'dateIssued' => $this->dateIssued,
            'installedTo' => $this->installedTo,
            'deliveryRecieptDate' => $this->deliveryRecieptDate,
            'department_consumables' => $this->department_consumables,
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
