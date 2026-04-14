import { useState, useEffect } from 'react';
import { 
  FlaskConical, 
  Users, 
  TrendingUp, 
  ArrowRight,
  ChevronRight,
  Clock,
  Calendar,
  Newspaper,
  BookOpen,
  FileText,
  Zap,
  BarChart3
} from 'lucide-react';
import { NewsletterSignup, ExternalSubmissionForm, ImpactDashboard } from '../components/research';
import { 
  researchTeams, 
  publications,
  getSignalArticles,
  getFeatureArticles,
  filterPublications
} from '../data/research-content';
import type { Publication } from '../types/research';
import type { EditorialPublication } from '../data/editorial-calendar';
import { CONTENT_TYPE_META } from '../data/editorial-calendar';

// =============================================================================
// CONTENT TYPE BADGES
// =============================================================================

function ContentTypeBadge({ type }: { type: string }) {
  const meta = CONTENT_TYPE_META[type as keyof typeof CONTENT_TYPE_META] || {
    label: type,
    color: 'gray'
  };
  
  const colorClasses: Record<string, string> = {
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    gray: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colorClasses[meta.color]}`}>
      {meta.label}
    </span>
  );
}

// =============================================================================
// PUBLICATION CARDS
// =============================================================================

function SignalCard({ pub }: { pub: EditorialPublication }) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <ContentTypeBadge type={pub.contentType} />
          {pub.series && (
            <span className="text-xs text-indigo-600 font-medium">{pub.series}</span>
          )}
        </div>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {pub.readingTime} min
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">
        {pub.title}
      </h3>
      
      {pub.subtitle && (
        <p className="text-sm text-gray-600 mt-1">{pub.subtitle}</p>
      )}
      
      <p className="text-sm text-gray-600 mt-3 line-clamp-3">{pub.abstract}</p>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          {new Date(pub.publishedAt!).toLocaleDateString('en-US', { 
            weekday: 'short',
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1">
          Read <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}

function FeatureCard({ pub }: { pub: EditorialPublication }) {
  return (
    <article className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 overflow-hidden hover:shadow-xl transition-all group">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <ContentTypeBadge type={pub.contentType} />
          {pub.issueNumber && (
            <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded">
              Issue {pub.issueNumber}
            </span>
          )}
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {pub.readingTime} min read
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors leading-tight">
          {pub.title}
        </h3>
        
        {pub.subtitle && (
          <p className="text-base text-gray-700 mt-2 font-medium">{pub.subtitle}</p>
        )}
        
        <p className="text-gray-600 mt-4">{pub.abstract}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {pub.tags.map((tag: string) => (
            <span key={tag} className="text-xs bg-white/70 text-gray-600 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-indigo-200/50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            {new Date(pub.publishedAt!).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
            {pub.series && (
              <span className="text-indigo-700 font-medium ml-2">{pub.series}</span>
            )}
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
            Read Feature <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

function TeamCard({ team }: { team: typeof researchTeams[0] }) {
  const teamPubs = publications.filter(p => p.teams.includes(team.id));
  const recentPubs = teamPubs
    .sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
    .slice(0, 2);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{team.name}</h3>
            <p className="text-sm text-gray-500">{team.fullName}</p>
          </div>
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
            <FlaskConical className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
        <p className="text-gray-600 mt-3 line-clamp-3">{team.description}</p>
        
        <div className="flex items-center gap-4 mt-4 text-sm">
          <span className="text-gray-600">
            <span className="font-semibold text-gray-900">{team.metrics.publicationCount}</span> publications
          </span>
        </div>

        {recentPubs.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Recent Work</p>
            {recentPubs.map(pub => (
              <a 
                key={pub.id}
                href="#"
                className="block text-sm text-indigo-600 hover:text-indigo-700 truncate mb-1"
              >
                {pub.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<'latest' | 'signal' | 'feature' | 'teams' | 'impact' | 'submit'>('latest');
  const [searchQuery] = useState('');
  const [, setFilteredPubs] = useState<Publication[]>(publications);

  const signalArticles = getSignalArticles();
  const featureArticles = getFeatureArticles();

  useEffect(() => {
    const filtered = filterPublications({ query: searchQuery || undefined });
    setFilteredPubs(filtered);
  }, [searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <FlaskConical className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Allternit Research</h1>
            <p className="text-gray-600">AI Safety & Impact • The Signal, The Feature, The Index, The Annual</p>
          </div>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl">
          We publish rigorous, timely analysis of AI developments—from daily briefings 
          to deep investigative features. Our work combines the speed of tech journalism 
          with the depth of academic research.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
        {[
          { id: 'latest', label: 'Latest', icon: Newspaper },
          { id: 'signal', label: 'The Signal', icon: Zap },
          { id: 'feature', label: 'The Feature', icon: BookOpen },
          { id: 'teams', label: 'Research Teams', icon: Users },
          { id: 'impact', label: 'Impact Dashboard', icon: TrendingUp },
          { id: 'submit', label: 'Submit Research', icon: FileText },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === 'latest' && (
        <div className="space-y-8">
          {/* Featured Feature */}
          {featureArticles.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  The Feature
                </h2>
                <button 
                  onClick={() => setActiveTab('feature')}
                  className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {featureArticles.slice(0, 1).map(pub => (
                  <FeatureCard key={pub.id} pub={pub} />
                ))}
              </div>
            </section>
          )}

          {/* Latest Signal */}
          {signalArticles.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-600" />
                  The Signal
                </h2>
                <button 
                  onClick={() => setActiveTab('signal')}
                  className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {signalArticles.slice(0, 4).map(pub => (
                  <SignalCard key={pub.id} pub={pub} />
                ))}
              </div>
            </section>
          )}

          {/* Publication Schedule */}
          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Publication Schedule</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span className="font-medium text-gray-900">The Signal</span>
                </div>
                <p className="text-sm text-gray-600">Weekday mornings</p>
                <p className="text-xs text-gray-500 mt-1">Breaking news & analysis</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium text-gray-900">The Feature</span>
                </div>
                <p className="text-sm text-gray-600">Friday mornings</p>
                <p className="text-xs text-gray-500 mt-1">Deep dives & investigations</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-gray-900">The Index</span>
                </div>
                <p className="text-sm text-gray-600">Quarterly</p>
                <p className="text-xs text-gray-500 mt-1">Economic Index & data</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-gray-900">The Annual</span>
                </div>
                <p className="text-sm text-gray-600">December</p>
                <p className="text-xs text-gray-500 mt-1">Year in review</p>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <NewsletterSignup />
        </div>
      )}

      {activeTab === 'signal' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">The Signal</h2>
              <p className="text-gray-600">What matters in AI today. Published weekday mornings.</p>
            </div>
          </div>
          {signalArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {signalArticles.map(pub => (
                <SignalCard key={pub.id} pub={pub} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              The Signal articles coming soon. Subscribe to get them in your inbox.
            </div>
          )}
        </div>
      )}

      {activeTab === 'feature' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">The Feature</h2>
              <p className="text-gray-600">Deep dives that matter. Published every Friday.</p>
            </div>
          </div>
          {featureArticles.length > 0 ? (
            <div className="space-y-6">
              {featureArticles.map(pub => (
                <FeatureCard key={pub.id} pub={pub} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Features coming soon.
            </div>
          )}
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="grid md:grid-cols-2 gap-6">
          {researchTeams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}

      {activeTab === 'impact' && (
        <ImpactDashboard />
      )}

      {activeTab === 'submit' && (
        <div className="max-w-2xl mx-auto">
          <ExternalSubmissionForm />
        </div>
      )}
    </div>
  );
}
