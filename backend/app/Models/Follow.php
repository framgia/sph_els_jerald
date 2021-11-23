<?php

namespace App\Models;

use App\Models\Activity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Follow extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the follow's activity.
     */
    public function activity()
    {
        return $this->morphOne(Activity::class, 'activable');
    }
}