import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { DocPage } from './pages/DocPage';
import { ServiceCatalogPage } from './pages/ServiceCatalogPage';
import ResearchPage from './pages/ResearchPage';
import './App.css';

function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <Header onSearchClick={() => setSearchOpen(true)} />

      {/* Search Modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      {/* Main Layout */}
      <div className="flex pt-14">
        {/* Sidebar */}
        <Sidebar currentPath={location.pathname} />

        {/* Main Content */}
        <main className="flex-1 ml-64 min-h-[calc(100vh-3.5rem)]">
          <div className="max-w-4xl mx-auto px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/docs/:section/*" element={<DocPage />} />
              <Route path="/services" element={<ServiceCatalogPage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/research/publications" element={<ResearchPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
