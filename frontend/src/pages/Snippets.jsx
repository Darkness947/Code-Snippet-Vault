import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { snippetService } from '../services/snippetService';
import { languageService } from '../services/languageService';
import SnippetCard from '../components/SnippetCard';

const Snippets = () => {
    const [snippets, setSnippets] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(null);
    
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    
    const [q, setQ] = useState(queryParams.get('q') || '');
    const [language, setLanguage] = useState(queryParams.get('language') || '');
    const [favorite, setFavorite] = useState(queryParams.get('favorite') || '');
    const page = parseInt(queryParams.get('page')) || 1;

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const data = await languageService.getAll();
                setLanguages(data);
            } catch (error) {
                console.error("Failed to load languages");
            }
        };
        fetchLanguages();
    }, []);

    useEffect(() => {
        const fetchSnippets = async () => {
            setLoading(true);
            try {
                const params = { page };
                if (q) params.q = q;
                if (language) params.language = language;
                if (favorite) params.favorite = favorite;
                
                let data;
                if (q || language || favorite) {
                    data = await snippetService.search(params);
                } else {
                    data = await snippetService.getAll(params);
                }
                
                setSnippets(data.data);
                setPagination({
                    current_page: data.current_page,
                    last_page: data.last_page,
                    total: data.total,
                });
            } catch (error) {
                console.error("Failed to load snippets");
            } finally {
                setLoading(false);
            }
        };

        fetchSnippets();
    }, [location.search]);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (q) params.set('q', q);
        if (language) params.set('language', language);
        if (favorite) params.set('favorite', favorite);
        params.set('page', '1');
        navigate(`/snippets?${params.toString()}`);
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > pagination?.last_page) return;
        const params = new URLSearchParams(location.search);
        params.set('page', newPage);
        navigate(`/snippets?${params.toString()}`);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Snippets</h1>
                <Link to="/snippets/new" className="btn btn-primary">
                    <i className="bi bi-plus-lg me-1"></i> Create Snippet
                </Link>
            </div>

            <div className="card mb-4 shadow-sm bg-body-tertiary">
                <div className="card-body">
                    <form onSubmit={handleSearch} className="row g-3">
                        <div className="col-md-5">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search title, description, or tags..." 
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <select 
                                className="form-select" 
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="">All Languages</option>
                                {languages.map(l => (
                                    <option key={l.id} value={l.id}>{l.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select 
                                className="form-select" 
                                value={favorite}
                                onChange={(e) => setFavorite(e.target.value)}
                            >
                                <option value="">Any Status</option>
                                <option value="1">Favorites Only</option>
                            </select>
                        </div>
                        <div className="col-md-2 d-grid">
                            <button type="submit" className="btn btn-secondary">Filter</button>
                        </div>
                    </form>
                </div>
            </div>

            {loading ? (
                <div className="text-center my-5"><div className="spinner-border text-primary" role="status"></div></div>
            ) : snippets.length === 0 ? (
                <div className="alert alert-info text-center py-5">
                    <h4>No snippets found</h4>
                    <p>Try adjusting your search filters or create a new snippet.</p>
                    <Link to="/snippets/new" className="btn btn-outline-primary mt-2">Create New Snippet</Link>
                </div>
            ) : (
                <>
                    <div className="row g-4 mb-4">
                        {snippets.map(snippet => (
                            <div className="col-md-6 col-lg-4" key={snippet.id}>
                                <SnippetCard snippet={snippet} />
                            </div>
                        ))}
                    </div>

                    {pagination && pagination.last_page > 1 && (
                        <nav>
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(pagination.current_page - 1)}>Previous</button>
                                </li>
                                {[...Array(pagination.last_page)].map((_, i) => (
                                    <li key={i + 1} className={`page-item ${pagination.current_page === i + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                                    </li>
                                ))}
                                <li className={`page-item ${pagination.current_page === pagination.last_page ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(pagination.current_page + 1)}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </>
            )}
        </div>
    );
};

export default Snippets;
