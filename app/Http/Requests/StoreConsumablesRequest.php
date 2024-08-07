<?php

namespace App\Http\Requests;

use App\Models\AccountUsers;
use App\Models\Departments;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreConsumablesRequest extends FormRequest
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
        $installedTo = AccountUsers::pluck('name')->toArray();

        return [
            //
            "po_num" => ['required', 'max:255'],
            "serial_no" => ['required', 'max:255'],
            "img_path" => ['nullable', 'image'],
            "si_code" => ['required', 'max:255'],
            "brand" => ['required', 'max:255'],
            "model" => ['required', 'max:255'],
            "storage_capacity" => ['required', 'max:255'],
            "qty" => ['required'],
            "price" => ['required'],
            "total" => ['required'],
            "dateIssued" => ['required', 'max:255'],
            "installedTo" => ['required', Rule::in($installedTo)],
            "department_consumables" => ['required', Rule::in($departments)],
            "remarks" => ['required', 'max:255'],
        ];
    }
}
