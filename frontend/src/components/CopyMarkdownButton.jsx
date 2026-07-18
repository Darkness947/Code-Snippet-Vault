import React, { useState } from 'react';
import { snippetService } from '../services/snippetService';

const CopyMarkdownButton = ({ snippetId, className = "btn btn-sm btn-outline-secondary" }) => {
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (loading) return;

        setLoading(true);
        try {
            const markdown = await snippetService.getMarkdown(snippetId);
            await navigator.clipboard.writeText(markdown);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Markdown copied to clipboard!', type: 'success' } }));
        } catch (err) {
            console.error('Failed to copy markdown: ', err);
            window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Failed to copy markdown', type: 'danger' } }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <button className={className} onClick={handleCopy} title="Copy as Markdown" disabled={loading}>
            {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : copied ? (
                <><i className="bi bi-check2"></i> Copied!</>
            ) : (
                <><i className="bi bi-markdown"></i> Copy MD</>
            )}
        </button>
    );
};

export default CopyMarkdownButton;
