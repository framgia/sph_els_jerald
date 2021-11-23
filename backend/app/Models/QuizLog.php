<?php

namespace App\Models;

use App\Models\Quiz;
use App\Models\User;
use App\Models\Activity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class QuizLog extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the quiz that owns the question.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the quiz log's activity.
     */
    public function activity()
    {
        return $this->morphOne(Activity::class, 'activable');
    }

    /**
     * Get the quiz for the quiz log.
     */
    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }
}