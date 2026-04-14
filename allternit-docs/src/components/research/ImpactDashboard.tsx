import { useState, useEffect } from 'react';
import type { ImpactMetrics, Publication, ResearchTeam } from '../../types/research';
import { getImpactMetrics, getMostCitedApi, getMostDownloadedApi, listTeams } from '../../api/research-api';
import { TrendingUp, Download, Eye, Quote, Users, BookOpen, BarChart3, Award } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: 'indigo' | 'emerald' | 'amber' | 'rose' | 'blue' | 'purple';
}

function StatCard({ title, value, subtitle, icon: Icon, trend, trendValue, color }: StatCardProps) {
  const colorClasses = {
    indigo: 'bg-indigo-50 border-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
    amber: 'bg-amber-50 border-amber-100 text-amber-600',
    rose: 'bg-rose-50 border-rose-100 text-rose-600',
    blue: 'bg-blue-50 border-blue-100 text-blue-600',
    purple: 'bg-purple-50 border-purple-100 text-purple-600',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-xl p-6`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {trend && trendValue && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-rose-600' : 'text-gray-500'
            }`}>
              <TrendingUp className="w-4 h-4" />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
          <Icon className={`w-6 h-6 ${colorClasses[color].split(' ')[2]}`} />
        </div>
      </div>
    </div>
  );
}

function PublicationCard({ publication, rank }: { publication: Publication; rank: number }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
      <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold">
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{publication.title}</h4>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{publication.abstract}</p>
        <div className="flex items-center gap-4 mt-2 text-sm">
          <span className="flex items-center gap-1 text-gray-600">
            <Quote className="w-4 h-4" />
            {publication.metrics.citationCount} citations
          </span>
          <span className="flex items-center gap-1 text-gray-600">
            <Download className="w-4 h-4" />
            {publication.metrics.downloads} downloads
          </span>
        </div>
      </div>
    </div>
  );
}

export function ImpactDashboard() {
  const [metrics, setMetrics] = useState<ImpactMetrics | null>(null);
  const [mostCited, setMostCited] = useState<Publication[]>([]);
  const [mostDownloaded, setMostDownloaded] = useState<Publication[]>([]);
  const [teams, setTeams] = useState<ResearchTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'publications' | 'teams'>('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [metricsData, cited, downloaded, teamsData] = await Promise.all([
        getImpactMetrics(),
        getMostCitedApi(5),
        getMostDownloadedApi(5),
        listTeams(),
      ]);
      setMetrics(metricsData);
      setMostCited(cited);
      setMostDownloaded(downloaded);
      setTeams(teamsData);
    } catch (error) {
      console.error('Failed to load impact data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-12 text-gray-500">
        Failed to load impact metrics
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Research Impact Dashboard</h2>
          <p className="text-gray-600">Metrics and insights from Allternit's research publications</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          {(['overview', 'publications', 'teams'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Publications"
              value={metrics.totalPublications}
              subtitle="Across all research teams"
              icon={BookOpen}
              color="indigo"
            />
            <StatCard
              title="Total Citations"
              value={metrics.totalCitations}
              subtitle="Academic impact"
              icon={Quote}
              trend="up"
              trendValue="+23% this year"
              color="emerald"
            />
            <StatCard
              title="Total Downloads"
              value={metrics.totalDownloads.toLocaleString()}
              subtitle="Open access distribution"
              icon={Download}
              trend="up"
              trendValue="+45% this year"
              color="amber"
            />
            <StatCard
              title="Total Views"
              value={metrics.totalViews.toLocaleString()}
              subtitle="Web page impressions"
              icon={Eye}
              color="blue"
            />
          </div>

          {/* Publications by Type */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                Publications by Type
              </h3>
              <div className="space-y-3">
                {Object.entries(metrics.byType).map(([type, count]) => (
                  <div key={type} className="flex items-center gap-3">
                    <div className="w-32 text-sm text-gray-600 capitalize">{type}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all"
                        style={{
                          width: `${(count / metrics.totalPublications) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-medium text-gray-900">{count}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                Publications by Team
              </h3>
              <div className="space-y-3">
                {teams.map(team => {
                  const count = metrics.byTeam[team.id] || 0;
                  return (
                    <div key={team.id} className="flex items-center gap-3">
                      <div className="w-32 text-sm text-gray-600 truncate">{team.name}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all"
                          style={{
                            width: `${(count / metrics.totalPublications) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="w-12 text-right text-sm font-medium text-gray-900">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Publications Tab */}
      {activeTab === 'publications' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Most Cited
            </h3>
            <div className="space-y-3">
              {mostCited.map((pub, i) => (
                <PublicationCard key={pub.id} publication={pub} rank={i + 1} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-500" />
              Most Downloaded
            </h3>
            <div className="space-y-3">
              {mostDownloaded.map((pub, i) => (
                <PublicationCard key={pub.id} publication={pub} rank={i + 1} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Teams Tab */}
      {activeTab === 'teams' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <div key={team.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{team.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{team.description}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">{team.metrics.publicationCount}</div>
                  <div className="text-xs text-gray-500">Papers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">{team.metrics.citationCount}</div>
                  <div className="text-xs text-gray-500">Citations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">{team.metrics.hIndex}</div>
                  <div className="text-xs text-gray-500">h-index</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  Next deadline: <span className="font-medium text-gray-700">
                    {team.publicationSchedule.nextDeadline 
                      ? new Date(team.publicationSchedule.nextDeadline).toLocaleDateString()
                      : 'TBD'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
