import React from 'react';
import { ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

interface FinalCTASectionProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onNavigate, onOpenLeadModal }) => {
  return (
    <section className="py-20 sm:py-28 relative border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          <span>PRODUCTION-READY SYSTEMS</span>
          <span aria-hidden="true">·</span>
          <span>NO PUBLIC PRICING LISTED</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
          Ready to deploy practical AI that moves your business forward?
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Schedule an architectural discussion with our engineering team, benchmark your operational readiness, or inspect our technical capabilities.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onOpenLeadModal('Final CTA Primary')}
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-950 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500 text-white dark:text-slate-950 dark:hover:text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Talk to an AI Expert</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/resources/ai-readiness-assessment')}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl border border-slate-200/80 dark:border-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Take AI Readiness Assessment</span>
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs font-mono text-slate-400 dark:text-slate-500">
          <span>Enterprise Confidentiality</span>
          <span>·</span>
          <span>Zero-Data Retention Agreements</span>
          <span>·</span>
          <span>Direct Systems Architects</span>
        </div>
      </div>
    </section>
  );
};
