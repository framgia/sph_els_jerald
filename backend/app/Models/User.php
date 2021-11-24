<?php

namespace App\Models;

use App\Models\Quiz;
use App\Models\Answer;
use App\Models\Choice;
use App\Models\QuizLog;
use Laravel\Sanctum\HasApiTokens;
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
            if ($learned_word->is_correct === 1) {
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
}