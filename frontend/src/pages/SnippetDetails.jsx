import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { snippetService } from '../services/snippetService';
import FavoriteButton from '../components/FavoriteButton';
import CopyButton from '../components/CopyButton';
import CopyMarkdownButton from '../components/CopyMarkdownButton';

const SnippetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [snippet, setSnippet] = useState(null);
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [snippetData, versionsData] = await Promise.all([
                    snippetService.getById(id),
                    snippetService.getVersions(id)
                ]);
                setSnippet(snippetData);
                setVersions(versionsData);
            } catch (error) {
                console.error("Failed to load snippet details");
                navigate('/snippets');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this snippet?')) {
            try {
                await snippetService.delete(id);
                window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Snippet deleted', type: 'success' } }));
                navigate('/snippets');
            } catch (error) {
                console.error("Failed to delete", error);
            }
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
    if (!snippet) return null;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                    <h2 className="mb-0 me-3">{snippet.title}</h2>
                    <FavoriteButton snippet={snippet} />
                </div>
                <div>
                    <Link to={`/snippets/${snippet.id}/edit`} className="btn btn-primary me-2">
                        <i className="bi bi-pencil me-1"></i> Edit
                    </Link>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <span className="badge bg-secondary fs-6 me-2">{snippet.language?.name}</span>
                {snippet.tags?.map(t => (
                    <span key={t.id} className="badge bg-light text-dark border me-1">#{t.name}</span>
                ))}
            </div>

            {snippet.description && (
                <div className="card mb-4 bg-body-tertiary shadow-sm border-0">
                    <div className="card-body">
                        <p className="card-text">{snippet.description}</p>
                    </div>
                </div>
            )}

            <div className="card mb-4 shadow-sm border-0">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
                    <span className="font-monospace">{snippet.language?.name} Code</span>
                    <div>
                        <CopyMarkdownButton snippetId={snippet.id} className="btn btn-sm btn-outline-light me-2" />
                        <CopyButton text={snippet.code} className="btn btn-sm btn-outline-light" showText={true} />
                    </div>
                </div>
                <div className="card-body p-0">
                    <SyntaxHighlighter 
                        language={snippet.language?.name?.toLowerCase()} 
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, padding: '1.5rem', borderRadius: '0 0 0.375rem 0.375rem' }}
                    >
                        {snippet.code}
                    </SyntaxHighlighter>
                </div>
            </div>

            {snippet.collections && snippet.collections.length > 0 && (
                <div className="mb-4">
                    <h4>In Collections</h4>
                    <ul className="list-group list-group-horizontal">
                        {snippet.collections.map(c => (
                            <li className="list-group-item bg-body-tertiary" key={c.id}>
                                <Link to={`/collections/${c.id}`} className="text-decoration-none">{c.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-5">
                <h4>Version History <span className="badge bg-secondary rounded-pill fs-6">{versions.length}</span></h4>
                {versions.length === 0 ? (
                    <p className="text-muted">No previous versions available.</p>
                ) : (
                    <div className="accordion" id="versionsAccordion">
                        {versions.map((v, index) => (
                            <div className="accordion-item" key={v.id}>
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed font-monospace" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${v.id}`}>
                                        Version {versions.length - index} - {new Date(v.created_at).toLocaleString()}
                                    </button>
                                </h2>
                                <div id={`collapse${v.id}`} className="accordion-collapse collapse" data-bs-parent="#versionsAccordion">
                                    <div className="accordion-body p-0">
                                        <div className="position-relative">
                                            <CopyButton text={v.code} className="position-absolute top-0 end-0 m-2 btn btn-sm btn-outline-light border-0" />
                                            <SyntaxHighlighter 
                                                language={snippet.language?.name?.toLowerCase()} 
                                                style={vscDarkPlus}
                                                customStyle={{ margin: 0, padding: '1.5rem' }}
                                            >
                                                {v.code}
                                            </SyntaxHighlighter>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SnippetDetails;
