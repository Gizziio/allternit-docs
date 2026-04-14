/**
 * Allternit Research System Type Definitions
 */

// =============================================================================
// ENUMERATIONS
// =============================================================================

export type PublicationType =
  | 'paper'
  | 'report'
  | 'blog'
  | 'economic'
  | 'safety'
  | 'constitutional'
  | 'policy'
  | 'feedback';

export type PublicationStatus =
  | 'draft'
  | 'review'
  | 'revisions'
  | 'accepted'
  | 'published'
  | 'archived'
  | 'withdrawn';

export type LicenseType =
  | 'cc-by-4.0'
  | 'cc-by-sa-4.0'
  | 'cc-by-nc-4.0'
  | 'cc0'
  | 'proprietary';

export type AccessLevel = 'public' | 'registered' | 'restricted';

export type AuthorType = 'internal' | 'external' | 'collaborator';

export type SocialPlatform = 'twitter' | 'linkedin' | 'facebook' | 'reddit' | 'hacker-news';

// =============================================================================
// CORE INTERFACES
// =============================================================================

export interface Publication {
  id: string;
  slug: string;
  doi?: string;
  type: PublicationType;
  status: PublicationStatus;
  title: string;
  subtitle?: string;
  abstract: string;
  authors: string[];
  teams: string[];
  tags: string[];
  keywords: string[];
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
  content: {
    markdown?: string;
    html?: string;
    pdfUrl?: string;
  };
  figures?: Figure[];
  tables?: Table[];
  codeRepositories?: CodeRepo[];
  datasets?: Dataset[];
  metrics: PublicationMetrics;
  license: LicenseType;
  accessLevel: AccessLevel;
  externalIds?: {
    arxiv?: string;
    semanticScholar?: string;
    googleScholar?: string;
    pubmed?: string;
  };
}

export interface Author {
  id: string;
  type: AuthorType;
  name: string;
  email: string;
  orcid?: string;
  bio?: string;
  avatar?: string;
  website?: string;
  affiliations: Affiliation[];
  googleScholarId?: string;
  twitter?: string;
  github?: string;
  userId?: string;
  role?: string;
  publications?: string[];
  metrics: AuthorMetrics;
}

export interface ResearchTeam {
  id: string;
  slug: string;
  name: string;
  fullName: string;
  description: string;
  mission: string;
  researchQuestions: string[];
  focus: string[];
  methodologies: string[];
  leads: string[];
  members: string[];
  publications?: string[];
  metrics: TeamMetrics;
  publicationSchedule: {
    frequency: 'weekly' | 'monthly' | 'quarterly' | 'biannual' | 'annual' | 'as-needed';
    nextDeadline?: string;
  };
}

// =============================================================================
// SUPPORTING INTERFACES
// =============================================================================

export interface Affiliation {
  institution: string;
  department?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  isCurrent: boolean;
}

export interface Figure {
  id: string;
  title: string;
  description?: string;
  url: string;
  altText: string;
  caption?: string;
}

export interface Table {
  id: string;
  title: string;
  data: Record<string, unknown>[];
  columns: string[];
}

export interface CodeRepo {
  id: string;
  title: string;
  url: string;
  language?: string;
  description?: string;
}

export interface Dataset {
  id: string;
  title: string;
  description: string;
  url: string;
  license: string;
  size?: string;
  format?: string;
}

// =============================================================================
// METRICS INTERFACES
// =============================================================================

export interface PublicationMetrics {
  views: number;
  uniqueVisitors: number;
  downloads: number;
  citationCount: number;
  citations?: Citation[];
  socialShares?: SocialShare[];
  pressMentions?: PressMention[];
  policyCitations?: PolicyCitation[];
  altmetricScore?: number;
  timeSeries?: TimeSeriesPoint[];
}

export interface AuthorMetrics {
  publicationCount: number;
  citationCount: number;
  hIndex: number;
}

export interface TeamMetrics {
  publicationCount: number;
  citationCount: number;
  hIndex: number;
}

export interface Citation {
  id: string;
  source: string;
  citingWork: string;
  citingAuthors: string[];
  url?: string;
  date: string;
  context?: string;
  verified: boolean;
}

export interface SocialShare {
  platform: SocialPlatform;
  url: string;
  author?: string;
  date: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
}

export interface PressMention {
  outlet: string;
  title: string;
  url: string;
  date: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  reach?: number;
}

export interface PolicyCitation {
  document: string;
  organization: string;
  url?: string;
  date: string;
  context: string;
}

export interface TimeSeriesPoint {
  date: string;
  metric: string;
  value: number;
}

// =============================================================================
// NEWSLETTER INTERFACES
// =============================================================================

export interface NewsletterSubscriber {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  organization?: string;
  interests: string[];
  frequency: 'weekly' | 'monthly' | 'quarterly';
  isActive: boolean;
  subscribedAt: string;
  confirmedAt?: string;
  unsubscribedAt?: string;
  confirmationToken?: string;
  preferences?: Record<string, unknown>;
}

// =============================================================================
// SUBMISSION INTERFACES
// =============================================================================

export interface ExternalSubmission {
  id: string;
  submitterName: string;
  submitterEmail: string;
  submitterAffiliation?: string;
  submissionType: 'collaboration' | 'paper' | 'data' | 'feedback';
  title?: string;
  abstract?: string;
  content?: string;
  attachments?: Attachment[];
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  assignedReviewer?: string;
  notes?: string;
  submittedAt: string;
  reviewedAt?: string;
  respondedAt?: string;
}

export interface Attachment {
  filename: string;
  url: string;
  size: number;
  mimeType: string;
}

// =============================================================================
// FILTER AND SORT TYPES
// =============================================================================

export interface PublicationFilter {
  type?: PublicationType;
  status?: PublicationStatus;
  team?: string;
  author?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  query?: string;
}

export type PublicationSort =
  | 'publishedAt-desc'
  | 'publishedAt-asc'
  | 'citationCount-desc'
  | 'downloads-desc'
  | 'title-asc';

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SearchResult {
  publication: Publication;
  score: number;
  highlights: string[];
}

export interface ImpactMetrics {
  totalPublications: number;
  totalCitations: number;
  totalDownloads: number;
  totalViews: number;
  byType: Record<PublicationType, number>;
  byTeam: Record<string, number>;
  timeSeries: TimeSeriesPoint[];
}
