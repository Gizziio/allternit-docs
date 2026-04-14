import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown, Terminal, Download, Settings, Cpu, ExternalLink, Search, Home } from 'lucide-react';

interface NavItem {
  title: string;
  path: string;
  icon?: React.ElementType;
  children?: NavItem[];
  external?: boolean;
}

const navigation: NavItem[] = [
  { title: 'Home', path: '/', icon: Home },
  { title: 'Quickstart', path: '/docs/quickstart', icon: Terminal },
  {
    title: 'Installation',
    path: '/docs/installation',
    icon: Download,
    children: [
      { title: 'Terminal (CLI)', path: '/docs/installation/terminal' },
      { title: 'VS Code', path: '/docs/installation/vscode' },
      { title: 'Desktop App', path: '/docs/installation/desktop' },
      { title: 'Web', path: '/docs/installation/web' },
    ],
  },
  {
    title: 'CLI Reference',
    path: '/docs/cli',
    icon: Terminal,
    children: [
      { title: 'Global Commands', path: '/docs/cli/global' },
      { title: 'Project Commands', path: '/docs/cli/project' },
      { title: 'Debug Commands', path: '/docs/cli/debug' },
    ],
  },
  { title: 'Configuration', path: '/docs/configuration', icon: Settings },
  { title: 'Providers', path: '/docs/providers', icon: Cpu },
  { title: 'Allternit Docs', path: 'https://docs.allternit.com', icon: ExternalLink, external: true },
];

function NavItemComponent({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(location.pathname.startsWith(item.path));
  const hasChildren = item.children && item.children.length > 0;
  const isActive = location.pathname === item.path;
  const Icon = item.icon;

  return (
    <div className={depth > 0 ? 'ml-3' : ''}>
      <div className="flex items-center">
        {item.external ? (
          <a
            href={item.path}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
              isActive ? 'text-[#D97757] bg-[#D97757]/10' : 'text-[#9B9B9B] hover:text-[#E5E5E5] hover:bg-[#1A1A24]'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span className="flex-1">{item.title}</span>
          </a>
        ) : (
          <Link
            to={item.path}
            className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
              isActive ? 'text-[#D97757] bg-[#D97757]/10' : 'text-[#9B9B9B] hover:text-[#E5E5E5] hover:bg-[#1A1A24]'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span className="flex-1">{item.title}</span>
          </Link>
        )}
        {hasChildren && (
          <button onClick={() => setExpanded(!expanded)} className="p-1 text-[#6B6B6B] hover:text-[#E5E5E5]">
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        )}
      </div>
      {hasChildren && expanded && (
        <div className="mt-1 space-y-0.5">
          {item.children!.map(child => <NavItemComponent key={child.path} item={child} depth={depth + 1} />)}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  onSearchClick: () => void;
}

export function Sidebar({ onSearchClick }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0A0A0F] border-r border-[#2A2A3A] overflow-y-auto z-30">
      <div className="p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 mb-6">
          <pre className="text-[#D97757] text-xs leading-none font-mono">
{`  ▄▄  
▄██▄
█●  ●█
█ A:// █
▀██▀`}
          </pre>
          <div>
            <div className="font-mono font-bold text-[#D97757]">Gizzi</div>
            <div className="text-xs text-[#6B6B6B]">docs.gizziio.com</div>
          </div>
        </Link>

        {/* Search Button */}
        <button
          onClick={onSearchClick}
          className="w-full flex items-center gap-2 px-3 py-2 mb-4 text-sm text-[#9B9B9B] bg-[#12121A] rounded-lg hover:bg-[#1A1A24] transition-colors"
        >
          <Search className="w-4 h-4" />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="px-1.5 py-0.5 text-xs bg-[#0A0A0F] rounded">⌘K</kbd>
        </button>

        {/* Navigation */}
        <nav className="space-y-1">
          {navigation.map(item => <NavItemComponent key={item.path} item={item} />)}
        </nav>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[#2A2A3A]">
          <a 
            href="https://install.gizziio.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full px-3 py-2 mb-2 text-sm text-center text-[#0A0A0F] bg-[#D97757] rounded-lg hover:bg-[#E8997A] transition-colors font-medium"
          >
            Install Gizzi
          </a>
          <p className="text-xs text-[#6B6B6B]">Gizzi Code v0.1.0</p>
          <a href="https://github.com/Gizziio/gizzi-code" target="_blank" rel="noopener noreferrer" className="text-xs text-[#6B6B6B] hover:text-[#D97757]">GitHub</a>
        </div>
      </div>
    </aside>
  );
}
