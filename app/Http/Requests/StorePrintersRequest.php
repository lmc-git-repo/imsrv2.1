<?php

namespace App\Http\Requests;

use App\Models\AccountUsers;
use App\Models\Departments;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePrintersRequest extends FormRequest
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
        $printer_user = AccountUsers::pluck('name')->toArray();
        // $compName = Computers::pluck('comp_name')->toArray();

        return [
            //
            "printer_user" => ['required', Rule::in($printer_user)],
            "img_path" => ['nullable', 'image'],
            "printer_department" => ['required', Rule::in($departments)],
            "printer_model" => ['required', 'max:255'],
            "printer_serial" => ['required', 'max:255'],
            "printer_asset" => ['required', 'max:255'],
            "remarks" => ['required', 'max:255'],
        ];
    }
}
