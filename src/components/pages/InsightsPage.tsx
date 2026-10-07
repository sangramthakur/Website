import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, Tag, User, Search, Filter, Sparkles, HelpCircle, Edit3, Bot } from 'lucide-react';
import { cmsArticleService } from '../../services/cmsArticleService';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface InsightsPageProps {
  onNavigate: (href: string) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStage, setSelectedStage] = useState<string>('All');

  const articles = cmsArticleService.getArticles();

  const categories = [
    'All',
    'Generative Engine Optimization (GEO)',
    'AI Agents',
    'AI as a Service',
    'Enterprise RAG',
    'Governance',
  ];
  const buyerStages = ['All', 'Learn', 'Evaluate', 'Compare', 'Implement'];

  const filteredArticles = articles.filter((art) => {
    const matchCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchStage = selectedStage === 'All' || art.buyerStage === selectedStage;
    return matchCat && matchStage;
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SeoHead
        title="Engineering Insights & Research – Enterprise AI Platform"
        description="Systems research, distributed inference economics, autonomous agent topologies, and hybrid RAG architectural breakdowns."
        canonicalPath="/insights"
      />

      <Breadcrumbs items={[{ label: 'Insights' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Engineering Dispatches & Systems Research
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Technical insights for enterprise AI builders.
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Rigorous architectural analyses, benchmark findings, and implementation guides. No generic promotional fluff.
        </p>
      </div>

      {/* Interactive Category & Buyer Stage Filters (Button controls as permitted by design constitution) */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono uppercase text-slate-400 mr-2">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono uppercase text-slate-400 mr-2">Stage:</span>
          {buyerStages.map((stage) => (
            <button
              key={stage}
              onClick={() => setSelectedStage(stage)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedStage === stage
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => onNavigate(`/insights/${article.slug}`)}
            className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/60 hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="space-y-4">
              {/* Clean unboxed metadata with typographic separators */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-blue-600 dark:text-blue-400">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>Stage: {article.buyerStage}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {article.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {article.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono text-[11px]">
                {article.author.name} · Updated {new Date(article.updatedDate).toLocaleDateString()}
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read deep dive <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export const ArticleDetailPage: React.FC<{
  slug: string;
  onNavigate: (href: string) => void;
}> = ({ slug, onNavigate }) => {
  const article = cmsArticleService.getArticleBySlug(slug) || cmsArticleService.getArticles()[0];

  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SeoHead
        title={article.seoTitle || article.title}
        description={article.seoDescription || article.excerpt}
        canonicalPath={`/insights/${article.slug}`}
        type="article"
      />

      <Breadcrumbs
        items={[
          { label: 'Insights', href: '/insights' },
          { label: article.category, href: `/insights?category=${encodeURIComponent(article.category)}` },
          { label: article.title },
        ]}
        onNavigate={onNavigate}
      />

      {/* Article Header */}
      <div className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="font-semibold text-blue-600 dark:text-blue-400">{article.category}</span>
            <span>·</span>
            <span>{article.buyerStage} Phase</span>
            <span>·</span>
            <span>Published {article.publicationDate}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          <button
            onClick={() => onNavigate('/cms')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-950/60 text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 font-mono text-[10px] transition-colors cursor-pointer"
          >
            <Bot className="w-3 h-3 text-blue-500" />
            <span>Open in GEO Studio</span>
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 pt-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs">
            AI
          </div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-white">{article.author.name}</div>
            <div className="text-[11px] font-mono text-slate-500">{article.author.role}</div>
          </div>
        </div>
      </div>

      {/* GEO Direct Answer Block (Extractable answer for generative search engines) */}
      {article.directAnswerSnippet && (
        <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-700 dark:text-blue-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Direct Answer Summary (AI Overview / Citation Extract)</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
            {article.directAnswerSnippet}
          </p>
        </div>
      )}

      {/* Empirical Key Takeaways if available */}
      {article.keyTakeaways && article.keyTakeaways.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Key Architectural Takeaways & Facts
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {article.keyTakeaways.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Article Body */}
      <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        {article.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* FAQ Schema Accordions if present */}
      {article.faqItems && article.faqItems.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
            <HelpCircle className="w-4 h-4 text-blue-500" />
            <span>Frequently Asked Questions</span>
          </div>
          <div className="space-y-3">
            {article.faqItems.map((faq, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {faq.question}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Solution Pillars */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
          Related Commercial Solutions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {article.relatedSolutions.map((sol) => (
            <button
              key={sol.title}
              onClick={() => onNavigate(sol.href)}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-left flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 cursor-pointer"
            >
              <span>{sol.title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
