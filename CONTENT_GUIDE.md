# Allternit Research Content Guide

## Editorial Calendar

We publish on four cadences:

| Type | Frequency | Format | Word Count |
|------|-----------|--------|------------|
| **Daily Pulse** | Weekday mornings | Trend analysis | 300-800 |
| **Weekly Feature** | Friday mornings | Magazine deep dive | 1,500-3,000 |
| **Quarterly Report** | Jan, Apr, Jul, Oct | Research report | 5,000-10,000 |
| **Yearly Review** | December | Annual comprehensive | 10,000+ |

## Adding New Content

### 1. Daily Pulse Article

Create a file in `src/data/daily-pulse/YYYY-MM-DD-slug.ts`:

```typescript
import type { EditorialPublication } from '../editorial-calendar';

export const dailyPulseYYYYMMDD: EditorialPublication = {
  id: 'daily-pulse-YYYY-MM-DD',
  slug: 'daily-pulse-your-slug-here',
  type: 'blog',
  contentType: 'daily-pulse',
  status: 'published',
  title: 'Your Title Here',
  subtitle: 'Subtitle explaining the angle',
  abstract: 'One paragraph summary for cards/previews',
  authors: ['author-dr-sarah-williams'], // from authors array
  teams: ['team-economic'], // from researchTeams
  tags: ['tag1', 'tag2'],
  keywords: ['keyword1', 'keyword2'],
  createdAt: '2026-04-07T09:00:00Z',
  updatedAt: '2026-04-07T09:00:00Z',
  publishedAt: '2026-04-07T09:00:00Z',
  readingTime: 5, // minutes
  featured: true,
  series: 'Economic Lens', // optional
  content: {
    markdown: `# Your Article Here

Write in markdown. Be punchy, timely, evidence-based.
`,
  },
  metrics: { views: 0, uniqueVisitors: 0, downloads: 0, citationCount: 0 },
  license: 'cc-by-4.0',
  accessLevel: 'public',
};

export default dailyPulseYYYYMMDD;
```

Then import and add to `src/data/research-content.ts`:

```typescript
import { dailyPulseYYYYMMDD } from './daily-pulse/YYYY-MM-DD-slug';

export const publications: Publication[] = [
  // ... existing
  dailyPulseYYYYMMDD,
];
```

### 2. Weekly Feature

Same structure, but:
- `contentType: 'weekly-feature'`
- `type: 'report'`
- `issueNumber: 'W14-2026'` (week number)
- Longer content (1,500-3,000 words)
- More sections, deeper analysis

Save to `src/data/weekly-features/YYYY-MM-DD-slug.ts`

### 3. Content Style Guide

**Voice:** Clear, authoritative, accessible. Like Wired meets MIT Tech Review.

**Stance:** Independent, evidence-based, critical but constructive.

**Structure:**
- Start with a strong hook/headline
- Lead with the most important finding
- Use data, cite sources
- Include "What We're Watching" for forward-looking analysis
- End with "The Bottom Line" summary

**No-Gos:**
- No hype without evidence
- No uncritical tech boosterism  
- No fear-mongering
- No fictional metrics

### 4. Current Series

- **Economic Lens** - AI through economics perspective
- **Safety Watch** - AI safety developments and risks
- **Tool Review** - Hands-on testing of new AI tools
- **Future Signals** - Early indicators of AI direction
- **People of AI** - Profiles of researchers and thinkers

## Research Sources

Good sources for Daily Pulse:
- arXiv preprints
- Official company announcements
- Regulatory filings
- Academic papers
- Earnings calls
- Survey data

Always cite primary sources.

## Metrics

All metrics start at 0. They populate from:
- Web analytics (views, unique visitors)
- Download tracking
- Citation tracking (future)
- Social shares (future)

No fictional numbers ever.
