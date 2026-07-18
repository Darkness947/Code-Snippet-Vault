```mermaid
flowchart TD
    App[App Component] --> Router[React Router]
    App --> ThemeProvider[Theme Context Provider]
    
    Router --> MainLayout[Main Layout]
    MainLayout --> Navbar[Navbar]
    MainLayout --> Toast[Toast Container]
    MainLayout --> Pages[Page Components]
    
    Pages --> Home[Home Page]
    Pages --> SnippetsList[Snippets List]
    Pages --> CreateSnippet[Create Snippet]
    Pages --> SnippetDetails[Snippet Details]
    Pages --> Collections[Collections]
    Pages --> CollectionDetails[Collection Details]
    
    SnippetsList --> SnippetCard[Snippet Card]
    Home --> SnippetCard
    CollectionDetails --> SnippetCard
    
    SnippetCard --> FavoriteBtn[Favorite Button]
    SnippetCard --> CopyBtn[Copy Button]
    
    CreateSnippet --> SnippetForm[Snippet Form]
```
