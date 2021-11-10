<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\Choice;
use App\Models\Question;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        Quiz::factory(5)->create();
        Question::factory(50)->create();
        Choice::factory(200)->create();
    }
}
