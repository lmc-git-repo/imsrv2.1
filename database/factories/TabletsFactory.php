<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tablets>
 */
class TabletsFactory extends Factory
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
            'tablet_name' => fake()->name(),
            'img_path' => fake()->imageUrl(),
            'tablet_model' => fake()->word(),
            'tablet_user' => fake()->unique()->lexify('?.????'),
            'fullName' => fake()->name(),
            'department_tablet' => fake()->word(),
            'tablet_os' => fake()->word(),
            'tablet_storage' => fake()->word(),
            'tablet_serial' => fake()->word(),
            'tablet_asset' => fake()->word(),
            'asset_class' => fake()->word(),
            'tablet_cpu' => fake()->word(),
            'tablet_gen' => fake()->word(),
            'tablet_address' => fake()->word(),
            'tablet_prdctkey' => fake()->word(),
            'tablet_status' => fake()->word(),
            'datePurchased' => fake()->word(),
            'remarks' => fake()->word(),
            'created_by'=> 1,
            'updated_by'=> 1,
            'created_at'=> time(),
            'updated_at'=> time()
        ];
    }
}
