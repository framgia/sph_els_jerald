<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'firstName' => 'Jerald Joshua',
            'middleName' => 'Corpuz',
            'lastName' => 'Echavia',
            'email' => 'admin@elearning.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'isAdmin' => true,
            'avatar' => '',
            'remember_token' => Str::random(10),
        ]);
    }
}