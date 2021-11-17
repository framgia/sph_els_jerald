<?php

namespace App\Models;

use App\Models\Quiz;
use App\Models\Choice;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Question extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the quiz that owns the question.
     */
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    /**
     * Get the choices for the question.
     */
    public function choices()
    {
        return $this->hasMany(Choice::class);
    }
}