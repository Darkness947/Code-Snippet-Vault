import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collectionService } from '../services/collectionService';

const Collections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            const data = await collectionService.getAll();
            setCollections(data);
        } catch (error) {
            console.error("Failed to load collections");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this collection?")) {
            try {
                await collectionService.delete(id);
                setCollections(prev => prev.filter(c => c.id !== id));
                window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Collection deleted', type: 'success' } }));
            } catch (error) {
                console.error("Delete failed");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await collectionService.create(formData);
            setFormData({ title: '', description: '' });
            setShowForm(false);
            window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Collection created!', type: 'success' } }));
            fetchCollections();
        } catch (error) {
            console.error("Failed to create collection", error);
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Collections</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    <i className={`bi bi-${showForm ? 'dash' : 'plus'}-lg me-1`}></i> 
                    {showForm ? 'Cancel' : 'New Collection'}
                </button>
            </div>

            {showForm && (
                <div className="card mb-4 shadow-sm bg-body-tertiary">
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="row g-3">
                            <div className="col-md-4">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Collection Title" 
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required
                                    maxLength="255"
                                />
                            </div>
                            <div className="col-md-6">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Description (optional)" 
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    maxLength="2000"
                                />
                            </div>
                            <div className="col-md-2 d-grid">
                                <button type="submit" className="btn btn-success">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {collections.length === 0 ? (
                <div className="alert alert-info text-center py-5">
                    <h4>No collections yet</h4>
                    <p>Create your first collection to group related snippets.</p>
                </div>
            ) : (
                <div className="row g-4">
                    {collections.map(c => (
                        <div className="col-md-6 col-lg-4" key={c.id}>
                            <div className="card h-100 shadow-sm border-0 bg-body-secondary">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to={`/collections/${c.id}`} className="text-decoration-none text-reset">
                                            {c.title}
                                        </Link>
                                    </h5>
                                    <p className="card-text text-muted">{c.description}</p>
                                    <p className="card-text small"><i className="bi bi-file-code me-1"></i> {c.snippets_count} Snippets</p>
                                </div>
                                <div className="card-footer bg-transparent d-flex justify-content-end border-0">
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c.id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Collections;
