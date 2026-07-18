import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import CopyButton from './CopyButton';

const SnippetCard = ({ snippet, onFavoriteToggle }) => {
    return (
        <div className="card h-100 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center bg-transparent">
                <span className="badge bg-secondary">{snippet.language?.name || 'Unknown'}</span>
                <FavoriteButton snippet={snippet} onToggle={onFavoriteToggle} />
            </div>
            <div className="card-body">
                <h5 className="card-title text-truncate" title={snippet.title}>
                    <Link to={`/snippets/${snippet.id}`} className="text-decoration-none text-reset">
                        {snippet.title}
                    </Link>
                </h5>
                <p className="card-text text-muted small text-truncate">
                    {snippet.description || 'No description'}
                </p>
                <div className="bg-dark rounded p-2 mb-3 position-relative" style={{ height: '100px', overflow: 'hidden' }}>
                    <CopyButton text={snippet.code} className="position-absolute top-0 end-0 m-1 btn btn-sm btn-outline-light border-0" />
                    <pre className="text-light m-0 small" style={{ fontSize: '0.75rem' }}>
                        <code>{snippet.code.substring(0, 150)}{snippet.code.length > 150 ? '...' : ''}</code>
                    </pre>
                </div>
            </div>
            <div className="card-footer bg-transparent text-muted small d-flex justify-content-between">
                <span>{new Date(snippet.updated_at).toLocaleDateString()}</span>
                {snippet.tags && snippet.tags.length > 0 && (
                    <span className="text-truncate ms-2">
                        {snippet.tags.slice(0, 2).map(t => `#${t.name}`).join(' ')}
                        {snippet.tags.length > 2 && ' ...'}
                    </span>
                )}
            </div>
        </div>
    );
};

export default SnippetCard;
