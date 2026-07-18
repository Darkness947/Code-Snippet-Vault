import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { snippetService } from '../services/snippetService';
import SnippetForm from '../components/SnippetForm';

const EditSnippet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [snippet, setSnippet] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const data = await snippetService.getById(id);
                setSnippet(data);
            } catch (error) {
                console.error("Failed to load snippet", error);
                navigate('/snippets');
            } finally {
                setLoading(false);
            }
        };
        fetchSnippet();
    }, [id, navigate]);

    const handleSubmit = async (data) => {
        await snippetService.update(id, data);
        window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Snippet updated successfully!', type: 'success' } }));
        navigate(`/snippets/${id}`);
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;

    return (
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <h1 className="mb-4">Edit Snippet</h1>
                <div className="card shadow-sm">
                    <div className="card-body">
                        {snippet && (
                            <SnippetForm 
                                initialData={snippet} 
                                onSubmit={handleSubmit} 
                                isEditing={true} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSnippet;
