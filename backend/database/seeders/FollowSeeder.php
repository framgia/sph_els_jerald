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

        $follow->activity()->create([
            'user_id' => $follow->follow_id,
        ]);

        $follow1 = Follow::create([
            'user_id' => 2,
            'follow_id' => 4,
        ]);

        $follow1->activity()->create([
            'user_id' => $follow1->user_id,
        ]);

        $follow1->activity()->create([
            'user_id' => $follow1->follow_id,
        ]);

        $follow2 = Follow::create([
            'user_id' => 3,
            'follow_id' => 2,
        ]);

        $follow2->activity()->create([
            'user_id' => $follow2->user_id,
        ]);

        $follow2->activity()->create([
            'user_id' => $follow2->follow_id,
        ]);

        $follow3 = Follow::create([
            'user_id' => 3,
            'follow_id' => 4,
        ]);

        $follow3->activity()->create([
            'user_id' => $follow3->user_id,
        ]);

        $follow3->activity()->create([
            'user_id' => $follow3->follow_id,
        ]);
    }
}