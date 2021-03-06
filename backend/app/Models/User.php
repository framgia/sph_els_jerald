<?php

namespace App\Models;

use App\Models\Quiz;
use App\Models\Answer;
use App\Models\Choice;
use App\Models\QuizLog;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Storage;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'firstName',
        'middleName',
        'lastName',
        'email',
        'password',
        'isAdmin',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the quiz logs of the user.
     */
    public function quiz_logs()
    {
        return $this->hasMany(QuizLog::class);
    }

    /**
     * Get the answers of the user.
     */
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public static function getProfileDetails($userId)
    {
        $user_details = self::where('isAdmin', 0)
                            ->where('id', $userId)
                            ->firstOrFail();

        $isFollowed = Follow::where('user_id', auth()->user()->id)
                            ->where('follow_id', $userId)
                            ->first();

        if ($isFollowed) {
            $isFollowed = true;
        } else {
            $isFollowed = false;
        }

        $answers = Answer::where('user_id', $userId)->pluck('choice_id');

        $count_total_learned_words = Choice::whereIn('id', $answers)
                                    ->where('is_correct', 1)
                                    ->count();

        $count_total_learned_lessons = QuizLog::where('user_id', $userId)->count();

        $count_total_followers = Follow::where('follow_id', $userId)->count();

        $count_total_following = Follow::where('user_id', $userId)->count();

        $activities = Activity::latest()->where('user_id', $userId)->get();

        $activities_array = array();

        foreach ($activities as $activity) {
            if ($activity->activable_type === 'App\Models\QuizLog') {
                $data = $activity->activable_type::find($activity->activable_id);

                $user = User::find($data->user_id);

                $quiz = Quiz::find($data->quiz_id);

                $answers = Answer::where('user_id', $data->user_id)
                                ->where('quiz_log_id', $activity->activable_id)
                                ->pluck('choice_id');

                $count_learned_words = Choice::whereIn('id', $answers)
                                            ->where('is_correct', 1)
                                            ->count();

                $count_total_words = Choice::whereIn('id', $answers)
                                            ->count();

                $data['firstName'] = $user->firstName;
                $data['avatar'] = $user->avatar;
                $data['count_learned_words'] = $count_learned_words;
                $data['count_total_words'] = $count_total_words;
                $data['quiz_title'] = $quiz->title;
                $data['type'] = 'QuizLog';
                $data['timestamp'] = $data->created_at->diffForHumans();
            }

            if ($activity->activable_type === 'App\Models\Follow') {
                $data = $activity->activable_type::find($activity->activable_id);

                $userId = self::find($data->user_id);
                $follow_id = self::find($data->follow_id);

                $data['user_firstName'] = $userId->firstName;
                $data['avatar'] = $userId->avatar;
                $data['follow_firstName'] = $follow_id->firstName;
                $data['type'] = 'Follow';
                $data['timestamp'] = $data->created_at->diffForHumans();
            }

            array_push($activities_array, $data);
        }

        return [
            'isFollowed' => $isFollowed,
            'signed_in_user' => auth()->user()->id,
            'user' => $user_details,
            'count_total_learned_words' => $count_total_learned_words,
            'count_total_learned_lessons' => $count_total_learned_lessons,
            'count_total_followers' => $count_total_followers,
            'count_total_following' => $count_total_following,
            'activities' => $activities_array,
        ];
    }

    public static function getDashboardDetails($userId)
    {
        $user_details = self::where('isAdmin', 0)
                            ->where('id', $userId)
                            ->firstOrFail();

        $answers = Answer::where('user_id', $userId)->pluck('choice_id');

        $count_total_learned_words = Choice::whereIn('id', $answers)
                                    ->where('is_correct', 1)
                                    ->count();

        $count_total_learned_lessons = QuizLog::where('user_id', $userId)->count();

        $array_users = array();

        array_push($array_users, $userId);

        $followed_users = Follow::where('user_id', $userId)->pluck('follow_id');

        foreach ($followed_users as $followed_user) {
            array_push($array_users, $followed_user);
        }

        $activities = Activity::latest()->whereIn('user_id', $array_users)->get();

        $activities_array = array();

        foreach ($activities as $activity) {
            if ($activity->activable_type === 'App\Models\QuizLog') {
                $data = $activity->activable_type::find($activity->activable_id);

                $user = User::find($data->user_id);

                $quiz = Quiz::find($data->quiz_id);

                $answers = Answer::where('user_id', $data->user_id)
                                ->where('quiz_log_id', $activity->activable_id)
                                ->pluck('choice_id');

                $count_learned_words = Choice::whereIn('id', $answers)
                                            ->where('is_correct', 1)
                                            ->count();

                $count_total_words = Choice::whereIn('id', $answers)
                                            ->count();

                $data['firstName'] = $user->firstName;
                $data['avatar'] = $user->avatar;
                $data['count_learned_words'] = $count_learned_words;
                $data['count_total_words'] = $count_total_words;
                $data['quiz_title'] = $quiz->title;
                $data['type'] = 'QuizLog';
                $data['timestamp'] = $data->created_at->diffForHumans();

                array_push($activities_array, $data);
            }

            if ($activity->activable_type === 'App\Models\Follow') {
                $data = $activity->activable_type::find($activity->activable_id);

                if ($activity->user_id === $data->user_id) {
                    $userId = self::find($data->user_id);
                    $follow_id = self::find($data->follow_id);

                    $data['user_firstName'] = $userId->firstName;
                    $data['avatar'] = $userId->avatar;
                    $data['follow_firstName'] = $follow_id->firstName;
                    $data['type'] = 'Follow';
                    $data['timestamp'] = $data->created_at->diffForHumans();

                    array_push($activities_array, $data);
                }
            }
        }

        return [
            'user' => $user_details,
            'count_total_learned_words' => $count_total_learned_words,
            'count_total_learned_lessons' => $count_total_learned_lessons,
            'activities' => $activities_array,
        ];
    }

    public static function getLearnedWords($userId)
    {
        $user_details = self::where('isAdmin', 0)
                            ->where('id', $userId)
                            ->firstOrFail();

        $answers = Answer::where('user_id', $userId)->pluck('choice_id');

        $count_total_learned_words = Choice::whereIn('id', $answers)
                                    ->where('is_correct', 1)
                                    ->count();

        $learned_words = Choice::whereIn('id', $answers)->get();

        $learned_words_array = array();

        foreach ($learned_words as $learned_word) {
            if ($learned_word->is_correct) {
                $question = Question::find($learned_word->question_id);
                $quiz = Quiz::find($question->quiz_id);

                $data['word'] = $question->word;
                $data['answer'] = $learned_word->value;
                $data['isCorrect'] = $learned_word->is_correct;
                
                array_push($learned_words_array, $data);
            }
        }
        
        return [
            'user' => $user_details,
            'count_total_learned_words' => $count_total_learned_words,
            'learned_words' => $learned_words_array,
        ];
    }

    public static function getLearnedLessons($userId)
    {
        $user_details = self::where('isAdmin', 0)
                            ->where('id', $userId)
                            ->firstOrFail();

        $count_total_learned_lessons = QuizLog::where('user_id', $userId)->count();

        $learned_lessons = QuizLog::where('user_id', $userId)->get();

        $learned_lessons_array = array();

        foreach ($learned_lessons as $learned_lesson) {
            $data = Quiz::find($learned_lesson->quiz_id);

            array_push($learned_lessons_array, $data);
        }

        return [
            'user' => $user_details,
            'count_total_learned_lessons' => $count_total_learned_lessons,
            'learned_lessons' => $learned_lessons_array,
        ];
    }

    public static function getLearnedLessonResult($userId, $quizId)
    {
        $user_details = self::where('isAdmin', 0)
                            ->where('id', $userId)
                            ->firstOrFail();

        $count_total_learned_lessons = QuizLog::where('user_id', $userId)->count();

        $quiz_log_id = QuizLog::where('user_id', $userId)
                    ->where('quiz_id', $quizId)
                    ->pluck('id');

        $quiz = Quiz::find($quizId);

        $answers = Answer::where('quiz_log_id', $quiz_log_id)->pluck('choice_id');

        $results = Choice::whereIn('id', $answers)->get();

        $correct_answers = $results->where('is_correct', 1)->count();
        $total_answers = $results->count();

        $results_array = array();

        foreach ($results as $result) {
            $question = Question::find($result->question_id);
            $quiz = Quiz::find($question->quiz_id);

            $data['word'] = $question->word;
            $data['answer'] = $result->value;
            $data['isCorrect'] = $result->is_correct;
            
            array_push($results_array, $data);
        }

        return [
            'user' => $user_details,
            'quiz' => $quiz,
            'count_total_learned_lessons' => $count_total_learned_lessons,
            'correct_answers' => $correct_answers,
            'total_answers' => $total_answers,
            'results' => $results_array,
        ];
    }

    public static function getUsersList()
    {
        $users = User::where('isAdmin', 0)
                    ->where('id', '!=', auth()->user()->id)
                    ->get();

        $users_array = array();

        foreach ($users as $user) {
            $auth_user_follow = Follow::where('user_id', auth()->user()->id)
                                    ->where('follow_id', $user->id)
                                    ->first();

            $data['id'] = $user->id;
            $data['firstName'] = $user->firstName;
            $data['middleName'] = $user->middleName;
            $data['lastName'] = $user->lastName;
            $data['avatar'] = $user->avatar;

            if ($auth_user_follow) {
                $data['isFollowed'] = true;
            } else {
                $data['isFollowed'] = false;
            }

            array_push($users_array, $data);
        }

        return $users_array;
    }

    public static function getFollowing($user)
    {
        $following = Follow::where('user_id', $user->id)->get();

        $count_total_followers = Follow::where('follow_id', $user->id)->count();

        $count_total_following = Follow::where('user_id', $user->id)->count();

        $following_array = array();

        foreach ($following as $following) {
            $following_user = User::latest()->find($following->follow_id);

            $data['id'] = $following_user->id;
            $data['firstName'] = $following_user->firstName;
            $data['middleName'] = $following_user->middleName;
            $data['lastName'] = $following_user->lastName;
            $data['avatar'] = $following_user->avatar;

            array_push($following_array, $data);
        }

        return [
            'user' => $user,
            'count_total_followers' => $count_total_followers,
            'count_total_following' => $count_total_following,
            'following' => $following_array,
        ];
    }

    public static function getFollowers($user)
    {
        $followers = Follow::where('follow_id', $user->id)->get();

        $count_total_followers = Follow::where('follow_id', $user->id)->count();

        $count_total_following = Follow::where('user_id', $user->id)->count();

        $follower_array = array();

        foreach ($followers as $follower) {
            $follower_user = User::latest()->find($follower->user_id);

            $data['id'] = $follower_user->id;
            $data['firstName'] = $follower_user->firstName;
            $data['middleName'] = $follower_user->middleName;
            $data['lastName'] = $follower_user->lastName;
            $data['avatar'] = $follower_user->avatar;

            array_push($follower_array, $data);
        }

        return [
            'user' => $user,
            'count_total_followers' => $count_total_followers,
            'count_total_following' => $count_total_following,
            'followers' => $follower_array,
        ];
    }
}