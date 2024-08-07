<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Consumables>
 */
class ConsumablesFactory extends Factory
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
            'po_num' => fake()->word(),
            'serial_no' => fake()->word(),
            'img_path' => fake()->imageUrl(),
            'si_code' => fake()->word(),
            'brand' => fake()->word(),
            'model' => fake()->word(),
            'storage_capacity' => fake()->word(),
            'qty' => fake()->word(),
            'price' => fake()->word(),
            'total' => fake()->word(),
            'dateIssued' => fake()->word(),
            'installedTo' => fake()->name(),
            'department_consumables' => fake()->word(),
            'remarks' => fake()->word(),
            'created_by'=> 1,
            'updated_by'=> 1,
            'created_at'=> time(),
            'updated_at'=> time()
        ];
    }
}
