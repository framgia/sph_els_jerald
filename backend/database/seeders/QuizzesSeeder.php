<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\Choice;
use App\Models\Question;
use Illuminate\Database\Seeder;

class QuizzesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $quizzes = Quiz::factory(5)->create();

        foreach ($quizzes as $quiz) {
            $questions = Question::factory(5)->create(['quiz_id' => $quiz->id]);

            foreach ($questions as $question) {
                Choice::factory(1)->create(['question_id' => $question->id, 'is_correct' => true]);
                Choice::factory(3)->create(['question_id' => $question->id, 'is_correct' => false]);
            }
        }
    }
}
