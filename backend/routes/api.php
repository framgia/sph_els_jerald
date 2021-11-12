<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Quiz\QuizController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

/**
 * Quizzes
 */
Route::resource('quizzes', QuizController::class)->only(['index', 'show', 'store']);
Route::get('quizzes/{quiz}/questions', [QuizController::class, 'getQuestions'])->name('quizzes.questions');
Route::get('admin/quizzes', [QuizController::class, 'getAdminQuizzes'])->name('admin.quizzes');