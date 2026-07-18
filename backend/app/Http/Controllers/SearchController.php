<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = Snippet::with(['language', 'tags', 'collections']);

        if ($request->filled('q')) {
            $searchTerm = $request->q;
            $query->where(function ($q) use ($searchTerm) {
                // FULLTEXT search on title and description
                $q->whereFullText(['title', 'description'], $searchTerm)
                  // Or tag match
                  ->orWhereHas('tags', function ($tq) use ($searchTerm) {
                      $tq->where('name', 'like', '%' . strtolower($searchTerm) . '%');
                  });
            });
        }

        if ($request->filled('language')) {
            $query->where('language_id', $request->language);
        }

        if ($request->filled('favorite')) {
            $query->where('is_favorite', $request->favorite === 'true' || $request->favorite === '1');
        }

        $sort = $request->input('sort', 'created_at');
        $order = $request->input('order', 'desc');

        if (in_array($sort, ['created_at', 'updated_at'])) {
            $query->orderBy($sort, $order === 'asc' ? 'asc' : 'desc');
        } else {
            $query->latest();
        }

        return response()->json($query->paginate(10));
    }
}
