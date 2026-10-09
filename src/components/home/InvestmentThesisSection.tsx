import React from 'react';
import { ShieldCheck, Zap, Activity, ArrowRight, Lock } from 'lucide-react';

interface InvestmentThesisSectionProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const InvestmentThesisSection: React.FC<InvestmentThesisSectionProps> = ({
  onNavigate,
  onOpenLeadModal,
}) => {
  return (
    <section className="relative py-20 lg:py-28 bg-transparent border-y border-slate-200/70 dark:border-slate-800/80">
      {/* Soothing background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-b from-blue-500/5 via-indigo-500/5 to-transparent rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Thesis Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-3">
            <span>Investment Thesis</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>Market Opportunity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-slate-950 dark:text-white leading-[1.15]">
            Bridging the chasm between raw AI prototypes and <span className="font-serif italic font-normal bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 dark:from-white dark:via-slate-200 dark:to-blue-200 bg-clip-text text-transparent">regulated enterprise production.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Ninety percent of enterprise AI initiatives fail at compliance, latency, and operational sovereignty. We build deterministic, air-gapped AI engines and vertical products designed for the most demanding regulated sectors.
          </p>
        </div>

        {/* 3 High-Impact Operational Proof Points */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Proof 1 */}
          <div className="group p-8 rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-blue-300 dark:hover:border-slate-600 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-105 transition-transform">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-3xl sm:text-4xl font-light tracking-tight text-slate-950 dark:text-white">
                &lt; 340ms
              </div>
              <div className="text-xs uppercase tracking-wider font-medium text-slate-500 dark:text-slate-400 mt-2">
                Deterministic Inference Latency
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Sub-second multi-turn reasoning orchestrated locally on customer infrastructure without multi-tenant cloud bottlenecks.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
              <span>Benchmarked on H100 Sovereign Node</span>
            </div>
          </div>

          {/* Proof 2 */}
          <div className="group p-8 rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-slate-600 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
            <div>
              <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-105 transition-transform">
                <Lock className="w-4 h-4" />
              </div>
              <div className="text-3xl sm:text-4xl font-light tracking-tight text-slate-950 dark:text-white">
                Zero Retention
              </div>
              <div className="text-xs uppercase tracking-wider font-medium text-slate-500 dark:text-slate-400 mt-2">
                Sovereign Data Guarantee
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Zero model retraining on customer data. Air-gapped on-premise or sovereign VPC deployments satisfying strict HIPAA and banking standards.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80" />
              <span>Air-Gapped & Ephemeral Memory</span>
            </div>
          </div>

          {/* Proof 3 */}
          <div className="group p-8 rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-teal-300 dark:hover:border-slate-600 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300">
            <div>
              <div className="w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 group-hover:scale-105 transition-transform">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-3xl sm:text-4xl font-light tracking-tight text-slate-950 dark:text-white">
                Scrabyt
              </div>
              <div className="text-xs uppercase tracking-wider font-medium text-slate-500 dark:text-slate-400 mt-2">
                Clinical Intelligence Engine
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Live commercial flagship proving unit economics: real-time patient triage, SOAP note synthesis, and FHIR integration deployed in clinical trials.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500/80" />
              <span>Commercial Flagship in Production</span>
            </div>
          </div>
        </div>

        {/* Quick investor action strip */}
        <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-800 shadow-xl relative overflow-hidden">
          {/* Subtle inner sheen */}
          <div
            className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <h3 className="text-xl font-medium tracking-tight text-white">
              Evaluating our capital round or strategic technology partnership?
            </h3>
            <p className="mt-1.5 text-sm text-slate-400 max-w-xl font-normal">
              Access the complete investment briefing, platform architecture, verified unit economics, and founder direct channel.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('/investors')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-medium tracking-tight transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <span>View Investor Briefing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenLeadModal('Investment Thesis Direct Request')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/15 transition-colors cursor-pointer"
            >
              <span>Request Deck</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
