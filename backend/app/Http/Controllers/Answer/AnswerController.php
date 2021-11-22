<?php

namespace App\Http\Controllers\Answer;

use App\Models\Answer;
use App\Models\QuizLog;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $quizLog = QuizLog::create([
            'user_id' => auth()->user()->id,
            'quiz_id' => $request->quiz_id,
        ]);

        $answers = array();

        foreach ($request->answers as $answer) {
            $answer = Answer::create([
                'user_id' => auth()->user()->id,
                'quiz_log_id' => $quizLog->id,
                'choice_id' => $answer['choice_id'],
            ]);

            array_push($answers, $answer);
        }

        $response = [
            'quiz_log' => $quizLog,
            'answers' => $answers,
        ];

        return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
}