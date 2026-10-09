import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, BarChart3, ShieldCheck, Lock } from 'lucide-react';

interface EnterpriseTractionSectionProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const EnterpriseTractionSection: React.FC<EnterpriseTractionSectionProps> = ({
  onNavigate,
  onOpenLeadModal,
}) => {
  const metrics = [
    {
      stat: '4',
      label: 'Active Enterprise Pilots',
      caption: 'Clinical environments evaluating Scrabyt triage and automated SOAP note workflows.',
      badge: 'Validation',
    },
    {
      stat: '100%',
      label: 'Citation Provenance',
      caption: 'Every synthesized output cryptographically mapped to verified ground-truth records.',
      badge: 'Defensibility',
    },
    {
      stat: '$24B',
      label: 'Immediate SAM by 2028',
      caption: 'Healthcare & regulated agent workflows, expanding to $180B+ sovereign enterprise TAM.',
      badge: 'Market Scale',
    },
    {
      stat: '82%+',
      label: 'Target Gross Margin',
      caption: 'Software license + managed sovereign cluster economics with minimal cloud overhead.',
      badge: 'Economics',
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative border-b border-slate-200/70 dark:border-slate-800/80 bg-transparent text-slate-900 dark:text-white overflow-hidden">
      {/* Soothing background radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-cyan-500/5 via-blue-500/5 to-indigo-500/5 rounded-full blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-3">
            <span>Market Scalability</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>Traction Evidence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900 dark:text-white leading-tight">
            Clear wedge. Massive market. <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 dark:from-white dark:via-slate-200 dark:to-blue-200 bg-clip-text text-transparent">
              High-margin defensibility.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-normal">
            We validate our deterministic intelligence engine in high-liability healthcare operations before scaling horizontally across regulated enterprise verticals.
          </p>
        </div>

        {/* 4 Distinct Metrics Grid (Clean institutional typography) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {metrics.map((item) => (
            <div
              key={item.label}
              className="group p-8 rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-blue-300 dark:hover:border-slate-600 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div>
                <div className="inline-block text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-3 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60">
                  {item.badge}
                </div>
                <div className="text-4xl sm:text-5xl font-light tracking-tight mb-3 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 dark:from-white dark:via-slate-100 dark:to-blue-200 bg-clip-text text-transparent group-hover:scale-[1.02] transition-transform">
                  {item.stat}
                </div>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-200 mb-2">
                  {item.label}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scalability Roadmap Bridge */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <span className="text-xs font-medium tracking-wider uppercase text-slate-400">
                Strategic Expansion Path
              </span>
              <h3 className="text-2xl font-light text-slate-900 dark:text-white mt-2 leading-snug">
                How this becomes a <span className="font-serif italic font-normal bg-gradient-to-r from-slate-900 to-blue-900 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">category-defining company.</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed font-normal">
                Starting with mission-critical clinical intelligence builds deep technical defensibility, clinical workflow lock-in, and sovereign IP that raw foundation model wrappers cannot replicate.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 transition-all hover:border-blue-300 dark:hover:border-slate-700">
                <div className="text-[11px] font-medium tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">Phase I · Current</div>
                <div className="text-sm font-medium text-slate-900 dark:text-white mb-1.5">Clinical Beachhead</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  Scrabyt deployments in pilot clinics. High ACV, verified clinician retention, sub-340ms real-time transcription.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 transition-all hover:border-indigo-300 dark:hover:border-slate-700">
                <div className="text-[11px] font-medium tracking-wider uppercase text-indigo-600 dark:text-indigo-400 mb-2">Phase II · Scale</div>
                <div className="text-sm font-medium text-slate-900 dark:text-white mb-1.5">Multi-Vertical Mesh</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  Export sovereign agent orchestration to legal, defense, and banking where zero data retention is mandatory.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 transition-all hover:border-teal-300 dark:hover:border-slate-700">
                <div className="text-[11px] font-medium tracking-wider uppercase text-teal-600 dark:text-teal-400 mb-2">Phase III · Standard</div>
                <div className="text-sm font-medium text-slate-900 dark:text-white mb-1.5">Sovereign Runtime</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  The standard on-premise execution layer for air-gapped deterministic enterprise intelligence.
                </p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span>Institutional capital round & strategic co-development inquiries open.</span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onNavigate('/investors')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-medium tracking-tight transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span>Open Investor Briefing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenLeadModal('Scalability Section Deck Request')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-transparent hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-800"
              >
                <span>Request Term Sheet / Deck</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
