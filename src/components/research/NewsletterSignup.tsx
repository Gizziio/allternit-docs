import { useState } from 'react';
import type { NewsletterSignupParams } from '../../api/research-api';
import { newsletterSignup } from '../../api/research-api';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const INTEREST_OPTIONS = [
  { id: 'interpretability', label: 'Mechanistic Interpretability' },
  { id: 'alignment', label: 'AI Alignment & Safety' },
  { id: 'societal-impacts', label: 'Societal Impacts' },
  { id: 'economic-index', label: 'Economic Index Reports' },
  { id: 'red-team', label: 'Frontier Red Team Updates' },
  { id: 'all', label: 'All Research Updates' },
];

const FREQUENCY_OPTIONS = [
  { id: 'weekly', label: 'Weekly Digest' },
  { id: 'monthly', label: 'Monthly Summary' },
  { id: 'quarterly', label: 'Quarterly Report' },
];

export function NewsletterSignup() {
  const [formData, setFormData] = useState<NewsletterSignupParams>({
    email: '',
    firstName: '',
    lastName: '',
    organization: '',
    interests: [],
    frequency: 'monthly',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const result = await newsletterSignup(formData);
      setStatus(result.success ? 'success' : 'error');
      setMessage(result.message);
      if (result.success) {
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          organization: '',
          interests: [],
          frequency: 'monthly',
        });
      }
    } catch {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Stay Updated</h3>
          <p className="text-indigo-100">Subscribe to our research newsletter</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="bg-white/20 rounded-xl p-6 text-center">
          <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-300" />
          <p className="text-lg font-medium">{message}</p>
          <p className="text-indigo-100 mt-2">Check your inbox to confirm your subscription.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-indigo-100 mb-1">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="researcher@university.edu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-indigo-100 mb-1">Organization</label>
              <input
                type="text"
                value={formData.organization}
                onChange={e => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="University or Company"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-indigo-100 mb-1">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Jane"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-indigo-100 mb-1">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Smith"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-100 mb-2">Research Interests</label>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map(option => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleInterestToggle(option.id)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    formData.interests.includes(option.id)
                      ? 'bg-white text-indigo-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-100 mb-2">Email Frequency</label>
            <div className="flex gap-3">
              {FREQUENCY_OPTIONS.map(option => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, frequency: option.id as any })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.frequency === option.id
                      ? 'bg-white text-indigo-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-200 bg-red-500/20 rounded-lg px-4 py-2">
              <AlertCircle className="w-4 h-4" />
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 px-6 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Subscribing...
              </>
            ) : (
              'Subscribe to Research Updates'
            )}
          </button>

          <p className="text-xs text-indigo-200 text-center">
            By subscribing, you agree to receive research updates. Unsubscribe at any time.
          </p>
        </form>
      )}
    </div>
  );
}
