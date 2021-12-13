<?php

namespace App\Http\Controllers\Quiz;

use App\Models\Quiz;
use App\Models\QuizLog;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $quizzesUnsorted = Quiz::all();
        $quizzes = $quizzesUnsorted->sortBy('id');

        $quizzesArray = array();

        foreach ($quizzes as $quiz) {
            $quizLog = QuizLog::where('user_id', auth()->user()->id)
                            ->where('quiz_id', $quiz->id)
                            ->first();

            if ($quizLog) {
                $quiz['already_taken'] = true;
            } else {
                $quiz['already_taken'] = false;
            }

            array_push($quizzesArray, $quiz);
        }

        return $quizzesArray;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Quiz $quiz)
    {
        $quizLog = QuizLog::where('user_id', auth()->user()->id)
                        ->where('quiz_id', $quiz->id)
                        ->first();
        if ($quizLog) {
            return response()->json(['Message' => 'Forbidden'], 403);
        } else {
            return Quiz::find($quiz->id);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getQuestions(Quiz $quiz)
    {
        $quizLog = QuizLog::where('user_id', auth()->user()->id)
                        ->where('quiz_id', $quiz->id)
                        ->first();
        if ($quizLog) {
            return response()->json(['Message' => 'Forbidden'], 403);
        } else {
            return $quiz->questions()->with('choices')->get();
        }
        
    }
}