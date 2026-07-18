<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SnippetVersion extends Model
{
    use HasFactory;
    
    protected $fillable = ['snippet_id', 'code'];

    public function snippet()
    {
        // A version belongs to exactly one snippet
        return $this->belongsTo(Snippet::class);
    }
}
