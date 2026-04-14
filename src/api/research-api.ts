/**
 * Research API Contracts
 */

import type {
  Publication,
  NewsletterSubscriber,
  ExternalSubmission,
  PublicationFilter,
  PublicationSort,
  PaginatedResponse,
  SearchResult,
  ImpactMetrics,
  ResearchTeam,
} from '../types/research';

import {
  publications,
  newsletterSubscribers,
  externalSubmissions,
  researchTeams,
  getTeamById,
  getTeamBySlug,
  getAuthorById,
  getPublicationById,
  getPublicationBySlug,
  getTeamPublications,
  getAuthorPublications,
  getRecentPublications,
  getMostCitedPublications,
  getMostDownloadedPublications,
  filterPublications,
} from '../data/research-content';

// =============================================================================
// PUBLICATION ENDPOINTS
// =============================================================================

export interface ListPublicationsParams {
  page?: number;
  perPage?: number;
  sort?: PublicationSort;
  filter?: PublicationFilter;
}

export async function listPublications(
  params: ListPublicationsParams = {}
): Promise<PaginatedResponse<Publication>> {
  const page = params.page || 1;
  const perPage = params.perPage || 10;
  const sort = params.sort || 'publishedAt-desc';
  const filter = params.filter || {};

  let results = filterPublications(filter);

  const [sortField, sortDir] = sort.split('-');
  results.sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'publishedAt':
        comparison = new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime();
        break;
      case 'citationCount':
        comparison = b.metrics.citationCount - a.metrics.citationCount;
        break;
      case 'downloads':
        comparison = b.metrics.downloads - a.metrics.downloads;
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
    }
    return sortDir === 'asc' ? -comparison : comparison;
  });

  const total = results.length;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const data = results.slice(start, end);

  return {
    data,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
      hasNext: end < total,
      hasPrev: page > 1,
    },
  };
}

export async function getPublication(id: string): Promise<Publication | null> {
  return getPublicationById(id) || null;
}

export async function getPublicationBySlugApi(slug: string): Promise<Publication | null> {
  return getPublicationBySlug(slug) || null;
}

export async function searchPublications(query: string): Promise<SearchResult[]> {
  const q = query.toLowerCase();
  return publications
    .filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.abstract.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.keywords.some(k => k.toLowerCase().includes(q))
    )
    .map(p => ({
      publication: p,
      score: 1.0,
      highlights: [p.abstract.substring(0, 200) + '...'],
    }))
    .sort((a, b) => b.score - a.score);
}

// =============================================================================
// NEWSLETTER ENDPOINTS
// =============================================================================

export interface NewsletterSignupParams {
  email: string;
  firstName?: string;
  lastName?: string;
  organization?: string;
  interests: string[];
  frequency: 'weekly' | 'monthly' | 'quarterly';
}

export async function newsletterSignup(
  params: NewsletterSignupParams
): Promise<{ success: boolean; message: string }> {
  const existing = newsletterSubscribers.find((s: NewsletterSubscriber) => s.email === params.email);
  if (existing) {
    if (existing.isActive) {
      return { success: false, message: 'Email already subscribed' };
    } else {
      existing.isActive = true;
      existing.unsubscribedAt = undefined;
      return { success: true, message: 'Subscription reactivated' };
    }
  }

  const subscriber: NewsletterSubscriber = {
    id: `sub-${Date.now()}`,
    email: params.email,
    firstName: params.firstName,
    lastName: params.lastName,
    organization: params.organization,
    interests: params.interests,
    frequency: params.frequency,
    isActive: true,
    subscribedAt: new Date().toISOString(),
    confirmationToken: generateToken(),
  };

  newsletterSubscribers.push(subscriber);
  return { success: true, message: 'Please check your email to confirm subscription' };
}

export async function unsubscribe(email: string): Promise<{ success: boolean }> {
  const subscriber = newsletterSubscribers.find((s: NewsletterSubscriber) => s.email === email);
  if (subscriber) {
    subscriber.isActive = false;
    subscriber.unsubscribedAt = new Date().toISOString();
    return { success: true };
  }
  return { success: false };
}

// =============================================================================
// SUBMISSION ENDPOINTS
// =============================================================================

export interface SubmitResearchParams {
  name: string;
  email: string;
  affiliation?: string;
  submissionType: 'collaboration' | 'paper' | 'data' | 'feedback';
  title?: string;
  abstract?: string;
  content: string;
}

export async function submitResearch(
  params: SubmitResearchParams
): Promise<{ success: boolean; submissionId: string }> {
  const submission: ExternalSubmission = {
    id: `sub-ext-${Date.now()}`,
    submitterName: params.name,
    submitterEmail: params.email,
    submitterAffiliation: params.affiliation,
    submissionType: params.submissionType,
    title: params.title,
    abstract: params.abstract,
    content: params.content,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  };

  externalSubmissions.push(submission);
  return { success: true, submissionId: submission.id };
}

// =============================================================================
// METRICS ENDPOINTS
// =============================================================================

export async function getImpactMetrics(): Promise<ImpactMetrics> {
  const byType: Record<string, number> = {};
  const byTeam: Record<string, number> = {};

  publications.forEach(p => {
    byType[p.type] = (byType[p.type] || 0) + 1;
    p.teams.forEach(teamId => {
      byTeam[teamId] = (byTeam[teamId] || 0) + 1;
    });
  });

  return {
    totalPublications: publications.length,
    totalCitations: publications.reduce((sum, p) => sum + p.metrics.citationCount, 0),
    totalDownloads: publications.reduce((sum, p) => sum + p.metrics.downloads, 0),
    totalViews: publications.reduce((sum, p) => sum + p.metrics.views, 0),
    byType,
    byTeam,
    timeSeries: [],
  };
}

export async function getMostCitedApi(limit: number = 5): Promise<Publication[]> {
  return getMostCitedPublications(limit);
}

export async function getMostDownloadedApi(limit: number = 5): Promise<Publication[]> {
  return getMostDownloadedPublications(limit);
}

export async function listTeams(): Promise<ResearchTeam[]> {
  return researchTeams;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export {
  getTeamById,
  getTeamBySlug,
  getAuthorById,
  getPublicationById,
  getPublicationBySlug,
  getTeamPublications,
  getAuthorPublications,
  getRecentPublications,
  getMostCitedPublications,
  getMostDownloadedPublications,
};
