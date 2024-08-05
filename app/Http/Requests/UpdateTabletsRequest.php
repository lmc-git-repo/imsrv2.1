<?php

namespace App\Http\Requests;

use App\Models\AccountUsers;
use App\Models\Departments;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTabletsRequest extends FormRequest
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
        $tablet_users = AccountUsers::pluck('initial')->toArray();
        $fullName = AccountUsers::pluck('name')->toArray();
        return [
            //
            "tablet_name" => ['required', 'max:255'],
            "img_path" => ['nullable', 'image'],
            "tablet_model" => ['required', 'max:255'],
            "tablet_user" => ['required', Rule::in($tablet_users)],
            "fullName" => ['required', Rule::in($fullName)],
            "department_tablet" => ['required', Rule::in($departments)],
            "tablet_os" => ['required', 'max:255'],
            "tablet_storage" => ['required', 'max:255'],
            "tablet_serial" => ['required', 'max:255'],
            "tablet_asset" => ['required', 'max:255'],
            "tablet_cpu" => ['required', 'max:255'],
            "tablet_gen" => ['required', Rule::in(['3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','Pentium','N/A'])],
            "tablet_address" => ['required', 'max:255'],
            "tablet_prdctkey" => ['required', 'max:255'],
            "tablet_status" => ['required', Rule::in(['Deployed','Spare','For Disposal', 'Already Disposed', 'Barrow'])],
            "remarks" => ['required', 'max:255'],
        ];
    }
}
