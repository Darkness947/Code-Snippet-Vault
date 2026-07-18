<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SnippetController;
use App\Http\Controllers\SnippetVersionController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\CollectionController;

// Snippets
Route::apiResource('snippets', SnippetController::class);
Route::patch('snippets/{snippet}/favorite', [SnippetController::class, 'toggleFavorite']);
Route::get('snippets/{snippet}/versions', [SnippetVersionController::class, 'index']);
Route::get('snippets/{snippet}/markdown', [SnippetController::class, 'markdown']);

// Search
Route::get('search', [SearchController::class, 'index']);

// Languages & Tags
Route::get('languages', [LanguageController::class, 'index']);
Route::get('tags', [TagController::class, 'index']);

// Collections
Route::apiResource('collections', CollectionController::class);
Route::post('collections/{collection}/snippets/{snippet}', [CollectionController::class, 'attachSnippet']);
Route::delete('collections/{collection}/snippets/{snippet}', [CollectionController::class, 'detachSnippet']);
