<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account_User>
 */
class AccountUserFactory extends Factory
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
            'name' => fake()->sentence(),
            'department'=> fake()->randomElement(['Admin','HR','IT','Accounting','Purchasing','COOP','GA','GA/Nurse','Safety','Finance','Guard House','Sales','Facilities','IMS','CMM','QC','Assembly','Die Casting','Die Mold','Die Casting Engineering','PPC','Machining','Machine Engineering','Deburring','New Project','MRO Warehouse','N/A','Learning and Development']),
            'initial' => fake()->unique()->sentence(),
            'status' => fake()->randomElement(['Employed','Resigned','Terminated']),
            'created_by'=> 1,
            'updated_by'=> 1
        ];
    }
}
