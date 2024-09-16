<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Monitors>
 */
class MonitorsFactory extends Factory
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
            'compName' => fake()->name(),
            'img_path' => fake()->imageUrl(),
            'mntr_user' => fake()->unique()->name(),
            'mntr_department' => fake()->word(),
            'mntr_model' => fake()->word(),
            'mntr_asset' => fake()->word(),
            'asset_class' => fake()->word(),
            'mntr_serial' => fake()->word(),
            'datePurchased' => fake()->word(),
            'remarks' => fake()->word(),
            'created_by'=> 1,
            'updated_by'=> 1,
            'created_at'=> time(),
            'updated_at'=> time()
        ];
    }
}
