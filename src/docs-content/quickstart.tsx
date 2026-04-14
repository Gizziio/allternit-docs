export const quickstartContent = {
  title: 'Quickstart',
  description: 'Get started with Allternit in 5 minutes',
  breadcrumb: ['First steps', 'Quickstart'],
  sections: [
    {
      id: 'install',
      title: '1. Install Gizzi Code',
      content: `
        <p class="text-[var(--text-secondary)] leading-relaxed mb-4">
          Gizzi Code is the CLI interface to Allternit. Install it using curl, PowerShell, or npm:
        </p>
        <div class="space-y-4">
          <div class="bg-[var(--bg-secondary)] rounded-lg p-4">
            <p class="text-sm text-[var(--text-muted)] mb-2">macOS/Linux</p>
            <code class="text-[var(--accent-orange)]">curl -fsSL https://install.gizziio.com/install | bash</code>
          </div>
          <div class="bg-[var(--bg-secondary)] rounded-lg p-4">
            <p class="text-sm text-[var(--text-muted)] mb-2">Windows (PowerShell)</p>
            <code class="text-[var(--accent-orange)]">irm https://install.gizziio.com/install.ps1 | iex</code>
          </div>
          <div class="bg-[var(--bg-secondary)] rounded-lg p-4">
            <p class="text-sm text-[var(--text-muted)] mb-2">npm (Universal)</p>
            <code class="text-[var(--accent-orange)]">npm install -g @gizzi/gizzi-code</code>
          </div>
        </div>
      `
    },
    {
      id: 'configure',
      title: '2. Configure Provider',
      content: `
        <p class="text-[var(--text-secondary)] leading-relaxed mb-4">
          Set your AI provider API key:
        </p>
        <div class="bg-[var(--bg-secondary)] rounded-lg p-4 mb-4">
          <code class="text-[var(--accent-orange)]">export ANTHROPIC_API_KEY=sk-ant-api03-...</code>
        </div>
        <p class="text-[var(--text-secondary)] mb-2">Then configure:</p>
        <div class="bg-[var(--bg-secondary)] rounded-lg p-4">
          <code class="text-[var(--accent-orange)]">gizzi-code provider set anthropic</code>
        </div>
      `
    },
    {
      id: 'run',
      title: '3. Run First Command',
      content: `
        <p class="text-[var(--text-secondary)] leading-relaxed mb-4">
          Start using Allternit:
        </p>
        <div class="space-y-2">
          <div class="bg-[var(--bg-secondary)] rounded-lg p-3">
            <code class="text-[var(--accent-orange)]">gizzi-code</code>
            <span class="text-[var(--text-muted)] ml-2"># Start TUI</span>
          </div>
          <div class="bg-[var(--bg-secondary)] rounded-lg p-3">
            <code class="text-[var(--accent-orange)]">gizzi-code run "List files"</code>
            <span class="text-[var(--text-muted)] ml-2"># Single command</span>
          </div>
        </div>
      `
    }
  ]
};
