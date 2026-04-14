# Design Changes: React → Mintlify

## What Stays The Same

| Element | React | Mintlify |
|---------|-------|----------|
| **Primary color** | `#d97757` | `#d97757` |
| **Background** | `#0a0a0f` | `#0a0a0f` |
| **Logo** | A:// text | A:// text |
| **Favicon** | A:// logo | A:// logo |
| **Dark mode** | Yes | Yes (default) |
| **Content** | Same docs | Same docs |

## What Changes

| Element | React (Custom) | Mintlify (Standard) |
|---------|----------------|---------------------|
| **Sidebar** | Custom styled | Mintlify's design |
| **Typography** | Inter + Mono | Inter + JetBrains Mono |
| **Code blocks** | Custom | Mintlify's syntax highlighting |
| **Cards/Callouts** | Custom components | Mintlify's `<Card>` components |
| **Tables** | Custom styled | Mintlify's table design |
| **Search** | Would need to build | Built-in, instant |
| **Mobile** | Would need work | Perfect out-of-box |
| **API docs** | Manual creation | Auto-gen from OpenAPI |

## Visual Comparison

### React (Current)
- Fully custom every element
- Exact brand control
- More development work
- No search (would need Algolia/etc)

### Mintlify (New)
- Professional docs aesthetic
- Less custom but polished
- Search included
- Less maintenance

## Recommendation

Mintlify is better for docs because:
1. Purpose-built for documentation
2. Search is essential for docs
3. Less code to maintain
4. Auto-deploy with git
5. Custom domain support
6. Professional look trusted by developers

The design will feel different but in a good way - 
more like Stripe, Linear, or Vercel docs.
