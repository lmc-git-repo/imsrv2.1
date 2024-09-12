<?php

namespace App\Http\Requests;

use App\Models\AccountUsers;
use App\Models\Computers;
use App\Models\Departments;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMonitorsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $departments = Departments::pluck('dept_list')->toArray();
        $mntr_user = AccountUsers::pluck('name')->toArray();
        $compName = Computers::pluck('comp_name')->toArray();

        return [
            //
            "compName" => ['required', Rule::in($compName)],
            "img_path" => ['nullable', 'image'],
            "mntr_user" => ['required', Rule::in($mntr_user)],
            "mntr_department" => ['required', Rule::in($departments)],
            "mntr_model" => ['required', 'max:255'],
            "mntr_asset" => ['required', 'max:255'],
            "asset_class" => ['required', Rule::in(['Office Supplies','Consumables','Repair and Maintenance','Capital','N/A'])],
            "mntr_serial" => ['required', 'max:255'],
            "remarks" => ['required', 'max:255'],
        ];
    }
}
