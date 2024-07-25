<?php

namespace App\Http\Requests;

use App\Models\AccountUsers;
use App\Models\Departments;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreServerUPSRequest extends FormRequest
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
        return [
            //
            "S_UName" => ['required', 'max:255', Rule::unique('server_u_p_s', 'S_UName')],
            "img_path" => ['nullable', 'image'],
            "S_UModel" => ['required', 'max:255'],
            "S_UType" => ['required', Rule::in(['SERVER','UPS'])],
            "S_UUser" => ['required', Rule::in($comp_users)],
            "department_S_U" => ['required', Rule::in($departments)],
            "S_UOs" => ['required', 'max:255'],
            "S_UStorage" => ['required', 'max:255'],
            "S_USerial" => ['required', 'max:255'],
            "S_UAsset" => ['required', 'max:255'],
            "S_UCpu" => ['required', 'max:255'],
            "S_UGen" => ['required', Rule::in(['3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','Pentium','N/A'])],
            "S_UAddress" => ['required', 'max:255'],
            "S_UPrdctkey" => ['required', 'max:255'],
            "S_UStatus" => ['required', Rule::in(['Deployed','Spare','For Disposal', 'Already Disposed', 'Barrow'])],
            "S_URemarks" => ['required', 'max:255'],
        ];
    }
}
