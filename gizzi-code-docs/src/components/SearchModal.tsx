import { useState, useEffect, useRef } from 'react';
import { Search, FileText, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchResult {
  title: string;
  path: string;
  category: string;
  excerpt?: string;
}

const searchIndex: SearchResult[] = [
  { title: 'Home', path: '/', category: 'General', excerpt: 'Gizzi Code documentation home' },
  { title: 'Quickstart', path: '/docs/quickstart', category: 'Getting Started', excerpt: 'Get up and running in 5 minutes' },
  { title: 'Terminal Installation', path: '/docs/installation/terminal', category: 'Installation', excerpt: 'Install Gizzi Code in your terminal' },
  { title: 'VS Code Installation', path: '/docs/installation/vscode', category: 'Installation', excerpt: 'VS Code extension setup' },
  { title: 'Desktop Installation', path: '/docs/installation/desktop', category: 'Installation', excerpt: 'Download the desktop app' },
  { title: 'Web Installation', path: '/docs/installation/web', category: 'Installation', excerpt: 'Use Gizzi in your browser' },
  { title: 'Global Commands', path: '/docs/cli/global', category: 'CLI Reference', excerpt: 'Global CLI commands' },
  { title: 'Project Commands', path: '/docs/cli/project', category: 'CLI Reference', excerpt: 'Project-specific commands' },
  { title: 'Debug Commands', path: '/docs/cli/debug', category: 'CLI Reference', excerpt: 'Debugging and troubleshooting' },
  { title: 'Configuration', path: '/docs/configuration', category: 'Configuration', excerpt: 'Configure Gizzi Code settings' },
  { title: 'Providers', path: '/docs/providers', category: 'Configuration', excerpt: 'AI provider setup (Claude, OpenAI, etc)' },
  { title: 'Allternit Docs', path: 'https://docs.allternit.com', category: 'External', excerpt: 'Platform and API documentation' },
];

interface SearchModalProps {
  onClose: () => void;
}

export function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim() === '' 
    ? searchIndex 
    : searchIndex.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.excerpt?.toLowerCase().includes(query.toLowerCase())
      );

  const groupedResults = results.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
      <div className="w-full max-w-2xl bg-[#12121A] rounded-xl shadow-2xl border border-[#2A2A3A] overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2A2A3A]">
          <Search className="w-5 h-5 text-[#6B6B6B]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-[#E5E5E5] placeholder:text-[#6B6B6B] outline-none"
          />
          <button onClick={onClose} className="p-1 text-[#6B6B6B] hover:text-[#E5E5E5]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-[#6B6B6B]">No results for &quot;{query}&quot;</div>
          ) : (
            <div className="py-2">
              {Object.entries(groupedResults).map(([category, items]) => (
                <div key={category}>
                  <div className="px-4 py-2 text-xs font-medium text-[#6B6B6B] uppercase">{category}</div>
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
                          isSelected ? 'bg-[#D97757]/10 text-[#D97757]' : 'text-[#9B9B9B] hover:bg-[#1A1A24]'
                        }`}
                      >
                        <FileText className="w-4 h-4 mt-0.5" />
                        <div className="flex-1">
                          <div className={`font-medium ${isSelected ? 'text-[#D97757]' : 'text-[#E5E5E5]'}`}>
                            {item.title}
                            {isExternal && <span className="ml-2 text-xs opacity-50">↗</span>}
                          </div>
                          {item.excerpt && <div className="text-sm text-[#6B6B6B] truncate">{item.excerpt}</div>}
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

        <div className="px-4 py-2 border-t border-[#2A2A3A] bg-[#0A0A0F] text-xs text-[#6B6B6B] flex justify-between">
          <div className="flex gap-4">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
          </div>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
