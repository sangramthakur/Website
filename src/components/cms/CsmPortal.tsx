import React, { useState, useEffect } from 'react';
import {
  FileText,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  TrendingUp,
  Eye,
  Plus,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Sliders,
  Layers,
  Cpu,
  Shield,
  Activity,
  Trash2,
  Edit3,
  Bot,
  Zap,
  Globe,
  Tag,
  Hash,
  Database,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';
import { InsightArticle, GeoMetrics } from '../../types';
import { cmsArticleService } from '../../services/cmsArticleService';
import { SeoHead } from '../common/SeoHead';

interface CsmPortalProps {
  onNavigate: (href: string) => void;
}

export const CsmPortal: React.FC<CsmPortalProps> = ({ onNavigate }) => {
  const [articles, setArticles] = useState<InsightArticle[]>([]);
  const [viewMode, setViewMode] = useState<'library' | 'editor'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [activeAiPreviewTab, setActiveAiPreviewTab] = useState<'perplexity' | 'google-sge' | 'chatgpt' | 'schema'>('perplexity');

  // Editor State
  const [editingArticle, setEditingArticle] = useState<InsightArticle | null>(null);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const refreshArticles = () => {
    const list = cmsArticleService.getArticles();
    setArticles(list);
  };

  useEffect(() => {
    refreshArticles();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateNew = () => {
    const newArt: InsightArticle = {
      id: `art-geo-${Date.now().toString(36)}`,
      title: 'New Generative-Engine Optimized Technical Article',
      slug: 'new-generative-engine-optimized-technical-article',
      excerpt: 'Enter a concise summary of the engineering architecture and key technical takeaways.',
      author: {
        name: 'Systems Architecture Practice',
        role: 'Enterprise AI Team',
      },
      publicationDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      category: 'Generative Engine Optimization (GEO)',
      tags: ['GEO', 'LLMO', 'Enterprise AI'],
      buyerStage: 'Implement',
      readTime: '6 min read',
      status: 'Draft',
      directAnswerSnippet:
        'A concise 40 to 60-word high-density answer paragraph that AI engines (Perplexity, ChatGPT, and Google AI Overviews) extract and synthesize verbatim as the top primary citation.',
      keyTakeaways: [
        'Deterministic execution boundary with zero conversational hallucinations.',
        'Sub-350ms p95 latency guaranteed through private VPC peering.',
        'Verified citation provenance with cryptographic audit trail.',
      ],
      targetKeywords: ['Generative Engine Optimization', 'LLMO strategy', 'AI Search Citations'],
      targetEntities: ['Large Language Models', 'Perplexity AI', 'Enterprise RAG'],
      faqItems: [
        {
          question: 'How does Generative Engine Optimization differ from traditional SEO?',
          answer:
            'GEO focuses on information gain, direct extractability, and authoritative citations in AI answer engines rather than keyword repetition for 10 blue links.',
        },
      ],
      body: [
        'Traditional search engine optimization rewarded keyword frequency and backlink quantity. In modern generative discovery, LLM search engines (Perplexity, ChatGPT Search, Gemini, and Google AI Overviews) parse content for semantic completeness, empirical numbers, and direct answer extractability.',
        'To achieve consistent citation in generative answers, enterprise technical publications must employ structured schema markup, verifiable statistics, and concise answer blocks located directly beneath primary headings.',
      ],
      relatedSolutions: [
        { title: 'AI as a Service Platform', href: '/solutions/ai-as-a-service' },
      ],
      seoTitle: 'New Technical Guide: Generative Engine Optimization & LLMO 2026',
      seoDescription: 'Enterprise architecture guide on engineering content for citations in Perplexity, ChatGPT Search, and Google AI Overviews.',
      seoScore: 85,
      geoMetrics: {
        directAnswerScore: 90,
        dataDensityScore: 85,
        entityClarityScore: 88,
        schemaReadinessScore: 92,
        overallGeoScore: 89,
        aiTargets: ['Perplexity', 'ChatGPT Search', 'Google AI Overviews'],
      },
    };

    setEditingArticle(newArt);
    setViewMode('editor');
  };

  const handleEdit = (art: InsightArticle) => {
    setEditingArticle({ ...art });
    setViewMode('editor');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this article from the CMS?')) {
      cmsArticleService.deleteArticle(id);
      refreshArticles();
      showToast('Article deleted successfully');
    }
  };

  const handleSaveArticle = (publishNow = false) => {
    if (!editingArticle) return;
    const toSave: InsightArticle = {
      ...editingArticle,
      status: publishNow ? 'Published' : editingArticle.status || 'Draft',
    };
    cmsArticleService.saveArticle(toSave);
    refreshArticles();
    showToast(publishNow ? 'Article published live to /insights!' : 'Draft saved with updated GEO scores!');
    setViewMode('library');
  };

  const handleCopySchema = (art: InsightArticle) => {
    const json = cmsArticleService.generateJsonLd(art);
    navigator.clipboard.writeText(json);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
    showToast('Schema.org JSON-LD copied to clipboard!');
  };

  // Recalculate scores dynamically in editor
  const liveScores = editingArticle
    ? cmsArticleService.calculateScores(editingArticle)
    : { geoMetrics: { overallGeoScore: 0, directAnswerScore: 0, dataDensityScore: 0, entityClarityScore: 0, schemaReadinessScore: 0, aiTargets: [] }, seoScore: 0 };

  // Filtered articles in library
  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.targetKeywords || []).some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.targetEntities || []).some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategoryFilter === 'All' || a.category === selectedCategoryFilter;
    const matchesStatus = selectedStatusFilter === 'All' || a.status === selectedStatusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate overall CMS stats
  const totalArticles = articles.length;
  const avgGeoScore =
    totalArticles > 0
      ? Math.round(articles.reduce((acc, curr) => acc + (curr.geoMetrics?.overallGeoScore || 85), 0) / totalArticles)
      : 0;
  const avgSeoScore =
    totalArticles > 0
      ? Math.round(articles.reduce((acc, curr) => acc + (curr.seoScore || 85), 0) / totalArticles)
      : 0;
  const publishedCount = articles.filter((a) => a.status === 'Published').length;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      <SeoHead
        title="CSM / CMS Portal – Generative Engine Optimization (GEO) & SEO Studio"
        description="Content Management and Generative Engine Optimization (GEO / LLMO) portal for engineering blog content cited by Perplexity, ChatGPT Search, and AI Overviews."
        canonicalPath="/cms"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-mono animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Portal Top Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1 font-semibold">
            <Bot className="w-4 h-4" />
            <span>Content Studio & CSM Portal · GEO / LLMO Platform</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Generative Engine Optimization (GEO) & SEO Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
            Engineer technical articles designed to be cited as primary authorities in Perplexity, ChatGPT Search, Google AI Overviews, and Claude.
          </p>
        </div>

        {/* View Switcher & Action Buttons */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('library')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                viewMode === 'library'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Articles Library ({totalArticles})</span>
            </button>
            <button
              onClick={handleCreateNew}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                viewMode === 'editor'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Plus className="w-3.5 h-3.5 text-blue-500" />
              <span>GEO Writer Studio</span>
            </button>
          </div>

          <button
            onClick={() => onNavigate('/insights')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-blue-600 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <span>View Public /insights</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Executive Health KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase">
            <span>Avg. GEO / LLMO Score</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
            {avgGeoScore} / 100
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            High AI citation extractability
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase">
            <span>Traditional SEO Health</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {avgSeoScore} / 100
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Meta tags, schema & readability
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase">
            <span>Published Dispatches</span>
            <Globe className="w-3.5 h-3.5 text-violet-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-violet-600 dark:text-violet-400">
            {publishedCount} of {totalArticles}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Live on indexable endpoints
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase">
            <span>Primary AI Targets</span>
            <Bot className="w-3.5 h-3.5 text-cyan-500" />
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white truncate">
            Perplexity · SGE · ChatGPT
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Structured JSON-LD synched
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* VIEW 1: ARTICLES LIBRARY */}
      {/* ============================================================== */}
      {viewMode === 'library' && (
        <div className="space-y-4">
          {/* Filters and Search Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, slug, target keyword, or entity..."
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="px-3 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Generative Engine Optimization (GEO)">GEO / LLMO</option>
                <option value="AI Agents">AI Agents</option>
                <option value="Enterprise RAG">Enterprise RAG</option>
                <option value="AI as a Service">AI as a Service</option>
                <option value="Governance">Governance</option>
              </select>

              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-3 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="In Review">In Review</option>
                <option value="GEO Optimizing">GEO Optimizing</option>
              </select>

              <button
                onClick={handleCreateNew}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Article</span>
              </button>
            </div>
          </div>

          {/* Articles Table / Cards */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3.5">Article Title & Slug</th>
                    <th className="px-4 py-3.5">Category & Stage</th>
                    <th className="px-4 py-3.5">GEO Citation Score</th>
                    <th className="px-4 py-3.5">SEO Score</th>
                    <th className="px-4 py-3.5">Target AI Engines</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {filteredArticles.map((art) => (
                    <tr
                      key={art.id}
                      onClick={() => handleEdit(art)}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3.5 max-w-sm">
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                          {art.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono truncate">
                          /insights/{art.slug}
                        </div>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="font-semibold text-blue-600 dark:text-blue-400 block">
                          {art.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {art.buyerStage} · {art.readTime}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full font-mono font-bold text-xs bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                            {art.geoMetrics?.overallGeoScore || 85}% GEO
                          </span>
                          {art.directAnswerSnippet && (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono" title="Direct Answer extractable for AI Overviews">
                              ✓ Answer ready
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {art.seoScore || 85}%
                      </td>

                      <td className="px-4 py-3.5 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {(art.geoMetrics?.aiTargets || ['Perplexity', 'ChatGPT']).map((engine) => (
                            <span
                              key={engine}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            >
                              {engine}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            art.status === 'Published'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {art.status || 'Draft'}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleEdit(art)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg cursor-pointer"
                            title="Edit in GEO Studio"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleCopySchema(art)}
                            className="p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                            title="Copy Schema.org JSON-LD"
                          >
                            <CodeIcon className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onNavigate(`/insights/${art.slug}`)}
                            className="p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                            title="Preview on /insights"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(art.id, e)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredArticles.length === 0 && (
              <div className="py-12 text-center text-slate-400 font-mono text-xs">
                No articles found matching query criteria.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 2: INTERACTIVE SEO & GEO WRITER STUDIO */}
      {/* ============================================================== */}
      {viewMode === 'editor' && editingArticle && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLUMNS: CONTENT EDITING CANVAS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('library')}
                  className="text-xs font-mono text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                >
                  ← Back to Library
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSaveArticle(false)}
                  className="px-3.5 py-2 text-xs font-medium border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Save Draft
                </button>
                <button
                  onClick={() => handleSaveArticle(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Publish to /insights</span>
                </button>
              </div>
            </div>

            {/* Core Identification */}
            <div className="space-y-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                  Article Title (H1 Headline):
                </label>
                <input
                  type="text"
                  value={editingArticle.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/^-|-$/g, '');
                    setEditingArticle({ ...editingArticle, title, slug: editingArticle.slug || slug });
                  }}
                  className="w-full px-3.5 py-2.5 text-sm font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-slate-400">
                    URL Slug:
                  </label>
                  <input
                    type="text"
                    value={editingArticle.slug}
                    onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-slate-400">
                    Category:
                  </label>
                  <select
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white cursor-pointer"
                  >
                    <option value="Generative Engine Optimization (GEO)">GEO / LLMO</option>
                    <option value="AI Agents">AI Agents</option>
                    <option value="Enterprise RAG">Enterprise RAG</option>
                    <option value="AI as a Service">AI as a Service</option>
                    <option value="Governance">Governance</option>
                    <option value="MLOps / LLMOps">MLOps / LLMOps</option>
                  </select>
                </div>
              </div>
            </div>

            {/* GEO KEY COMPONENT: DIRECT ANSWER BLOCK */}
            <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border-2 border-blue-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">
                    Direct Answer Block (AI Overview & Perplexity Hook)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold">
                  {editingArticle.directAnswerSnippet?.split(' ').length || 0} words (Target: 40–60 words)
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Generative search engines extract this block verbatim to answer queries directly. Keep it dense, definitive, and free of conversational fluff.
              </p>
              <textarea
                rows={3}
                value={editingArticle.directAnswerSnippet || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, directAnswerSnippet: e.target.value })}
                placeholder="Generative Engine Optimization (GEO) is the discipline of structuring content, benchmarks, and JSON-LD schema so LLM search engines synthesize and cite your platform..."
                className="w-full p-3 text-xs bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Empirical Key Takeaways & Fact Points */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white font-mono uppercase">
                  Statistical Takeaways & Empirical Claims
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Boosts LLM Information Gain
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Include explicit numbers, percentages, or latency figures (e.g. "sub-350ms p95 SLA", "42% cost reduction").
              </p>
              <div className="space-y-2">
                {(editingArticle.keyTakeaways || []).map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-mono text-blue-500 font-bold">{idx + 1}.</span>
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => {
                        const copy = [...(editingArticle.keyTakeaways || [])];
                        copy[idx] = e.target.value;
                        setEditingArticle({ ...editingArticle, keyTakeaways: copy });
                      }}
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setEditingArticle({
                      ...editingArticle,
                      keyTakeaways: [...(editingArticle.keyTakeaways || []), 'New verified benchmark metric'],
                    })
                  }
                  className="text-[11px] font-mono text-blue-600 dark:text-blue-400 hover:underline cursor-pointer pt-1"
                >
                  + Add Takeaway
                </button>
              </div>
            </div>

            {/* Target Entities & AI Engines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                  Target Technical Entities:
                </label>
                <input
                  type="text"
                  value={(editingArticle.targetEntities || []).join(', ')}
                  onChange={(e) =>
                    setEditingArticle({
                      ...editingArticle,
                      targetEntities: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Perplexity, LangGraph, RAG, JSON-LD"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 font-mono">Comma-separated domain entities</span>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                  Target AI Engines:
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Perplexity', 'ChatGPT Search', 'Google AI Overviews', 'Claude', 'Gemini'].map((engine) => {
                    const currentTargets = editingArticle.geoMetrics?.aiTargets || [];
                    const isSelected = currentTargets.includes(engine as any);

                    return (
                      <button
                        key={engine}
                        type="button"
                        onClick={() => {
                          const updated = isSelected
                            ? currentTargets.filter((t) => t !== engine)
                            : [...currentTargets, engine as any];
                          setEditingArticle({
                            ...editingArticle,
                            geoMetrics: {
                              ...editingArticle.geoMetrics!,
                              aiTargets: updated,
                            },
                          });
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {engine}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Article Body Paragraphs */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white font-mono uppercase">
                  Article Body (Technical Deep Dive)
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {editingArticle.body.join(' ').split(' ').length} Total Words
                </span>
              </div>
              <div className="space-y-3">
                {editingArticle.body.map((para, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400">Paragraph {idx + 1}:</span>
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => {
                        const copy = [...editingArticle.body];
                        copy[idx] = e.target.value;
                        setEditingArticle({ ...editingArticle, body: copy });
                      }}
                      className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setEditingArticle({
                      ...editingArticle,
                      body: [...editingArticle.body, 'New technical paragraph detailing architectural tradeoffs...'],
                    })
                  }
                  className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  + Add Paragraph
                </button>
              </div>
            </div>

            {/* FAQ Q&A Builder (For Schema & AI Overview Snippets) */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white font-mono uppercase">
                  FAQ Schema Builder (Google SGE & Perplexity Accordions)
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Generates Schema.org FAQPage
                </span>
              </div>
              <div className="space-y-3">
                {(editingArticle.faqItems || []).map((faq, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => {
                        const copy = [...(editingArticle.faqItems || [])];
                        copy[idx].question = e.target.value;
                        setEditingArticle({ ...editingArticle, faqItems: copy });
                      }}
                      placeholder="Question..."
                      className="w-full px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => {
                        const copy = [...(editingArticle.faqItems || [])];
                        copy[idx].answer = e.target.value;
                        setEditingArticle({ ...editingArticle, faqItems: copy });
                      }}
                      placeholder="Concise direct answer..."
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setEditingArticle({
                      ...editingArticle,
                      faqItems: [
                        ...(editingArticle.faqItems || []),
                        { question: 'What is the implementation latency?', answer: 'Sub-350ms verified p95 across VPC environments.' },
                      ],
                    })
                  }
                  className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  + Add FAQ Pair
                </button>
              </div>
            </div>

            {/* Traditional SEO Metadata */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white font-mono uppercase">
                Traditional SEO Tags & Snippets
              </span>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Meta Title ({editingArticle.seoTitle?.length || 0}/60 chars):</span>
                    <span className={editingArticle.seoTitle?.length && editingArticle.seoTitle.length <= 60 ? 'text-emerald-500' : 'text-amber-500'}>
                      Optimal: 30–60
                    </span>
                  </div>
                  <input
                    type="text"
                    value={editingArticle.seoTitle || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, seoTitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Meta Description ({editingArticle.seoDescription?.length || 0}/160 chars):</span>
                    <span className={editingArticle.seoDescription?.length && editingArticle.seoDescription.length <= 160 ? 'text-emerald-500' : 'text-amber-500'}>
                      Optimal: 120–160
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={editingArticle.seoDescription || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, seoDescription: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: REAL-TIME GEO AUDIT & CITATION SIMULATOR */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            {/* Live Scores Gauge */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-blue-400 tracking-wider">
                    Real-Time GEO Audit
                  </span>
                  <h3 className="text-lg font-bold text-white">AI Engine Citation Readiness</h3>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold font-mono text-emerald-400">
                    {liveScores.geoMetrics.overallGeoScore}%
                  </span>
                  <span className="block text-[10px] text-slate-400 font-mono">GEO Score</span>
                </div>
              </div>

              {/* Progress bars for dimensions */}
              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 pb-1">
                    <span>Direct Answer Extractability</span>
                    <span>{liveScores.geoMetrics.directAnswerScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${liveScores.geoMetrics.directAnswerScore}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 pb-1">
                    <span>Statistical Data Density</span>
                    <span>{liveScores.geoMetrics.dataDensityScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${liveScores.geoMetrics.dataDensityScore}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 pb-1">
                    <span>Entity Clarity & Depth</span>
                    <span>{liveScores.geoMetrics.entityClarityScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${liveScores.geoMetrics.entityClarityScore}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300 pb-1">
                    <span>Schema.org JSON-LD Readiness</span>
                    <span>{liveScores.geoMetrics.schemaReadinessScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-violet-500 h-full rounded-full" style={{ width: `${liveScores.geoMetrics.schemaReadinessScore}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Search Citation Simulator */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">
                    AI Search Citation Simulator
                  </span>
                </div>
              </div>

              {/* Engine Switcher Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setActiveAiPreviewTab('perplexity')}
                  className={`py-1.5 rounded-lg transition-colors cursor-pointer text-center ${
                    activeAiPreviewTab === 'perplexity'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  Perplexity
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAiPreviewTab('google-sge')}
                  className={`py-1.5 rounded-lg transition-colors cursor-pointer text-center ${
                    activeAiPreviewTab === 'google-sge'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  Google SGE
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAiPreviewTab('chatgpt')}
                  className={`py-1.5 rounded-lg transition-colors cursor-pointer text-center ${
                    activeAiPreviewTab === 'chatgpt'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  ChatGPT
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAiPreviewTab('schema')}
                  className={`py-1.5 rounded-lg transition-colors cursor-pointer text-center ${
                    activeAiPreviewTab === 'schema'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  JSON-LD
                </button>
              </div>

              {/* SIMULATION 1: PERPLEXITY */}
              {activeAiPreviewTab === 'perplexity' && (
                <div className="p-4 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 space-y-3 text-xs leading-relaxed">
                  <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 border-b border-slate-800 pb-2">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Perplexity Pro Answer
                    </span>
                    <span>Sources: [1]</span>
                  </div>

                  <p>
                    {editingArticle.directAnswerSnippet || editingArticle.excerpt}
                    <sup className="ml-1 text-cyan-400 font-mono font-bold cursor-pointer">[1]</sup>
                  </p>

                  <div className="pt-2 border-t border-slate-800">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-[11px]">
                      <div className="truncate max-w-[200px]">
                        <span className="font-bold text-white block truncate">{editingArticle.title}</span>
                        <span className="text-slate-400 font-mono text-[10px]">enterprise-ai.internal</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[10px] shrink-0 font-bold">
                        Source [1]
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SIMULATION 2: GOOGLE AI OVERVIEW */}
              {activeAiPreviewTab === 'google-sge' && (
                <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-blue-200 dark:border-blue-900 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-400 border-b border-blue-200/60 dark:border-slate-800 pb-2 font-mono">
                    <Bot className="w-4 h-4 text-blue-500" />
                    <span>AI Overview</span>
                  </div>

                  <p className="font-medium">
                    {editingArticle.directAnswerSnippet || editingArticle.excerpt}
                  </p>

                  <ul className="space-y-1 list-disc pl-4 text-[11px] text-slate-600 dark:text-slate-400">
                    {(editingArticle.keyTakeaways || []).map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] font-mono">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="font-bold text-slate-900 dark:text-white truncate max-w-[150px]">
                        {editingArticle.title}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SIMULATION 3: CHATGPT SEARCH */}
              {activeAiPreviewTab === 'chatgpt' && (
                <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 border-b border-slate-800 pb-2">
                    <span>ChatGPT Search Web Answer</span>
                    <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">4 Sources</span>
                  </div>

                  <p>
                    According to <strong>Enterprise AI Platform</strong>, {editingArticle.directAnswerSnippet || editingArticle.excerpt}
                  </p>

                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span className="truncate">Reference: {editingArticle.slug}</span>
                    <span className="text-emerald-400 font-mono">Verified Cite</span>
                  </div>
                </div>
              )}

              {/* SIMULATION 4: JSON-LD SCHEMA */}
              {activeAiPreviewTab === 'schema' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Schema.org TechArticle & FAQPage</span>
                    <button
                      type="button"
                      onClick={() => handleCopySchema(editingArticle)}
                      className="text-blue-500 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSchema ? 'Copied' : 'Copy JSON'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-950 text-slate-300 font-mono text-[10px] rounded-xl overflow-x-auto max-h-56 leading-relaxed border border-slate-800">
                    {cmsArticleService.generateJsonLd(editingArticle)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CodeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);
