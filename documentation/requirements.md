# Code Snippet Vault - Requirements Specification

## 1. Introduction
The **Code Snippet Vault** is a local, single-user developer tool designed to store, manage, and retrieve code snippets efficiently. It serves as a personal repository for developers to organize their reusable code blocks.

## 2. Functional Requirements (FR)

| ID | Feature Area | Description | Priority |
|----|--------------|-------------|----------|
| **FR-1** | **Snippet Management** | | |
| FR-1.1 | Create Snippet | System must allow the user to create a new code snippet with a title, description, code, language, and tags. | High |
| FR-1.2 | View Snippet | System must display the code snippet with syntax highlighting specific to its language. | High |
| FR-1.3 | Edit Snippet | System must allow the user to modify an existing snippet's details and code. | High |
| FR-1.4 | Delete Snippet | System must allow the user to permanently delete a snippet. | High |
| FR-1.5 | Copy Code | System must provide a one-click button to copy the snippet code to the clipboard. | High |
| FR-1.6 | Markdown Export | System must allow the user to copy a formatted Markdown version of the snippet. | Medium |
| **FR-2** | **Categorization & Discovery** | | |
| FR-2.1 | Language Tagging | System must associate every snippet with a specific programming language. | High |
| FR-2.2 | Custom Tags | System must support adding multiple custom tags to a snippet (e.g., `react`, `auth`). | Medium |
| FR-2.3 | Collections | System must allow users to group snippets into named Collections. | Medium |
| FR-2.4 | Favorites | System must allow users to mark snippets as "favorite" for quick access. | High |
| FR-2.5 | Search & Filter | System must allow searching snippets by title/description and filtering by language/favorite status. | High |
| **FR-3** | **Data Integrity** | | |
| FR-3.1 | Version History | System must automatically save the previous state of a snippet when it is edited. | Low |
| FR-3.2 | Version Cap | System must keep a maximum of 10 historical versions per snippet, deleting the oldest when exceeded. | Low |

<br>

## 3. Non-Functional Requirements (NFR)

| ID | Category | Description |
|----|----------|-------------|
| **NFR-1** | **Performance** | The application should render snippet pages and search results in under 500ms on a standard local development machine. |
| **NFR-2** | **Usability** | The interface must support Dark and Light themes, syncing automatically with OS preferences or user toggle. |
| **NFR-3** | **Security** | As a local-only tool, authentication is explicitly **omitted**. CORS must be configured to only allow requests from `localhost`. |
| **NFR-4** | **Reliability** | The API must return appropriate HTTP status codes (200, 201, 404, 422) and standardized JSON error responses for invalid data. |
| **NFR-5** | **Maintainability**| Backend code must follow idiomatic Laravel conventions (Form Requests, API Resources, Eloquent Relationships) to serve as a learning resource. |
| **NFR-6** | **Scalability** | While designed for a single user, the database schema (MySQL) should support up to 100,000 snippets without significant degradation. |
