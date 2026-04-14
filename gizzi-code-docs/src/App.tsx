import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';
import HomePage from './pages/Home';

function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      <Sidebar onSearchClick={() => setSearchOpen(true)} />
      <main className="ml-64 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs/*" element={<div className="p-8 text-[#E5E5E5]">Documentation coming soon...</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
