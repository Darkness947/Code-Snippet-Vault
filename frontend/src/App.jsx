import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Snippets from './pages/Snippets';
import CreateSnippet from './pages/CreateSnippet';
import EditSnippet from './pages/EditSnippet';
import SnippetDetailsPage from './pages/SnippetDetails';
import Collections from './pages/Collections';
import CollectionDetails from './pages/CollectionDetails';
import Favorites from './pages/Favorites';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/snippets" element={<Snippets />} />
            <Route path="/snippets/new" element={<CreateSnippet />} />
            <Route path="/snippets/:id/edit" element={<EditSnippet />} />
            <Route path="/snippets/:id" element={<SnippetDetailsPage />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:id" element={<CollectionDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
