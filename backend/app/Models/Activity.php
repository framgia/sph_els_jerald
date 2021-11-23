<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the parent activable model (follow or quiz log).
     */
    public function activable()
    {
        return $this->morphTo();
    }
}