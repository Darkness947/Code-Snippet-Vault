import React, { useState } from 'react';

const CopyButton = ({ text, className = "btn btn-sm btn-outline-secondary", title = "Copy to clipboard", showText = false }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            
            window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Copied to clipboard!', type: 'success' } }));
        } catch (err) {
            console.error('Failed to copy: ', err);
            window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Failed to copy', type: 'danger' } }));
        }
    };

    return (
        <button className={className} onClick={handleCopy} title={title}>
            {copied ? <i className="bi bi-check2"></i> : <i className="bi bi-clipboard"></i>}
            {showText && <span className="ms-1">{copied ? 'Copied!' : 'Copy Code'}</span>}
        </button>
    );
};

export default CopyButton;
