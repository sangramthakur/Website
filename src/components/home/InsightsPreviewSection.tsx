import React from 'react';
import { ArrowRight, BookOpen, Clock, ArrowUpRight } from 'lucide-react';
import { INSIGHT_ARTICLES } from '../../data/articles';

interface InsightsPreviewSectionProps {
  onNavigate: (href: string) => void;
}

export const InsightsPreviewSection: React.FC<InsightsPreviewSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 sm:py-24 border-t border-slate-100 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              Engineering Insights & Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Systems research and technical analyses.
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              In-depth architectural breakdowns covering stateful agents, hybrid RAG, and infrastructure economics.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/insights')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline cursor-pointer self-start md:self-auto"
          >
            <span>View All Engineering Dispatches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSIGHT_ARTICLES.slice(0, 3).map((article) => (
            <article
              key={article.id}
              onClick={() => onNavigate(`/insights/${article.slug}`)}
              className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-blue-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Clean unboxed metadata with typographic separators - zero pill discipline */}
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.buyerStage}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-3">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                  {article.author.name}
                </span>
                <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Read article <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
