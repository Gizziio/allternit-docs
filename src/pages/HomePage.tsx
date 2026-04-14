import { Link } from 'react-router-dom';
import { 
  Play, 
  Key, 
  BookOpen, 
  Code,
  Terminal,
  Layers,
  Cpu,
  Globe,
  Zap,
  Brain
} from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';

export function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section>
        <p className="section-label mb-4">Allternit Platform</p>
        <h1 className="serif text-5xl text-[var(--text-primary)] mb-4">
          Start building with Allternit
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mb-8">
          Everything you need to build intelligent agents. From first API call to production deployment.
        </p>

        {/* Search Bar */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="What do you want to build?"
              className="w-full px-4 py-3 pl-10 rounded-lg border border-[var(--border-color)] bg-white text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-orange)]/50"
            />
            <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          </div>
          <kbd className="hidden md:flex items-center gap-1 px-2 py-2 text-xs bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded text-[var(--text-muted)]">
            <span>⌘</span>
            <span>K</span>
          </kbd>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <Link
            to="/docs/fundamentals/quickstart"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--text-primary)] text-white rounded-lg font-medium hover:bg-[var(--text-primary)]/90 transition-colors"
          >
            <Play className="w-4 h-4" />
            Quickstart
          </Link>
          <Link
            to="/docs/api"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg font-medium hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <Key className="w-4 h-4" />
            Get API key
          </Link>
          <Link
            to="/docs/api"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg font-medium hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <Code className="w-4 h-4" />
            API reference
          </Link>
          <Link
            to="/research"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg font-medium hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <Brain className="w-4 h-4" />
            Research
          </Link>
        </div>

        {/* Code Example */}
        <CodeBlock
          title="Install Allternit SDK"
          examples={[
            {
              language: 'bash',
              label: 'SDK',
              code: 'npm install @allternit/sdk',
            },
            {
              language: 'bash',
              label: 'API Client',
              code: 'npm install @allternit/api-client',
            },
            {
              language: 'bash',
              label: 'curl',
              code: 'curl -fsSL https://install.gizziio.com/install | bash',
            },
            {
              language: 'bash',
              label: 'homebrew',
              code: 'brew install --cask gizzi-code',
            },
          ]}
        />
      </section>

      {/* Gizzi Code Platform Section */}
      <section className="rounded-xl border-2 border-[#D4B08C]/30 bg-gradient-to-br from-[#0a0a0f] via-[#12121a] to-[#1a1512] p-8 mb-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4B08C]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div className="relative flex flex-col lg:flex-row items-center gap-8">
          {/* Gizzi Mascot ASCII */}
          <div className="flex-shrink-0 text-center">
            <pre className="font-mono text-xs sm:text-sm leading-tight inline-block" style={{ color: '#D4B08C' }}>
{`      ▄▄      
   ▄▄▄  ▄▄▄   
 ▄██████████▄ 
 █  ●    ●  █ 
 █  A : / / █ 
  ▀████████▀  
   █ █  █ █   
   ▀ ▀  ▀ ▀   `}
            </pre>
            <p className="text-[#8f6f56] text-sm mt-2 font-mono font-bold">GIZZI CODE</p>
          </div>
          
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
              <span className="px-3 py-1 bg-[#D4B08C] text-white text-xs rounded-full font-bold">NEW</span>
              <h2 className="serif text-3xl text-[#D4B08C]">Gizzi Code</h2>
            </div>
            <p className="text-[var(--text-secondary)] text-lg mb-6">
              AI-powered terminal interface for the Allternit ecosystem. Natural language command execution with multi-provider AI support.
            </p>
            
            {/* Install Commands */}
            <div className="bg-[#0d0d12] border border-[#D4B08C]/30 rounded-lg p-4 mb-3">
              <p className="text-xs text-[#9B9B9B] mb-2 font-mono">curl install</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <code className="flex-1 font-mono text-sm text-[#D4B08C] text-left">
                  curl -fsSL https://install.gizziio.com/install | bash
                </code>
                <a
                  href="https://install.gizziio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D4B08C] text-white rounded-lg font-medium hover:bg-[#D4B08C]/90 transition-colors whitespace-nowrap"
                >
                  <Terminal className="w-4 h-4" />
                  Install Now
                </a>
              </div>
            </div>
            <div className="bg-[#0d0d12] border border-[#D4B08C]/30 rounded-lg p-4 mb-6">
              <p className="text-xs text-[#9B9B9B] mb-2 font-mono">npm install</p>
              <code className="block font-mono text-sm text-[#D4B08C] text-left">
                npm install -g @allternit/gizzi-code
              </code>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="px-3 py-2 bg-[var(--bg-secondary)] rounded-lg text-center">
                <span className="text-[var(--text-secondary)] text-sm">Claude</span>
              </div>
              <div className="px-3 py-2 bg-[var(--bg-secondary)] rounded-lg text-center">
                <span className="text-[var(--text-secondary)] text-sm">OpenAI</span>
              </div>
              <div className="px-3 py-2 bg-[var(--bg-secondary)] rounded-lg text-center">
                <span className="text-[var(--text-secondary)] text-sm">Kimi</span>
              </div>
              <div className="px-3 py-2 bg-[var(--bg-secondary)] rounded-lg text-center">
                <span className="text-[var(--text-secondary)] text-sm">Gemini</span>
              </div>
            </div>
            
            {/* Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm">
              <a href="https://install.gizziio.com" target="_blank" rel="noopener noreferrer" className="text-[#D4B08C] hover:underline font-medium">
                Install Options →
              </a>
              <a href="https://github.com/Gizziio/allternit-platform/tree/main/cmd/gizzi-code" target="_blank" rel="noopener noreferrer" className="text-[#d4b08c] hover:underline">
                GitHub
              </a>
              <Link to="/docs/gizzi-code/quickstart" className="text-[var(--text-secondary)] hover:text-[#D4B08C]">
                Documentation
              </Link>
              <a href="https://www.npmjs.com/package/@allternit/gizzi-code" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[#D4B08C]">
                NPM
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section>
        <p className="section-label mb-4">Platform</p>
        <h2 className="serif text-3xl text-[var(--text-primary)] mb-4">
          Choose how you build
        </h2>
        <p className="text-[var(--text-secondary)] mb-8 max-w-2xl">
          Pick the developer surface that matches your approach, and the infrastructure that fits your stack.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Allternit API Card */}
          <div className="feature-card">
            <div className="h-32 bg-[var(--bg-tertiary)] flex items-center justify-center">
              <Terminal className="w-16 h-16 text-[var(--text-muted)]" />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-xl text-[var(--text-primary)] mb-2">Allternit API</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Send a request, get a response. You construct every turn, manage conversation state, and write your own tool loop.
              </p>
              <div className="space-y-2">
                <Link to="/docs/fundamentals/quickstart" className="flex items-center gap-2 text-[var(--accent-orange)] hover:underline">
                  <Play className="w-4 h-4" />
                  Quickstart
                </Link>
                <Link to="/docs/api" className="flex items-center gap-2 text-[var(--accent-orange)] hover:underline">
                  <BookOpen className="w-4 h-4" />
                  API reference
                </Link>
                <a href="https://www.npmjs.com/package/@allternit/api-client" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--accent-orange)] hover:underline">
                  <Code className="w-4 h-4" />
                  npm install @allternit/api-client
                </a>
              </div>
            </div>
          </div>

          {/* Agent SDK Card */}
          <div className="feature-card">
            <div className="h-32 bg-[var(--bg-tertiary)] flex items-center justify-center">
              <Globe className="w-16 h-16 text-[var(--text-muted)]" />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-xl text-[var(--text-primary)] mb-2">Agent SDK</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Build plugins and agents with the Allternit SDK. Includes types, adapters, workflow engine, and the universal plugin SDK.
              </p>
              <div className="space-y-2">
                <Link to="/docs/fundamentals/quickstart" className="flex items-center gap-2 text-[var(--accent-orange)] hover:underline">
                  <Play className="w-4 h-4" />
                  SDK Quickstart
                </Link>
                <a href="https://www.npmjs.com/package/@allternit/sdk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--accent-orange)] hover:underline">
                  <Code className="w-4 h-4" />
                  npm install @allternit/sdk
                </a>
                <a href="https://www.npmjs.com/package/@allternit/plugin-sdk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--accent-orange)] hover:underline">
                  <Code className="w-4 h-4" />
                  Plugin SDK
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Links */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <a href="#" className="quick-link">
            <Layers className="w-4 h-4" />
            Docker Compose
          </a>
          <a href="#" className="quick-link">
            <Cpu className="w-4 h-4" />
            Kubernetes
          </a>
          <a href="#" className="quick-link">
            <Globe className="w-4 h-4" />
            VPS Deployment
          </a>
        </div>
      </section>

      {/* SDK AI Runtime Section */}
      <section>
        <p className="section-label mb-4">AI Runtime</p>
        <h2 className="serif text-3xl text-[var(--text-primary)] mb-4">
          Unified AI harness with 10+ providers
        </h2>
        <p className="text-[var(--text-secondary)] mb-8 max-w-2xl">
          The @allternit/sdk v1.2.10 AI runtime gives you a single interface for streaming completions across Claude, OpenAI, Gemini, Ollama, Groq, and more.
        </p>

        <CodeBlock
          title="BYOK streaming with the harness"
          examples={[
            {
              language: 'typescript',
              label: 'Harness',
              code: `import { AllternitHarness } from '@allternit/sdk/ai-runtime';

const harness = new AllternitHarness({
  mode: 'byok',
  byok: {
    anthropic: { apiKey: process.env.ANTHROPIC_API_KEY },
    openai: { apiKey: process.env.OPENAI_API_KEY },
  }
});

const stream = harness.stream({
  provider: 'anthropic',
  model: 'claude-3-haiku-20240307',
  messages: [{ role: 'user', content: 'Hello!' }]
});

for await (const chunk of stream) {
  if (chunk.type === 'text') process.stdout.write(chunk.text);
}`,
            },
            {
              language: 'typescript',
              label: 'Providers',
              code: `import { AllternitOllama, createProvider } from '@allternit/sdk/ai-runtime';

// Local Ollama
const ollama = new AllternitOllama();
const models = await ollama.listModels();

// Or use the registry
const provider = createProvider('groq', { apiKey: 'xxx' });
const result = await provider.chatStream({ messages: [...] });`,
            },
            {
              language: 'typescript',
              label: 'ACP',
              code: `import { ACPHarnessBridge, acpRegistry } from '@allternit/sdk/ai-runtime';

const bridge = new ACPHarnessBridge(harness);
acpRegistry.register({
  agentId: 'my-agent',
  name: 'My Agent',
  capabilities: [{ name: 'chat', tools: [] }],
  endpoints: { rest: 'http://localhost:3000' }
});`,
            },
          ]}
        />

        <div className="grid md:grid-cols-4 gap-4 mt-6">
          {['Anthropic', 'OpenAI', 'Google', 'Ollama', 'Mistral', 'Groq', 'Cohere', 'Azure', 'Bedrock', 'Together'].map((p) => (
            <div key={p} className="px-3 py-2 bg-[var(--bg-secondary)] rounded-lg text-center">
              <span className="text-[var(--text-secondary)] text-sm">{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Plugins Section */}
      <section>
        <p className="section-label mb-4">Plugins</p>
        <h2 className="serif text-3xl text-[var(--text-primary)] mb-4">
          12 ready-to-use card plugins
        </h2>
        <p className="text-[var(--text-secondary)] mb-8 max-w-2xl">
          Install template plugins directly from NPM. Each plugin works across MCP, HTTP, CLI, and VS Code adapters.
        </p>

        <CodeBlock
          title="Install a plugin"
          examples={[
            {
              language: 'bash',
              label: 'Market Research',
              code: 'npm install -g @allternit/marketresearchcard-plugin',
            },
            {
              language: 'bash',
              label: 'Code Review',
              code: 'npm install -g @allternit/codereviewcard-plugin',
            },
            {
              language: 'bash',
              label: 'Image Gen',
              code: 'npm install -g @allternit/imagegencard-plugin',
            },
          ]}
        />

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <a href="https://www.npmjs.com/package/@allternit/plugin-sdk" target="_blank" rel="noopener noreferrer" className="quick-link">
            <Code className="w-4 h-4" />
            Plugin SDK
          </a>
          <a href="https://www.npmjs.com/search?q=%40allternit%20plugin" target="_blank" rel="noopener noreferrer" className="quick-link">
            <Globe className="w-4 h-4" />
            Browse plugins
          </a>
          <Link to="/docs/plugins/quickstart" className="quick-link">
            <Play className="w-4 h-4" />
            Build a plugin
          </Link>
        </div>
      </section>
    </div>
  );
}
