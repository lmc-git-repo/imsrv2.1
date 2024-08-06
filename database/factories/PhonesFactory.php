<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Phones>
 */
class PhonesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'phone_name' => fake()->name(),
            'phone_num' => fake()->word(),
            'img_path' => fake()->imageUrl(),
            'phone_model' => fake()->word(),
            'fullName' => fake()->name(),
            'department_phone' => fake()->word(),
            'phone_storage' => fake()->word(),
            'phone_ram' => fake()->word(),
            'phone_serial' => fake()->word(),
            'phone_asset' => fake()->word(),
            'phone_cpu' => fake()->word(),
            'phone_address' => fake()->word(),
            'phone_imei' => fake()->word(),
            'phone_status' => fake()->word(),
            'remarks' => fake()->word(),
            'created_by'=> 1,
            'updated_by'=> 1,
            'created_at'=> time(),
            'updated_at'=> time()
        ];
    }
}
