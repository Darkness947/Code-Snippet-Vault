import React, { useState, useEffect } from 'react';

const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handleToast = (e) => {
            const id = Date.now();
            setToasts(prev => [...prev, { id, ...e.detail }]);
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 3000);
        };

        window.addEventListener('toast', handleToast);
        return () => window.removeEventListener('toast', handleToast);
    }, []);

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
            {toasts.map(toast => (
                <div key={toast.id} className={`toast show align-items-center text-bg-${toast.type || 'primary'} border-0 mb-2 shadow`} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body fw-medium">
                            {toast.type === 'success' && <i className="bi bi-check-circle me-2"></i>}
                            {toast.type === 'danger' && <i className="bi bi-exclamation-triangle me-2"></i>}
                            {toast.message}
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} aria-label="Close"></button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
