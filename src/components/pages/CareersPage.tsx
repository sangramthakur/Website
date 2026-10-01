import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Send, Check } from 'lucide-react';
import { JOB_POSTINGS } from '../../data/jobs';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { leadService } from '../../services/leadService';

interface CareersPageProps {
  onNavigate: (href: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const [profileSubmitted, setProfileSubmitted] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    profileUrl: '',
    notes: '',
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.name || !profileData.email) return;

    leadService.saveLead({
      name: profileData.name,
      email: profileData.email,
      company: 'Talent Network Applicant',
      lead_source: 'Referral',
      landing_page: '/careers',
      interest: 'Career Opportunity',
      business_problem: `Candidate profile: ${profileData.profileUrl || 'None'} - ${profileData.notes}`,
    });

    setProfileSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SeoHead
        title="Careers – Distributed Systems & AI Engineering"
        description="Join our team architecting low-latency inference gateways, autonomous agent state machines, and zero-trust AI platforms."
        canonicalPath="/careers"
      />

      <Breadcrumbs items={[{ label: 'Company', href: '/company' }, { label: 'Careers' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Engineering & Research Roles
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Build the infrastructure that powers enterprise AI.
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          We are an engineering-led team tackling hard problems in distributed GPU virtualization, cyclic state machines, and zero-trust model governance.
        </p>
      </div>

      {/* Open Positions List */}
      <div className="space-y-6">
        <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
          Open Technical Positions ({JOB_POSTINGS.length})
        </div>

        <div className="grid grid-cols-1 gap-6">
          {JOB_POSTINGS.map((job) => (
            <div
              key={job.id}
              className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {job.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500 font-mono">
                    <span>{job.department}</span>
                    <span>·</span>
                    <span>{job.location}</span>
                    <span>·</span>
                    <span>{job.workModel}</span>
                    <span>·</span>
                    <span className="text-emerald-600 font-semibold">{job.publishedStatus}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`To apply for ${job.title}, please send your resume and GitHub profile to talent@internal-platform.systems`)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500 text-white dark:text-slate-900 dark:hover:text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
                >
                  Apply for Role
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {job.description}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-slate-400">Core Experience & Qualifications:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Submission Intake: "Don't see the right role? Send us your profile." */}
      <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 max-w-3xl space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Don't see the right role? Send us your profile.
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          We are continually interested in speaking with exceptional systems engineers, compilers/runtime researchers, and applied AI leads.
        </p>

        {profileSubmitted ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Profile received. Our engineering leadership reviews speculative profiles weekly.</span>
          </div>
        ) : (
          <form onSubmit={handleProfileSubmit} className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="px-3.5 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
              <input
                type="email"
                required
                placeholder="Email Address *"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="px-3.5 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>
            <input
              type="url"
              placeholder="LinkedIn, GitHub, or Personal Site URL"
              value={profileData.profileUrl}
              onChange={(e) => setProfileData({ ...profileData, profileUrl: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
            <textarea
              rows={2}
              placeholder="Brief summary of your systems or research focus..."
              value={profileData.notes}
              onChange={(e) => setProfileData({ ...profileData, notes: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl resize-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Submit Profile</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
