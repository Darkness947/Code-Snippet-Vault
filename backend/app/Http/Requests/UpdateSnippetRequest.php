<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSnippetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|max:255',
            'code' => 'sometimes|required|max:50000',
            'language_id' => 'sometimes|required|exists:languages,id',
            'description' => 'nullable|max:2000',
            'tags' => 'array',
            'tags.*' => 'string|max:100',
        ];
    }
}
