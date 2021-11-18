<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Quiz\QuizController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Admin\AdminQuizController;
use App\Http\Controllers\Auth\AuthenticationController;

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
 * User
 */
Route::resource('users', UserController::class)->only(['store']);
Route::post('users/signin', [AuthenticationController::class, 'signin'])->name('users.signin');

/**
 * Admin
 */
Route::get('admin/quizzes', [AdminQuizController::class, 'getAdminQuizzes'])->name('admin.quizzes.index');
Route::get('admin/quizzes/{quiz}', [AdminQuizController::class, 'showAdminQuiz'])->name('admin.quizzes.show');
Route::post('admin/quizzes', [AdminQuizController::class, 'storeAdminQuiz'])->name('admin.quizzes.store');
Route::delete('admin/quizzes/{quiz}', [AdminQuizController::class, 'deleteAdminQuiz'])->name('admin.quizzes.destroy');
Route::patch('admin/quizzes/{quiz}', [AdminQuizController::class, 'updateAdminQuiz'])->name('admin.quizzes.update');
Route::get('admin/quizzes/{quiz}/questions', [AdminQuizController::class, 'showAdminQuizQuestions'])->name('admin.quizzes.questions.index');
Route::get('admin/quizzes/questions/{question}', [AdminQuizController::class, 'showAdminQuizQuestion'])->name('admin.quizzes.questions.show');
Route::post('admin/quizzes/{quiz}/questions', [AdminQuizController::class, 'storeAdminQuizQuestion'])->name('admin.quizzes.questions.store');
Route::patch('admin/quizzes/questions/{question}', [AdminQuizController::class, 'updateAdminQuizQuestion'])->name('admin.quizzes.questions.update');
Route::delete('admin/quizzes/questions/{question}', [AdminQuizController::class, 'deleteAdminQuizQuestion'])->name('admin.quizzes.questions.destroy');

Route::group(['middleware' => ['auth:sanctum']], function () {
    /**
     * Quizzes
     */
    Route::resource('quizzes', QuizController::class)->only(['index', 'show']);
    Route::get('quizzes/{quiz}/questions', [QuizController::class, 'getQuestions'])->name('quizzes.questions');

    /**
     * User
     */
    Route::post('users/signout', [AuthenticationController::class, 'signout'])->name('users.signout');
});