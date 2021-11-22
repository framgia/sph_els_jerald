<?php

namespace Database\Factories;

use App\Models\Quiz;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuizLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::where('isAdmin', 0)->inRandomOrder()->first()->id,
            'quiz_id' => Quiz::inRandomOrder()->first()->id,
        ];
    }
}