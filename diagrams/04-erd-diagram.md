```mermaid
erDiagram
    SNIPPETS ||--o{ SNIPPET_VERSIONS : tracks
    SNIPPETS ||--|{ LANGUAGES : uses
    SNIPPETS }o--o{ TAGS : categorized_by
    COLLECTIONS }o--o{ SNIPPETS : contains

    SNIPPETS {
        bigint id PK
        string title
        text description
        longtext code
        boolean is_favorite
        bigint language_id FK
        timestamp created_at
        timestamp updated_at
    }

    LANGUAGES {
        bigint id PK
        string name
        string extension
    }

    TAGS {
        bigint id PK
        string name
    }

    COLLECTIONS {
        bigint id PK
        string title
        text description
    }

    SNIPPET_VERSIONS {
        bigint id PK
        bigint snippet_id FK
        longtext code
        timestamp created_at
    }
```
