# Allternit Research - Deployment & Content Management Options

## Current Setup (Static Site)

What we built: A Vite/React site that compiles to static HTML/JS files.

**How it works:**
1. Content lives in TypeScript files (`src/data/signal/...`, `src/data/feature/...`)
2. You run `npm run build` to compile
3. Upload `dist/` folder to hosting

**The problem:** Every content update requires rebuilding and redeploying.

---

## Option 1: Git + Vercel Auto-Deployment (RECOMMENDED)

This is the modern standard for static sites. Push to GitHub, Vercel builds and deploys automatically.

### Setup Steps:

1. **Create GitHub repo** (if not exists)
   ```bash
   cd /Users/macbook/Downloads/Architech-Docs-Website
   git init
   git add .
   git commit -m "Initial research site"
   git remote add origin https://github.com/YOURORG/allternit-research.git
   git push -u origin main
   ```

2. **Connect Vercel to GitHub**
   - Go to https://vercel.com/new
   - Import your GitHub repo
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Deploy

3. **Auto-deployment enabled**
   - Every push to `main` branch = automatic rebuild and deploy
   - Takes ~2 minutes
   - Zero manual steps

### Content Workflow:

```bash
# Write new article
cat > src/data/signal/2026-04-09-new-story.ts << 'EOF'
// ... content ...
EOF

# Add to research-content.ts imports
# Git commit and push
git add .
git commit -m "Add Signal: April 9 on [topic]"
git push

# Vercel auto-deploys in ~2 minutes
```

---

## Option 2: Headless CMS (Sanity/Contentful)

For non-technical editors. Content lives in a CMS, fetched at build time or runtime.

### Pros:
- Editors use a web UI (like WordPress admin)
- No code changes for content updates
- Scheduled publishing
- Version history

### Cons:
- Another service to manage
- Costs money at scale
- More complex setup

### Recommended: Sanity.io (free tier generous)

**Setup:**
1. Create Sanity project
2. Define content schema (Signal, Feature, Index, Annual)
3. Replace static imports with Sanity client
4. Content updates via Sanity Studio

**Cost:** Free up to 10k API requests/day

---

## Option 3: Notion as CMS (Simple, Free)

Use Notion as your content database. Write articles in Notion, site pulls via API.

### How it works:
1. Create Notion database with columns: Title, Content, Type, Date, Author
2. Write articles in Notion
3. Site fetches from Notion API at build time
4. Deploy to Vercel

### Pros:
- Write in familiar Notion interface
- Mobile app for on-the-go publishing
- Free (within API limits)
- No Git needed for content

### Cons:
- Build required for updates (unless using ISR)
- Notion API has rate limits

---

## Option 4: Markdown + Git (Simplest for Writers)

Instead of TypeScript files, use Markdown files with frontmatter.

### File structure:
```
src/content/signal/2026-04-08-anthropic-mythos.md
src/content/feature/2026-04-04-alignment-faking.md
```

### Markdown format:
```markdown
---
title: "Anthropic Drops Mythos"
subtitle: "A frontier model too powerful to release"
author: "author-dr-alexandra-kovacs"
date: "2026-04-08"
readingTime: 4
tags: ["anthropic", "mythos", "cybersecurity"]
---

# Anthropic Drops Mythos

Content here in markdown...
```

### Build process:
- Vite plugin reads markdown files
- Converts to HTML at build time
- Same auto-deploy via Git + Vercel

---

## Recommended Approach for Allternit

**Phase 1 (Now):** Git + Vercel Auto-Deploy
- Easiest to set up
- Full version control
- Free hosting on Vercel
- Familiar workflow for developers

**Phase 2 (Later):** Migrate to Sanity CMS
- When non-technical team needs to publish
- When you want scheduled posts
- When content volume grows

---

## Quick Setup: Git + Vercel

### Step 1: Initialize Git
```bash
cd /Users/macbook/Downloads/Architech-Docs-Website
rm -rf .git  # if exists
git init
git add .
git commit -m "Allternit Research v1.0 - The Signal, The Feature, The Index, The Annual"
```

### Step 2: Create GitHub Repo
- Go to https://github.com/new
- Name: `allternit-research`
- Private or Public
- Copy the remote URL

### Step 3: Push Code
```bash
git remote add origin https://github.com/YOURUSERNAME/allternit-research.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Follow prompts
# - Link to existing project? No
# - Which scope? [your account]
# - Link to existing project? No  
# - What's your project name? allternit-research
```

Or use the Vercel web UI:
1. https://vercel.com/new
2. Import GitHub repo
3. Framework: Vite
4. Deploy

### Step 5: Custom Domain (Optional)
```bash
vercel domains add research.allternit.com
```

Then update DNS at your registrar:
- CNAME: research.allternit.com → cname.vercel-dns.com

---

## Content Publishing Workflow (Git Method)

### For quick daily updates:

```bash
# 1. Create new Signal article
cat > src/data/signal/2026-04-09-topic.ts << 'EOF'
import type { EditorialPublication } from '../editorial-calendar';

export const signalApril92026: EditorialPublication = {
  id: 'signal-2026-04-09',
  slug: 'signal-topic-here',
  type: 'blog',
  contentType: 'signal',
  status: 'published',
  title: 'Your Title Here',
  subtitle: 'Subtitle here',
  abstract: 'Abstract here',
  authors: ['author-dr-alexandra-kovacs'],
  teams: ['team-red-team'],
  tags: ['tag1', 'tag2'],
  keywords: ['keyword1'],
  createdAt: '2026-04-09T08:00:00Z',
  updatedAt: '2026-04-09T08:00:00Z',
  publishedAt: '2026-04-09T08:00:00Z',
  readingTime: 4,
  content: {
    markdown: `# Title\n\nContent here...`,
  },
  metrics: { views: 0, uniqueVisitors: 0, downloads: 0, citationCount: 0 },
  license: 'cc-by-4.0',
  accessLevel: 'public',
};

export default signalApril92026;
EOF

# 2. Add to research-content.ts imports
# Open src/data/research-content.ts
# Add: import { signalApril92026 } from './signal/2026-04-09-topic';
# Add to publications array

# 3. Commit and push
git add .
git commit -m "Signal: April 9 - [topic]"
git push

# 4. Vercel auto-deploys (check dashboard for progress)
```

### Using a script:

Create `scripts/new-signal.sh`:
```bash
#!/bin/bash
DATE=$1
SLUG=$2
cat > src/data/signal/${DATE}-${SLUG}.ts << EOF
// template here
EOF
# Update research-content.ts automatically
# Git commit
echo "Created new Signal. Pushing to deploy..."
```

Usage:
```bash
./scripts/new-signal.sh 2026-04-09 openai-announcement
```

---

## Alternative: Vercel Blob Storage

For true CMS-like experience without external services:

1. Store articles as JSON in Vercel Blob
2. Site fetches at request time (ISR)
3. Update content via Vercel Blob UI or API

**Pros:**
- No rebuild needed for content updates
- Built into Vercel
- Programmatic uploads

**Cons:**
- Costs money after free tier
- Less version control

---

## Summary

| Method | Setup Time | Ease of Updates | Cost | Best For |
|--------|------------|-----------------|------|----------|
| Git + Vercel | 15 min | Medium (Git) | Free | Technical teams |
| Markdown + Git | 30 min | Easy (text files) | Free | Writers comfortable with files |
| Notion CMS | 1 hour | Very Easy | Free | Non-technical editors |
| Sanity CMS | 2 hours | Very Easy | $$$ at scale | Large editorial teams |
| Vercel Blob | 1 hour | Easy API | $$ | Dynamic content needs |

**Recommendation for Allternit:** Start with Git + Vercel. It's free, fast, and gives you version control. When you need non-technical editors, migrate to Sanity.
