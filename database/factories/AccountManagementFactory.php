<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AccountManagement>
 */
class AccountManagementFactory extends Factory
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
            'equipmentName' => fake()->name(),
            'managementIp' => fake()->word(),
            'username' => fake()->word(),
            'password' => fake()->name(),
            // 'created_at'=> time(),
            // 'updated_at'=> time()
        ];
    }
}
