import { Link } from 'react-router-dom';
import { Terminal, Apple, Monitor, Zap, ArrowRight, Github, Download } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      {/* Hero */}
      <section className="flex flex-col lg:flex-row items-center gap-8 mb-16">
        <div className="flex-1">
          <p className="text-xs font-medium text-[#D4B08C] uppercase tracking-wider mb-4">Gizzi Code Documentation</p>
          <h1 className="font-serif text-5xl text-[#E5E5E5] mb-4">
            AI-powered coding assistant
          </h1>
          <p className="text-lg text-[#9B9B9B] mb-8">
            Build features, fix bugs, and automate development tasks. Gizzi Code 
            understands your entire codebase and works across multiple files.
          </p>

          {/* Install Commands */}
          <div className="bg-[#0d0d12] border border-[#D4B08C]/30 rounded-xl p-4 mb-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <code className="flex-1 font-mono text-sm text-[#D4B08C] text-left">
                curl -fsSL https://install.gizziio.com/install | bash
              </code>
              <a
                href="https://install.gizziio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D4B08C] text-[#0A0A0F] rounded-lg font-medium hover:bg-[#E8997A] transition-colors whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                Install Now
              </a>
            </div>
          </div>
          <div className="bg-[#0d0d12] border border-[#D4B08C]/30 rounded-xl p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <code className="flex-1 font-mono text-sm text-[#D4B08C] text-left">
                npm install -g @allternit/gizzi-code
              </code>
              <a
                href="https://www.npmjs.com/package/@allternit/gizzi-code"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[#D4B08C] text-[#D4B08C] rounded-lg font-medium hover:bg-[#D4B08C] hover:text-[#0A0A0F] transition-colors whitespace-nowrap"
              >
                NPM
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/docs/quickstart" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E5E5E5] text-[#0A0A0F] rounded-lg font-medium hover:bg-[#9B9B9B] transition-colors">
              <Zap className="w-4 h-4" />
              Quickstart
            </Link>
            <a href="https://github.com/Gizziio/allternit-platform/tree/main/cmd/gizzi-code" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#2A2A3A] text-[#E5E5E5] rounded-lg font-medium hover:bg-[#12121A] transition-colors">
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a href="https://docs.allternit.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#2A2A3A] text-[#E5E5E5] rounded-lg font-medium hover:bg-[#12121A] transition-colors">
              Allternit Docs →
            </a>
          </div>

          {/* SDK Promo */}
          <div className="mt-6 p-4 rounded-xl border border-[#2A2A3A] bg-[#12121A]">
            <p className="text-sm text-[#9B9B9B] mb-2">
              Building on the Allternit platform?
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.npmjs.com/package/@allternit/sdk" target="_blank" rel="noopener noreferrer" className="text-[#D4B08C] hover:underline text-sm">
                @allternit/sdk
              </a>
              <a href="https://www.npmjs.com/package/@allternit/plugin-sdk" target="_blank" rel="noopener noreferrer" className="text-[#D4B08C] hover:underline text-sm">
                Plugin SDK
              </a>
              <a href="https://www.npmjs.com/package/@allternit/api-client" target="_blank" rel="noopener noreferrer" className="text-[#D4B08C] hover:underline text-sm">
                API Client
              </a>
            </div>
          </div>
        </div>

        {/* Gizzi Mascot */}
        <div className="flex-shrink-0 text-center">
          <pre className="font-mono text-sm leading-tight text-[#D4B08C] mb-4">
{`      ▄▄      
   ▄▄▄  ▄▄▄   
 ▄██████████▄ 
 █  ●    ●  █ 
 █  A : / / █ 
  ▀████████▀  
   █ █  █ █   
   ▀ ▀  ▀ ▀   `}
          </pre>
          <div className="flex justify-center gap-2">
            {['Claude', 'OpenAI', 'Kimi', 'Gemini'].map(p => (
              <span key={p} className="px-2 py-1 bg-[#12121A] rounded text-xs text-[#9B9B9B]">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Environment Cards */}
      <section className="mb-16">
        <p className="text-xs font-medium text-[#D4B08C] uppercase tracking-wider mb-4">Choose Your Environment</p>
        <h2 className="font-serif text-3xl text-[#E5E5E5] mb-8">Get started in minutes</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Terminal, name: 'Terminal', desc: 'Full CLI', cmd: 'curl ... | bash', primary: true },
            { icon: Terminal, name: 'NPM', desc: 'Global install', cmd: 'npm i -g @allternit/gizzi-code' },
            { icon: Monitor, name: 'VS Code', desc: 'Extension', cmd: 'Marketplace' },
            { icon: Apple, name: 'Desktop', desc: 'Standalone app', cmd: 'Download' },
          ].map((s) => (
            <div key={s.name} className={`rounded-xl border p-5 transition-all ${s.primary ? 'border-[#D4B08C]/30 bg-[#D4B08C]/5' : 'border-[#2A2A3A] hover:border-[#D4B08C]/30'}`}>
              <s.icon className={`w-8 h-8 mb-3 ${s.primary ? 'text-[#D4B08C]' : 'text-[#6B6B6B]'}`} />
              <h3 className="font-semibold text-[#E5E5E5] mb-1">{s.name}</h3>
              <p className="text-sm text-[#9B9B9B] mb-3">{s.desc}</p>
              <code className="text-xs text-[#D4B08C] font-mono">{s.cmd}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mb-16">
        <p className="text-xs font-medium text-[#D4B08C] uppercase tracking-wider mb-4">Features</p>
        <h2 className="font-serif text-3xl text-[#E5E5E5] mb-8">What you can do</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            'Natural Language Commands',
            'Multi-file Editing',
            'Git Integration',
            'Provider Flexibility',
            'Skill System',
            'Local-First',
          ].map((f) => (
            <div key={f} className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#D4B08C]/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-[#D4B08C]" />
              </div>
              <div>
                <h3 className="font-medium text-[#E5E5E5] mb-1">{f}</h3>
                <p className="text-sm text-[#9B9B9B]">Description coming soon...</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className="rounded-xl border border-[#2A2A3A] bg-[#12121A] p-8">
        <h2 className="font-serif text-2xl text-[#E5E5E5] mb-6">Ready to dive deeper?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/docs/quickstart" className="group">
            <div className="flex items-center gap-2 text-[#D4B08C] font-medium mb-2">
              <Zap className="w-4 h-4" />
              Quickstart
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-sm text-[#9B9B9B]">Your first task with Gizzi</p>
          </Link>
          <Link to="/docs/cli" className="group">
            <div className="flex items-center gap-2 text-[#D4B08C] font-medium mb-2">
              <Terminal className="w-4 h-4" />
              CLI Reference
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-sm text-[#9B9B9B]">All commands and options</p>
          </Link>
          <a href="https://docs.allternit.com" target="_blank" rel="noopener noreferrer" className="group">
            <div className="flex items-center gap-2 text-[#D4B08C] font-medium mb-2">
              Allternit Docs
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-sm text-[#9B9B9B]">Platform & API documentation</p>
          </a>
        </div>
      </section>
    </div>
  );
}
