import type { Publication, Author, ResearchTeam, NewsletterSubscriber, ExternalSubmission } from '../types/research';
import type { EditorialPublication } from './editorial-calendar';

/**
 * ALLTERNIT RESEARCH CONTENT
 * 
 * Real research content published on our editorial calendar:
 * - The Signal: Daily briefings (weekday mornings)
 * - The Feature: Weekly deep dives (Fridays)
 * - The Index: Quarterly data reports
 * - The Annual: Year-end comprehensive review
 */

// =============================================================================
// RESEARCH TEAMS
// =============================================================================

export const researchTeams: ResearchTeam[] = [
  {
    id: 'team-interpretability',
    slug: 'interpretability',
    name: 'Interpretability',
    fullName: 'Mechanistic Interpretability Research Team',
    description: 'We work to understand how large language models process information, represent concepts, and make decisions. Our goal is to make AI systems more transparent and auditable.',
    mission: 'To discover and understand the internal mechanisms of AI systems, enabling safer, more controllable, and more trustworthy artificial intelligence.',
    researchQuestions: ['How do transformers represent and manipulate concepts internally?', 'Can we identify and modify specific behaviors by editing model internals?', 'What are the fundamental limitations of current interpretability methods?'],
    focus: ['mechanistic-interpretability', 'representation-engineering', 'activation-patching', 'sparse-autoencoders', 'circuit-tracing'],
    methodologies: ['Activation analysis', 'Causal intervention', 'Probing', 'Automated interpretability', 'Adversarial testing'],
    leads: ['author-sarah-chen'],
    members: ['author-sarah-chen', 'author-marcus-rodriguez', 'author-alex-kim'],
    publications: ['signal-2026-04-07', 'feature-2026-04-04'],
    metrics: { publicationCount: 2, citationCount: 0, hIndex: 0 },
    publicationSchedule: { frequency: 'quarterly', nextDeadline: '2026-07-15' }
  },
  {
    id: 'team-alignment',
    slug: 'alignment',
    name: 'Alignment',
    fullName: 'AI Alignment and Safety Research Team',
    description: 'We develop techniques to ensure AI systems remain helpful, harmless, and honest as they become more capable.',
    mission: 'To ensure that advanced AI systems are aligned with human values and interests, remain controllable, and are deployed safely.',
    researchQuestions: ['How can we train AI systems to robustly pursue intended goals?', 'What oversight mechanisms work for superhuman systems?', 'How do we make AI systems corrigible?'],
    focus: ['scalable-oversight', 'constitutional-ai', 'reward-modeling', 'red-teaming', 'robustness'],
    methodologies: ['Constitutional AI training', 'Debate and amplification', 'RLHF', 'Adversarial evaluation'],
    leads: ['author-dr-emily-watson'],
    members: ['author-dr-emily-watson', 'author-raj-patel', 'author-maya-okonkwo'],
    publications: ['feature-2026-04-04'],
    metrics: { publicationCount: 1, citationCount: 0, hIndex: 0 },
    publicationSchedule: { frequency: 'quarterly', nextDeadline: '2026-06-30' }
  },
  {
    id: 'team-societal',
    slug: 'societal-impacts',
    name: 'Societal Impacts',
    fullName: 'Societal Impacts of AI Research Team',
    description: 'We study how AI is actually being used in the world, its effects on work and society.',
    mission: 'To understand and communicate the real-world impacts of AI on society.',
    researchQuestions: ['How is AI changing different types of work?', 'What are the distributional effects of AI adoption?', 'How are communities adapting?'],
    focus: ['labor-market-effects', 'productivity-analysis', 'equity-and-access', 'policy-evaluation', 'public-attitudes'],
    methodologies: ['Large-scale surveys', 'Interviews', 'Administrative data analysis', 'Natural experiments', 'Policy analysis'],
    leads: ['author-dr-james-morrison'],
    members: ['author-dr-james-morrison', 'author-lisa-chang', 'author-anna-schmidt'],
    publications: [],
    metrics: { publicationCount: 0, citationCount: 0, hIndex: 0 },
    publicationSchedule: { frequency: 'quarterly', nextDeadline: '2026-04-15' }
  },
  {
    id: 'team-economic',
    slug: 'economic-futures',
    name: 'Economic Futures',
    fullName: 'AI Economic Futures Research Programme',
    description: 'The A:// Economic Index provides quarterly analysis of AI adoption and its effects on productivity and labor markets.',
    mission: 'To provide rigorous, transparent economic analysis of AI adoption.',
    researchQuestions: ['How quickly is AI being adopted?', 'What is the aggregate productivity impact?', 'How does AI affect wage inequality?'],
    focus: ['economic-index', 'productivity-measurement', 'adoption-tracking', 'labor-economics', 'policy-analysis'],
    methodologies: ['Economic index construction', 'NLP of job postings', 'Earnings calls analysis', 'Survey methodology'],
    leads: ['author-dr-sarah-williams'],
    members: ['author-dr-sarah-williams', 'author-michael-thompson', 'author-wei-zhang'],
    publications: ['signal-2026-04-07'],
    metrics: { publicationCount: 1, citationCount: 0, hIndex: 0 },
    publicationSchedule: { frequency: 'quarterly', nextDeadline: '2026-04-01' }
  },
  {
    id: 'team-red-team',
    slug: 'frontier-red-team',
    name: 'Frontier Red Team',
    fullName: 'Frontier AI Red Team',
    description: 'We evaluate frontier AI models for potential risks in cybersecurity, biosecurity, and autonomous capabilities.',
    mission: 'To identify and characterize risks from advanced AI systems.',
    researchQuestions: ['What dangerous capabilities do current models possess?', 'How can we reliably evaluate model risks?', 'What safeguards are effective?'],
    focus: ['cybersecurity-evaluation', 'biosecurity-risk', 'autonomous-capabilities', 'model-evaluation', 'safety-standards'],
    methodologies: ['Structured access evaluation', 'Capability elicitation', 'Red teaming exercises', 'Benchmark development'],
    leads: ['author-dr-alexandra-kovacs'],
    members: ['author-dr-alexandra-kovacs', 'author-david-chen', 'author-fatima-al-hassan'],
    publications: ['signal-2026-04-08'],
    metrics: { publicationCount: 1, citationCount: 0, hIndex: 0 },
    publicationSchedule: { frequency: 'as-needed' }
  }
];

// =============================================================================
// AUTHORS
// =============================================================================

export const authors: Author[] = [
  {
    id: 'author-sarah-chen',
    type: 'internal',
    name: 'Sarah Chen',
    email: 'sarah.chen@allternit.com',
    affiliations: [{ institution: 'Allternit PBC', department: 'Interpretability Research', role: 'Research Scientist', isCurrent: true }],
    role: 'Research Scientist, Interpretability Lead',
    publications: ['signal-2026-04-07', 'feature-2026-04-04'],
    metrics: { publicationCount: 2, citationCount: 0, hIndex: 0 }
  },
  {
    id: 'author-dr-emily-watson',
    type: 'internal',
    name: 'Dr. Emily Watson',
    email: 'emily.watson@allternit.com',
    affiliations: [{ institution: 'Allternit PBC', department: 'Alignment Research', role: 'Principal Research Scientist', isCurrent: true }],
    role: 'Principal Research Scientist, Alignment Lead',
    publications: ['feature-2026-04-04'],
    metrics: { publicationCount: 1, citationCount: 0, hIndex: 0 }
  },
  {
    id: 'author-dr-sarah-williams',
    type: 'internal',
    name: 'Dr. Sarah Williams',
    email: 'sarah.williams@allternit.com',
    affiliations: [{ institution: 'Allternit PBC', department: 'Economic Research', role: 'Director of Economic Research', isCurrent: true }],
    role: 'Director of Economic Research',
    publications: ['signal-2026-04-07'],
    metrics: { publicationCount: 1, citationCount: 0, hIndex: 0 }
  },
  {
    id: 'author-dr-james-morrison',
    type: 'internal',
    name: 'Dr. James Morrison',
    email: 'james.morrison@allternit.com',
    affiliations: [{ institution: 'Allternit PBC', department: 'Societal Impacts Research', role: 'Senior Research Scientist', isCurrent: true }],
    role: 'Senior Research Scientist',
    publications: [],
    metrics: { publicationCount: 0, citationCount: 0, hIndex: 0 }
  },
  {
    id: 'author-dr-alexandra-kovacs',
    type: 'internal',
    name: 'Dr. Alexandra Kovacs',
    email: 'alexandra.kovacs@allternit.com',
    role: 'Principal Research Scientist, Red Team Lead',
    publications: ['signal-2026-04-08'],
    affiliations: [{ institution: 'Allternit PBC', isCurrent: true }],
    metrics: { publicationCount: 1, citationCount: 0, hIndex: 0 }
  },
  { id: 'author-marcus-rodriguez', type: 'internal', name: 'Marcus Rodriguez', email: 'marcus.rodriguez@allternit.com', role: 'Research Scientist', publications: [], affiliations: [{ institution: 'Allternit PBC', isCurrent: true }], metrics: { publicationCount: 0, citationCount: 0, hIndex: 0 } },
  { id: 'author-alex-kim', type: 'internal', name: 'Alex Kim', email: 'alex.kim@allternit.com', role: 'Research Engineer', publications: [], affiliations: [{ institution: 'Allternit PBC', isCurrent: true }], metrics: { publicationCount: 0, citationCount: 0, hIndex: 0 } },
  { id: 'author-raj-patel', type: 'internal', name: 'Raj Patel', email: 'raj.patel@allternit.com', role: 'Research Scientist', publications: [], affiliations: [{ institution: 'Allternit PBC', isCurrent: true }], metrics: { publicationCount: 0, citationCount: 0, hIndex: 0 } },
  { id: 'author-maya-okonkwo', type: 'internal', name: 'Maya Okonkwo', email: 'maya.okonkwo@allternit.com', role: 'Research Engineer', publications: [], affiliations: [{ institution: 'Allternit PBC', isCurrent: true }], metrics: { publicationCount: 0, citationCount: 0, hIndex: 0 } },
  { id: 'author-lisa-chang', type: 'internal', name: 'Lisa Chang', email: 'lisa.chang@allternit.com', role: 'Research Associate', publications: [], affiliations: [{ institution: 'Allternit PBC', isCurrent: true }], metrics: { publicationCount: 0, citationCount: 0, hIndex: 0 } },
  { id: 'author-anna-schmidt', type: 'internal', name: 'Anna Schmidt', email: 'anna.schmidt@allternit.com', role: 'Research Associate', publications: [], affiliations: [{ institution: 'Allternit PBC', isCurrent: true }], metrics: { publicationCount: 0, citationCount: 0, hIndex: 0 } },
  { id: 'author-michael-thompson', type: 'internal', name: 'Michael Thompson', email: 'michael.thompson@allternit.com', role: 'Senior Economist', publications: [], affiliations: [{ institution: 'Allternit PBC', isCurrent: true }], metrics: { publicationCount: 0, citationCount: 0, hIndex: 0 } },
  { id: 'author-wei-zhang', type: 'internal', name: 'Wei Zhang', email: 'wei.zhang@allternit.com', role: 'Data Scientist', publications: [], affiliations: [{ institution: 'Allternit PBC', isCurrent: true }], metrics: { publicationCount: 0, citationCount: 0, hIndex: 0 } },
  { id: 'author-david-chen', type: 'internal', name: 'David Chen', email: 'david.chen@allternit.com', role: 'Security Researcher', publications: [], affiliations: [{ institution: 'Allternit PBC', isCurrent: true }], metrics: { publicationCount: 0, citationCount: 0, hIndex: 0 } },
  { id: 'author-fatima-al-hassan', type: 'internal', name: 'Fatima Al-Hassan', email: 'fatima.alhassan@allternit.com', role: 'Research Engineer', publications: [], affiliations: [{ institution: 'Allternit PBC', isCurrent: true }], metrics: { publicationCount: 0, citationCount: 0, hIndex: 0 } }
];

// =============================================================================
// PUBLICATIONS - REAL CONTENT
// =============================================================================

// Import The Signal articles
import { signalApril72026 } from './daily-pulse/2025-04-07-agentic-surge';
import { signalApril82026 } from './signal/2026-04-08-anthropic-mythos';

// Import The Feature articles
import { weeklyFeatureApril42026 } from './weekly-features/2025-04-04-alignment-faking';

export const publications: Publication[] = [
  signalApril82026,    // Latest: Anthropic Mythos
  signalApril72026,    // Agentic AI surge
  weeklyFeatureApril42026, // Alignment faking deep dive
];

// Editorial publications (with extended metadata)
export const editorialPublications: EditorialPublication[] = [
  signalApril82026,
  signalApril72026,
  weeklyFeatureApril42026,
];

// =============================================================================
// NEWSLETTER & SUBMISSIONS (Empty arrays - populated at runtime)
// =============================================================================

export const newsletterSubscribers: NewsletterSubscriber[] = [];
export const externalSubmissions: ExternalSubmission[] = [];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export function getTeamById(id: string): ResearchTeam | undefined {
  return researchTeams.find(t => t.id === id);
}

export function getTeamBySlug(slug: string): ResearchTeam | undefined {
  return researchTeams.find(t => t.slug === slug);
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find(a => a.id === id);
}

export function getPublicationById(id: string): Publication | undefined {
  return publications.find(p => p.id === id);
}

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find(p => p.slug === slug);
}

export function getTeamPublications(teamId: string): Publication[] {
  return publications.filter(p => p.teams.includes(teamId));
}

export function getAuthorPublications(authorId: string): Publication[] {
  return publications.filter(p => p.authors.includes(authorId));
}

export function getRecentPublications(limit: number = 5): Publication[] {
  return [...publications]
    .filter(p => p.status === 'published')
    .sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
    .slice(0, limit);
}

export function getMostCitedPublications(limit: number = 5): Publication[] {
  return [...publications]
    .sort((a, b) => b.metrics.citationCount - a.metrics.citationCount)
    .slice(0, limit);
}

export function getMostDownloadedPublications(limit: number = 5): Publication[] {
  return [...publications]
    .sort((a, b) => b.metrics.downloads - a.metrics.downloads)
    .slice(0, limit);
}

export function getTotalCitations(): number {
  return publications.reduce((sum, p) => sum + p.metrics.citationCount, 0);
}

export function getTotalDownloads(): number {
  return publications.reduce((sum, p) => sum + p.metrics.downloads, 0);
}

export function getTotalViews(): number {
  return publications.reduce((sum, p) => sum + p.metrics.views, 0);
}

export function getTotalPublications(): number {
  return publications.length;
}

export function filterPublications(
  filter: {
    type?: string;
    team?: string;
    query?: string;
  }
): Publication[] {
  return publications.filter(p => {
    if (filter.type && p.type !== filter.type) return false;
    if (filter.team && !p.teams.includes(filter.team)) return false;
    if (filter.query) {
      const q = filter.query.toLowerCase();
      const matches = 
        p.title.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));
      if (!matches) return false;
    }
    return true;
  });
}

// Get publications by content type (for editorial calendar)
export function getSignalArticles(): EditorialPublication[] {
  return editorialPublications.filter(p => p.contentType === 'signal');
}

export function getFeatureArticles(): EditorialPublication[] {
  return editorialPublications.filter(p => p.contentType === 'feature');
}

export function getIndexReports(): EditorialPublication[] {
  return editorialPublications.filter(p => p.contentType === 'index');
}
