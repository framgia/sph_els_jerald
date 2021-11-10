<?php

namespace Database\Factories;

use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'question_id' => Question::inRandomOrder()->first()->id,
            'value' => $this->faker->word(),
            'is_correct' => $this->faker->boolean(),
        ];
    }
}
