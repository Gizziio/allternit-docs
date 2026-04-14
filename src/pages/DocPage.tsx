import { useParams, Link } from 'react-router-dom';
import { ChevronRight, AlertTriangle, Cpu, Monitor, Code2 } from 'lucide-react';
import { CodeBlock, InlineCode } from '../components/CodeBlock';

// Documentation content store
const docContent: Record<string, {
  title: string;
  description: string;
  breadcrumb: string[];
  badge?: string;
  sections: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
}> = {
  // Fundamentals
  'fundamentals/welcome': {
    title: 'Welcome to Allternit',
    description: 'High-level platform value proposition',
    breadcrumb: ['First steps', 'Welcome to Allternit'],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Allternit is an enterprise-grade agentic operating system designed to orchestrate 
              intelligent agents across multiple interfaces. Built on the principle of 
              &quot;One Brain, Multiple Faces, One Nervous System,&quot; Allternit provides a unified 
              platform for developing, deploying, and managing AI agents at scale.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-amber-800 font-medium mb-2">
                <AlertTriangle className="w-4 h-4" />
                Phase 1 Refactor
              </div>
              <p className="text-amber-700 text-sm">
                This documentation reflects the current Phase 1 Refactor. Some APIs may change 
                as we consolidate from 7-apps/ to surfaces/.
              </p>
            </div>
          </>
        ),
      },
      {
        id: 'what-is-allternit',
        title: 'What is Allternit?',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Allternit is a comprehensive platform for building and deploying 
              agentic AI systems. It consists of three core components:
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-4 bg-[var(--bg-secondary)] rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-orange)]/10 flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-5 h-5 text-[var(--accent-orange)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-1">One Brain (Gizzi)</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    The core runtime engine that plans, reasons, and executes agent logic.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[var(--bg-secondary)] rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Monitor className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-1">Multiple Faces (Surfaces)</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Desktop, Web, CLI, and Browser Extension interfaces for different use cases.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[var(--bg-secondary)] rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Code2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-1">One Nervous System (SDK)</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    A unified interface connecting all surfaces to the brain.
                  </p>
                </div>
              </div>
            </div>
          </>
        ),
      },
      {
        id: 'key-features',
        title: 'Key Features',
        content: (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Multi-Model Support', desc: 'GPT-4, Claude, and local models' },
                { title: 'Git-Based Lineage', desc: 'Version control for agent evolution' },
                { title: 'Real-time Communication', desc: 'WebSocket-based event streaming' },
                { title: 'Polyglot Services', desc: 'Rust, Python, and TypeScript microservices' },
                { title: 'Skill System', desc: 'Extensible capabilities framework' },
                { title: 'Multi-Surface', desc: 'Desktop, Web, CLI, and Browser' },
              ].map((feature) => (
                <div key={feature.title} className="p-4 rounded-lg border border-[var(--border-color)] bg-white">
                  <h4 className="font-medium text-[var(--text-primary)] mb-1">{feature.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{feature.desc}</p>
                </div>
              ))}
            </div>
          </>
        ),
      },
    ],
  },
  
  'fundamentals/architecture': {
    title: 'The Architecture',
    description: 'Understanding the One Brain, Many Faces model',
    breadcrumb: ['First steps', 'The Architecture'],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The Allternit platform follows a unique architectural pattern that separates 
              the core intelligence (Brain) from the user interfaces (Faces) while maintaining 
              a unified communication layer (Nervous System).
            </p>
          </>
        ),
      },
      {
        id: 'the-brain',
        title: 'The Brain (Gizzi)',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Gizzi is the central orchestration engine responsible for:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                'Agent lifecycle management',
                'Code execution and sandboxing',
                'Model interaction and prompt engineering',
                'State management and persistence',
                'Event coordination between agents',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)]" />
                  <span className="text-[var(--text-secondary)]">{item}</span>
                </li>
              ))}
            </ul>
            <CodeBlock
              examples={[
                {
                  language: 'typescript',
                  label: 'TypeScript',
                  code: `import { GizziRuntime } from '@allternit/sdk';

const runtime = new GizziRuntime({
  model: 'gpt-4',
  sandbox: true,
  memory: 'persistent',
});

await runtime.initialize();`,
                },
              ]}
            />
          </>
        ),
      },
      {
        id: 'the-faces',
        title: 'The Faces (Surfaces)',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Surfaces are the user-facing interfaces that interact with the Brain:
            </p>
            <div className="space-y-3 mb-4">
              {[
                { name: 'Desktop App', desc: 'Electron-based control plane for local/remote backends', path: '/docs/surfaces/desktop' },
                { name: 'Web Platform', desc: 'React dashboard with workflow designer', path: '/docs/surfaces/platform' },
                { name: 'CLI Tools', desc: 'Terminal interface for power users', path: '/docs/surfaces/cli' },
                { name: 'Browser Extension', desc: 'Thin client for web-wide agent presence', path: '/docs/surfaces/extension' },
              ].map((surface) => (
                <Link
                  key={surface.name}
                  to={surface.path}
                  className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-orange)]/30 hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <div>
                    <span className="font-medium text-[var(--text-primary)]">{surface.name}</span>
                    <span className="text-[var(--text-secondary)] text-sm ml-2">{surface.desc}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
                </Link>
              ))}
            </div>
          </>
        ),
      },
      {
        id: 'the-nervous-system',
        title: 'The Nervous System (SDK)',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The SDK provides a unified interface for all surfaces to communicate with the Brain:
            </p>
            <CodeBlock
              examples={[
                {
                  language: 'typescript',
                  label: 'TypeScript',
                  code: `import { AllternitClient } from '@allternit/sdk';

const client = new AllternitClient({
  endpoint: 'http://localhost:8013',
  token: process.env.ALLTERNIT_TOKEN,
});

// Start an agent
await client.agents.run({
  agentId: 'my-agent',
  input: 'Hello, world!',
});`,
                },
              ]}
            />
          </>
        ),
      },
    ],
  },
  
  'fundamentals/quickstart': {
    title: 'Quickstart',
    description: 'Get up and running in minutes',
    breadcrumb: ['First steps', 'Quickstart'],
    sections: [
      {
        id: 'prerequisites',
        title: 'Prerequisites',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Before you begin, ensure you have the following installed:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                'Node.js 18+',
                'Docker & Docker Compose',
                'Git',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)]" />
                  <span className="text-[var(--text-secondary)]">{item}</span>
                </li>
              ))}
            </ul>
          </>
        ),
      },
      {
        id: 'installation',
        title: 'Installation',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Install the Allternit CLI globally:
            </p>
            <CodeBlock
              title="Install CLI"
              examples={[
                {
                  language: 'npm',
                  label: 'npm',
                  code: 'npm install -g @allternit/cli',
                },
                {
                  language: 'yarn',
                  label: 'yarn',
                  code: 'yarn global add @allternit/cli',
                },
              ]}
            />
          </>
        ),
      },
      {
        id: 'first-project',
        title: 'Create Your First Project',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Initialize a new Allternit project:
            </p>
            <InlineCode code={`allternit init my-first-agent
cd my-first-agent`} />
            <p className="text-[var(--text-secondary)] leading-relaxed mt-4 mb-4">
              Start the development environment:
            </p>
            <InlineCode code="allternit dev" />
            <p className="text-[var(--text-secondary)] leading-relaxed mt-4">
              This will start all services and open the Web Platform at{' '}
              <code className="px-1.5 py-0.5 bg-[var(--code-bg)] rounded text-sm">http://localhost:3001</code>.
            </p>
          </>
        ),
      },
    ],
  },
  
  // Core
  'core/gizzi-runtime': {
    title: 'Gizzi Runtime',
    description: 'How the agent executes code',
    breadcrumb: ['The Core', 'Gizzi Runtime'],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Gizzi is the core runtime engine that executes agent code. It provides a secure 
              sandboxed environment for running agent logic while managing state, memory, and 
              communication with external services.
            </p>
          </>
        ),
      },
      {
        id: 'execution-model',
        title: 'Execution Model',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Gizzi uses a message-passing execution model where agents communicate through 
              channels. Each agent runs in its own isolated context with access to:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                'Memory store for state persistence',
                'Skill registry for capability discovery',
                'Message bus for inter-agent communication',
                'Model gateway for LLM interactions',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)]" />
                  <span className="text-[var(--text-secondary)]">{item}</span>
                </li>
              ))}
            </ul>
            <CodeBlock
              examples={[
                {
                  language: 'typescript',
                  label: 'TypeScript',
                  code: `import { Agent } from '@allternit/sdk';

const agent = new Agent({
  id: 'my-agent',
  runtime: 'gizzi-pro',
  skills: ['code', 'web', 'file'],
});

await agent.initialize();
const result = await agent.run('Analyze this codebase');`,
                },
              ]}
            />
          </>
        ),
      },
    ],
  },
  
  'core/communication': {
    title: 'Communication Layer',
    description: 'The ac (Agent Communication) protocol — message board, channels, Git DAG, and API keys',
    breadcrumb: ['The Core', 'Communication Layer'],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The <strong>ac (Agent Communication)</strong> protocol is Allternit's inter-agent messaging layer.
              It provides a Git-DAG-backed message board, typed channels, API key management,
              and rate limiting — giving every agent a verifiable, auditable communication history.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {[
                { title: 'Message Board', desc: 'Persistent, ordered message log per channel' },
                { title: 'Git DAG', desc: 'Cryptographically auditable lineage for every message' },
                { title: 'API Keys', desc: 'Per-agent scoped keys with rate limiting' },
              ].map((f) => (
                <div key={f.title} className="p-4 rounded-lg border border-[var(--border-color)] bg-white">
                  <h4 className="font-medium text-[var(--text-primary)] mb-1">{f.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{f.desc}</p>
                </div>
              ))}
            </div>
          </>
        ),
      },
      {
        id: 'channels',
        title: 'Channels',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Channels are named communication lanes. Each channel has a type that determines
              delivery semantics (broadcast, unicast, or request/reply).
            </p>
            <CodeBlock
              examples={[
                {
                  language: 'typescript',
                  label: 'TypeScript',
                  code: `import { AcClient } from '@allternit/ac';

const ac = new AcClient({ apiKey: process.env.AC_API_KEY });

// Subscribe to a channel
const unsub = ac.channels.subscribe('agent.events', (msg) => {
  console.log(msg.type, msg.payload);
});

// Publish a message
await ac.channels.publish('agent.events', {
  type: 'task.completed',
  payload: { taskId: 'abc123', result: 'ok' },
});

unsub();`,
                },
              ]}
            />
          </>
        ),
      },
      {
        id: 'message-board',
        title: 'Message Board',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The message board is a persistent, append-only log. Every message is committed
              to the Git DAG, giving a tamper-evident history that can be replayed or audited.
            </p>
            <CodeBlock
              examples={[
                {
                  language: 'typescript',
                  label: 'TypeScript',
                  code: `// Post to the message board
await ac.board.post({
  channel: 'workspace.eoj',
  content: 'Analysis complete — 14 issues found.',
  attachments: [{ type: 'report', url: '/reports/abc123' }],
});

// Read recent messages
const messages = await ac.board.list('workspace.eoj', { limit: 50 });

// Replay from a specific commit hash
const replay = await ac.board.replay('workspace.eoj', {
  from: 'a3f9c12',
});`,
                },
              ]}
            />
          </>
        ),
      },
      {
        id: 'git-dag',
        title: 'Git DAG Lineage',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Every message, session, and agent action is recorded in a Git DAG. This provides
              Constitutional-grade auditability — you can always trace what an agent did, when,
              and why.
            </p>
            <CodeBlock
              examples={[
                {
                  language: 'bash',
                  label: 'CLI',
                  code: `# View full lineage for an agent session
ac log --session ses_abc123

# Show diff between two agent states
ac diff ses_abc123 ses_abc456

# Rollback a channel to a prior state
ac rollback workspace.eoj --to a3f9c12

# Export audit trail (JSON)
ac export --session ses_abc123 --format json > audit.json`,
                },
              ]}
            />
          </>
        ),
      },
      {
        id: 'api-keys',
        title: 'API Keys & Rate Limiting',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Each agent receives a scoped API key. Keys can be restricted by channel,
              message type, and rate limit. Revocation is instant and also logged to the DAG.
            </p>
            <CodeBlock
              examples={[
                {
                  language: 'bash',
                  label: 'CLI',
                  code: `# Create a scoped key for an agent
ac keys create \\
  --name "analysis-agent" \\
  --channels "workspace.*" \\
  --rate-limit 100/min

# List active keys
ac keys list

# Revoke a key
ac keys revoke key_abc123`,
                },
                {
                  language: 'typescript',
                  label: 'TypeScript',
                  code: `// Programmatic key management
const key = await ac.keys.create({
  name: 'analysis-agent',
  channels: ['workspace.*'],
  rateLimit: { requests: 100, window: '1m' },
});

console.log(key.secret); // Store securely — shown once`,
                },
              ]}
            />
          </>
        ),
      },
    ],
  },
  
  'core/git-dag': {
    title: 'Git DAG & Lineage',
    description: 'Tracking agent evolution and state',
    breadcrumb: ['The Core', 'Git DAG'],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Allternit uses Git as the underlying storage mechanism for agent state, 
              enabling complete version control and lineage tracking for agent evolution.
            </p>
            <CodeBlock
              examples={[
                {
                  language: 'bash',
                  label: 'CLI',
                  code: `# View agent lineage
allternit agent:log my-agent

# Rollback to previous version
allternit agent:rollback my-agent v1.2.0

# Fork an agent
allternit agent:fork my-agent my-agent-v2`,
                },
              ]}
            />
          </>
        ),
      },
    ],
  },
  
  'core/skills': {
    title: 'Skills & Tools',
    description: 'Creating capabilities in the skills/ directory',
    breadcrumb: ['The Core', 'Skills'],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Skills are reusable capabilities that agents can invoke. They are defined 
              in the skills/ directory and registered with the skill registry.
            </p>
            <CodeBlock
              examples={[
                {
                  language: 'typescript',
                  label: 'TypeScript',
                  code: `// skills/code.ts
import { Skill } from '@allternit/sdk';

export const codeSkill: Skill = {
  name: 'code',
  description: 'Read and write code files',
  
  async execute(action, params) {
    if (action === 'read') {
      return fs.readFile(params.path, 'utf-8');
    }
    if (action === 'write') {
      await fs.writeFile(params.path, params.content);
      return { success: true };
    }
  },
};`,
                },
              ]}
            />
          </>
        ),
      },
    ],
  },
  
  // API & SDK
  'api/typescript-sdk': {
    title: 'TypeScript SDK',
    description: 'The @allternitchitech/capsule-sdk — lifecycle, EventBus, ActionRegistry',
    breadcrumb: ['API & SDK', 'TypeScript SDK'],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              <strong>@allternitchitech/capsule-sdk</strong> is the zero-dependency TypeScript SDK
              for building capsules — the self-contained agent units that power every Allternit surface.
              It provides a lifecycle state machine, a typed EventBus, and an ActionRegistry for
              dead-button prevention.
            </p>
            <InlineCode code="npm install @allternitchitech/capsule-sdk" />
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {[
                { title: 'Lifecycle', desc: 'init → connecting → ready → busy → disposed state machine' },
                { title: 'EventBus', desc: 'Type-safe async/sync event dispatch with scoped subscriptions' },
                { title: 'ActionRegistry', desc: 'Register actions before rendering UI — prevents dead buttons' },
              ].map((f) => (
                <div key={f.title} className="p-4 rounded-lg border border-[var(--border-color)] bg-white">
                  <h4 className="font-medium text-[var(--text-primary)] mb-1">{f.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{f.desc}</p>
                </div>
              ))}
            </div>
          </>
        ),
      },
      {
        id: 'lifecycle',
        title: 'Lifecycle State Machine',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Every capsule moves through a defined set of phases. Invalid transitions are
              rejected — the controller enforces the state graph at runtime.
            </p>
            <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] mb-4 font-mono text-sm text-[var(--text-primary)]">
              init → connecting → ready ⇌ busy<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↕&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↕<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;error ←── suspended<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;disposed (terminal)
            </div>
            <CodeBlock
              examples={[
                {
                  language: 'typescript',
                  label: 'TypeScript',
                  code: `import { createLifecycleController, isValidTransition } from '@allternitchitech/capsule-sdk/core';

const lc = createLifecycleController();

// Transition forward
lc.setPhase('connecting');
lc.setPhase('ready');

// Check valid next phases
import { getValidNextPhases } from '@allternitchitech/capsule-sdk/core';
console.log(getValidNextPhases('ready'));
// → ['busy', 'error', 'suspended', 'disposed']

// Attach status text
lc.setPhase('busy');
lc.setStatusText('Running analysis...');

// Handle errors (retryable)
lc.setError({ code: 'MODEL_TIMEOUT', message: 'LLM timed out', retryable: true });
lc.clearError();
lc.setPhase('connecting'); // retry`,
                },
              ]}
            />
          </>
        ),
      },
      {
        id: 'eventbus',
        title: 'EventBus',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The EventBus is the nervous system between capsule components. Events are
              scoped by <code className="px-1 py-0.5 bg-[var(--code-bg)] rounded text-sm">spaceId</code>,{' '}
              <code className="px-1 py-0.5 bg-[var(--code-bg)] rounded text-sm">capsuleId</code>, and{' '}
              <code className="px-1 py-0.5 bg-[var(--code-bg)] rounded text-sm">tabId</code>.
            </p>
            <CodeBlock
              examples={[
                {
                  language: 'typescript',
                  label: 'TypeScript',
                  code: `import {
  createEventBus,
  EVENT_LIFECYCLE_CHANGED,
  EVENT_ACTION_MISSING,
  EVENT_STAGE_CHANGED,
  type A2Event,
  type LifecycleChangedPayload,
} from '@allternitchitech/capsule-sdk/core';

const bus = createEventBus();

// Subscribe
const unsub = bus.on(EVENT_LIFECYCLE_CHANGED, (event: A2Event<LifecycleChangedPayload>) => {
  console.log(event.payload.phase, '←', event.payload.previousPhase);
});

// Emit (async — queued)
await bus.emit({
  id: 'evt_01',
  ts: Date.now(),
  type: EVENT_LIFECYCLE_CHANGED,
  capsuleId: 'caps_abc',
  payload: { phase: 'ready', previousPhase: 'connecting' },
});

// Emit sync (immediate)
bus.emitSync({ ... });

// One-shot handler
bus.once(EVENT_ACTION_MISSING, (e) => console.warn('Missing action:', e.payload.actionId));

// Unsubscribe
unsub();`,
                },
              ]}
            />
            <p className="text-sm text-[var(--text-secondary)] mt-3">
              Core event types:{' '}
              {[
                'capsule.lifecycle.changed',
                'capsule.status',
                'capsule.capabilities',
                'capsule.presentation.changed',
                'capsule.action.missing',
                'stage.changed',
                'capsule.error',
              ].map((t) => (
                <code key={t} className="px-1 py-0.5 bg-[var(--code-bg)] rounded text-xs mr-1">{t}</code>
              ))}
            </p>
          </>
        ),
      },
      {
        id: 'action-registry',
        title: 'ActionRegistry',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The ActionRegistry prevents dead UI buttons. UI components must check whether
              an action is registered before rendering it as clickable. The registry also
              supports the action builder pattern for fluent construction.
            </p>
            <CodeBlock
              examples={[
                {
                  language: 'typescript',
                  label: 'TypeScript',
                  code: `import {
  createActionRegistry,
  BROWSER_ACTIONS,
  type CapsuleAction,
} from '@allternitchitech/capsule-sdk/core';

const registry = createActionRegistry();
const capsuleId = 'caps_browser_01';

// Register actions
registry.register(capsuleId, {
  id: BROWSER_ACTIONS.NAV_BACK,
  label: 'Back',
  icon: 'arrow-left',
  enabled: false,
  run: () => history.back(),
});

// Enable/disable dynamically
registry.update(capsuleId, BROWSER_ACTIONS.NAV_BACK, { enabled: true });

// UI check — only render if registered
if (registry.has(capsuleId, BROWSER_ACTIONS.NAV_BACK)) {
  const action = registry.get(capsuleId, BROWSER_ACTIONS.NAV_BACK)!;
  // render button, call action.run() on click
}

// List all for a capsule
const all: CapsuleAction[] = registry.list(capsuleId);

// Cleanup on dispose
registry.unregister(capsuleId, BROWSER_ACTIONS.NAV_BACK);`,
                },
              ]}
            />
            <p className="text-sm text-[var(--text-secondary)] mt-3">
              Built-in browser action IDs:{' '}
              {Object.values({
                NAV_BACK: 'nav.back', NAV_FORWARD: 'nav.forward', NAV_RELOAD: 'nav.reload',
                STAGE_ENTER: 'stage.enter', STAGE_EXIT: 'stage.exit',
                TAB_NEW: 'tab.new', TAB_CLOSE: 'tab.close',
              }).map((id) => (
                <code key={id} className="px-1 py-0.5 bg-[var(--code-bg)] rounded text-xs mr-1">{id}</code>
              ))}
            </p>
          </>
        ),
      },
      {
        id: 'package-exports',
        title: 'Package Exports',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The SDK ships four named export paths:
            </p>
            <CodeBlock
              examples={[
                {
                  language: 'typescript',
                  label: 'TypeScript',
                  code: `// All types + utilities (tree-shakeable)
import { ... } from '@allternitchitech/capsule-sdk';

// Core: lifecycle, events, actions, capabilities, ids
import { createLifecycleController, createEventBus, createActionRegistry } from '@allternitchitech/capsule-sdk/core';

// Pre-built controllers (higher-level wrappers)
import { ... } from '@allternitchitech/capsule-sdk/controllers';

// Type guards for runtime checks
import { isCapsulePhase, isA2Event } from '@allternitchitech/capsule-sdk/guards';`,
                },
              ]}
            />
          </>
        ),
      },
    ],
  },
  
  'api/event-stream': {
    title: 'Event Stream',
    description: 'WebSocket schemas and real-time events',
    breadcrumb: ['API & SDK', 'Event Stream'],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Allternit uses WebSockets for real-time event streaming. Connect to the 
              event stream to receive agent updates, messages, and system notifications.
            </p>
            <CodeBlock
              examples={[
                {
                  language: 'typescript',
                  label: 'TypeScript',
                  code: `import { EventStream } from '@allternit/sdk';

const stream = new EventStream({
  endpoint: 'ws://localhost:8013/events',
  token: process.env.ALLTERNIT_TOKEN,
});

stream.on('agent.message', (event) => {
  console.log('Agent message:', event.data);
});

stream.on('agent.status', (event) => {
  console.log('Agent status:', event.data.status);
});

await stream.connect();`,
                },
              ]}
            />
          </>
        ),
      },
    ],
  },
  
  // Surfaces
  'surfaces/desktop': {
    title: 'Desktop App',
    description: 'Controlling local/remote backends via Electron',
    breadcrumb: ['Surfaces', 'Desktop App'],
    badge: 'Refactor',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: (
          <>
            <div className="refactor-badge mb-4">
              <AlertTriangle className="w-3 h-3" />
              Phase 1 Refactor
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The Desktop App is an Electron-based control plane for managing local and 
              remote Allternit backends. It provides a native interface for agent management, 
              log viewing, and system configuration.
            </p>
          </>
        ),
      },
    ],
  },
  
  'surfaces/platform': {
    title: 'Platform UI',
    description: 'The main React dashboard and Workflow Designer',
    breadcrumb: ['Surfaces', 'Platform UI'],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The Platform UI is a React-based web dashboard that provides a visual 
              interface for designing workflows, monitoring agents, and managing the 
              Allternit ecosystem.
            </p>
          </>
        ),
      },
    ],
  },
  
  'surfaces/cli': {
    title: 'CLI Tools',
    description: 'Using gizzi and ac in the terminal',
    breadcrumb: ['Surfaces', 'CLI Tools'],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The Allternit CLI provides powerful command-line tools for managing agents, 
              backends, and the entire Allternit ecosystem.
            </p>
          </>
        ),
      },
      {
        id: 'commands',
        title: 'Common Commands',
        content: (
          <>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-[var(--text-primary)] mb-2">allternit init</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Initialize a new Allternit project
                </p>
                <InlineCode code="allternit init my-project" />
              </div>
              <div>
                <h4 className="font-medium text-[var(--text-primary)] mb-2">allternit dev</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Start the development environment
                </p>
                <InlineCode code="allternit dev" />
              </div>
              <div>
                <h4 className="font-medium text-[var(--text-primary)] mb-2">allternit agent</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Manage agents
                </p>
                <InlineCode code={`allternit agent:list
allternit agent:create my-agent
allternit agent:run my-agent`} />
              </div>
            </div>
          </>
        ),
      },
    ],
  },
  
  'surfaces/extension': {
    title: 'Browser Extension',
    description: 'Web-wide agent presence',
    breadcrumb: ['Surfaces', 'Browser Extension'],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: (
          <>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The Browser Extension provides a thin client for Allternit agents to interact 
              with web pages. It enables agents to read page content, fill forms, and 
              perform actions on behalf of users.
            </p>
          </>
        ),
      },
    ],
  },

};

export function DocPage() {
  const { section, '*': subPath } = useParams();
  const docKey = `${section}/${subPath || 'welcome'}`;
  const doc = docContent[docKey];

  if (!doc) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
          Documentation Not Found
        </h1>
        <p className="text-[var(--text-secondary)]">
          The page you&apos;re looking for doesn&apos;t exist yet.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mt-4 text-[var(--accent-orange)] hover:underline"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/" className="hover:text-[var(--text-primary)]">Home</Link>
        <ChevronRight className="w-4 h-4" />
        {doc.breadcrumb.map((crumb, idx) => (
          <span key={crumb} className="flex items-center gap-2">
            {idx > 0 && <ChevronRight className="w-4 h-4" />}
            <span className={idx === doc.breadcrumb.length - 1 ? 'text-[var(--text-primary)]' : ''}>
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="serif text-4xl text-[var(--text-primary)]">{doc.title}</h1>
          {doc.badge && (
            <span className="refactor-badge">
              <AlertTriangle className="w-3 h-3" />
              {doc.badge}
            </span>
          )}
        </div>
        <p className="text-[var(--text-secondary)]">{doc.description}</p>
      </div>

      {/* Content */}
      <div className="space-y-10">
        {doc.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="serif text-2xl text-[var(--text-primary)] mb-4">
              {section.title}
            </h2>
            <div className="prose prose-slate max-w-none">
              {section.content}
            </div>
          </section>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-[var(--border-color)]">
        <Link
          to="/docs/fundamentals"
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          ← Back to Fundamentals
        </Link>
        <Link
          to="/docs/fundamentals/architecture"
          className="text-sm text-[var(--accent-orange)] hover:underline"
        >
          Next: Architecture →
        </Link>
      </div>
    </div>
  );
}
