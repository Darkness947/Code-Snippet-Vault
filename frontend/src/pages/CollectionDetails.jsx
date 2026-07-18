import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { collectionService } from '../services/collectionService';
import { snippetService } from '../services/snippetService';
import SnippetCard from '../components/SnippetCard';

const CollectionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [collection, setCollection] = useState(null);
    const [availableSnippets, setAvailableSnippets] = useState([]);
    const [selectedSnippetId, setSelectedSnippetId] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const data = await collectionService.getById(id);
            setCollection(data);
        } catch (error) {
            console.error("Failed to load collection", error);
            navigate('/collections');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const fetchAvailableSnippets = async () => {
            try {
                const res = await snippetService.getAll({ page: 1 });
                setAvailableSnippets(res.data);
            } catch (e) {
                console.error("Failed to load snippets");
            }
        };
        fetchAvailableSnippets();
    }, [id, navigate]);

    const handleAttach = async (e) => {
        e.preventDefault();
        if (!selectedSnippetId) return;
        try {
            await collectionService.attachSnippet(id, selectedSnippetId);
            setSelectedSnippetId('');
            window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Snippet added to collection', type: 'success' } }));
            fetchData();
        } catch (error) {
            console.error("Failed to attach", error);
        }
    };

    const handleDetach = async (snippetId) => {
        if (window.confirm('Remove snippet from collection?')) {
            try {
                await collectionService.detachSnippet(id, snippetId);
                window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Snippet removed', type: 'success' } }));
                fetchData();
            } catch (error) {
                console.error("Failed to detach", error);
            }
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
    if (!collection) return null;

    const unattachedSnippets = availableSnippets.filter(
        s => !collection.snippets.some(cs => cs.id === s.id)
    );

    return (
        <div>
            <div className="mb-4">
                <Link to="/collections" className="text-decoration-none">&larr; Back to Collections</Link>
            </div>
            
            <div className="card mb-4 bg-dark text-white border-0 shadow-sm">
                <div className="card-body">
                    <h1 className="card-title">{collection.title}</h1>
                    {collection.description && <p className="card-text text-white-50">{collection.description}</p>}
                </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm bg-body-tertiary">
                <div className="card-body">
                    <h5 className="card-title mb-3">Add Snippet to Collection</h5>
                    <form onSubmit={handleAttach} className="row g-2 align-items-center">
                        <div className="col-md-8">
                            <select 
                                className="form-select" 
                                value={selectedSnippetId}
                                onChange={(e) => setSelectedSnippetId(e.target.value)}
                            >
                                <option value="">-- Select a snippet --</option>
                                {unattachedSnippets.map(s => (
                                    <option key={s.id} value={s.id}>{s.title} ({s.language?.name})</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <button type="submit" className="btn btn-primary w-100" disabled={!selectedSnippetId}>
                                Add Snippet
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <h3 className="mb-3">Snippets in Collection ({collection.snippets?.length || 0})</h3>
            
            {!collection.snippets || collection.snippets.length === 0 ? (
                <div className="alert alert-info">This collection is empty. Add a snippet above!</div>
            ) : (
                <div className="row g-4 pt-3">
                    {collection.snippets.map(snippet => (
                        <div className="col-md-6 col-lg-4" key={snippet.id}>
                            <div className="position-relative">
                                <SnippetCard snippet={snippet} />
                                <button 
                                    className="btn btn-sm btn-danger position-absolute top-0 start-100 translate-middle rounded-circle shadow"
                                    onClick={() => handleDetach(snippet.id)}
                                    title="Remove from collection"
                                    style={{ zIndex: 10, width: '32px', height: '32px' }}
                                >
                                    <i className="bi bi-x"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CollectionDetails;
