<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ServerUPSResource extends JsonResource
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
            'S_UID' => $this->S_UID,
            'S_UName' => $this->S_UName,
            'img_path' => $this->img_path ? Storage::url($this->img_path) : '',
            'S_UModel' => $this->S_UModel,
            'S_UType' => $this->S_UType,
            'S_UUser' => $this->S_UUser,
            'department_S_U' => $this->department_S_U,
            'S_UOs' => $this->S_UOs,
            'S_UStorage' => $this->S_UStorage,
            'S_USerial' => $this->S_USerial,
            'S_UAsset' => $this->S_UAsset,
            'asset_class' => $this->asset_class,
            'S_UCpu' => $this->S_UCpu,
            'S_UGen' => $this->S_UGen,
            'S_UAddress' => $this->S_UAddress,
            'S_UPrdctkey' => $this->S_UPrdctkey,
            'S_UStatus' => $this->S_UStatus,
            'S_URemarks' => $this->S_URemarks,
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
