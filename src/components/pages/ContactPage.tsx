import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, Building, Calendar, Check, Shield } from 'lucide-react';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { leadService } from '../../services/leadService';

interface ContactPageProps {
  onNavigate: (href: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    jobTitle: '',
    interest: 'AI Agents',
    businessProblem: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) return;

    leadService.saveLead({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      job_title: formData.jobTitle,
      lead_source: 'Contact Form',
      landing_page: '/contact',
      interest: formData.interest,
      business_problem: formData.businessProblem || 'Direct Contact Form Inquiry',
    });

    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SeoHead
        title="Contact Engineering & Architecture – Enterprise AI Platform"
        description="Connect directly with our AI solutions architects and systems engineering leads."
        canonicalPath="/contact"
      />

      <Breadcrumbs items={[{ label: 'Company', href: '/company' }, { label: 'Contact' }]} onNavigate={onNavigate} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Context */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Direct Technical Inquiry
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Connect with our systems architects.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            We avoid aggressive sales funnels. Inquiries are routed directly to senior solutions architects who can discuss distributed systems constraints, memory topologies, and zero-trust security postures.
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-slate-900 dark:text-white">Confidentiality Guarantee</span>
                <span className="text-slate-500">All discussions covered by mutual non-disclosure protections.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-slate-900 dark:text-white">Rapid Technical Alignment</span>
                <span className="text-slate-500">30-minute discovery sessions scheduled within 1 business day.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Adaptive Lead Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Inquiry Logged in Pipeline
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. A solutions lead has been assigned to review your requirements for {formData.company}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
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
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
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
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Primary Area of Interest
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  >
                    <option value="AI Agents">AI Agents (Autonomous Workflows)</option>
                    <option value="AI as a Service">AI as a Service (Managed APIs & RAG)</option>
                    <option value="SaaS Products">SaaS Products (Pre-built Software)</option>
                    <option value="Consulting">Consulting & Custom Engineering</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Describe Your Operational Challenge or Technical Scope:
                </label>
                <textarea
                  rows={4}
                  value={formData.businessProblem}
                  onChange={(e) => setFormData({ ...formData, businessProblem: e.target.value })}
                  placeholder="e.g. Automating multi-source document ingestion and database verification with strict SLA..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
              >
                <span>Submit & Route to Solutions Architect</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
