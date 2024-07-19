<?php

namespace App\Http\Requests;

use App\Models\Departments;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAccountUsersRequest extends FormRequest
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
            "name" => ['required', 'max:255'],
            "department_users" => ['required', Rule::in($departments)],
            "initial" => ['required', 'max:255'],
            "status" => ['required', Rule::in(['Employed','Resigned','Terminated'])],
            // "profile_path" => ['nullable', 'image'],
            'profile_path' => 'nullable|image|mimes:jpeg,png,jpg,gif', // Adjust max size as needed
        ];
    }
}
