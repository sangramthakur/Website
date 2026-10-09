import React from 'react';
import { ArrowRight, ExternalLink, Stethoscope, Cpu, Database, Activity, CheckCircle2, Shield } from 'lucide-react';
import { trackEvent, trackScrabytExternalClick } from '../../services/analytics';

interface FlagshipProductBentoProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const FlagshipProductBento: React.FC<FlagshipProductBentoProps> = ({
  onNavigate,
  onOpenLeadModal,
}) => {
  const handleScrabytClick = () => {
    trackEvent('scrabyt_homepage_bento_click', {
      product: 'Scrabyt',
      destination: 'https://www.scrabyt.com/',
      source_page: 'homepage',
    });
    trackScrabytExternalClick('homepage', 'flagship_product_bento');
    window.open('https://www.scrabyt.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="flagship-products" className="py-20 sm:py-28 relative border-b border-slate-100 dark:border-slate-800/60 bg-transparent scroll-mt-20">
      {/* Soothing background radial glow */}
      <div
        className="absolute top-1/2 left-1/3 w-[700px] h-[500px] bg-gradient-to-tr from-blue-500/5 via-teal-500/5 to-transparent rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-widest uppercase text-slate-500 dark:text-slate-400">
            <span>Specialized Products</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>Deterministic Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900 dark:text-white leading-tight">
            Specialized systems. <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 dark:from-white dark:via-slate-200 dark:to-blue-200 bg-clip-text text-transparent">
              Zero generalized hype.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Every product is engineered with strict deterministic state guarantees, sovereign data boundaries, and verifiable audit trails.
          </p>
        </div>

        {/* Bento Grid: 1 Large Feature Banner + 3 Complementary Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Scrabyt Clinical Intelligence (Flagship Highlight, Spans 7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-blue-300 dark:hover:border-slate-600 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
            {/* Subtle clinical cyan aura corner accent */}
            <div
              className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-bl from-teal-400/15 via-blue-400/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-700"
              aria-hidden="true"
            />

            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wider uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Clinical Intelligence · Production Flagship
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">HIPAA & SOC 2</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-light text-slate-900 dark:text-white tracking-tight">
                  Scrabyt — <span className="font-serif italic font-normal bg-gradient-to-r from-slate-900 to-teal-900 dark:from-white dark:to-teal-200 bg-clip-text text-transparent">Clinical Intelligence & AI Scribe</span>
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-normal">
                  Ambient clinical dialogue captured in real-time, converted into structured SOAP notes, verified orders, and ICD-10/CPT coding alignment. Eliminates 2.5 hours of physician charting every day.
                </p>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-white/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                  <div className="text-slate-400 text-[11px] uppercase tracking-wider">SOAP Accuracy</div>
                  <div className="text-2xl font-light text-slate-900 dark:text-white mt-1">99.4%</div>
                </div>
                <div className="p-4 rounded-xl bg-white/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                  <div className="text-slate-400 text-[11px] uppercase tracking-wider">Charting Saved</div>
                  <div className="text-2xl font-light text-slate-900 dark:text-white mt-1">-2.5 hrs/day</div>
                </div>
                <div className="p-4 rounded-xl bg-white/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 col-span-2 sm:col-span-1 shadow-xs">
                  <div className="text-slate-400 text-[11px] uppercase tracking-wider">Data Retention</div>
                  <div className="text-2xl font-light text-slate-900 dark:text-white mt-1">0.00% Zero-PII</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-wrap items-center gap-4 relative z-10">
              <button
                type="button"
                onClick={handleScrabytClick}
                className="px-6 py-3 bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-medium text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-blue-500/10 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Launch Scrabyt Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/products/scrabyt')}
                className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>View Product Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Workflow Kernel (Spans 5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-8 flex flex-col justify-between hover:border-indigo-300 dark:hover:border-slate-600 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium tracking-wider uppercase">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Autonomous Mesh</span>
                <Cpu className="w-4 h-4 text-indigo-500" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-light text-slate-900 dark:text-white tracking-tight">
                  Workflow Kernel
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Autonomous deterministic execution spine. Coordinates multi-agent workers, manages dynamic task trees, and falls back gracefully to human verification queues.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>Deterministic Graph Execution Contracts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>Sandboxed Tool Invocation Boundaries</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>Automatic Non-blocking Error Recovery</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate('/products/workflow-kernel')}
                className="text-xs font-medium text-slate-900 dark:text-white hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Request Alpha Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Knowledge Synapse (Spans 6 cols) */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-8 flex flex-col justify-between hover:border-cyan-300 dark:hover:border-slate-600 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium tracking-wider uppercase">
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Vector Retrieval</span>
                <Database className="w-4 h-4 text-cyan-500" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-light text-slate-900 dark:text-white tracking-tight">
                  Knowledge Synapse
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Enterprise neural retrieval engine connecting distributed codebases, ERPs, and document silos with verifiable cryptographic citation provenance graphs.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>Hierarchical Hybrid Dense/Sparse Vector Search</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>Neural Cross-Encoder Token-Level Reranker</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate('/products/knowledge-synapse')}
                className="text-xs font-medium text-slate-900 dark:text-white hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Request Beta Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Autonomous Ops Engine (Spans 6 cols) */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-8 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-slate-600 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium tracking-wider uppercase">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Infrastructure Telemetry</span>
                <Activity className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-light text-slate-900 dark:text-white tracking-tight">
                  Autonomous Ops Engine
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Real-time telemetry anomaly detection and predictive failure anticipation. Intercepts infrastructure degradation hours before production outages manifest.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Multi-variate Time-series Anomaly Detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Closed-Loop Automated Remediation Playbooks</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate('/products/autonomous-ops-engine')}
                className="text-xs font-medium text-slate-900 dark:text-white hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Join Preview Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
