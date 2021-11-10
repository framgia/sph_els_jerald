<?php

namespace App\Models;

use App\Models\Question;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Choice extends Model
{
    use HasFactory;

    /**
     * Get the question that owns the choice.
     */
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
