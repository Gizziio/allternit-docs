import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Filter, Server, CheckCircle2, AlertCircle } from 'lucide-react';

interface Service {
  name: string;
  port: number;
  language: 'rust' | 'python' | 'typescript' | 'go';
  role: 'orchestration' | 'storage' | 'gateway' | 'compute' | 'messaging';
  description: string;
  endpoints: { method: string; path: string; description: string }[];
  status: 'active' | 'beta' | 'deprecated';
  badge?: string;
}

const services: Service[] = [
  {
    name: '@allternitchitech/memory',
    port: 3201,
    language: 'typescript',
    role: 'storage',
    description: 'Always-on AI memory agent with local LLM (Ollama). SQLite + vector embeddings for semantic recall.',
    endpoints: [
      { method: 'GET', path: '/health', description: 'Health check + model status' },
      { method: 'GET', path: '/stats', description: 'Memory statistics' },
      { method: 'POST', path: '/api/query', description: 'Natural language query' },
      { method: 'POST', path: '/api/ingest', description: 'Ingest content' },
      { method: 'GET', path: '/api/vector/search', description: 'Vector similarity search' },
      { method: 'POST', path: '/api/consolidate', description: 'Trigger memory consolidation' },
    ],
    status: 'active',
    badge: 'Ollama',
  },
  {
    name: '@allternitchitech/rails-api',
    port: 3002,
    language: 'typescript',
    role: 'orchestration',
    description: 'Allternit Rails API — agents, providers, sessions, and work inbox items (WIHs). Central management plane.',
    endpoints: [
      { method: 'GET', path: '/health', description: 'Health check' },
      { method: 'GET', path: '/api/v1/agents', description: 'List agents' },
      { method: 'POST', path: '/api/v1/agents', description: 'Create agent' },
      { method: 'GET', path: '/api/v1/providers', description: 'List providers (OpenAI, Anthropic, Google)' },
      { method: 'GET', path: '/api/v1/agent-sessions', description: 'List sessions' },
      { method: 'POST', path: '/api/v1/agent-sessions', description: 'Create session' },
      { method: 'GET', path: '/api/v1/sessions/sync', description: 'SSE session sync stream' },
      { method: 'GET', path: '/api/rails/wihs', description: 'List work inbox items' },
      { method: 'POST', path: '/api/v1/gateway/tool', description: 'Execute tool via gateway' },
    ],
    status: 'active',
  },
  {
    name: '@allternit/a2a-gateway',
    port: 8012,
    language: 'typescript',
    role: 'gateway',
    description: 'Agent-to-Agent gateway. Handles registration, discovery, and connection establishment between agents.',
    endpoints: [
      { method: 'GET', path: '/health', description: 'Health check' },
      { method: 'POST', path: '/register/agent', description: 'Register agent' },
      { method: 'POST', path: '/register/service', description: 'Register service' },
      { method: 'GET', path: '/discover/agents', description: 'Discover agents by capability' },
      { method: 'GET', path: '/discover/services', description: 'Discover services by type' },
      { method: 'POST', path: '/connect', description: 'Establish agent-to-agent connection' },
      { method: 'POST', path: '/ping/:agentId', description: 'Agent heartbeat' },
    ],
    status: 'active',
  },
  {
    name: '@allternit/agui-gateway',
    port: 8010,
    language: 'typescript',
    role: 'messaging',
    description: 'AGUI Gateway — WebSocket event broadcasting layer. Bridges agent events to connected UI clients in real time.',
    endpoints: [
      { method: 'GET', path: '/health', description: 'Health check + connected client count' },
      { method: 'GET', path: '/events', description: 'Event streaming info' },
      { method: 'POST', path: '/broadcast', description: 'Broadcast event to all clients' },
      { method: 'WS', path: '/', description: 'Real-time bidirectional WebSocket channel' },
    ],
    status: 'active',
  },
  {
    name: '@allternit/http-gateway',
    port: 3210,
    language: 'typescript',
    role: 'gateway',
    description: 'Transport-agnostic API Gateway with UI v0 Binding (TAMBO). Supports stdio, HTTP, and WebSocket transports.',
    endpoints: [
      { method: 'GET', path: '/health', description: 'Health check' },
      { method: 'POST', path: '/', description: 'JSON-RPC message dispatch (HTTP mode)' },
      { method: 'WS', path: '/ws', description: 'WebSocket transport (HTTP mode)' },
    ],
    status: 'active',
    badge: 'stdio/http',
  },
  {
    name: '@allternit/chat-rooms',
    port: 8080,
    language: 'typescript',
    role: 'messaging',
    description: 'Real-time chat rooms service. Fastify + WebSocket for agent-human communication channels with message persistence.',
    endpoints: [
      { method: 'GET', path: '/health', description: 'Health check' },
      { method: 'WS', path: '/rooms/:id', description: 'Join chat room (WebSocket)' },
    ],
    status: 'active',
  },
];

const languageColors: Record<string, { bg: string; text: string; label: string }> = {
  rust: { bg: 'bg-orange-50', text: 'text-orange-700', label: 'Rust' },
  python: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Python' },
  typescript: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'TypeScript' },
  go: { bg: 'bg-cyan-50', text: 'text-cyan-700', label: 'Go' },
};

const roleIcons: Record<string, string> = {
  orchestration: '🎯',
  storage: '💾',
  gateway: '🌐',
  compute: '⚡',
  messaging: '📡',
};

const methodColors: Record<string, string> = {
  GET: 'bg-green-100 text-green-700',
  POST: 'bg-blue-100 text-blue-700',
  PUT: 'bg-amber-100 text-amber-700',
  DELETE: 'bg-red-100 text-red-700',
  WS: 'bg-purple-100 text-purple-700',
};

export function ServiceCatalogPage() {
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredServices = services.filter((service) => {
    if (languageFilter !== 'all' && service.language !== languageFilter) return false;
    if (roleFilter !== 'all' && service.role !== roleFilter) return false;
    if (statusFilter !== 'all' && service.status !== statusFilter) return false;
    return true;
  });

  const activeServices = services.filter((s) => s.status === 'active').length;
  const betaServices = services.filter((s) => s.status === 'beta').length;

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/" className="hover:text-[var(--text-primary)]">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[var(--text-primary)]">Service Catalog</span>
      </nav>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-orange)]/10 flex items-center justify-center">
            <Server className="w-5 h-5 text-[var(--accent-orange)]" />
          </div>
          <h1 className="serif text-4xl text-[var(--text-primary)]">Service Catalog</h1>
        </div>
        <p className="text-[var(--text-secondary)] max-w-2xl">
          Complete mapping of all Allternit microservices, their ports, languages, 
          and endpoints. Use this reference for local development and deployment.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-[var(--border-color)] bg-white">
          <div className="text-2xl font-semibold text-[var(--text-primary)]">{services.length}</div>
          <div className="text-sm text-[var(--text-secondary)]">Total Services</div>
        </div>
        <div className="p-4 rounded-lg border border-[var(--border-color)] bg-white">
          <div className="text-2xl font-semibold text-green-600">{activeServices}</div>
          <div className="text-sm text-[var(--text-secondary)]">Active</div>
        </div>
        <div className="p-4 rounded-lg border border-[var(--border-color)] bg-white">
          <div className="text-2xl font-semibold text-amber-600">{betaServices}</div>
          <div className="text-sm text-[var(--text-secondary)]">Beta</div>
        </div>
        <div className="p-4 rounded-lg border border-[var(--border-color)] bg-white">
          <div className="text-2xl font-semibold text-[var(--text-primary)]">3000-8080</div>
          <div className="text-sm text-[var(--text-secondary)]">Port Range</div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">Filters</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 block">
              Language
            </label>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-[var(--border-color)] bg-white text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]/20"
            >
              <option value="all">All Languages</option>
              <option value="rust">Rust</option>
              <option value="python">Python</option>
              <option value="typescript">TypeScript</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 block">
              Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-[var(--border-color)] bg-white text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]/20"
            >
              <option value="all">All Roles</option>
              <option value="orchestration">Orchestration</option>
              <option value="storage">Storage</option>
              <option value="gateway">Gateway</option>
              <option value="compute">Compute</option>
              <option value="messaging">Messaging</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 block">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-[var(--border-color)] bg-white text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]/20"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="beta">Beta</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--text-secondary)]">
          Showing {filteredServices.length} of {services.length} services
        </span>
        {(languageFilter !== 'all' || roleFilter !== 'all' || statusFilter !== 'all') && (
          <button
            onClick={() => {
              setLanguageFilter('all');
              setRoleFilter('all');
              setStatusFilter('all');
            }}
            className="text-sm text-[var(--accent-orange)] hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Service Blueprints */}
      <div className="space-y-4">
        {filteredServices.map((service) => {
          const langStyle = languageColors[service.language];
          return (
            <div key={service.name} className="rounded-lg border border-[var(--border-color)] bg-white overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-orange)]/10 flex items-center justify-center">
                    <span className="text-xl">{roleIcons[service.role]}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[var(--text-primary)]">{service.name}</h3>
                      {service.badge && (
                        <span className="refactor-badge">{service.badge}</span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${langStyle.bg} ${langStyle.text}`}>
                    {langStyle.label}
                  </span>
                  {service.status === 'active' ? (
                    <span className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700">
                      <CheckCircle2 className="w-3 h-3" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700">
                      <AlertCircle className="w-3 h-3" />
                      Beta
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Connection Info */}
                <div className="flex items-center gap-4 mb-4 p-3 bg-[var(--bg-secondary)] rounded-lg">
                  <div>
                    <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Port</span>
                    <p className="font-mono text-sm text-[var(--text-primary)]">{service.port}</p>
                  </div>
                  <div className="w-px h-8 bg-[var(--border-color)]" />
                  <div>
                    <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Local URL</span>
                    <p className="font-mono text-sm text-[var(--text-primary)]">http://localhost:{service.port}</p>
                  </div>
                  <div className="w-px h-8 bg-[var(--border-color)]" />
                  <div>
                    <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Health</span>
                    <p className="font-mono text-sm text-[var(--accent-orange)]">/health</p>
                  </div>
                </div>

                {/* Endpoints */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Key Endpoints
                  </h4>
                  <div className="space-y-2">
                    {service.endpoints.map((endpoint, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 rounded-md bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                      >
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${methodColors[endpoint.method] ?? 'bg-gray-100 text-gray-700'}`}>
                          {endpoint.method}
                        </span>
                        <code className="font-mono text-sm text-[var(--text-primary)]">{endpoint.path}</code>
                        <span className="text-sm text-[var(--text-muted)] ml-auto">{endpoint.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--text-secondary)]">No services match the selected filters.</p>
        </div>
      )}
    </div>
  );
}
