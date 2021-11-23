<?php

namespace Database\Seeders;

use App\Models\Follow;
use Illuminate\Database\Seeder;

class FollowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $follow = Follow::create([
            'user_id' => 2,
            'follow_id' => 3,
        ]);

        $follow->activity()->create([
            'user_id' => $follow->user_id,
        ]);
    }
}