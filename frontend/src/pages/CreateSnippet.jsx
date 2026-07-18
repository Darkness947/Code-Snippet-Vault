import React from 'react';
import { useNavigate } from 'react-router-dom';
import { snippetService } from '../services/snippetService';
import SnippetForm from '../components/SnippetForm';

const CreateSnippet = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        const created = await snippetService.create(data);
        window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Snippet created successfully!', type: 'success' } }));
        navigate(`/snippets/${created.id}`);
    };

    return (
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <h1 className="mb-4">Create New Snippet</h1>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <SnippetForm onSubmit={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSnippet;
