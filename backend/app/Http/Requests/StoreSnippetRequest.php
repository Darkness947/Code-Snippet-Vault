<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSnippetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|max:255',
            'code' => 'required|max:50000',
            'language_id' => 'required|exists:languages,id',
            'description' => 'nullable|max:2000',
            'tags' => 'array',
            'tags.*' => 'string|max:100',
        ];
    }
}
