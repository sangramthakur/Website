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
    <section className="py-20 sm:py-28 relative border-b border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">
            The Product Portfolio
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Specialized systems. <br className="hidden sm:inline" />
            <span className="text-slate-500 dark:text-slate-400">Zero generalized hype.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Every product is engineered with strict deterministic state guarantees, sovereign data boundaries, and verifiable audit trails.
          </p>
        </div>

        {/* Bento Grid: 1 Large Feature Banner + 3 Complementary Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Scrabyt Clinical Intelligence (Flagship Highlight, Spans 7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-emerald-500/5 via-slate-50 to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-950 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300 shadow-sm">
            {/* Top Badge */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Product Launch · Medical AI
                </span>
                <span className="text-xs font-mono text-slate-400">HIPAA & SOC 2 Type II</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Scrabyt — Clinical Intelligence & AI Scribe
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  Ambient clinical dialogue captured in real-time, converted into structured SOAP notes, verified orders, and ICD-10/CPT coding alignment. Eliminates 2.5 hours of physician charting every day.
                </p>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-slate-400 text-[10px]">SOAP ACCURACY</div>
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">99.4%</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-slate-400 text-[10px]">CHARTING TIME</div>
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">-2.5 hrs/day</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-slate-400 text-[10px]">DATA RETENTION</div>
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">0.00% Zero-PII</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleScrabytClick}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Launch Scrabyt Website</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/products/scrabyt')}
                className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>View Product Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Workflow Kernel [Alpha] (Spans 5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 p-8 flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  Alpha Access
                </span>
                <Cpu className="w-5 h-5 text-blue-500" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Workflow Kernel
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Autonomous deterministic execution spine. Coordinates multi-agent workers, manages dynamic task trees, and falls back gracefully to human verification queues.
                </p>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Deterministic Graph Execution</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Sandboxed Tool Invocation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Automatic Error Recovery</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate('/products/workflow-kernel')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Request Alpha Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Knowledge Synapse [Beta] (Spans 6 cols) */}
          <div className="lg:col-span-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 p-8 flex flex-col justify-between hover:border-violet-500/40 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                  Beta Testing
                </span>
                <Database className="w-5 h-5 text-violet-500" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Knowledge Synapse
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Enterprise neural retrieval engine connecting distributed codebases, ERPs, and document silos with verifiable cryptographic citation provenance graphs.
                </p>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-500" />
                  <span>Hierarchical Hybrid Vector Search</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-500" />
                  <span>Neural Cross-Encoder Reranker</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate('/products/knowledge-synapse')}
                className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Request Beta Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Autonomous Ops Engine [Preview] (Spans 6 cols) */}
          <div className="lg:col-span-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 p-8 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  Product Preview
                </span>
                <Activity className="w-5 h-5 text-cyan-500" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Autonomous Ops Engine
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Real-time telemetry anomaly detection and predictive failure anticipation. Intercepts infrastructure degradation hours before production outages manifest.
                </p>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Multi-variate Time-series Anomaly Detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Closed-Loop Remediation Playbooks</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate('/products/autonomous-ops-engine')}
                className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
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
