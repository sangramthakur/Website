import React from 'react';
import { AssessmentWizard } from '../assessment/AssessmentWizard';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { Compass, ShieldCheck, Cpu, Database, Users, Target } from 'lucide-react';

interface AssessmentPageProps {
  onNavigate: (href: string) => void;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SeoHead
        title="Enterprise AI Readiness Assessment – Benchmark Your Maturity"
        description="Benchmark your organization across strategy, data architecture, technology, processes, people, and governance. Get an instant score and executive diagnostic."
        canonicalPath="/resources/ai-readiness-assessment"
      />

      <Breadcrumbs
        items={[
          { label: 'Resources' },
          { label: 'AI Readiness Assessment' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Diagnostic Benchmark</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
          Enterprise AI Readiness Assessment
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Evaluate your organizational and technical posture across 6 core pillars. Receive an instant directional maturity score out of 100 with zero required sign-up.
        </p>
      </div>

      {/* Interactive Assessment Wizard */}
      <AssessmentWizard />

      {/* Explanatory Assessment Framework */}
      <div className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            The Six Pillars of Operational AI Readiness
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Our benchmark reflects the structural requirements necessary to deploy autonomous systems safely into live enterprise operations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span>Strategy & Commercial Intent</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Assesses whether AI initiatives are tied to quantified business KPIs, dedicated capital allocations, and active executive sponsors.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-500" />
              <span>Data Architecture & Provenance</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Evaluates indexing coverage, semantic vector chunking pipelines, data hygiene, and automated citation provenance capabilities.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-500" />
              <span>Technology & LLMOps Primitives</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Examines API gateway maturity, semantic caching, automated evaluation benchmark suites, and p95 latency guarantees.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Process Standardization</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Verifies whether workflows are formally standardized with machine-actionable state checkpoints rather than informal tribal knowledge.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-500" />
              <span>People & Engineering Enablement</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Gauges internal machine learning depth, workforce openness to agent collaboration, and human-in-the-loop operational readiness.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-violet-500" />
              <span>Zero-Trust Governance & Safety</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Reviews prompt firewalls, pre-inference PII redactors, audit log permanence, and compliance with emerging global standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
