import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/faq';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface FaqPageProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenLeadModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const categories = [
    'All',
    'Company',
    'AI as a Service',
    'SaaS',
    'AI Agents',
    'Consulting',
    'Security',
    'Privacy',
    'Deployment',
    'Integration',
    'Getting Started',
  ];

  const toggleIndex = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Build FAQPage Schema.org JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: filteredFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SeoHead
        title="Frequently Asked Questions (FAQ) – Enterprise AI Platform"
        description="Comprehensive operational, architectural, and commercial answers across our four commercial pillars, security, and deployment."
        canonicalPath="/faq"
        schemaData={faqSchema}
      />

      <Breadcrumbs items={[{ label: 'Resources' }, { label: 'FAQ' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Enterprise Knowledge & Answers
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Answers covering company positioning, autonomous agent state machines, security protocols, and integration topologies.
        </p>
      </div>

      {/* Search & Categories Bar */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
          />
        </div>

        {/* 10 Category Segmented Controls */}
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndices.includes(idx);

          return (
            <div
              key={faq.question}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div>
                  <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                    {faq.category}
                  </span>
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="py-12 text-center text-xs text-slate-500 font-mono">
            No matching questions found for "{searchQuery}".
          </div>
        )}
      </div>

      {/* Still have questions banner */}
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-base font-bold text-slate-900 dark:text-white">Have a specific architectural constraint?</div>
          <p className="text-xs text-slate-500 mt-0.5">Connect directly with our systems engineering team.</p>
        </div>
        <button
          onClick={() => onOpenLeadModal('FAQ Inquiry')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer shadow-sm"
        >
          Ask an Architect
        </button>
      </div>
    </div>
  );
};
