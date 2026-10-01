import React, { useState } from 'react';
import { ArrowRight, Check, X, Scale, ChevronRight } from 'lucide-react';
import { COMPARISONS } from '../../data/comparisons';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface ComparisonsPageProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const ComparisonsPage: React.FC<ComparisonsPageProps> = ({ onNavigate, onOpenLeadModal }) => {
  const [selectedSlug, setSelectedSlug] = useState<string>(COMPARISONS[0].slug);

  const activeComparison = COMPARISONS.find((c) => c.slug === selectedSlug) || COMPARISONS[0];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SeoHead
        title="Architectural Comparisons & Trade-off Matrices – Enterprise AI Platform"
        description="Factual, balanced architectural comparisons: AI Agents vs Traditional Automation, Enterprise RAG vs Fine-Tuning, and Build vs Buy AI."
        canonicalPath="/comparisons"
      />

      <Breadcrumbs items={[{ label: 'Comparisons' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          <span>Architectural Decision Frameworks</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Objective architectural comparisons.
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Balanced trade-off evaluations designed to help engineering leadership select the optimal paradigm for specific operational constraints.
        </p>
      </div>

      {/* Selector Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        {COMPARISONS.map((comp) => (
          <button
            key={comp.slug}
            onClick={() => setSelectedSlug(comp.slug)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              selectedSlug === comp.slug
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {comp.title}
          </button>
        ))}
      </div>

      {/* Active Comparison Content */}
      <div className="space-y-8 animate-in fade-in duration-150">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {activeComparison.title}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {activeComparison.subtitle} {activeComparison.summary}
          </p>
        </div>

        {/* Trade-off Matrix Table */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4 w-1/4">Evaluation Criterion</th>
                  <th className="px-5 py-4 w-1/3 text-blue-600 dark:text-blue-400 font-bold">
                    {activeComparison.optionA}
                  </th>
                  <th className="px-5 py-4 w-1/3 text-indigo-600 dark:text-indigo-400 font-bold">
                    {activeComparison.optionB}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {activeComparison.tradeoffs.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                      <div>{item.criteria}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-1 font-normal">
                        Recommendation: {item.recommendation}
                      </div>
                    </td>
                    <td className="px-5 py-4 leading-relaxed">
                      {item.optionAAssessment}
                    </td>
                    <td className="px-5 py-4 leading-relaxed">
                      {item.optionBAssessment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to Choose Which */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              When to Select: {activeComparison.optionA}
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {activeComparison.bestForA.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              When to Select: {activeComparison.optionB}
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {activeComparison.bestForB.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-blue-900 dark:text-blue-200">
            Evaluating an architectural choice for an internal system? Our solutions engineering team can conduct a feasibility assessment.
          </div>
          <button
            onClick={() => onOpenLeadModal(`Comparison: ${activeComparison.title}`)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer shadow-sm"
          >
            Discuss Architectural Trade-offs
          </button>
        </div>
      </div>
    </div>
  );
};
