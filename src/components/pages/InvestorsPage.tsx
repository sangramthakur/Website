import React from 'react';
import { ArrowRight, Compass, Shield, Target, Layers } from 'lucide-react';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface InvestorsPageProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const InvestorsPage: React.FC<InvestorsPageProps> = ({ onNavigate, onOpenLeadModal }) => {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SeoHead
        title="Investor Overview – Enterprise AI Platform"
        description="Strategic vision, market problem, platform architecture, and business model for prospective institutional partners."
        canonicalPath="/investors"
      />

      <Breadcrumbs items={[{ label: 'Company', href: '/company' }, { label: 'Investors' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Strategic Platform Direction
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Investor & Capital Partner Overview
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          A disciplined, engineering-first approach to deploying practical AI across global enterprise operations.
        </p>
      </div>

      {/* Restrained Sections: Vision, Problem, What We're Building, Platform Direction, Business Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold uppercase">
            The Structural Problem
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            The Prototype-to-Production Chasm
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            While basic LLM demos are trivial to create, enterprise deployments stall due to hallucinations, unpredictable latency spikes, unverified tool calls, data boundary leakage, and skyrocketing token expenditures. Enterprises require hardened systems engineering, not speculative chatbots.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold uppercase">
            The Architectural Vision
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Deterministic Systems on Probabilistic Models
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            We build the abstraction layers that make foundation models safe and repeatable for mission-critical workflows: stateful execution graphs, pre-inference security firewalls, hybrid retrieval indices, and sandboxed tool runtimes with automated rollback capabilities.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase">
            Commercial Model
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Multi-Tier Value Capture
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Our revenue engine spans high-margin managed inference APIs (AI as a Service), recurring license seats on turnkey software (SaaS Products), and strategic implementation engineering engagements that establish long-term enterprise lock-in.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
            Platform Direction
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Cloud-Agnostic & Sovereign Deployability
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Engineered to operate seamlessly across Google Cloud Platform, customer private VPCs, and sovereign data centers, ensuring compliance with evolving international governance mandates like the EU AI Act.
          </p>
        </div>
      </div>

      {/* Investor Contact Form Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white space-y-4 max-w-3xl">
        <h3 className="text-2xl font-bold">Institutional Inquiries</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          For accredited institutional investors, venture partners, and strategic capital discussions, connect directly with our founding leadership.
        </p>
        <button
          onClick={() => onOpenLeadModal('Investor Relations')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md inline-flex items-center gap-2"
        >
          <span>Connect with Executive Leadership</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
