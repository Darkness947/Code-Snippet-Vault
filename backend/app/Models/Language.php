<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Language extends Model
{
    use HasFactory;
    
    protected $fillable = ['name'];

    public function snippets()
    {
        // A language has many snippets written in it
        return $this->hasMany(Snippet::class);
    }
}
