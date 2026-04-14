#!/usr/bin/env node
/**
 * Quick script to create a new Signal article
 * Usage: node scripts/new-signal.mjs YYYY-MM-DD slug-goes-here "Article Title"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const [,, date, slug, ...titleParts] = process.argv;
const title = titleParts.join(' ');

if (!date || !slug || !title) {
  console.log('Usage: node scripts/new-signal.mjs YYYY-MM-DD slug-goes-here "Article Title"');
  console.log('Example: node scripts/new-signal.mjs 2026-04-09 openai-gpt5 "OpenAI Announces GPT-5"');
  process.exit(1);
}

const dateObj = new Date(date);
const year = dateObj.getFullYear();
const month = String(dateObj.getMonth() + 1).padStart(2, '0');
const day = String(dateObj.getDate()).padStart(2, '0');

const filename = `${date}-${slug}.ts`;
const filepath = path.join(__dirname, '../src/data/signal', filename);

// Check if file exists
if (fs.existsSync(filepath)) {
  console.error(`Error: File already exists: ${filepath}`);
  process.exit(1);
}

const constName = `signal${year}${month}${day}`;

const template = `/**
 * The Signal: ${date}
 * 
 * [Add description of research and sources here]
 */

import type { EditorialPublication } from '../editorial-calendar';

export const ${constName}: EditorialPublication = {
  id: 'signal-${date}',
  slug: 'signal-${slug}',
  type: 'blog',
  contentType: 'signal',
  status: 'published',
  title: '${title}',
  subtitle: '[Add subtitle here]',
  abstract: '[Add 1-2 sentence summary here]',
  authors: ['author-dr-alexandra-kovacs'], // Change author as needed
  teams: ['team-red-team'], // Change team as needed
  tags: ['tag1', 'tag2'],
  keywords: ['keyword1', 'keyword2'],
  createdAt: '${date}T08:00:00Z',
  updatedAt: '${date}T08:00:00Z',
  publishedAt: '${date}T08:00:00Z',
  readingTime: 4,
  content: {
    markdown: \`# ${title}

**The Signal:** [Lead with the headline - what's the breaking news?]

## The Headline

[Key facts in 2-3 paragraphs]

## Why It Matters

[Context and significance]

## The Numbers

- **XXX**: Key metric
- **XXX**: Another metric
- **XXX**: Third metric

## What They're Saying

> "Quote from source"
> — Attribution

## The Context

[Background information]

## What to Watch

**Immediate:**
- Item 1
- Item 2

**This quarter:**
- Item 3

## The Bottom Line

[Final take - 1-2 sentences]

---

**Sources:** [List primary sources]

*The Signal is Allternit's weekday briefing on what matters in AI. Published at 8am ET.*
\`,
  },
  metrics: { views: 0, uniqueVisitors: 0, downloads: 0, citationCount: 0 },
  license: 'cc-by-4.0',
  accessLevel: 'public',
};

export default ${constName};
`;

// Write the file
fs.writeFileSync(filepath, template);
console.log(`✅ Created: src/data/signal/${filename}`);

// Update research-content.ts
const researchContentPath = path.join(__dirname, '../src/data/research-content.ts');
let content = fs.readFileSync(researchContentPath, 'utf8');

// Find the import section and add new import
const importMarker = '// Import The Signal articles';
const importLine = `import { ${constName} } from './signal/${date}-${slug}';`;

if (content.includes(importLine)) {
  console.log('⚠️  Import already exists in research-content.ts');
} else {
  content = content.replace(
    importMarker,
    `${importMarker}\n${importLine}`
  );
  console.log(`✅ Added import to research-content.ts`);
}

// Add to publications array
const pubMarker = 'export const publications: Publication[] = [';
const pubLine = `  ${constName},`;

if (content.includes(pubLine)) {
  console.log('⚠️  Publication already in array');
} else {
  content = content.replace(
    pubMarker,
    `${pubMarker}\n${pubLine}`
  );
  console.log(`✅ Added to publications array`);
}

// Add to editorialPublications array
const editMarker = 'export const editorialPublications: EditorialPublication[] = [';
const editLine = `  ${constName},`;

if (content.includes(editLine)) {
  console.log('⚠️  Already in editorialPublications array');
} else {
  content = content.replace(
    editMarker,
    `${editMarker}\n${editLine}`
  );
  console.log(`✅ Added to editorialPublications array`);
}

fs.writeFileSync(researchContentPath, content);

console.log('\n📝 Next steps:');
console.log(`1. Edit: src/data/signal/${filename}`);
console.log('2. Fill in the content template');
console.log('3. Run: git add . && git commit -m "Signal: ' + date + ' - ' + title + '" && git push');
console.log('4. Vercel will auto-deploy in ~2 minutes');
