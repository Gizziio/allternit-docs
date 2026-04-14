import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  Cpu, 
  Code2, 
  Monitor,
  Home,
  Brain,
  Terminal
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
}

interface NavItem {
  title: string;
  path: string;
  icon?: React.ElementType;
  children?: NavItem[];
  badge?: string;
}

const navigation: NavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: Home,
  },
  {
    title: 'First steps',
    path: '/docs/fundamentals',
    icon: BookOpen,
    children: [
      { title: 'Welcome to Allternit', path: '/docs/fundamentals/welcome' },
      { title: 'The Architecture', path: '/docs/fundamentals/architecture' },
      { title: 'Quickstart', path: '/docs/fundamentals/quickstart' },
    ],
  },
  {
    title: 'The Core',
    path: '/docs/core',
    icon: Cpu,
    children: [
      { title: 'Gizzi Runtime', path: '/docs/core/gizzi-runtime' },
      { title: 'Communication Layer', path: '/docs/core/communication', badge: 'Refactor' },
      { title: 'Git DAG & Lineage', path: '/docs/core/git-dag' },
      { title: 'Skills & Tools', path: '/docs/core/skills' },
    ],
  },
  {
    title: 'API & SDK',
    path: '/docs/api',
    icon: Code2,
    children: [
      { title: 'TypeScript SDK', path: '/docs/api/typescript-sdk' },
      { title: 'Service Catalog', path: '/services' },
      { title: 'Event Stream', path: '/docs/api/event-stream' },
    ],
  },
  {
    title: 'Gizzi Code',
    path: '/docs/gizzi-code',
    icon: Terminal,
    badge: 'New',
    children: [
      { title: 'Quickstart', path: '/docs/gizzi-code/quickstart' },
      { title: 'Installation', path: '/docs/gizzi-code/installation' },
      { title: 'CLI Reference', path: '/docs/gizzi-code/cli' },
      { title: 'Configuration', path: '/docs/gizzi-code/configuration' },
      { title: 'Providers', path: '/docs/gizzi-code/providers' },
      { title: 'Computer Use', path: '/docs/gizzi-code/computer-use' },
    ],
  },
  {
    title: 'Surfaces',
    path: '/docs/surfaces',
    icon: Monitor,
    children: [
      { title: 'Desktop App', path: '/docs/surfaces/desktop', badge: 'Refactor' },
      { title: 'Platform UI', path: '/docs/surfaces/platform' },
      { title: 'Browser Extension', path: '/docs/surfaces/extension' },
    ],
  },
  {
    title: 'Research',
    path: '/research',
    icon: Brain,
    children: [
      { title: 'Overview', path: '/research' },
      { title: 'Publications', path: '/research/publications' },
      { title: 'Economic Index', path: '/research/economic-index' },
      { title: 'Collaborate', path: '/research/collaborate' },
    ],
  },
];

function NavSection({ item, currentPath, depth = 0 }: { item: NavItem; currentPath: string; depth?: number }) {
  const [expanded, setExpanded] = useState(
    currentPath.startsWith(item.path) || depth === 0
  );
  const hasChildren = item.children && item.children.length > 0;
  const isActive = currentPath === item.path;
  const Icon = item.icon;

  return (
    <div className={depth > 0 ? 'ml-2' : ''}>
      <div className="flex items-center">
        <Link
          to={item.path}
          className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
            isActive
              ? 'text-[var(--text-primary)] bg-[var(--sidebar-active)] font-medium'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--sidebar-active)]'
          }`}
        >
          {Icon && <Icon className="w-4 h-4" />}
          <span className="flex-1">{item.title}</span>
          {item.badge && (
            <span className="refactor-badge">{item.badge}</span>
          )}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--sidebar-active)] transition-colors"
          >
            {expanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="mt-1 space-y-0.5">
          {item.children!.map((child) => (
            <NavSection
              key={child.path}
              item={child}
              currentPath={currentPath}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ currentPath }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-14 bottom-0 w-64 bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] overflow-y-auto z-30">
      <div className="p-4">
        {/* Navigation */}
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavSection
              key={item.path}
              item={item}
              currentPath={currentPath}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[var(--border-color)]">
          <p className="text-xs text-[var(--text-muted)]">
            Allternit Documentation
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            v0.1.0 · Phase 1 Refactor
          </p>
        </div>
      </div>
    </aside>
  );
}
