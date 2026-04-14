import { Link } from 'react-router-dom';
import { Search, Command, Github, ExternalLink } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
}

export function Header({ onSearchClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[var(--bg-primary)] border-b border-[var(--border-color)] z-40">
      <div className="flex items-center h-full px-4">
        {/* Logo */}
        <a href="https://allternit.com" className="flex items-center gap-2 mr-3 shrink-0">
          <div className="w-7 h-7 rounded-md bg-[var(--accent-orange)] flex items-center justify-center">
            <span className="text-white font-semibold text-sm font-mono">A2</span>
          </div>
          <span className="font-semibold text-[var(--text-primary)] hidden sm:block">Allternit</span>
        </a>

        {/* Divider + Docs label */}
        <div className="flex items-center gap-2 mr-6">
          <span className="text-[var(--border-color)] select-none">/</span>
          <Link to="/" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Docs
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link 
            to="/docs/fundamentals" 
            className="px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
          >
            Developer Guide
          </Link>
          <Link 
            to="/docs/api" 
            className="px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
          >
            API Reference
          </Link>
          <Link 
            to="/services" 
            className="px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
          >
            Services
          </Link>
          <a 
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
          >
            GitHub
          </a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Search Button */}
          <button
            onClick={onSearchClick}
            className="search-box"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-[var(--bg-tertiary)] rounded">
              <Command className="w-3 h-3" />
              <span>K</span>
            </kbd>
          </button>

          {/* Back to main site */}
          <a
            href="https://allternit.com"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
          >
            allternit.com
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* GitHub Link */}
          <a
            href="https://github.com/allternit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
