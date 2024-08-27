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
            "initial" => ['required', 'max:255', Rule::exists('account_users', 'initial')],
            "outlookEmail" => ['nullable', 'email', 'unique:account_users,outlookEmail', 'max:255'],
            "status" => ['required', Rule::in(['Employed','Resigned','Terminated'])],
            'profile_path' => 'nullable|image|mimes:jpeg,png,jpg,gif', // Adjust max size as needed
        ];
    }
    /**
     * Customize the validation error messages.
     *
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'initial.exists' => 'The specified initial value is currently in use and cannot be updated or deleted because it is referenced by other records in the database. Please choose a different value or update the related records first.',
            // 'outlookEmail.unique' => 'The email address is already in use.',
            // Add other custom messages if needed
        ];
    }
}
