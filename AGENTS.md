# allternit-docs — Agent Guide

> Official documentation website for the Allternit platform.

## Quick Start

```bash
npm install
npm run dev
```

## Key Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run build:search` | Build + index with Pagefind |
| `npm run lint` | ESLint |

## Directory Map

| Path | Purpose |
|------|---------|
| `src/pages/` | Page components (HomePage, DocPage, ResearchPage, etc.) |
| `src/components/` | Shared React components + shadcn/ui |
| `src/docs-content/` | Static documentation page data |
| `src/data/` | Research content, editorial calendar |
| `dist/` | Production build output |
| `mintlify-docs/` | Mintlify-flavored docs subproject |

## Conventions

- **Stack:** Vite + React 19 + TypeScript + Tailwind CSS + shadcn/ui
- **Package manager:** npm
- **Deployment:** Static site; see `DEPLOYMENT_GUIDE.md` for Vercel setup

## Warnings

- Do not embed Gizzi Code documentation here — link externally to `gizzi-code-docs`.
- The `dist/` folder is committed for easy static hosting; rebuild after content changes.

## Related Repos

- [`gizzi-code-docs`](https://github.com/Gizziio/gizzi-code-docs) — Gizzi Code documentation
- [`allternit-platform`](https://github.com/Gizziio/allternit-platform) — Core platform
