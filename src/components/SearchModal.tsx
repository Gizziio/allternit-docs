import { useState, useEffect, useRef } from 'react';
import { Search, FileText, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchResult {
  title: string;
  path: string;
  category: string;
  excerpt?: string;
}

// Hardcoded search index (original approach)
const searchIndex: SearchResult[] = [
  // Fundamentals
  { title: 'Welcome to Allternit', path: '/docs/fundamentals/welcome', category: 'First steps', excerpt: 'High-level platform value prop' },
  { title: 'The Architecture', path: '/docs/fundamentals/architecture', category: 'First steps', excerpt: 'One Brain, Many Faces model' },
  { title: 'Quickstart', path: '/docs/fundamentals/quickstart', category: 'First steps', excerpt: 'Installing Allternit and running your first agent' },
  
  // Core
  { title: 'Gizzi Runtime', path: '/docs/core/gizzi-runtime', category: 'The Core', excerpt: 'How the agent executes code' },
  { title: 'Communication Layer', path: '/docs/core/communication', category: 'The Core', excerpt: 'The ac (Agent Communication) protocol' },
  { title: 'Git DAG & Lineage', path: '/docs/core/git-dag', category: 'The Core', excerpt: 'Tracking agent evolution and state' },
  { title: 'Skills & Tools', path: '/docs/core/skills', category: 'The Core', excerpt: 'Creating capabilities in the skills/ directory' },
  
  // API & SDK
  { title: 'TypeScript SDK', path: '/docs/api/typescript-sdk', category: 'API & SDK', excerpt: 'The @allternit/sdk guide' },
  { title: 'Service Catalog', path: '/services', category: 'API & SDK', excerpt: 'Mapping all microservices (Ports 3000-8080)' },
  { title: 'Event Stream', path: '/docs/api/event-stream', category: 'API & SDK', excerpt: 'WebSocket schemas and real-time events' },
  
  // Surfaces
  { title: 'Desktop App', path: '/docs/surfaces/desktop', category: 'Surfaces', excerpt: 'Controlling local/remote backends via Electron' },
  { title: 'Platform UI', path: '/docs/surfaces/platform', category: 'Surfaces', excerpt: 'The main React dashboard and Workflow Designer' },
  { title: 'CLI Tools', path: '/docs/surfaces/cli', category: 'Surfaces', excerpt: 'Using gizzi and ac in the terminal' },
  { title: 'Browser Extension', path: '/docs/surfaces/extension', category: 'Surfaces', excerpt: 'Web-wide agent presence' },
  
  // Gizzi Code
  { title: 'Gizzi Code', path: 'https://docs.gizziio.com', category: 'Gizzi Code', excerpt: 'AI-powered terminal interface documentation' },
];

interface SearchModalProps {
  onClose: () => void;
}

export function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter results
  const results = query.trim() === '' 
    ? searchIndex 
    : searchIndex.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.excerpt?.toLowerCase().includes(query.toLowerCase())
      );

  // Group results by category
  const groupedResults = results.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (results.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected) {
          if (selected.path.startsWith('http')) {
            window.open(selected.path, '_blank');
          } else {
            window.location.href = selected.path;
          }
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [results, selectedIndex, onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[var(--border-color)] overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-color)]">
          <Search className="w-5 h-5 text-[var(--text-muted)]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
          />
          <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-[var(--text-muted)]">
              No results found for "{query}"
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(groupedResults).map(([category, items]) => (
                <div key={category}>
                  <div className="px-4 py-2 flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5" />
                    {category}
                  </div>
                  {items.map((item) => {
                    const globalIndex = results.indexOf(item);
                    const isSelected = globalIndex === selectedIndex;
                    const isExternal = item.path.startsWith('http');
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={(e) => {
                          if (isExternal) {
                            e.preventDefault();
                            window.open(item.path, '_blank');
                          }
                          onClose();
                        }}
                        className={`flex items-start gap-3 px-4 py-2.5 mx-2 rounded-md transition-colors ${
                          isSelected 
                            ? 'bg-[var(--accent-orange)]/10 text-[var(--accent-orange)]' 
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                        }`}
                      >
                        <FileText className={`w-4 h-4 mt-0.5 ${isSelected ? 'text-[var(--accent-orange)]' : ''}`} />
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium ${isSelected ? 'text-[var(--accent-orange)]' : 'text-[var(--text-primary)]'}`}>
                            {item.title}
                            {isExternal && <span className="ml-2 text-xs opacity-50">↗</span>}
                          </div>
                          {item.excerpt && (
                            <div className="text-sm text-[var(--text-muted)] truncate">
                              {item.excerpt}
                            </div>
                          )}
                        </div>
                        <ArrowRight className={`w-4 h-4 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] text-xs text-[var(--text-muted)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-[var(--border-color)] rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-[var(--border-color)] rounded">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-[var(--border-color)] rounded">↵</kbd>
              to select
            </span>
          </div>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
