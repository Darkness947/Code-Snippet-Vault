# Code Snippet Vault - Comprehensive Final Documentation

## 1. Project Overview
The Code Snippet Vault is a decoupled web application comprising a headless **Laravel 11** backend API and a **React 18** Single Page Application (SPA) frontend. It serves as a personal, local repository for software developers to safely store, categorize, and retrieve code snippets.

## 2. Architecture & Tech Stack

### 2.1 Backend (API)
- **Framework:** Laravel 11 (PHP 8.2+)
- **Database:** MySQL 8.0
- **Routing:** API-only routes (`routes/api.php`)
- **Data Validation:** Laravel Form Requests
- **Response Formatting:** RESTful JSON using Eloquent Resources

### 2.2 Frontend (UI)
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Bootstrap 5 (Vanilla CSS, custom ThemeContext)
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Syntax Highlighting:** `react-syntax-highlighter` (Prism / VSCode Dark Plus theme)

---

## 3. Database Schema
The database consists of 7 core tables representing a fully normalized schema:

1. `snippets`: Stores core snippet data (`title`, `description`, `code`, `is_favorite`).
2. `languages`: Lookup table for programming languages (e.g., PHP, JavaScript, Python).
3. `tags`: Lookup table for custom taxonomy.
4. `snippet_tag`: Pivot table establishing a Many-to-Many relationship between Snippets and Tags.
5. `collections`: Groups of snippets (`title`, `description`).
6. `collection_snippet`: Pivot table establishing a Many-to-Many relationship between Collections and Snippets.
7. `snippet_versions`: Audit log table that stores historical string payloads of the `code` column before updates.

---

## 4. API Endpoints

### 4.1 Snippets
- `GET /api/snippets`: Fetch paginated snippets (default 10/page). Supports query parameters `q` (search), `language` (filter), and `favorite` (filter).
- `POST /api/snippets`: Create a new snippet. Accepts `title`, `code`, `language_id`, `description`, and `tags` (array).
- `GET /api/snippets/{id}`: Retrieve a single snippet, eager-loading its tags, language, and associated collections.
- `PUT /api/snippets/{id}`: Update an existing snippet. Triggers the Versioning observer.
- `DELETE /api/snippets/{id}`: Soft/Hard delete a snippet.
- `PATCH /api/snippets/{id}/favorite`: Toggle the boolean `is_favorite` flag.
- `GET /api/snippets/{id}/versions`: Retrieve up to 10 historical code versions.
- `GET /api/snippets/{id}/markdown`: Retrieve a plain-text Markdown formatted string of the snippet.

### 4.2 Collections
- `GET /api/collections`: Fetch all collections with their snippet counts.
- `POST /api/collections`: Create a new collection.
- `GET /api/collections/{id}`: Retrieve a single collection with its attached snippets.
- `POST /api/collections/{id}/snippets/{snippetId}`: Attach a snippet to a collection.
- `DELETE /api/collections/{id}/snippets/{snippetId}`: Detach a snippet from a collection.

### 4.3 Utilities
- `GET /api/languages`: Retrieve the seeded list of supported programming languages.
- `GET /api/tags`: Retrieve all existing tags.

---

## 5. Key System Workflows

### 5.1 Version Control Observer
To protect users against accidental code overwrites, the backend implements Eloquent Observers. When `SnippetController@update` is called:
1. The system detects if the `code` attribute has been modified.
2. If modified, the pre-update `code` string is saved into the `snippet_versions` table.
3. The system checks the total count of versions for this snippet. If it exceeds 10, the oldest record is destroyed to preserve database space.

### 5.2 Dynamic Tagging
When creating or updating a snippet, the user passes a simple array of string tags (e.g., `["react", "ui"]`). The backend `SnippetService` iterates over this array, leveraging Laravel's `firstOrCreate` method to either retrieve existing tag IDs or create new ones on the fly, before using the `sync()` method on the pivot relationship.

### 5.3 Global State & Theming
The frontend utilizes the native React Context API to manage the UI theme. 
- `ThemeContext` reads from the browser's `localStorage` on initial load.
- If no preference is found, it falls back to `window.matchMedia('(prefers-color-scheme: dark)')` to respect the OS level setting.
- Toggling the theme writes a `data-bs-theme` attribute to the root `<html>` node, which Bootstrap 5 natively hooks into for rendering CSS custom properties.

---

## 6. Installation & Deployment Guidelines

### 6.1 Prerequisites
- PHP 8.2+ and Composer
- Node.js 18+ and NPM
- MySQL 8.0+

### 6.2 Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configure DB credentials in .env
php artisan migrate --seed
php artisan serve
```

### 6.3 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 6.4 Security Note
This application is strictly designed for **local use only**. There is no Authentication middleware. Deploying this application to a public server without retrofitting Laravel Sanctum or a similar auth guard will expose all code snippets to the public internet.
