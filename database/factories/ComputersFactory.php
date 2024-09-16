<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Computers>
 */
class ComputersFactory extends Factory
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
            'comp_name' => fake()->name(),
            'img_path' => fake()->imageUrl(),
            'comp_model' => fake()->word(),
            'comp_type' => fake()->word(),
            'comp_user' => fake()->unique()->lexify('?.????'),
            'fullName' => fake()->name(),
            'department_comp' => fake()->word(),
            'comp_os' => fake()->word(),
            'comp_storage' => fake()->word(),
            'comp_serial' => fake()->word(),
            'comp_asset' => fake()->word(),
            'asset_class' => fake()->word(),
            'comp_cpu' => fake()->word(),
            'comp_gen' => fake()->word(),
            'comp_address' => fake()->word(),
            'comp_prdctkey' => fake()->word(),
            'comp_status' => fake()->word(),
            'datePurchased' => fake()->word(),
            'remarks' => fake()->word(),
            'created_by'=> 1,
            'updated_by'=> 1,
            'created_at'=> time(),
            'updated_at'=> time()
        ];
    }
}
