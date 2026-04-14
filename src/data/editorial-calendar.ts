/**
 * Allternit Research Editorial Calendar
 * 
 * A tech magazine-style publication system with regular cadence.
 * Naming inspired by Wired, The Information, MIT Tech Review.
 */

import type { Publication } from '../types/research';

// Publication types aligned with editorial calendar
export type ContentType = 
  | 'signal'           // Daily: Breaking news, trending analysis
  | 'feature'          // Weekly: Deep investigative pieces
  | 'index'            // Quarterly: Data-heavy research reports
  | 'annual';          // Yearly: Comprehensive review

export interface EditorialPublication extends Publication {
  contentType: ContentType;
  readingTime: number; // minutes
  featured?: boolean;
  series?: string;
  issueNumber?: string;
}

// Editorial calendar configuration
export const EDITORIAL_CALENDAR = {
  signal: {
    name: 'The Signal',
    tagline: 'What matters in AI today',
    frequency: 'weekdays',
    publishTime: '08:00 EST',
    format: 'Brief, punchy analysis (400-900 words)',
    focus: 'Breaking news, product launches, research drops, policy moves',
    sections: ['The Headline', 'Why It Matters', 'The Numbers', 'What to Watch'],
    style: 'Fast, smart, skeptical. Axios meets Stratechery.',
  },
  feature: {
    name: 'The Feature',
    tagline: 'Deep dives that matter',
    frequency: 'every Friday',
    publishTime: '10:00 EST',
    format: 'Long-form investigation (2,000-4,000 words)',
    focus: 'Investigations, explainers, profiles, critical analysis',
    sections: ['The Story', 'The Analysis', 'The Stakes', 'The Future'],
    style: 'Wired cover story meets Harper\'s. Narrative + rigor.',
  },
  index: {
    name: 'The Index',
    tagline: 'By the numbers',
    frequency: 'Jan, Apr, Jul, Oct',
    publishTime: 'First Monday of quarter',
    format: 'Data-driven report (6,000-12,000 words)',
    focus: 'Economic analysis, adoption metrics, safety benchmarks',
    sections: ['Executive Summary', 'Methodology', 'Key Findings', 'Data', 'Implications'],
    style: 'Economist meets academic rigor. Charts, data, precision.',
  },
  annual: {
    name: 'The Annual',
    tagline: 'The year in AI',
    frequency: 'December',
    publishTime: 'December 15',
    format: 'Comprehensive review (15,000+ words)',
    focus: 'Year in review, breakthroughs, predictions, state of the field',
    sections: ['The Year That Was', 'Breakthroughs', 'Setbacks', 'Predictions', 'Data'],
    style: 'Magazine special issue. Sweeping, definitive, readable.',
  },
};

// Content series themes
export const CONTENT_SERIES = {
  'safety-watch': {
    name: 'Safety Watch',
    description: 'Tracking AI safety developments and red flags',
    frequency: 'ongoing',
  },
  'economic-lens': {
    name: 'Economic Lens',
    description: 'AI through the economics perspective',
    frequency: 'ongoing',
  },
  'tool-review': {
    name: 'Tool Review',
    description: 'Hands-on testing of new AI tools',
    frequency: 'ongoing',
  },
  'founder-letter': {
    name: 'Founder Letter',
    description: 'Essays and reflections from the Allternit team',
    frequency: 'monthly',
  },
};

// Editorial guidelines
export const EDITORIAL_GUIDELINES = {
  voice: 'Clear, authoritative, skeptical. No hype, no fear-mongering.',
  stance: 'Independent, evidence-based, constructive criticism.',
  principles: [
    'Lead with the headline',
    'Cite primary sources',
    'Distinguish speculation from fact',
    'Show your work',
    'Admit uncertainty',
  ],
  noGos: [
    'No hype without evidence',
    'No uncritical tech boosterism',
    'No clickbait headlines',
    'No fictional metrics',
  ],
};

// Content type display helpers
export const CONTENT_TYPE_META: Record<ContentType, { label: string; color: string; icon: string }> = {
  'signal': { label: 'The Signal', color: 'amber', icon: 'zap' },
  'feature': { label: 'The Feature', color: 'indigo', icon: 'book-open' },
  'index': { label: 'The Index', color: 'emerald', icon: 'bar-chart' },
  'annual': { label: 'The Annual', color: 'purple', icon: 'calendar' },
};
