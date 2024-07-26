<?php

namespace App\Http\Requests;

use App\Models\AccountUsers;
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
        $mntr_users = AccountUsers::pluck('name')->toArray();
        return [
            //
            "compName" => ['required', 'max:255', Rule::unique('monitors', 'compName')],
            "img_path" => ['nullable', 'image'],
            "mntr_users" => ['required', Rule::in($mntr_users)],
            "mntr_department" => ['required', Rule::in($departments)],
            "mntr_model" => ['required', 'max:255'],
            "mntr_serial" => ['required', 'max:255'],
            "remarks" => ['required', 'max:255'],
        ];
    }
}
