import React from 'react';
import Navbar from '../components/Navbar';
import ToastContainer from '../components/ToastContainer';

const MainLayout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1 container pb-5">
                {children}
            </main>
            <ToastContainer />
            <footer className="bg-dark text-white-50 py-3 mt-auto">
                <div className="container text-center">
                    <small>Code Snippet Vault &copy; {new Date().getFullYear()}</small>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
