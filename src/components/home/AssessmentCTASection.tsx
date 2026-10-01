import React from 'react';
import { ArrowRight, BarChart3, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';

interface AssessmentCTASectionProps {
  onNavigate: (href: string) => void;
}

export const AssessmentCTASection: React.FC<AssessmentCTASectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white rounded-3xl mx-3 sm:mx-6 my-12 border border-slate-800">
      {/* Background glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400">
              <Compass className="w-4 h-4" />
              <span>EXECUTIVE BENCHMARK TOOL</span>
              <span aria-hidden="true">·</span>
              <span>15 STRATEGIC QUESTIONS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Assess your enterprise AI readiness in 4 minutes.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Evaluate maturity across Strategy, Data Architecture, Technology, Processes, People, and Governance. Receive an instant directional score and customized gap analysis with zero required sign-up.
            </p>

            {/* Checklist of what's evaluated */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Strategy & Budget</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Data Cleanliness & Provenance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>API & MLOps Infrastructure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Process Standardization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Engineering Enablement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Zero-Trust Governance</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate('/resources/ai-readiness-assessment')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Take the AI Readiness Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Preview Card */}
          <div className="lg:col-span-5 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 sm:p-7 backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <span className="text-xs font-mono text-slate-400">INSTANT EVALUATION OUTPUT</span>
              <span className="text-xs font-mono text-emerald-400">Sample Benchmark</span>
            </div>

            <div className="flex items-baseline gap-3">
              <div className="text-5xl font-bold font-mono text-white">76</div>
              <div className="text-xs text-slate-400 font-mono">
                / 100
                <span className="block text-emerald-400 font-medium">Operational Maturity</span>
              </div>
            </div>

            {/* Category breakdown bar preview */}
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 font-mono mb-1 text-[11px]">
                  <span>Strategy & Roadmap</span>
                  <span>80%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-[80%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 font-mono mb-1 text-[11px]">
                  <span>Data Ingestion & Vector Indexing</span>
                  <span>65%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full w-[65%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 font-mono mb-1 text-[11px]">
                  <span>Pre-Inference Governance</span>
                  <span>85%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 rounded-full w-[85%]" />
                </div>
              </div>
            </div>

            <div className="pt-3 text-[11px] text-slate-400 border-t border-slate-700/80 leading-relaxed">
              Directional assessment calibrated against enterprise architectural standards. Complete questions to generate your report.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
