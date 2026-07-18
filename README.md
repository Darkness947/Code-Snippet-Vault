<div align="center">
  <img src="frontend/public/logo.png" alt="Code Snippet Vault Logo" width="300" />

  <h1>Code Snippet Vault</h1>
  <p>A fast, local, and secure developer utility to store, organize, and retrieve your reusable code snippets.</p>
</div>

<br>

<div align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
</div>

<br>

## 🚀 Overview
**Code Snippet Vault** is a decoupled Single Page Application (SPA) built for developers who need a quick, distraction-free environment to save pieces of code. Run it entirely on your local machine—no cloud syncing, no subscriptions, no bloat.

## ✨ Features
- **Create & Edit:** Quickly save code blocks with syntax highlighting.
- **Auto-Versioning:** Never lose your work. The system automatically saves the last 10 versions of your code when you edit a snippet.
- **Smart Organization:** Group snippets into Collections, apply fluid custom Tags, and mark your most used snippets as Favorites.
- **Instant Export:** One-click copy buttons for raw code or formatted Markdown ready for GitHub/Jira.
- **Dark Mode:** Native Dark/Light mode syncing with your OS preferences.

## 🛠 Tech Stack
- **Backend API:** Laravel 11 (PHP 8.2+)
- **Database:** MySQL 8.0
- **Frontend UI:** React 18, built with Vite
- **Styling:** Bootstrap 5
- **Code Highlighting:** `react-syntax-highlighter`

## 📚 Documentation & Architecture
Extensive project documentation can be found in the root directory:
- `documentation/requirements.md` - Functional and Non-Functional Specs
- `documentation/walkthrough.md` - User Manual
- `documentation/final-documentation.md` - Deep dive into architecture and API design
- `diagrams/` - 15 Mermaid.js diagrams illustrating schemas, workflows, and use cases.

## 🏁 Getting Started

### 1. Database & Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate

# Make sure you have a local MySQL database named `code_snippet_vault`
# and update your .env with your DB credentials

php artisan migrate --seed
php artisan serve
```
The API will be available at `http://localhost:8000/api`.

### 2. Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The UI will be available at `http://localhost:5173`.

---
<div align="center">
  <i>Built as a local learning project.</i>
</div>
