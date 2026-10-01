import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { BUSINESS_PROBLEMS } from '../../data/problems';

interface ProblemDiscoverySectionProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const ProblemDiscoverySection: React.FC<ProblemDiscoverySectionProps> = ({
  onNavigate,
  onOpenLeadModal,
}) => {
  const [selectedProblemId, setSelectedProblemId] = useState<string>(BUSINESS_PROBLEMS[0].id);

  const activeProblem = BUSINESS_PROBLEMS.find((p) => p.id === selectedProblemId) || BUSINESS_PROBLEMS[0];

  return (
    <section className="py-20 sm:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
            Outcome-Led Exploration
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            What are you trying to accomplish?
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            We organize our solutions around specific operational friction points, not generic industry buzzwords.
          </p>
        </div>

        {/* Interactive Problem Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Problem Selectors */}
          <div className="lg:col-span-5 space-y-2">
            {BUSINESS_PROBLEMS.map((problem) => {
              const isSelected = problem.id === selectedProblemId;
              return (
                <button
                  key={problem.id}
                  onClick={() => setSelectedProblemId(problem.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-white dark:bg-slate-800 border-blue-500 shadow-md text-slate-900 dark:text-white'
                      : 'bg-white/60 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-blue-600 dark:bg-blue-400' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                    <span className="text-sm font-semibold tracking-tight">{problem.title}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-blue-600 dark:text-blue-400 translate-x-1' : 'text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Business Outcome & Implementation Architecture */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Target Outcome Profile
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Recommended: {activeProblem.suggestedPillar.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {activeProblem.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeProblem.description}
                </p>
              </div>

              {/* Concrete Outcome Box */}
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
                <div className="text-xs font-mono text-blue-700 dark:text-blue-300 font-semibold uppercase mb-1">
                  Expected Operational Outcome
                </div>
                <div className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  {activeProblem.outcome}
                </div>
              </div>

              {/* Technical Capabilities Required */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Key Underlying Capabilities:
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {activeProblem.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate(activeProblem.route)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                >
                  <span>Explore Solution Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenLeadModal(`Problem: ${activeProblem.title}`)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Discuss This Problem</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
