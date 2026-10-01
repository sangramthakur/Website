import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, FileText, Box, Layers, HelpCircle, Building } from 'lucide-react';
import { COMMERCIAL_PILLARS } from '../../data/pillars';
import { BUSINESS_PROBLEMS } from '../../data/problems';
import { TECHNICAL_CAPABILITIES } from '../../data/capabilities';
import { SAAS_PRODUCTS } from '../../data/products';
import { INSIGHT_ARTICLES } from '../../data/articles';
import { COMPARISONS } from '../../data/comparisons';
import { FAQ_ITEMS } from '../../data/faq';
import { AIAAS_OFFERINGS } from '../../data/aiAsAService';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

interface SearchResult {
  title: string;
  category: 'Solutions' | 'Products' | 'Insights' | 'Comparisons' | 'Company' | 'FAQ';
  snippet: string;
  href: string;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open search triggered externally
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const hits: SearchResult[] = [];

    // Search Commercial Pillars
    COMMERCIAL_PILLARS.forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
        hits.push({
          title: p.title,
          category: 'Solutions',
          snippet: p.description,
          href: p.ctaHref,
        });
      }
    });

    // Search AI as a Service Offerings (including Scrabyt)
    AIAAS_OFFERINGS.forEach((offering) => {
      if (
        offering.name.toLowerCase().includes(q) ||
        offering.category.toLowerCase().includes(q) ||
        offering.shortDescription.toLowerCase().includes(q) ||
        offering.capabilities.some((c) => c.toLowerCase().includes(q))
      ) {
        hits.push({
          title: `${offering.name} — ${offering.category}`,
          category: 'Solutions',
          snippet: offering.shortDescription,
          href: `/solutions/ai-as-a-service/${offering.slug}`,
        });
      }
    });

    // Search Problems
    BUSINESS_PROBLEMS.forEach((prob) => {
      if (prob.title.toLowerCase().includes(q) || prob.description.toLowerCase().includes(q)) {
        hits.push({
          title: prob.title,
          category: 'Solutions',
          snippet: prob.outcome,
          href: prob.route,
        });
      }
    });

    // Search Capabilities
    TECHNICAL_CAPABILITIES.forEach((cap) => {
      if (cap.title.toLowerCase().includes(q) || cap.summary.toLowerCase().includes(q)) {
        hits.push({
          title: cap.title,
          category: 'Solutions',
          snippet: cap.summary,
          href: cap.route,
        });
      }
    });

    // Search SaaS Products
    SAAS_PRODUCTS.forEach((prod) => {
      if (prod.name.toLowerCase().includes(q) || prod.shortDescription.toLowerCase().includes(q)) {
        hits.push({
          title: prod.name,
          category: 'Products',
          snippet: prod.shortDescription,
          href: '/products',
        });
      }
    });

    // Search Articles
    INSIGHT_ARTICLES.forEach((art) => {
      if (art.title.toLowerCase().includes(q) || art.excerpt.toLowerCase().includes(q)) {
        hits.push({
          title: art.title,
          category: 'Insights',
          snippet: art.excerpt,
          href: `/insights/${art.slug}`,
        });
      }
    });

    // Search Comparisons
    COMPARISONS.forEach((comp) => {
      if (comp.title.toLowerCase().includes(q) || comp.summary.toLowerCase().includes(q)) {
        hits.push({
          title: comp.title,
          category: 'Comparisons',
          snippet: comp.summary,
          href: '/comparisons',
        });
      }
    });

    // Search FAQ
    FAQ_ITEMS.forEach((faq) => {
      if (faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q)) {
        hits.push({
          title: faq.question,
          category: 'FAQ',
          snippet: faq.answer.substring(0, 110) + '...',
          href: '/faq',
        });
      }
    });

    // CRM Lead Management System
    if ('crm'.includes(q) || 'leads'.includes(q) || 'pipeline'.includes(q) || 'admin'.includes(q)) {
      hits.push({
        title: 'Lead Management Mini CRM',
        category: 'Company',
        snippet: 'Internal pipeline dashboard to inspect and manage inbound customer leads and consultation requests.',
        href: '/crm',
      });
    }

    setResults(hits.slice(0, 8));
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (href: string) => {
    onNavigate(href);
    onClose();
  };

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'Solutions':
        return <Layers className="w-4 h-4 text-blue-500" />;
      case 'Products':
        return <Box className="w-4 h-4 text-cyan-500" />;
      case 'Insights':
        return <FileText className="w-4 h-4 text-emerald-500" />;
      case 'FAQ':
        return <HelpCircle className="w-4 h-4 text-violet-500" />;
      default:
        return <Building className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search solutions, products, architectures, articles, FAQs..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            aria-label="Search site content"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs cursor-pointer p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List or Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-3">
          {query && results.length === 0 ? (
            <div className="text-center py-10 px-4 text-xs text-slate-500">
              No matching records found for "{query}". Try searching for <span className="font-mono text-blue-600">agents</span>, <span className="font-mono text-blue-600">RAG</span>, <span className="font-mono text-blue-600">inference</span>, or <span className="font-mono text-blue-600">security</span>.
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map((hit, idx) => (
                <button
                  key={`${hit.title}-${idx}`}
                  onClick={() => handleSelect(hit.href)}
                  className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-3 group cursor-pointer"
                >
                  <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {getIcon(hit.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{hit.category}</span>
                      <span className="text-xs text-slate-300 dark:text-slate-700">·</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                        {hit.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {hit.snippet}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </button>
              ))}
            </div>
          ) : (
            <div className="py-6 px-4">
              <div className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500 mb-2">
                Quick Navigation Suggestions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleSelect('/solutions/ai-agents')}
                  className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-blue-500/40 text-left cursor-pointer"
                >
                  <span className="font-semibold text-slate-900 dark:text-white">AI Agents</span>
                  <p className="text-[11px] text-slate-500">Autonomous workflow execution</p>
                </button>
                <button
                  onClick={() => handleSelect('/solutions/ai-as-a-service')}
                  className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-blue-500/40 text-left cursor-pointer"
                >
                  <span className="font-semibold text-slate-900 dark:text-white">AI as a Service</span>
                  <p className="text-[11px] text-slate-500">Managed low-latency API inference</p>
                </button>
                <button
                  onClick={() => handleSelect('/resources/ai-readiness-assessment')}
                  className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-blue-500/40 text-left cursor-pointer"
                >
                  <span className="font-semibold text-blue-600 dark:text-blue-400">AI Readiness Assessment</span>
                  <p className="text-[11px] text-slate-500">Interactive maturity benchmark</p>
                </button>
                <button
                  onClick={() => handleSelect('/technology')}
                  className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-blue-500/40 text-left cursor-pointer"
                >
                  <span className="font-semibold text-slate-900 dark:text-white">Technology & Security Hub</span>
                  <p className="text-[11px] text-slate-500">Architecture, zero-trust, governance</p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Search index: Solutions · Products · Insights · Architecture</span>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
};
