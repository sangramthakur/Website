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
  Box,
  Briefcase,
  Scale,
  Settings as SettingsIcon,
  X,
  Code,
  MapPin,
  Clock,
} from 'lucide-react';
import {
  InsightArticle,
  GeoMetrics,
  FaqItem,
  SaaSProductItem,
  TechnicalCapability,
  JobPosting,
  ComparisonItem,
} from '../../types';
import { cmsArticleService } from '../../services/cmsArticleService';
import { cmsDataService, SiteSettings } from '../../services/cmsDataService';
import { SeoHead } from '../common/SeoHead';

interface CsmPortalProps {
  onNavigate: (href: string) => void;
}

type CsmSection = 'articles' | 'faqs' | 'products' | 'capabilities' | 'jobs' | 'comparisons' | 'settings';

export const CsmPortal: React.FC<CsmPortalProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<CsmSection>('articles');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ==========================================
  // SECTION 1: GEO & SEO ARTICLES STATE
  // ==========================================
  const [articles, setArticles] = useState<InsightArticle[]>([]);
  const [articleViewMode, setArticleViewMode] = useState<'library' | 'editor'>('library');
  const [articleSearch, setArticleSearch] = useState('');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState('All');
  const [articleStatusFilter, setArticleStatusFilter] = useState('All');
  const [activeAiPreviewTab, setActiveAiPreviewTab] = useState<'perplexity' | 'google-sge' | 'chatgpt' | 'schema'>('perplexity');
  const [editingArticle, setEditingArticle] = useState<InsightArticle | null>(null);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // ==========================================
  // SECTION 2: GLOBAL FAQS STATE
  // ==========================================
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [faqSearch, setFaqSearch] = useState('');
  const [faqCategoryFilter, setFaqCategoryFilter] = useState('All');
  const [editingFaq, setEditingFaq] = useState<{ item: FaqItem; isNew: boolean; originalQ?: string } | null>(null);

  // ==========================================
  // SECTION 3: SAAS PRODUCTS STATE
  // ==========================================
  const [products, setProducts] = useState<SaaSProductItem[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<{ item: SaaSProductItem; isNew: boolean } | null>(null);

  // ==========================================
  // SECTION 4: CAPABILITIES STATE
  // ==========================================
  const [capabilities, setCapabilities] = useState<TechnicalCapability[]>([]);
  const [editingCapability, setEditingCapability] = useState<{ item: TechnicalCapability; isNew: boolean } | null>(null);

  // ==========================================
  // SECTION 5: CAREERS STATE
  // ==========================================
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [editingJob, setEditingJob] = useState<{ item: JobPosting; isNew: boolean } | null>(null);

  // ==========================================
  // SECTION 6: COMPARISONS STATE
  // ==========================================
  const [comparisons, setComparisons] = useState<ComparisonItem[]>([]);
  const [editingComparison, setEditingComparison] = useState<{ item: ComparisonItem; isNew: boolean } | null>(null);

  // ==========================================
  // SECTION 7: GLOBAL SETTINGS STATE
  // ==========================================
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(cmsDataService.getSettings());
  const [copiedRobots, setCopiedRobots] = useState(false);

  // Refresh all stores
  const loadAllData = () => {
    setArticles(cmsArticleService.getArticles());
    setFaqs(cmsDataService.getFaqs());
    setProducts(cmsDataService.getProducts());
    setCapabilities(cmsDataService.getCapabilities());
    setJobs(cmsDataService.getJobs());
    setComparisons(cmsDataService.getComparisons());
    setSiteSettings(cmsDataService.getSettings());
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Article handlers
  const handleCreateNewArticle = () => {
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
    setArticleViewMode('editor');
    setActiveSection('articles');
  };

  const handleSaveArticle = (publishNow = false) => {
    if (!editingArticle) return;
    const toSave: InsightArticle = {
      ...editingArticle,
      status: publishNow ? 'Published' : editingArticle.status || 'Draft',
    };
    cmsArticleService.saveArticle(toSave);
    loadAllData();
    showToast(publishNow ? 'Article published live to /insights!' : 'Draft saved with updated GEO scores!');
    setArticleViewMode('library');
  };

  const handleDeleteArticle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this article from the CMS?')) {
      cmsArticleService.deleteArticle(id);
      loadAllData();
      showToast('Article deleted');
    }
  };

  // FAQ handlers
  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq || !editingFaq.item.question || !editingFaq.item.answer) return;
    cmsDataService.saveFaq(editingFaq.item, editingFaq.originalQ);
    loadAllData();
    showToast(editingFaq.isNew ? 'New Global FAQ created!' : 'Global FAQ updated!');
    setEditingFaq(null);
  };

  const handleDeleteFaq = (question: string) => {
    if (confirm(`Delete FAQ: "${question}"?`)) {
      cmsDataService.deleteFaq(question);
      loadAllData();
      showToast('FAQ deleted');
    }
  };

  // Product handlers
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.item.name) return;
    cmsDataService.saveProduct(editingProduct.item);
    loadAllData();
    showToast(editingProduct.isNew ? 'New SaaS Product added!' : 'SaaS Product updated!');
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Delete this product from portfolio?')) {
      cmsDataService.deleteProduct(id);
      loadAllData();
      showToast('Product removed');
    }
  };

  // Capability handlers
  const handleSaveCapability = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCapability || !editingCapability.item.title) return;
    cmsDataService.saveCapability(editingCapability.item);
    loadAllData();
    showToast('Technical Capability saved!');
    setEditingCapability(null);
  };

  const handleDeleteCapability = (id: string) => {
    if (confirm('Delete this capability?')) {
      cmsDataService.deleteCapability(id);
      loadAllData();
      showToast('Capability deleted');
    }
  };

  // Job handlers
  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob || !editingJob.item.title) return;
    cmsDataService.saveJob(editingJob.item);
    loadAllData();
    showToast('Job posting saved!');
    setEditingJob(null);
  };

  const handleDeleteJob = (id: string) => {
    if (confirm('Delete this job posting?')) {
      cmsDataService.deleteJob(id);
      loadAllData();
      showToast('Job posting deleted');
    }
  };

  // Comparison handlers
  const handleSaveComparison = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingComparison || !editingComparison.item.title) return;
    cmsDataService.saveComparison(editingComparison.item);
    loadAllData();
    showToast('Architectural comparison saved!');
    setEditingComparison(null);
  };

  const handleDeleteComparison = (slug: string) => {
    if (confirm('Delete comparison?')) {
      cmsDataService.deleteComparison(slug);
      loadAllData();
      showToast('Comparison deleted');
    }
  };

  // Settings handlers
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    cmsDataService.saveSettings(siteSettings);
    showToast('Global Site & AI Crawler Settings saved!');
  };

  // Filtered FAQs
  const filteredFaqs = faqs.filter((f) => {
    const matchCat = faqCategoryFilter === 'All' || f.category === faqCategoryFilter;
    const matchSearch =
      !faqSearch ||
      f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  // Filtered Products
  const filteredProducts = products.filter((p) =>
    !productSearch ||
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.shortDescription.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      <SeoHead
        title="CSM & Operations Portal – Global Content Management & GEO Studio"
        description="Unified Content and Knowledge Studio for managing GEO articles, Global FAQs, SaaS products, capabilities, jobs, and site-wide SEO."
        canonicalPath="/cms"
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-mono animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Portal Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1 font-semibold">
            <Bot className="w-4 h-4" />
            <span>Unified Content Management Studio · Internal Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Content & Knowledge Management Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
            Create, edit, reorder, and synchronize live content across the enterprise platform: SEO/GEO Blog Posts, Global FAQs, SaaS Products, Technical Capabilities, Careers, and AI Crawler Policies.
          </p>
        </div>

        {/* Global Quick Action Links */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('/faq')}
            className="px-3 py-1.5 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-blue-600 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            Live /faq →
          </button>
          <button
            onClick={() => onNavigate('/insights')}
            className="px-3 py-1.5 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-blue-600 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            Live /insights →
          </button>
          <button
            onClick={() => onNavigate('/products')}
            className="px-3 py-1.5 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-blue-600 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            Live /products →
          </button>
        </div>
      </div>

      {/* Primary Section Switcher Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-x-auto">
        <button
          onClick={() => setActiveSection('articles')}
          className={`px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'articles'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-500" />
          <span>GEO & SEO Blog Studio ({articles.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('faqs')}
          className={`px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'faqs'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-emerald-500" />
          <span>Global FAQs ({faqs.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('products')}
          className={`px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'products'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Box className="w-4 h-4 text-cyan-500" />
          <span>SaaS Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('capabilities')}
          className={`px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'capabilities'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4 text-violet-500" />
          <span>Solutions & Capabilities ({capabilities.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('jobs')}
          className={`px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'jobs'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4 text-amber-500" />
          <span>Job Postings ({jobs.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('comparisons')}
          className={`px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'comparisons'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4 text-indigo-500" />
          <span>Comparisons ({comparisons.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('settings')}
          className={`px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'settings'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <SettingsIcon className="w-4 h-4 text-slate-400" />
          <span>Global SEO & AI Bots</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SECTION 1: GEO & SEO ARTICLES STUDIO */}
      {/* ============================================================== */}
      {activeSection === 'articles' && (
        <div className="space-y-6">
          {articleViewMode === 'library' ? (
            <div className="space-y-4">
              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={articleSearch}
                    onChange={(e) => setArticleSearch(e.target.value)}
                    placeholder="Search articles by title, keyword, entity, or slug..."
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={articleCategoryFilter}
                    onChange={(e) => setArticleCategoryFilter(e.target.value)}
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
                    value={articleStatusFilter}
                    onChange={(e) => setArticleStatusFilter(e.target.value)}
                    className="px-3 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="In Review">In Review</option>
                  </select>

                  <button
                    onClick={handleCreateNewArticle}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Article</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase text-slate-500">
                      <tr>
                        <th className="px-4 py-3.5">Title & Path</th>
                        <th className="px-4 py-3.5">Category</th>
                        <th className="px-4 py-3.5">GEO Citation Score</th>
                        <th className="px-4 py-3.5">SEO Score</th>
                        <th className="px-4 py-3.5">Target Engines</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {articles.map((art) => (
                        <tr
                          key={art.id}
                          onClick={() => {
                            setEditingArticle({ ...art });
                            setArticleViewMode('editor');
                          }}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-3.5 max-w-sm">
                            <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{art.title}</div>
                            <div className="text-[11px] text-slate-400 font-mono">/insights/{art.slug}</div>
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap font-medium text-blue-600 dark:text-blue-400">
                            {art.category}
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-full font-mono font-bold text-xs bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                              {art.geoMetrics?.overallGeoScore || 85}% GEO
                            </span>
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap font-mono">{art.seoScore || 85}%</td>
                          <td className="px-4 py-3.5">
                            <div className="flex flex-wrap gap-1">
                              {(art.geoMetrics?.aiTargets || ['Perplexity', 'ChatGPT']).map((engine) => (
                                <span key={engine} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                  {engine}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              {art.status || 'Published'}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => {
                                  setEditingArticle({ ...art });
                                  setArticleViewMode('editor');
                                }}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg cursor-pointer"
                                title="Edit in Studio"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => onNavigate(`/insights/${art.slug}`)}
                                className="p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                                title="Preview Live"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => handleDeleteArticle(art.id, e)}
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
              </div>
            </div>
          ) : (
            /* ARTICLE EDITOR */
            editingArticle && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => setArticleViewMode('library')}
                      className="text-xs font-mono text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      ← Back to Article Library
                    </button>
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

                  {/* Identification */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
                    <label className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                      Article Title (H1 Headline):
                    </label>
                    <input
                      type="text"
                      value={editingArticle.title}
                      onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="text-[10px] font-mono uppercase text-slate-400">Slug:</label>
                        <input
                          type="text"
                          value={editingArticle.slug}
                          onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase text-slate-400">Category:</label>
                        <select
                          value={editingArticle.category}
                          onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value as any })}
                          className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white cursor-pointer"
                        >
                          <option value="Generative Engine Optimization (GEO)">GEO / LLMO</option>
                          <option value="AI Agents">AI Agents</option>
                          <option value="Enterprise RAG">Enterprise RAG</option>
                          <option value="AI as a Service">AI as a Service</option>
                          <option value="Governance">Governance</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Direct Answer Block */}
                  <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border-2 border-blue-500/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-blue-500" />
                        Direct Answer Block (AI Overview Extraction Hook)
                      </span>
                      <span className="text-[10px] font-mono text-blue-600 font-bold">
                        {editingArticle.directAnswerSnippet?.split(' ').length || 0} words (40–60 optimal)
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={editingArticle.directAnswerSnippet || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, directAnswerSnippet: e.target.value })}
                      placeholder="Dense, factual definition block extracted verbatim by Perplexity and Google AI Overviews..."
                      className="w-full p-3 text-xs bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Article Body */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-mono uppercase">
                      Technical Article Paragraphs
                    </span>
                    <div className="space-y-3">
                      {editingArticle.body.map((para, idx) => (
                        <textarea
                          key={idx}
                          rows={3}
                          value={para}
                          onChange={(e) => {
                            const copy = [...editingArticle.body];
                            copy[idx] = e.target.value;
                            setEditingArticle({ ...editingArticle, body: copy });
                          }}
                          className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() => setEditingArticle({ ...editingArticle, body: [...editingArticle.body, 'New technical paragraph...'] })}
                        className="text-xs font-mono text-blue-600 hover:underline cursor-pointer"
                      >
                        + Add Paragraph
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: AI Search Citation Simulator */}
                <div className="lg:col-span-5 space-y-6 sticky top-24">
                  <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-blue-400 font-bold">Live GEO Readiness</span>
                      <span className="text-2xl font-mono font-extrabold text-emerald-400">
                        {editingArticle.geoMetrics?.overallGeoScore || 89}%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      High probability of citation synthesis in generative queries.
                    </p>
                  </div>

                  {/* Citation preview simulation */}
                  <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-bold text-slate-900 dark:text-white">Perplexity Citation Simulator</span>
                      <span className="text-cyan-500 font-bold">Source [1]</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {editingArticle.directAnswerSnippet || editingArticle.excerpt}
                      <sup className="ml-1 text-cyan-400 font-mono font-bold">[1]</sup>
                    </p>
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-mono flex items-center justify-between">
                      <span className="truncate">{editingArticle.title}</span>
                      <span className="text-cyan-600 font-bold">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 2: GLOBAL FAQS MANAGER */}
      {/* ============================================================== */}
      {activeSection === 'faqs' && (
        <div className="space-y-6">
          {/* FAQ Controls & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search global FAQs by question or answer..."
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={faqCategoryFilter}
                onChange={(e) => setFaqCategoryFilter(e.target.value)}
                className="px-3 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Company">Company</option>
                <option value="AI as a Service">AI as a Service</option>
                <option value="SaaS">SaaS</option>
                <option value="AI Agents">AI Agents</option>
                <option value="Consulting">Consulting</option>
                <option value="Security">Security</option>
                <option value="Privacy">Privacy</option>
                <option value="Deployment">Deployment</option>
                <option value="Integration">Integration</option>
              </select>

              <button
                onClick={() =>
                  setEditingFaq({
                    item: {
                      category: 'Company',
                      question: '',
                      answer: '',
                    },
                    isNew: true,
                  })
                }
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Global FAQ</span>
              </button>
            </div>
          </div>

          {/* FAQ List */}
          <div className="grid grid-cols-1 gap-3">
            {filteredFaqs.map((faq, index) => (
              <div
                key={faq.question}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/50 transition-all shadow-xs space-y-2 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {faq.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Item #{index + 1}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() =>
                        setEditingFaq({
                          item: { ...faq },
                          isNew: false,
                          originalQ: faq.question,
                        })
                      }
                      className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg cursor-pointer"
                      title="Edit FAQ"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.question)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg cursor-pointer"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Modal / Form for Editing FAQ */}
          {editingFaq && (
            <div
              className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setEditingFaq(null)}
            >
              <div
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 animate-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {editingFaq.isNew ? 'Create New Global FAQ' : 'Edit Global FAQ'}
                  </h3>
                  <button
                    onClick={() => setEditingFaq(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveFaq} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Category:</label>
                    <select
                      value={editingFaq.item.category}
                      onChange={(e) =>
                        setEditingFaq({
                          ...editingFaq,
                          item: { ...editingFaq.item, category: e.target.value as any },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="Company">Company</option>
                      <option value="AI as a Service">AI as a Service</option>
                      <option value="SaaS">SaaS</option>
                      <option value="AI Agents">AI Agents</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Security">Security</option>
                      <option value="Privacy">Privacy</option>
                      <option value="Deployment">Deployment</option>
                      <option value="Integration">Integration</option>
                      <option value="Getting Started">Getting Started</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Question:</label>
                    <input
                      type="text"
                      required
                      value={editingFaq.item.question}
                      onChange={(e) =>
                        setEditingFaq({
                          ...editingFaq,
                          item: { ...editingFaq.item, question: e.target.value },
                        })
                      }
                      placeholder="e.g. How do you guarantee sub-500ms inference latency?"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Answer:</label>
                    <textarea
                      rows={4}
                      required
                      value={editingFaq.item.answer}
                      onChange={(e) =>
                        setEditingFaq({
                          ...editingFaq,
                          item: { ...editingFaq.item, answer: e.target.value },
                        })
                      }
                      placeholder="Provide a definitive, technical answer with clear facts..."
                      className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingFaq(null)}
                      className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm"
                    >
                      Save FAQ & Synchronize Live
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 3: SAAS PRODUCTS MANAGER */}
      {/* ============================================================== */}
      {activeSection === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by name or capabilities..."
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={() =>
                setEditingProduct({
                  item: {
                    id: `prod-${Date.now().toString(36)}`,
                    name: 'New Enterprise SaaS Product',
                    slug: 'new-enterprise-saas-product',
                    category: 'Workflow Intelligence',
                    status: 'Preview',
                    shortDescription: 'Enterprise software solution solving complex operational bottlenecks.',
                    longDescription: 'Engineered for seamless integration with ERP, CRM, and cloud VPC architectures.',
                    heroVisual: 'terminal',
                    capabilities: ['Deterministic policy enforcement', 'Sub-300ms inference caching', 'Audit compliance trail'],
                    useCases: ['Automated exception handling', 'Multi-tenant ingestion'],
                    cta: 'Request Product Demo',
                    seoTitle: 'New SaaS Product – Enterprise AI Software',
                    seoDescription: 'High-throughput enterprise AI software application.',
                  },
                  isNew: true,
                })
              }
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add SaaS Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-slate-400">{prod.category}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                      {prod.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{prod.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {prod.shortDescription}
                  </p>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400">Capabilities:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {prod.capabilities.map((cap) => (
                        <span key={cap} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-mono">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400">CTA: {prod.cta}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingProduct({ item: { ...prod }, isNew: false })}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      Edit Product
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Product Modal */}
          {editingProduct && (
            <div
              className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setEditingProduct(null)}
            >
              <div
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 my-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {editingProduct.isNew ? 'Create New SaaS Product' : 'Edit SaaS Product'}
                  </h3>
                  <button onClick={() => setEditingProduct(null)} className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-slate-400">Product Name:</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.item.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, item: { ...editingProduct.item, name: e.target.value } })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-slate-400">Category:</label>
                      <select
                        value={editingProduct.item.category}
                        onChange={(e) => setEditingProduct({ ...editingProduct, item: { ...editingProduct.item, category: e.target.value as any } })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                      >
                        <option value="Workflow Intelligence">Workflow Intelligence</option>
                        <option value="Knowledge Retrieval">Knowledge Retrieval</option>
                        <option value="Autonomous Operations">Autonomous Operations</option>
                        <option value="Model Orchestration">Model Orchestration</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Short Summary:</label>
                    <textarea
                      rows={2}
                      value={editingProduct.item.shortDescription}
                      onChange={(e) => setEditingProduct({ ...editingProduct, item: { ...editingProduct.item, shortDescription: e.target.value } })}
                      className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Capabilities (Comma-separated):</label>
                    <input
                      type="text"
                      value={editingProduct.item.capabilities.join(', ')}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          item: {
                            ...editingProduct.item,
                            capabilities: e.target.value.split(',').map((c) => c.trim()).filter(Boolean),
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button type="button" onClick={() => setEditingProduct(null)} className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
                      Cancel
                    </button>
                    <button type="submit" className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm">
                      Save Product & Deploy Live
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 4: CAPABILITIES & SOLUTIONS MANAGER */}
      {/* ============================================================== */}
      {activeSection === 'capabilities' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Manage technical solutions presented across the platform.
            </span>
            <button
              onClick={() =>
                setEditingCapability({
                  item: {
                    id: `cap-${Date.now().toString(36)}`,
                    title: 'New Technical Capability',
                    summary: 'High-throughput system capability solving complex domain tasks.',
                    primaryUse: 'Enterprise production deployment.',
                    technicalStack: ['LangGraph', 'PyTorch', 'Vector Index'],
                    route: '/solutions/custom-ai-development',
                  },
                  isNew: true,
                })
              }
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Capability</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((cap) => (
              <div
                key={cap.id}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{cap.title}</h3>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingCapability({ item: { ...cap }, isNew: false })}
                      className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCapability(cap.id)}
                      className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">{cap.summary}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {cap.technicalStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Edit Capability Modal */}
          {editingCapability && (
            <div
              className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setEditingCapability(null)}
            >
              <div
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {editingCapability.isNew ? 'New Capability' : 'Edit Capability'}
                  </h3>
                  <button onClick={() => setEditingCapability(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveCapability} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Title:</label>
                    <input
                      type="text"
                      required
                      value={editingCapability.item.title}
                      onChange={(e) => setEditingCapability({ ...editingCapability, item: { ...editingCapability.item, title: e.target.value } })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Summary:</label>
                    <textarea
                      rows={2}
                      value={editingCapability.item.summary}
                      onChange={(e) => setEditingCapability({ ...editingCapability, item: { ...editingCapability.item, summary: e.target.value } })}
                      className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Tech Stack (comma-separated):</label>
                    <input
                      type="text"
                      value={editingCapability.item.technicalStack.join(', ')}
                      onChange={(e) =>
                        setEditingCapability({
                          ...editingCapability,
                          item: {
                            ...editingCapability.item,
                            technicalStack: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button type="button" onClick={() => setEditingCapability(null)} className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
                      Cancel
                    </button>
                    <button type="submit" className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm">
                      Save Capability
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 5: JOB POSTINGS & CAREERS MANAGER */}
      {/* ============================================================== */}
      {activeSection === 'jobs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Manage open positions displayed on the /careers portal.
            </span>
            <button
              onClick={() =>
                setEditingJob({
                  item: {
                    id: `job-${Date.now().toString(36)}`,
                    title: 'Senior Systems Architect – Autonomous Topologies',
                    department: 'AI Research & Engineering',
                    location: 'San Francisco, CA / Remote',
                    workModel: 'Remote-first',
                    employmentType: 'Full-time',
                    publishedStatus: 'Open',
                    description: 'Lead engineering for cyclic agent state machines and sandboxed execution gateways.',
                    requirements: [
                      '5+ years distributed systems engineering in Go, Rust, or Python',
                      'Deep experience with token caching and low-latency inference routing',
                    ],
                  },
                  isNew: true,
                })
              }
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Job Opening</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{job.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                        {job.publishedStatus}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 pt-0.5">
                      {job.department} · {job.location} · {job.workModel}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingJob({ item: { ...job }, isNew: false })}
                      className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">{job.description}</p>
              </div>
            ))}
          </div>

          {/* Edit Job Modal */}
          {editingJob && (
            <div
              className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setEditingJob(null)}
            >
              <div
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {editingJob.isNew ? 'New Job Opening' : 'Edit Job Opening'}
                  </h3>
                  <button onClick={() => setEditingJob(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveJob} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Title:</label>
                    <input
                      type="text"
                      required
                      value={editingJob.item.title}
                      onChange={(e) => setEditingJob({ ...editingJob, item: { ...editingJob.item, title: e.target.value } })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-slate-400">Department:</label>
                      <select
                        value={editingJob.item.department}
                        onChange={(e) => setEditingJob({ ...editingJob, item: { ...editingJob.item, department: e.target.value as any } })}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                      >
                        <option value="AI Research & Engineering">AI Research & Engineering</option>
                        <option value="Distributed Systems">Distributed Systems</option>
                        <option value="Product & Solutions">Product & Solutions</option>
                        <option value="Security & Governance">Security & Governance</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-slate-400">Status:</label>
                      <select
                        value={editingJob.item.publishedStatus}
                        onChange={(e) => setEditingJob({ ...editingJob, item: { ...editingJob.item, publishedStatus: e.target.value as any } })}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                      >
                        <option value="Open">Open</option>
                        <option value="Interviewing">Interviewing</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Description:</label>
                    <textarea
                      rows={3}
                      value={editingJob.item.description}
                      onChange={(e) => setEditingJob({ ...editingJob, item: { ...editingJob.item, description: e.target.value } })}
                      className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button type="button" onClick={() => setEditingJob(null)} className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
                      Cancel
                    </button>
                    <button type="submit" className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm">
                      Save Position
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 6: COMPARISONS MANAGER */}
      {/* ============================================================== */}
      {activeSection === 'comparisons' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Objective architectural decision matrices displayed on /comparisons.
            </span>
            <button
              onClick={() =>
                setEditingComparison({
                  item: {
                    slug: `comp-${Date.now().toString(36)}`,
                    title: 'New Architectural Comparison',
                    subtitle: 'Evaluation of operational tradeoffs.',
                    optionA: 'Solution Paradigm A',
                    optionB: 'Solution Paradigm B',
                    summary: 'Executive summary of key architectural advantages and disadvantages.',
                    bestForA: ['High-throughput low-latency streams', 'Strict compliance control'],
                    bestForB: ['Serverless burst execution', 'Rapid experimentation'],
                    tradeoffs: [
                      {
                        criteria: 'Latency & Throughput',
                        optionAAssessment: 'Predictable sub-10ms processing.',
                        optionBAssessment: 'Higher burst ceiling with variable queue times.',
                        recommendation: 'Select Option A for critical customer pathways.',
                      },
                    ],
                  },
                  isNew: true,
                })
              }
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Comparison</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {comparisons.map((comp) => (
              <div
                key={comp.slug}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{comp.title}</h3>
                    <div className="text-[11px] font-mono text-slate-400">
                      {comp.optionA} <span className="text-blue-500 font-bold">vs</span> {comp.optionB}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingComparison({ item: { ...comp }, isNew: false })}
                      className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteComparison(comp.slug)}
                      className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">{comp.summary}</p>
              </div>
            ))}
          </div>

          {/* Edit Comparison Modal */}
          {editingComparison && (
            <div
              className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setEditingComparison(null)}
            >
              <div
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {editingComparison.isNew ? 'New Comparison' : 'Edit Comparison'}
                  </h3>
                  <button onClick={() => setEditingComparison(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveComparison} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Comparison Title:</label>
                    <input
                      type="text"
                      required
                      value={editingComparison.item.title}
                      onChange={(e) => setEditingComparison({ ...editingComparison, item: { ...editingComparison.item, title: e.target.value } })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-slate-400">Option A:</label>
                      <input
                        type="text"
                        value={editingComparison.item.optionA}
                        onChange={(e) => setEditingComparison({ ...editingComparison, item: { ...editingComparison.item, optionA: e.target.value } })}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-slate-400">Option B:</label>
                      <input
                        type="text"
                        value={editingComparison.item.optionB}
                        onChange={(e) => setEditingComparison({ ...editingComparison, item: { ...editingComparison.item, optionB: e.target.value } })}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Summary:</label>
                    <textarea
                      rows={3}
                      value={editingComparison.item.summary}
                      onChange={(e) => setEditingComparison({ ...editingComparison, item: { ...editingComparison.item, summary: e.target.value } })}
                      className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button type="button" onClick={() => setEditingComparison(null)} className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
                      Cancel
                    </button>
                    <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm">
                      Save Comparison
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 7: GLOBAL SEO, GEO & AI BOT DIRECTIVES */}
      {/* ============================================================== */}
      {activeSection === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Global Platform Metadata & Search Engine Directives
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-400">Site Name:</label>
                <input
                  type="text"
                  value={siteSettings.siteName}
                  onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-400">Default Meta Title:</label>
                <input
                  type="text"
                  value={siteSettings.defaultMetaTitle}
                  onChange={(e) => setSiteSettings({ ...siteSettings, defaultMetaTitle: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-400">Default Meta Description:</label>
                <textarea
                  rows={2}
                  value={siteSettings.defaultMetaDescription}
                  onChange={(e) => setSiteSettings({ ...siteSettings, defaultMetaDescription: e.target.value })}
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              {/* AI Bots permissions */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <label className="text-xs font-mono uppercase text-slate-400 font-bold block">
                  Generative Engine Crawler Permissions (GEO Directives):
                </label>
                <div className="space-y-2 text-xs">
                  {[
                    { key: 'allowPerplexityBot', label: 'PerplexityBot (Crawl & Synthesize for Perplexity Pro)' },
                    { key: 'allowGptBot', label: 'GPTBot (ChatGPT Search & Retrieval indexer)' },
                    { key: 'allowClaudeBot', label: 'ClaudeBot (Anthropic Artifacts & Search)' },
                    { key: 'allowGoogleExtended', label: 'Google-Extended (Google AI Overviews & Gemini)' },
                  ].map((bot) => (
                    <label key={bot.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(siteSettings.aiCrawlerPolicy as any)[bot.key]}
                        onChange={(e) =>
                          setSiteSettings({
                            ...siteSettings,
                            aiCrawlerPolicy: {
                              ...siteSettings.aiCrawlerPolicy,
                              [bot.key]: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700 dark:text-slate-300">{bot.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm"
                >
                  Save Global Directives
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="p-5 rounded-3xl bg-slate-900 text-slate-200 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-blue-400 font-bold">Auto-Generated robots.txt</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(cmsDataService.generateRobotsTxt(siteSettings));
                    setCopiedRobots(true);
                    setTimeout(() => setCopiedRobots(false), 2000);
                  }}
                  className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedRobots ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRobots ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-950 rounded-xl text-[10px] font-mono leading-relaxed overflow-x-auto text-slate-300 border border-slate-800">
                {cmsDataService.generateRobotsTxt(siteSettings)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
