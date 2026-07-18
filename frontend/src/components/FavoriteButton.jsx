import React, { useState } from 'react';
import { snippetService } from '../services/snippetService';

const FavoriteButton = ({ snippet, onToggle }) => {
    const [isFav, setIsFav] = useState(snippet.is_favorite);
    const [loading, setLoading] = useState(false);

    const handleToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (loading) return;
        
        setLoading(true);
        try {
            const updated = await snippetService.toggleFavorite(snippet.id);
            setIsFav(updated.is_favorite);
            if (onToggle) onToggle(updated);
        } catch (error) {
            console.error("Error toggling favorite", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button 
            className="btn btn-link text-warning p-0 text-decoration-none" 
            onClick={handleToggle}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
            disabled={loading}
        >
            {isFav ? <i className="bi bi-star-fill fs-5"></i> : <i className="bi bi-star fs-5"></i>}
        </button>
    );
};

export default FavoriteButton;
