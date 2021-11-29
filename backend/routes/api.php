<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Quiz\QuizController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Answer\AnswerController;
use App\Http\Controllers\Admin\AdminQuizController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Auth\AuthenticationController;
use App\Http\Controllers\Auth\AdminAuthenticationController;

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
Route::post('admin/signin', [AdminAuthenticationController::class, 'signinAdmin'])->name('admin.signin');

Route::group(['middleware' => ['auth:sanctum']], function () {
    /**
     * User
     */
    Route::resource('quizzes', QuizController::class)->only(['index', 'show']);
    Route::get('quizzes/{quiz}/questions', [QuizController::class, 'getQuestions'])->name('quizzes.questions');
    Route::post('users/signout', [AuthenticationController::class, 'signout'])->name('users.signout');
    Route::resource('answers', AnswerController::class)->only(['store']);
    Route::get('users/profile/{user}', [UserController::class, 'showUserProfile'])->name('users.profile');
    Route::get('users/profile', [UserController::class, 'showSelfProfile'])->name('users.self.profile');
    Route::get('users/dashboard', [UserController::class, 'showSelfDashboard'])->name('users.self.dashboard');
    Route::get('users/learned-words', [UserController::class, 'showLearnedWords'])->name('users.learned-words');
    Route::get('users/learned-lessons', [UserController::class, 'showLearnedLessons'])->name('users.learned-lessons');
    Route::get('users/learned-lessons/{quiz}', [UserController::class, 'showLearnedLessonResult'])->name('users.learned-lessons.result');
    Route::get('users', [UserController::class, 'showUsersList'])->name('users.index');
    Route::post('users/follow/{user}', [UserController::class, 'follow'])->name('users.follow');
    Route::post('users/unfollow/{user}', [UserController::class, 'unfollow'])->name('users.unfollow');
    Route::get('users/details', [UserController::class, 'showSelfDetails'])->name('users.self.details');
    Route::post('users/details/update', [UserController::class, 'updateSelfDetails'])->name('users.self.details.update');

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
    Route::post('admin/signout', [AdminAuthenticationController::class, 'signoutAdmin'])->name('admin.signout');
    Route::get('admin/users', [AdminUserController::class, 'getUsers'])->name('admin.users.index');
});