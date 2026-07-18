<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use App\Models\SnippetVersion;
use App\Models\Tag;
use App\Http\Requests\StoreSnippetRequest;
use App\Http\Requests\UpdateSnippetRequest;
use Illuminate\Http\Request;

class SnippetController extends Controller
{
    public function index()
    {
        return Snippet::with(['language', 'tags', 'collections'])->latest('updated_at')->paginate(10);
    }

    public function store(StoreSnippetRequest $request)
    {
        $validated = $request->validated();
        
        $snippet = Snippet::create($validated);

        if (isset($validated['tags'])) {
            $this->syncTags($snippet, $validated['tags']);
        }

        // Save initial version
        SnippetVersion::create([
            'snippet_id' => $snippet->id,
            'code' => $snippet->code,
        ]);

        return response()->json($snippet->load(['language', 'tags', 'collections']), 201);
    }

    public function show($id)
    {
        $snippet = Snippet::with(['language', 'tags', 'collections'])->findOrFail($id);
        return response()->json($snippet);
    }

    public function update(UpdateSnippetRequest $request, $id)
    {
        $snippet = Snippet::findOrFail($id);
        $validated = $request->validated();

        $codeChanged = isset($validated['code']) && $validated['code'] !== $snippet->code;

        if ($codeChanged) {
            // Version cap logic: if >= 20, delete oldest
            $versionsCount = $snippet->versions()->count();
            if ($versionsCount >= 20) {
                // Delete oldest
                $oldest = $snippet->versions()->oldest()->first();
                if ($oldest) {
                    $oldest->delete();
                }
            }

            // Save the new code as a version
            SnippetVersion::create([
                'snippet_id' => $snippet->id,
                'code' => $validated['code'],
            ]);
        }

        $snippet->update($validated);

        if (isset($validated['tags'])) {
            $this->syncTags($snippet, $validated['tags']);
        }

        return response()->json($snippet->load(['language', 'tags', 'collections']));
    }

    public function destroy($id)
    {
        $snippet = Snippet::findOrFail($id);
        $snippet->delete();
        return response()->json(null, 204);
    }

    public function toggleFavorite($id)
    {
        $snippet = Snippet::findOrFail($id);
        $snippet->update(['is_favorite' => !$snippet->is_favorite]);

        return response()->json($snippet);
    }

    public function markdown($id)
    {
        $snippet = Snippet::with('language')->findOrFail($id);
        
        $languageName = $snippet->language ? strtolower($snippet->language->name) : '';
        
        $markdown = "# {$snippet->title}\n\n";
        if ($snippet->description) {
            $markdown .= "{$snippet->description}\n\n";
        }
        $markdown .= "```{$languageName}\n";
        $markdown .= "{$snippet->code}\n";
        $markdown .= "```\n";

        return response($markdown, 200)->header('Content-Type', 'text/markdown');
    }

    private function syncTags(Snippet $snippet, array $tagNames)
    {
        $tagIds = [];
        foreach ($tagNames as $tagName) {
            $normalizedName = strtolower(trim($tagName));
            if (!empty($normalizedName)) {
                $tag = Tag::firstOrCreate(['name' => $normalizedName]);
                $tagIds[] = $tag->id;
            }
        }
        $snippet->tags()->sync($tagIds);
    }
}
