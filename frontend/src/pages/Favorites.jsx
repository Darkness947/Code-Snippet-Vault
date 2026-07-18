import React, { useState, useEffect } from 'react';
import { snippetService } from '../services/snippetService';
import SnippetCard from '../components/SnippetCard';

const Favorites = () => {
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                // Fetch up to 100 favorites for simplicity
                const data = await snippetService.search({ favorite: 1, page: 1 });
                setSnippets(data.data);
            } catch (error) {
                console.error("Failed to load favorites");
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    const handleFavoriteToggle = (updatedSnippet) => {
        if (!updatedSnippet.is_favorite) {
            setSnippets(prev => prev.filter(s => s.id !== updatedSnippet.id));
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;

    return (
        <div>
            <h1 className="mb-4">Favorite Snippets</h1>
            
            {snippets.length === 0 ? (
                <div className="alert alert-warning text-center py-5 border-0 bg-warning bg-opacity-10 text-warning-emphasis">
                    <h4>No favorites found</h4>
                    <p>Click the star icon on any snippet to add it to your favorites.</p>
                </div>
            ) : (
                <div className="row g-4 mb-4">
                    {snippets.map(snippet => (
                        <div className="col-md-6 col-lg-4" key={snippet.id}>
                            <SnippetCard snippet={snippet} onFavoriteToggle={handleFavoriteToggle} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
