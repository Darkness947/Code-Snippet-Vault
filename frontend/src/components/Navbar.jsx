import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <i className="bi bi-braces me-2"></i>
                    Snippet Vault
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname.startsWith('/snippets') && !location.pathname.startsWith('/snippets/new') ? 'active' : ''}`} to="/snippets">Snippets</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname.startsWith('/collections') ? 'active' : ''}`} to="/collections">Collections</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`} to="/favorites">Favorites</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <Link to="/snippets/new" className="btn btn-outline-light me-3">
                            <i className="bi bi-plus-lg me-1"></i> New Snippet
                        </Link>
                        <button className="btn btn-link text-light p-0" onClick={toggleTheme} title="Toggle Dark Mode">
                            {isDarkMode ? <i className="bi bi-sun fs-5"></i> : <i className="bi bi-moon fs-5"></i>}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
