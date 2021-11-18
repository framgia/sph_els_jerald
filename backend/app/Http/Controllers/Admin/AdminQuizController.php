<?php

namespace App\Http\Controllers\Admin;

use App\Models\Quiz;
use App\Models\Choice;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class AdminQuizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function getAdminQuizzes()
    {
        return Quiz::simplePaginate(5);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
     public function storeAdminQuiz(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
        ]);

        return Quiz::create($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
     public function deleteAdminQuiz(Quiz $quiz)
    {
        $quiz->delete();
        
        return $quiz;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
     public function updateAdminQuiz(Quiz $quiz, Request $request)
    {
        $attributes = $request->validate([
            'title' => 'required',
            'description' => 'required',
        ]);

        $quiz->update($attributes);

        return $quiz;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
     public function showAdminQuiz(Quiz $quiz)
    {
        return Quiz::find($quiz);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
     public function storeAdminQuizQuestion(Request $request, Quiz $quiz)
    {

        $attributes = $request->validate([
            'word' => 'required',
            'choices' => 'required|array|min:4',
            'choices.*.value' => 'required|string',
            'choices.*.is_correct' => 'required|boolean',
        ]);

        $question = Question::create([
            'word' => $attributes['word'],
            'quiz_id' => $quiz->id,
        ]);

        $choices = array();

        foreach ($attributes['choices'] as $choice) {
            $data = Choice::create([
                'question_id' => $question->id, 
                'value' => $choice['value'],
                'is_correct' => $choice['is_correct'],
            ]);

            array_push($choices, $data);
        }

        $response = [
            'question' => $question,
            'choices' => $choices,
        ];

        return response($response, 201);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function showAdminQuizQuestions(Quiz $quiz)
    {
        return Question::where('quiz_id', $quiz->id)->simplePaginate(5);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
     public function deleteAdminQuizQuestion(Question $question)
    {
        $question->delete();
        
        return $question;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function showAdminQuizQuestion(Question $question)
    {
        return $question->load('choices');
    }
}