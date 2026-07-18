<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Snippet;
use App\Http\Requests\StoreCollectionRequest;
use App\Http\Requests\UpdateCollectionRequest;

class CollectionController extends Controller
{
    public function index()
    {
        return response()->json(Collection::withCount('snippets')->latest('updated_at')->get());
    }

    public function store(StoreCollectionRequest $request)
    {
        $collection = Collection::create($request->validated());
        return response()->json($collection, 201);
    }

    public function show($id)
    {
        $collection = Collection::with(['snippets.language', 'snippets.tags'])->findOrFail($id);
        return response()->json($collection);
    }

    public function update(UpdateCollectionRequest $request, $id)
    {
        $collection = Collection::findOrFail($id);
        $collection->update($request->validated());
        return response()->json($collection);
    }

    public function destroy($id)
    {
        $collection = Collection::findOrFail($id);
        $collection->delete();
        return response()->json(null, 204);
    }

    public function attachSnippet($collectionId, $snippetId)
    {
        $collection = Collection::findOrFail($collectionId);
        $snippet = Snippet::findOrFail($snippetId);
        
        $collection->snippets()->syncWithoutDetaching([$snippet->id]);
        
        return response()->json(['message' => 'Snippet attached successfully']);
    }

    public function detachSnippet($collectionId, $snippetId)
    {
        $collection = Collection::findOrFail($collectionId);
        $snippet = Snippet::findOrFail($snippetId);
        
        $collection->snippets()->detach($snippet->id);
        
        return response()->json(['message' => 'Snippet detached successfully']);
    }
}
