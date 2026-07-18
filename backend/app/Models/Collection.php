<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Collection extends Model
{
    use HasFactory;
    
    protected $fillable = ['title', 'description'];

    public function snippets()
    {
        // A collection can contain multiple snippets
        return $this->belongsToMany(Snippet::class);
    }
}
