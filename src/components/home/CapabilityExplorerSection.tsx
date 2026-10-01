import React, { useState } from 'react';
import { ArrowRight, Code, Shield, Cpu, Terminal, ArrowUpRight } from 'lucide-react';
import { TECHNICAL_CAPABILITIES } from '../../data/capabilities';

interface CapabilityExplorerSectionProps {
  onNavigate: (href: string) => void;
}

export const CapabilityExplorerSection: React.FC<CapabilityExplorerSectionProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              For Technical Architects & Engineering Leads
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              The Enterprise Capability Matrix
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              Inspect technical stack boundaries, evaluation primitives, and infrastructure building blocks.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/technology')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline cursor-pointer self-start md:self-auto"
          >
            <span>View Full Systems Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3x3 Technical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECHNICAL_CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-blue-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cap.title}
                  </h3>
                  <button
                    onClick={() => onNavigate(cap.route)}
                    className="p-1 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                    aria-label={`Inspect ${cap.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {cap.summary}
                </p>

                {/* Primary Use */}
                <div className="mb-4 text-xs">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                    Primary Production Use:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    {cap.primaryUse}
                  </p>
                </div>

                {/* Technical Stack Tags */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
                    Underlying Primitives:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cap.technicalStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-5 mt-2">
                <button
                  onClick={() => onNavigate(cap.route)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>Architecture & Integration Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
