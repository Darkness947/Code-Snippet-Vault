import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { snippetService } from '../services/snippetService';
import { collectionService } from '../services/collectionService';
import SnippetCard from '../components/SnippetCard';

const Home = () => {
    const [stats, setStats] = useState({
        totalSnippets: 0,
        totalCollections: 0,
        totalFavorites: 0,
    });
    const [recentSnippets, setRecentSnippets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [snippetsRes, collectionsRes, favoritesRes] = await Promise.all([
                    snippetService.getAll(),
                    collectionService.getAll(),
                    snippetService.search({ favorite: 1 })
                ]);

                setStats({
                    totalSnippets: snippetsRes.total,
                    totalCollections: collectionsRes.length,
                    totalFavorites: favoritesRes.total
                });

                // Get only top 5 recent snippets
                setRecentSnippets(snippetsRes.data.slice(0, 5));
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
    }

    return (
        <div>
            <h1 className="mb-4">Dashboard</h1>
            
            <div className="row mb-5">
                <div className="col-md-4 mb-3">
                    <div className="card bg-primary text-white h-100">
                        <div className="card-body">
                            <h5 className="card-title"><i className="bi bi-code-square me-2"></i>Total Snippets</h5>
                            <h2 className="display-4">{stats.totalSnippets}</h2>
                            <Link to="/snippets" className="text-white text-decoration-none stretched-link">View all &rarr;</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-success text-white h-100">
                        <div className="card-body">
                            <h5 className="card-title"><i className="bi bi-folder me-2"></i>Collections</h5>
                            <h2 className="display-4">{stats.totalCollections}</h2>
                            <Link to="/collections" className="text-white text-decoration-none stretched-link">View collections &rarr;</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-warning text-dark h-100">
                        <div className="card-body">
                            <h5 className="card-title"><i className="bi bi-star-fill me-2"></i>Favorites</h5>
                            <h2 className="display-4">{stats.totalFavorites}</h2>
                            <Link to="/favorites" className="text-dark text-decoration-none stretched-link">View favorites &rarr;</Link>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="mb-3">Recent Snippets</h3>
            {recentSnippets.length === 0 ? (
                <div className="alert alert-info">
                    You haven't added any snippets yet. <Link to="/snippets/new" className="alert-link">Create one now</Link>!
                </div>
            ) : (
                <div className="row g-4">
                    {recentSnippets.map(snippet => (
                        <div className="col-md-6 col-lg-4" key={snippet.id}>
                            <SnippetCard snippet={snippet} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
