<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FollowFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::where('isAdmin', 0)->first(),
            'follow_id' => User::where('isAdmin', 0)->first(),
        ];
    }
}