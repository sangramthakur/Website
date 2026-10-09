import React from 'react';
import { Shield, Zap, Lock, Award, ArrowRight } from 'lucide-react';

interface ArchitecturalSpecsSectionProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const ArchitecturalSpecsSection: React.FC<ArchitecturalSpecsSectionProps> = ({
  onNavigate,
  onOpenLeadModal,
}) => {
  const specs = [
    {
      stat: '0.00%',
      label: 'Data Retention',
      description: 'Zero customer tokens, embeddings, or prompts stored on foundation model endpoints.',
      icon: Shield,
      accent: 'text-blue-600 dark:text-blue-400',
    },
    {
      stat: '<340ms',
      label: 'P95 Latency',
      description: 'Dedicated enterprise clusters with semantic warmup caching and tensor parallelization.',
      icon: Zap,
      accent: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      stat: '100%',
      label: 'Citation Provenance',
      description: 'Cryptographic hash trees link every synthesized claim back to verified ground truth.',
      icon: Lock,
      accent: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      stat: '99.99%',
      label: 'Production SLA',
      description: 'High-availability multi-region active-active clusters for mission-critical operations.',
      icon: Award,
      accent: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative border-b border-slate-100 dark:border-slate-800/60 bg-slate-950 text-white overflow-hidden">
      {/* Subtle radial atmosphere */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-indigo-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            Architectural Guarantees
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Engineered without compromise.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Enterprise systems require deterministic behavior, cryptographic verification, and strict confidentiality.
          </p>
        </div>

        {/* 4 Massive Typographic Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {specs.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-sm flex flex-col justify-between space-y-4 hover:border-white/20 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${item.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    Verified
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-white">
                    {item.stat}
                  </div>
                  <div className="text-base font-semibold text-slate-200">{item.label}</div>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Spec Footnote & Architecture Deep Dive CTA */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            Audited for SOC 2 Type II, ISO 27001, HIPAA, and GDPR compliance.
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/technology')}
            className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>Read Systems Architecture Whitepaper</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
