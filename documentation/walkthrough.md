# Code Snippet Vault - Walkthrough

Welcome to the Code Snippet Vault! This walkthrough will guide you through the features of your new personal developer utility.

## 1. The Dashboard
When you launch the application at `http://localhost:5173`, you are greeted by the **Dashboard**.
- **Metrics**: At a glance, you can see your total number of snippets, collections, and favorites.
- **Recent Activity**: The dashboard surfaces your most recently created or updated snippets so you can pick up exactly where you left off.

## 2. Managing Snippets
Navigate to the **Snippets** tab to view your complete vault.

### Creating a Snippet
1. Click the **Create Snippet** button.
2. Fill out the form. You must provide a **Title**, select a **Language**, and input the **Code**.
3. Optionally, add a description and comma-separated **Tags**.
4. Hit **Save Snippet**.

### Syntax Highlighting & Quick Actions
When viewing a snippet, the vault automatically applies a dark-themed syntax highlighter based on the chosen programming language.
- Click the **Copy Code** button on the top right of the code block to instantly send it to your clipboard.
- Click **Copy MD** to export the snippet (along with its title and language tag) as a ready-to-paste Markdown block.
- Click the **Star** icon next to the title to toggle its Favorite status.

## 3. Organizing Your Vault

### Using Tags
Tags are fluid. You can assign as many as you want (e.g., `frontend`, `auth`, `aws`) to quickly categorize snippets. They appear as badges on the snippet cards.

### Using Collections
For a more rigid structure, use **Collections**.
1. Navigate to the **Collections** tab.
2. Click **New Collection** and give it a name (e.g., "React Hooks Setup").
3. Click into the collection, and use the dropdown to attach existing snippets to this group.

## 4. Searching and Filtering
As your vault grows, finding code becomes critical. The Snippets page features a powerful filter bar:
- **Text Search**: Type keywords to search across titles, descriptions, and tags.
- **Language Dropdown**: Isolate your view to only PHP, JavaScript, or any other language.
- **Favorites**: Toggle the view to only show your starred items.

## 5. Version History
Mistakes happen. If you edit a snippet and accidentally remove a crucial line of code, the vault has your back.
1. Go to the **Snippet Details** page.
2. Scroll to the bottom to find the **Version History** accordion.
3. Expand any previous version to view or copy the code as it existed before your edit.
*(Note: To save space, the system only keeps the 10 most recent edits per snippet).*

## 6. Personalization
Toggle between **Light Mode** and **Dark Mode** using the Sun/Moon icon in the navigation bar. Your preference is saved to your local browser storage and will persist across sessions.
