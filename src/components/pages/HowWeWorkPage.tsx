import React, { useState } from 'react';
import { ArrowRight, ChevronDown, CheckCircle2, Compass, Layers, Wrench, Rocket, Activity, Target } from 'lucide-react';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface HowWeWorkPageProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const HowWeWorkPage: React.FC<HowWeWorkPageProps> = ({ onNavigate, onOpenLeadModal }) => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);

  const PHASES = [
    {
      num: '01',
      title: 'Discover',
      icon: Compass,
      summary: 'Identify the operational bottlenecks, data availability, and feasibility boundaries of the proposed AI system.',
      businessContext: 'We interview operational stakeholders and inspect existing documentation to pinpoint high-friction queues where intelligent automation yields genuine ROI.',
      technicalDetails: [
        'Review current API schemas, database schemas, and message queues.',
        'Evaluate data cleanliness, chunking complexity, and vector retrieval suitability.',
        'Define explicit latency budgets (p95 / p99) and token spend boundaries.',
      ],
    },
    {
      num: '02',
      title: 'Define',
      icon: Target,
      summary: 'Establish measurable success KPIs, safety boundaries, and quantitative evaluation benchmark suites.',
      businessContext: 'Before writing production code, we establish clear acceptance criteria so business teams know exactly how performance is audited.',
      technicalDetails: [
        'Curate a golden evaluation test dataset representing messy real-world operational edge cases.',
        'Define automated scoring rubrics (exact match, semantic similarity, citation attribution).',
        'Formalize pre-inference prompt firewall policies and PII redaction rules.',
      ],
    },
    {
      num: '03',
      title: 'Design',
      icon: Layers,
      summary: 'Architect the cyclical state graph, memory persistence layers, and tool sandboxes.',
      businessContext: 'We map out how models, agents, and human operators collaborate, ensuring that humans remain in the loop for high-risk actions.',
      technicalDetails: [
        'Specify state machine graphs (LangGraph/Actor model) with deterministic checkpointing.',
        'Design containerized sandboxes for executing arbitrary tools, code, or database queries.',
        'Select optimal base foundation models and draft parameter-efficient fine-tuning (LoRA) specs.',
      ],
    },
    {
      num: '04',
      title: 'Build',
      icon: Wrench,
      summary: 'Implement production-grade pipelines, integrate legacy APIs, and run synthetic evaluation benchmarks.',
      businessContext: 'Our distributed systems engineers build and iterate rapidly, sharing weekly test logs and verifiable benchmark outputs.',
      technicalDetails: [
        'Implement hybrid retrieval (dense vector + sparse BM25) and neural reranking algorithms.',
        'Integrate enterprise identity providers (SAML/OIDC) and tenant isolation rules.',
        'Run automated adversarial tests to detect prompt injection vectors and hallucinations.',
      ],
    },
    {
      num: '05',
      title: 'Deploy',
      icon: Rocket,
      summary: 'Roll out systems via zero-downtime canary pipelines into private cloud VPCs or managed environments.',
      businessContext: 'We transition systems into live operations smoothly with shadow inference modes before executing live autonomous actions.',
      technicalDetails: [
        'Establish active-active multi-region failover and semantic cache layers.',
        'Deploy pre-inference firewall proxies and automated PII anonymization gates.',
        'Implement blue/green rollback triggers tied to latency and error-rate telemetry.',
      ],
    },
    {
      num: '06',
      title: 'Improve',
      icon: Activity,
      summary: 'Monitor production drift, re-index new corporate knowledge, and continuously optimize inference economics.',
      businessContext: 'AI systems require ongoing calibration. We partner through operational scaling to ensure costs decrease as volumes grow.',
      technicalDetails: [
        'Analyze semantic cache hit ratios and optimize cache expiration policies.',
        'Retrain distilled edge models on verified high-confidence completion datasets.',
        'Continuously evaluate new foundation models to capture cost and latency reductions.',
      ],
    },
  ];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SeoHead
        title="How We Work – 6-Phase Engineering Delivery"
        description="Our 6-phase engineering lifecycle: Discover, Define, Design, Build, Deploy, and Improve."
        canonicalPath="/how-we-work"
      />

      <Breadcrumbs items={[{ label: 'How We Work' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Engineering Delivery Methodology
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          From strategic discovery to robust production deployment.
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          A disciplined 6-phase engineering process designed to eliminate prototype fragility and ensure deterministic enterprise outcomes.
        </p>
      </div>

      {/* Visual Phase Cards */}
      <div className="space-y-4">
        {PHASES.map((phase, idx) => {
          const isExpanded = expandedPhase === idx;

          return (
            <div
              key={phase.num}
              className="p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-mono font-bold flex items-center justify-center shrink-0">
                    {phase.num}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{phase.title}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                      {phase.summary}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : idx)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer self-start sm:self-center"
                >
                  <span>{isExpanded ? 'Hide Technical Details' : 'Expand Technical Details'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Progressively Disclosed Technical Specs */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-150">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-2">
                    <span className="text-xs font-mono uppercase text-slate-500 font-semibold">
                      Business & Operational Alignment
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {phase.businessContext}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 space-y-2">
                    <span className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-semibold">
                      Systems Engineering Tasks
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {phase.technicalDetails.map((td, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{td}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Strip */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-lg font-bold">Initiate Phase 01: Discover</div>
          <p className="text-xs text-slate-400">
            Book an architecture discovery session with our distributed systems engineering group.
          </p>
        </div>
        <button
          onClick={() => onOpenLeadModal('How We Work Discovery')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl cursor-pointer whitespace-nowrap shadow-sm"
        >
          Schedule Discovery Discussion
        </button>
      </div>
    </div>
  );
};
