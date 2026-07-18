<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Snippet extends Model
{
    use HasFactory;
    
    protected $fillable = ['language_id', 'title', 'description', 'code', 'is_favorite'];

    protected $casts = [
        'is_favorite' => 'boolean',
    ];

    public function language()
    {
        // A snippet belongs to one specific language
        return $this->belongsTo(Language::class);
    }

    public function tags()
    {
        // A snippet can have multiple tags, and a tag can belong to multiple snippets.
        // Laravel automatically assumes the pivot table is 'snippet_tag' (alphabetical order of models).
        return $this->belongsToMany(Tag::class);
    }

    public function collections()
    {
        // A snippet can belong to multiple collections.
        // Laravel automatically assumes the pivot table is 'collection_snippet'.
        return $this->belongsToMany(Collection::class);
    }

    public function versions()
    {
        // A snippet has many versions over time
        return $this->hasMany(SnippetVersion::class);
    }
}
