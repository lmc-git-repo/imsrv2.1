<?php

namespace App\Http\Requests;

use App\Models\AccountUsers;
use App\Models\Departments;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePhonesRequest extends FormRequest
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
        $fullName = AccountUsers::pluck('name')->toArray();

        return [
            //
            "phone_name" => ['required', 'max:255', Rule::unique('phones', 'phone_name')],
            "phone_num" => ['required', 'max:255'],
            "img_path" => ['nullable', 'image'],
            "phone_model" => ['required', 'max:255'],
            "fullName" => ['required', Rule::in($fullName)],
            "department_phone" => ['required', Rule::in($departments)],
            "phone_storage" => ['required', 'max:255'],
            "phone_ram" => ['required', 'max:255'],
            "phone_serial" => ['required', 'max:255'],
            "phone_asset" => ['required', 'max:255'],
            "asset_class" => ['required', Rule::in(['Office Supplies','Consumables','Repair and Maintenance','Capital','N/A'])],
            "phone_cpu" => ['required', 'max:255'],
            "phone_address" => ['required', 'max:255'],
            "phone_imei" => ['required', 'max:255'],
            "phone_status" => ['required', Rule::in(['Deployed','Spare','For Disposal', 'Already Disposed', 'Borrow'])],
            "remarks" => ['required', 'max:255'],
        ];
    }
}
