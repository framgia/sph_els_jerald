<?php

namespace App\Models;

use App\Models\Question;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Quiz extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the questions for the quiz.
     */
    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}