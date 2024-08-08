<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PurchaseRequisitionsResource extends JsonResource
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
            'pr_id' => $this->pr_id,
            'control_num' => $this->control_num,
            'po_num' => $this->po_num,
            'img_path' => $this->img_path ? Storage::url($this->img_path) : '',
            'description' => $this->description,
            'qty' => $this->qty,
            'unit_price' => $this->unit_price,
            'total' => $this->total,
            'date_required' => $this->date_required,
            'department_pr' => $this->department_pr,
            'purpose' => $this->purpose,
            'item_category' => $this->item_category,
            'remarks' => $this->remarks,
            'createdBy'=> new UserResource($this->createdBy),
            'updatedBy'=> new UserResource($this->updatedBy),
            'created_at'=> (new Carbon($this->created_at))->format('Y-m-d'),
            // 'updated_at'=> (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
