import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Check, Calendar, Mail, Building, User, Phone, Sparkles } from 'lucide-react';
import { leadService } from '../../services/leadService';
import { LeadSource } from '../../types';

interface AdaptiveLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  ctaSource: string;
}

export const AdaptiveLeadModal: React.FC<AdaptiveLeadModalProps> = ({
  isOpen,
  onClose,
  ctaSource,
}) => {
  const [step, setStep] = useState<'form' | 'submitted'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    jobTitle: '',
    interest: 'AI Agents',
    businessProblem: '',
  });
  const [bookingBooked, setBookingBooked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setBookingBooked(false);
      // Pre-set interest based on source
      if (ctaSource.toLowerCase().includes('demo')) {
        setFormData((prev) => ({ ...prev, interest: 'SaaS Products' }));
      } else if (ctaSource.toLowerCase().includes('consultation')) {
        setFormData((prev) => ({ ...prev, interest: 'Consulting' }));
      } else if (ctaSource.toLowerCase().includes('agent')) {
        setFormData((prev) => ({ ...prev, interest: 'AI Agents' }));
      } else if (ctaSource.toLowerCase().includes('service')) {
        setFormData((prev) => ({ ...prev, interest: 'AI as a Service' }));
      }
    }
  }, [isOpen, ctaSource]);

  if (!isOpen) return null;

  const getSourceType = (): LeadSource => {
    const s = ctaSource.toLowerCase();
    if (s.includes('demo')) return 'Demo';
    if (s.includes('consultation')) return 'Consultation';
    if (s.includes('assessment')) return 'AI Readiness Assessment';
    return 'Contact Form';
  };

  const getAdaptiveFieldLabel = () => {
    const s = ctaSource.toLowerCase();
    if (s.includes('demo')) {
      return {
        label: 'Which product or workflow use case are you interested in demonstrating?',
        placeholder: 'e.g. Automated document extraction or real-time telemetry anomaly detection',
      };
    }
    if (s.includes('consultation')) {
      return {
        label: 'What is your primary operational bottleneck or AI initiative?',
        placeholder: 'e.g. Modernizing internal knowledge retrieval across 50,000 engineering docs',
      };
    }
    return {
      label: 'Describe your business problem or technical requirements:',
      placeholder: 'e.g. High-throughput low-latency inference gateway, multi-agent task automation',
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) return;

    leadService.saveLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      job_title: formData.jobTitle,
      lead_source: getSourceType(),
      landing_page: window.location.pathname,
      interest: formData.interest,
      business_problem: formData.businessProblem || `Inquiry from CTA: ${ctaSource}`,
    });

    setStep('submitted');
  };

  const adaptiveField = getAdaptiveFieldLabel();

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              Direct Engineering Engagement · {ctaSource}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {step === 'form' ? 'Talk to an AI Systems Expert' : 'Inquiry Received'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Elena Rostova"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.rostova@enterprise.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Global Systems Corp"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Role / Title
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  placeholder="VP of Engineering / Product Lead"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Primary Commercial Pillar
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="AI Agents">AI Agents (Autonomous Workflows)</option>
                  <option value="AI as a Service">AI as a Service (Managed APIs & RAG)</option>
                  <option value="SaaS Products">SaaS Products (Pre-built Software)</option>
                  <option value="Consulting">Consulting & Custom Engineering</option>
                </select>
              </div>
            </div>

            {/* Adaptive Contextual Business Problem Field */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {adaptiveField.label}
              </label>
              <textarea
                rows={3}
                value={formData.businessProblem}
                onChange={(e) => setFormData({ ...formData, businessProblem: e.target.value })}
                placeholder={adaptiveField.placeholder}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
              >
                <span>Submit & Connect with an AI Systems Architect</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11px] font-mono text-center text-slate-400 dark:text-slate-500">
              No sales spam. Discussions are conducted by systems architects bound by confidentiality.
            </div>
          </form>
        ) : (
          /* Submission Confirmation & Meeting Booking */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500 text-white shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  Inquiry logged in secure CRM pipeline
                </div>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  Thank you, {formData.name}. A technical lead from our Solutions Group has been assigned to review your requirements for {formData.company}.
                </p>
              </div>
            </div>

            {/* Direct Meeting Booking Option */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Need immediate architectural alignment?</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Select a 30-minute technical discovery window with our distributed systems engineering team.
              </p>

              {bookingBooked ? (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-xl text-xs text-blue-700 dark:text-blue-300 font-mono">
                  ✓ Calendar placeholder requested. Invitation dispatched to {formData.email}.
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setBookingBooked(true)}
                  className="px-4 py-2.5 bg-slate-900 dark:bg-white hover:bg-blue-600 dark:hover:bg-blue-500 text-white dark:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Book Architecture Discovery Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
