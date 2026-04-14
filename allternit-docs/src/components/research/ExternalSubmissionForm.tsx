import { useState } from 'react';
import type { SubmitResearchParams } from '../../api/research-api';
import { submitResearch } from '../../api/research-api';
import { Send, CheckCircle, AlertCircle, Loader2, FileText, MessageSquare, Database, Handshake } from 'lucide-react';

const SUBMISSION_TYPES = [
  { id: 'collaboration', label: 'Collaboration Proposal', icon: Handshake, description: 'Propose a research collaboration with our team' },
  { id: 'paper', label: 'Paper Submission', icon: FileText, description: 'Submit a paper for review or publication consideration' },
  { id: 'data', label: 'Dataset Contribution', icon: Database, description: 'Share a dataset for research use' },
  { id: 'feedback', label: 'General Feedback', icon: MessageSquare, description: 'Send comments, suggestions, or questions' },
];

export function ExternalSubmissionForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SubmitResearchParams>({
    name: '',
    email: '',
    affiliation: '',
    submissionType: 'feedback',
    title: '',
    abstract: '',
    content: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const result = await submitResearch(formData);
      setStatus(result.success ? 'success' : 'error');
      if (result.success) {
        setMessage(`Thank you for your submission! Reference ID: ${result.submissionId}`);
      } else {
        setMessage('Submission failed. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.name && formData.email;
    if (step === 2) return formData.title || formData.submissionType === 'feedback';
    return true;
  };

  if (status === 'success') {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Submission Received!</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        <p className="text-sm text-gray-500">
          We'll review your submission and get back to you within 5-7 business days.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white">Submit to Allternit Research</h3>
        <p className="text-indigo-100 text-sm">Share your research, propose collaborations, or contribute datasets</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                s <= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`flex-1 h-1 rounded ${s < step ? 'bg-indigo-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Contact Info & Type */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Dr. Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="jane.smith@university.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution / Organization</label>
              <input
                type="text"
                value={formData.affiliation}
                onChange={e => setFormData({ ...formData, affiliation: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="University or Research Institute"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Submission Type</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {SUBMISSION_TYPES.map(type => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, submissionType: type.id as any })}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formData.submissionType === type.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${formData.submissionType === type.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                      <div className="font-medium text-gray-900">{type.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Title & Abstract */}
        {step === 2 && (
          <div className="space-y-4">
            {formData.submissionType !== 'feedback' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required={true}
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Research title or proposal name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.submissionType === 'feedback' ? 'Message *' : 'Abstract / Description *'}
              </label>
              <textarea
                required
                value={formData.abstract}
                onChange={e => setFormData({ ...formData, abstract: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={formData.submissionType === 'feedback' 
                  ? 'Your feedback, questions, or comments...'
                  : 'Brief description of your research or proposal...'}
              />
            </div>
          </div>
        )}

        {/* Step 3: Full Content */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Content *</label>
              <textarea
                required
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                placeholder="Provide detailed information about your submission. For papers, include key findings and methodology. For collaborations, describe your team's expertise and proposed scope..."
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> For file uploads (PDFs, datasets), you'll receive an email after submission 
                with instructions on how to securely share larger files.
              </p>
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg px-4 py-3">
                <AlertCircle className="w-5 h-5" />
                <span>{message}</span>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === 'loading' || !formData.content}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
