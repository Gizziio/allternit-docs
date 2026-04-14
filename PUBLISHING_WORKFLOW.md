# Daily Publishing Workflow

## Quick Start (Git + Vercel Method)

### Initial Setup (One Time)

```bash
# 1. Initialize Git
cd /Users/macbook/Downloads/Architech-Docs-Website
git init
git add .
git commit -m "Initial commit"

# 2. Create GitHub repo at https://github.com/new
# Name: allternit-research
# Then:
git remote add origin https://github.com/YOURUSERNAME/allternit-research.git
git push -u origin main

# 3. Deploy to Vercel
npm i -g vercel
vercel --prod
```

---

## Publishing a New Signal (Daily)

### Option A: Use the Script (Fastest)

```bash
# Create new article
node scripts/new-signal.js 2026-04-09 openai-gpt5 "OpenAI Announces GPT-5"

# Edit the content
# Open: src/data/signal/2026-04-09-openai-gpt5.ts

# Fill in:
# - subtitle
# - abstract  
# - authors (pick from existing authors)
# - teams (pick from existing teams)
# - tags
# - content.markdown

# Publish
git add .
git commit -m "Signal: April 9 - OpenAI GPT-5"
git push

# Vercel auto-deploys in ~2 minutes
# Check: https://allternit-research.vercel.app
```

### Option B: Manual (More Control)

```bash
# 1. Create file manually
cat > src/data/signal/2026-04-09-topic.ts << 'EOF'
[content here]
EOF

# 2. Add to research-content.ts imports
# 3. Add to publications array
# 4. Git commit and push
```

---

## The Signal Template

Every Signal article follows this structure:

```markdown
# Title Here

**The Signal:** One sentence summary of the breaking news.

## The Headline

Key facts in 2-3 paragraphs. What happened? Who announced it?

## Why It Matters

Why should the reader care? What's the broader significance?

## The Numbers

- **XXX**: Key metric with context
- **XXX**: Another important number
- **XXX**: Third data point

## What They're Saying

> "Key quote from a source"
> — Name, Title, Organization

## The Context

Background information. What led to this? What else is happening?

## What to Watch

**Immediate (next 30 days):**
- Specific thing to monitor
- Another thing to watch

**This quarter:**
- Broader trend to track

## The Bottom Line

Final take in 1-2 sentences. What's the main thing to remember?

---

**Sources:** Link to primary sources

*The Signal is Allternit's weekday briefing on what matters in AI. Published at 8am ET.*
```

---

## Publishing The Feature (Weekly)

```bash
# Create manually (no script yet for Features)
cat > src/data/feature/2026-04-11-topic.ts << 'EOF'
import type { EditorialPublication } from '../editorial-calendar';

export const featureApril112026: EditorialPublication = {
  id: 'feature-2026-04-11',
  slug: 'feature-topic-here',
  type: 'report',
  contentType: 'feature',
  status: 'published',
  title: 'Feature Title Here',
  subtitle: 'Subtitle',
  abstract: 'Abstract',
  authors: ['author-dr-emily-watson'],
  teams: ['team-alignment'],
  tags: ['tag1', 'tag2'],
  keywords: ['keyword1'],
  createdAt: '2026-04-11T10:00:00Z',
  publishedAt: '2026-04-11T10:00:00Z',
  readingTime: 12,
  issueNumber: 'W15-2026', // Week number
  series: 'Safety Watch',  // Optional series
  content: {
    markdown: `# Title

Long-form content here...
`,
  },
  metrics: { views: 0, uniqueVisitors: 0, downloads: 0, citationCount: 0 },
  license: 'cc-by-4.0',
  accessLevel: 'public',
};

export default featureApril112026;
EOF

# Add import to research-content.ts
# Add to publications array
# Git commit and push
```

---

## Content Research Checklist

Before publishing, verify:

- [ ] Primary sources linked
- [ ] Numbers are from official/reputable sources
- [ ] Quotes are accurate and attributed
- [ ] No confidential info leaked
- [ ] Claims are supported by evidence
- [ ] Distinguish speculation from fact
- [ ] Reading time is accurate

---

## Git Workflow Summary

```bash
# Daily workflow
git pull                    # Get latest
# ... create/edit content ...
git add .                   # Stage changes
git commit -m "Signal: Date - Topic"
git push                    # Triggers Vercel deploy

# Check deploy status
vercel --version           # Or check Vercel dashboard
```

---

## Troubleshooting

### Build fails on Vercel
```bash
# Test locally first
npm run build

# If it fails, fix errors, then push
```

### Content not showing
- Check that import was added to `research-content.ts`
- Check that publication was added to array
- Verify `status: 'published'` (not 'draft')

### Need to unpublish
Change `status: 'published'` to `status: 'draft'` and push.

---

## Editorial Calendar

| Day | Publication | Time | Who |
|-----|-------------|------|-----|
| Mon-Fri | The Signal | 8am ET | Rotating authors |
| Friday | The Feature | 10am ET | Deep dive author |
| Quarterly | The Index | 1st Mon | Economic team |
| December | The Annual | Dec 15 | All hands |

---

## Quick Commands

```bash
# Create today's Signal
node scripts/new-signal.js $(date +%Y-%m-%d) slug-here "Title Here"

# Preview locally
npm run dev

# Build for production
npm run build

# Deploy manually (if not using Git)
vercel --prod
```
