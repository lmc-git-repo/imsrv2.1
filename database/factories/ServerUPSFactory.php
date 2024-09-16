<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServerUPS>
 */
class ServerUPSFactory extends Factory
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
            'S_UName' => fake()->name(),
            'img_path' => fake()->imageUrl(),
            'S_UModel' => fake()->word(),
            'S_UType' => fake()->word(),
            'S_UUser' => fake()->unique()->lexify('?.????'),
            'department_S_U' => fake()->word(),
            'S_UOs' => fake()->word(),
            'S_UStorage' => fake()->word(),
            'S_USerial' => fake()->word(),
            'S_UAsset' => fake()->word(),
            'asset_class' => fake()->word(),
            'S_UCpu' => fake()->word(),
            'S_UGen' => fake()->word(),
            'S_UAddress' => fake()->word(),
            'S_UPrdctkey' => fake()->word(),
            'S_UStatus' => fake()->word(),
            'datePurchased' => fake()->word(),
            'S_URemarks' => fake()->word(),
            'created_by'=> 1,
            'updated_by'=> 1,
            'created_at'=> time(),
            'updated_at'=> time()
        ];
    }
}
