import React from 'react';
import { ArrowRight, Lock, FileText, UserCheck, ShieldCheck } from 'lucide-react';

interface FinalCTASectionProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onNavigate, onOpenLeadModal }) => {
  return (
    <section className="py-20 sm:py-28 relative border-t border-slate-200/80 dark:border-slate-800/80 bg-transparent">
      {/* Soothing background radial glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-blue-500/5 via-indigo-500/5 to-transparent rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-4">
            <span>Executive Engagement</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>Founder Direct Access</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-slate-900 dark:text-white leading-tight">
            Building the sovereign <span className="font-serif italic font-normal bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 dark:from-white dark:via-slate-200 dark:to-blue-200 bg-clip-text text-transparent">intelligence tier.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Whether you are reviewing our investment thesis or evaluating sovereign AI deployment for your enterprise, our founding team welcomes direct engagement.
          </p>
        </div>

        {/* Dual High-Conviction Access Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Track 1: Investors & Capital Partners */}
          <div className="p-8 sm:p-9 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md flex flex-col justify-between shadow-xs hover:border-blue-300 dark:hover:border-slate-600 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium tracking-wider uppercase">
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                  <Lock className="w-3.5 h-3.5 text-blue-500" />
                  Private Data Room
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">Confidential</span>
              </div>
              <h3 className="text-2xl font-light text-slate-900 dark:text-white tracking-tight">
                Institutional & Angel Inquiries
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Receive our confidential investment memorandum, unit economics, platform architecture whitepaper, and schedule direct time with the founders.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={() => onOpenLeadModal('Investor Deck & Data Room Request')}
                className="w-full px-6 py-3.5 bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-medium text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <FileText className="w-4 h-4 opacity-70" />
                <span>Request Investor Deck & Data Room</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/investors')}
                className="w-full px-5 py-2.5 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Read Full Strategic Thesis & Unit Model</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Track 2: Enterprise Deployments & Commercial Partners */}
          <div className="p-8 sm:p-9 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md flex flex-col justify-between shadow-xs hover:border-teal-300 dark:hover:border-slate-600 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium tracking-wider uppercase">
                <span className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-semibold">
                  <UserCheck className="w-3.5 h-3.5 text-teal-500" />
                  Engineering Systems Pilot
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">Enterprise SLA</span>
              </div>
              <h3 className="text-2xl font-light text-slate-900 dark:text-white tracking-tight">
                Enterprise & Clinical Partners
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Audit your mission-critical workflows with our systems architects. Run zero-retention benchmarks on Scrabyt or deploy private cloud clusters.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={() => onOpenLeadModal('Systems Architecture Discussion')}
                className="w-full px-6 py-3.5 bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-medium text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-teal-500/10 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Talk with Systems Architects</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/resources/ai-readiness-assessment')}
                className="w-full px-5 py-2.5 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Take 3-Min AI Readiness Assessment</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Trust Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-mono text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            Institutional NDA On Request
          </span>
          <span>·</span>
          <span>Zero Third-Party Training Guarantees</span>
          <span>·</span>
          <span>Founder Direct Response &lt; 24h</span>
        </div>
      </div>
    </section>
  );
};
