<?php

namespace App\Http\Requests;

use App\Models\Departments;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePurchaseRequisitionsRequest extends FormRequest
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
        return [
            //
            "control_num" => ['required', 'max:255'],
            "po_num" => ['nullable', 'max:255'],
            "img_path" => ['nullable', 'image'],
            "description" => ['required', 'max:255'],
            "qty" => ['required'],
            "unit_price" => ['required'],
            "total" => ['required'],
            "date_required" => ['required', 'max:255'],
            "department_pr" => ['required', Rule::in($departments)],
            "purpose" => ['required', 'max:255'],
            "item_category" => ['required', Rule::in(['Consumables','Repair and Maintenance'])],
            "remarks" => ['required', 'max:255'],
        ];
    }
}
