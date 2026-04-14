import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeExample {
  language: string;
  label: string;
  code: string;
}

interface CodeBlockProps {
  examples: CodeExample[];
  title?: string;
}

export function CodeBlock({ examples, title }: CodeBlockProps) {
  const [activeLang, setActiveLang] = useState(examples[0]?.language || '');
  const [copied, setCopied] = useState(false);

  const activeExample = examples.find(e => e.language === activeLang) || examples[0];

  const handleCopy = async () => {
    if (!activeExample) return;
    
    try {
      await navigator.clipboard.writeText(activeExample.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const highlightCode = (code: string) => {
    // Simple syntax highlighting
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Keywords
    const keywords = ['import', 'from', 'const', 'let', 'var', 'function', 'class', 'export', 'default', 'async', 'await', 'return', 'if', 'else', 'for', 'while', 'try', 'catch', 'new', 'this', 'type', 'interface', 'package', 'func', 'struct'];
    keywords.forEach(kw => {
      highlighted = highlighted.replace(
        new RegExp(`\\b(${kw})\\b`, 'g'),
        '<span class="token-keyword">$1</span>'
      );
    });

    // Strings
    highlighted = highlighted.replace(
      /(".*?"|'.*?'|`[\s\S]*?`)/g,
      '<span class="token-string">$1</span>'
    );

    // Numbers
    highlighted = highlighted.replace(
      /\b(\d+(?:\.\d+)?)\b/g,
      '<span class="token-number">$1</span>'
    );

    // Comments
    highlighted = highlighted.replace(
      /(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$)/gm,
      '<span class="token-comment">$1</span>'
    );

    // Functions
    highlighted = highlighted.replace(
      /(\w+)(?=\()/g,
      '<span class="token-function">$1</span>'
    );

    return highlighted;
  };

  return (
    <div className="code-block group">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-secondary)] border-b border-[var(--code-border)]">
        <div className="flex items-center gap-1">
          {title && (
            <span className="text-xs text-[var(--text-muted)] mr-3">{title}</span>
          )}
          {examples.map((example) => (
            <button
              key={example.language}
              onClick={() => setActiveLang(example.language)}
              className={`lang-tab ${activeLang === example.language ? 'active' : ''}`}
            >
              {example.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="copy-btn"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="p-4 text-sm leading-relaxed overflow-x-auto">
        <code 
          dangerouslySetInnerHTML={{ 
            __html: highlightCode(activeExample?.code || '') 
          }}
        />
      </pre>
    </div>
  );
}

// Simple code block for single language
export function InlineCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="code-block group relative">
      <button
        onClick={handleCopy}
        className="copy-btn"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
      <pre className="p-4 text-sm leading-relaxed overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
