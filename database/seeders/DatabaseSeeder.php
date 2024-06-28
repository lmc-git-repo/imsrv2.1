<?php

namespace Database\Seeders;

use App\Models\AccountUsers;
use App\Models\Departments;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Dan',
            'email' => 'dm.caravana092@gmail.com',
            'password' => bcrypt('#@Dan123'),
            'email_verified_at' => time()
        ]);

        // List of departments
        $departments = [
            'Admin', 'HR', 'IT', 'Accounting', 'Purchasing', 'COOP', 'GA', 'GA/Nurse', 
            'Safety', 'Finance', 'Guard House', 'Sales', 'Facilities', 'IMS', 'CMM', 
            'QC', 'Assembly', 'Die Casting', 'Die Mold', 'Die Casting Engineering', 
            'PPC', 'Machining', 'Machine Engineering', 'Deburring', 'New Project', 
            'MRO Warehouse', 'N/A', 'Learning and Development'
        ];

        // Insert each department into the departments table
        foreach ($departments as $dept) {
            Departments::factory()->create([
                'dept_list' => $dept,
                'created_by' => 1, // Assuming user ID 1 exists
                'updated_by' => 1, // Assuming user ID 1 exists
                'created_at' => time(),
                'updated_at' => time()
            ]);
        }

        AccountUsers::factory()
            ->count(30)
            ->create();
    }
}
