<?php

namespace Database\Seeders;

use App\Models\Answer;
use App\Models\Choice;
use App\Models\QuizLog;
use App\Models\Question;
use Illuminate\Database\Seeder;

class QuizLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $quizLogs = QuizLog::factory(10)->create();

        foreach ($quizLogs as $quizLog) {
            $questions = Question::where('quiz_id', $quizLog->quiz_id)->get();

            foreach ($questions as $question) {
                $choice = Choice::where('question_id', $question->id)->inRandomOrder()->first()->id;

                Answer::create([
                    'user_id' => $quizLog->user_id,
                    'quiz_log_id' => $quizLog->id,
                    'choice_id' => $choice,
                ]);
            }
        }
    }
}