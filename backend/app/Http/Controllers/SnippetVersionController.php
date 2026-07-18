<?php

namespace App\Http\Controllers;

use App\Models\Snippet;

class SnippetVersionController extends Controller
{
    public function index($snippetId)
    {
        $snippet = Snippet::findOrFail($snippetId);
        $versions = $snippet->versions()->latest()->get();
        return response()->json($versions);
    }
}
