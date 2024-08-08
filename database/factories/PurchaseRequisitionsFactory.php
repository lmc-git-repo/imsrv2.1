<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PurchaseRequisitions>
 */
class PurchaseRequisitionsFactory extends Factory
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
            'control_num' => fake()->word(),
            'po_num' => fake()->word(),
            'img_path' => fake()->imageUrl(),
            'description' => fake()->word(),
            'qty' => fake()->word(),
            'unit_price' => fake()->word(),
            'total' => fake()->word(),
            'date_required' => fake()->word(),
            'department_pr' => fake()->word(),
            'purpose' => fake()->word(),
            'item_category' => fake()->word(),
            'remarks' => fake()->word(),
            'created_by'=> 1,
            'updated_by'=> 1,
            'created_at'=> time(),
            'updated_at'=> time()
        ];
    }
}
