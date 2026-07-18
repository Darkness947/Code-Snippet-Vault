import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { languageService } from '../services/languageService';
import { tagService } from '../services/tagService';

const SnippetForm = ({ initialData, onSubmit, isEditing = false }) => {
    const navigate = useNavigate();
    const [languages, setLanguages] = useState([]);
    const [existingTags, setExistingTags] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        language_id: initialData?.language_id || '',
        description: initialData?.description || '',
        code: initialData?.code || '',
        tags: initialData?.tags ? initialData.tags.map(t => t.name).join(', ') : ''
    });

    useEffect(() => {
        const fetchDependencies = async () => {
            try {
                const [langs, tags] = await Promise.all([
                    languageService.getAll(),
                    tagService.getAll()
                ]);
                setLanguages(langs);
                setExistingTags(tags);
            } catch (error) {
                console.error("Failed to load dependencies");
            }
        };
        fetchDependencies();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const tagsArray = formData.tags
                .split(',')
                .map(t => t.trim())
                .filter(t => t !== '');
                
            await onSubmit({
                ...formData,
                tags: tagsArray
            });
        } catch (error) {
            console.error("Submission failed", error);
            window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Failed to save snippet', type: 'danger' } }));
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Title <span className="text-danger">*</span></label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                    maxLength="255"
                />
            </div>
            
            <div className="mb-3">
                <label className="form-label">Language <span className="text-danger">*</span></label>
                <select 
                    className="form-select" 
                    name="language_id" 
                    value={formData.language_id} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Select a language</option>
                    {languages.map(l => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea 
                    className="form-control" 
                    name="description" 
                    rows="2" 
                    value={formData.description} 
                    onChange={handleChange}
                    maxLength="2000"
                ></textarea>
            </div>

            <div className="mb-3">
                <label className="form-label">Tags (comma separated)</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="tags" 
                    value={formData.tags} 
                    onChange={handleChange}
                    placeholder="e.g. react, hooks, api"
                />
                <div className="form-text">
                    Existing tags: {existingTags.slice(0, 10).map(t => t.name).join(', ')}{existingTags.length > 10 ? '...' : ''}
                </div>
            </div>

            <div className="mb-4">
                <label className="form-label">Code <span className="text-danger">*</span></label>
                <textarea 
                    className="form-control font-monospace" 
                    name="code" 
                    rows="10" 
                    value={formData.code} 
                    onChange={handleChange} 
                    required
                    maxLength="50000"
                    style={{ backgroundColor: 'var(--bs-tertiary-bg)' }}
                ></textarea>
            </div>

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                    {isEditing ? 'Update Snippet' : 'Save Snippet'}
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)} disabled={loading}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default SnippetForm;
