<?php

namespace App\Http\Requests;

use App\Models\AccountUsers;
use App\Models\Departments;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreComputersRequest extends FormRequest
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
        $comp_users = AccountUsers::pluck('initial')->toArray();
        $fullName = AccountUsers::pluck('name')->toArray();
        return [
            //
            "comp_name" => ['required', 'max:255', Rule::unique('computers', 'comp_name')],
            "img_path" => ['nullable', 'image'],
            "comp_model" => ['required', 'max:255'],
            "comp_type" => ['required', Rule::in(['Desktop','Laptop'])],
            "comp_user" => ['required', Rule::in($comp_users)],
            "fullName" => ['required', Rule::in($fullName)],
            "department_comp" => ['required', Rule::in($departments)],
            "comp_os" => ['required', 'max:255'],
            "comp_storage" => ['required', 'max:255'],
            "comp_serial" => ['required', 'max:255'],
            "comp_asset" => ['required', 'max:255'],
            "asset_class" => ['required', Rule::in(['Office Supplies','Consumables','Repair and Maintenance','Capital','N/A'])],
            "comp_cpu" => ['required', 'max:255'],
            "comp_gen" => ['required', Rule::in(['3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','Pentium','N/A'])],
            "comp_address" => ['required', 'max:255'],
            "comp_prdctkey" => ['required', 'max:255'],
            "comp_status" => ['required', Rule::in(['Deployed','Spare','For Disposal', 'Already Disposed', 'Borrow'])],
            "datePurchased" => ['nullable', 'max:255'],
            "remarks" => ['required', 'max:255'],
        ];
    }
}
