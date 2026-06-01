<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAccountManagementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            
            "equipmentName" => ['required', 'max:255'],
            "managementIp" => ['required', 'max:255'],
            "username" => ['required', 'max:255'],
            "password" => ['required', 'max:255'],
            "localPassword" => ['required', 'max:255'],
        ];
    }
}