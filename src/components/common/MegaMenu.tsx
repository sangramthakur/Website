import React from 'react';
import { ArrowRight, Cpu, Network, Layers, Terminal, Sparkles, BookOpen, FileCode, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { MEGA_MENU_SOLUTIONS, MEGA_MENU_INSIGHTS, MEGA_MENU_COMPANY } from '../../data/navigation';

interface MegaMenuProps {
  type: 'Solutions' | 'Insights' | 'Company';
  onNavigate: (href: string) => void;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ type, onNavigate, onClose }) => {
  const handleClick = (href: string) => {
    onNavigate(href);
    onClose();
  };

  if (type === 'Solutions') {
    return (
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[94vw] max-w-5xl mt-2 p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main 4 Commercial Pillars */}
          <div className="md:col-span-6 space-y-3">
            <div className="text-xs font-mono font-medium tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-3">
              Commercial Pillars
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {MEGA_MENU_SOLUTIONS.pillars.map((pillar) => (
                <button
                  key={pillar.title}
                  onClick={() => handleClick(pillar.href)}
                  className="group text-left p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:border-blue-500/30 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
                >
                  <div className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-1">{pillar.kicker}</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                    {pillar.title}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {pillar.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Engineering Deep Dives */}
          <div className="md:col-span-3 space-y-2 border-l border-slate-100 dark:border-slate-800/80 pl-4">
            <div className="text-xs font-mono font-medium tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-3">
              Custom AI Engineering
            </div>
            <div className="space-y-1">
              {MEGA_MENU_SOLUTIONS.customEngineering.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleClick(item.href)}
                  className="w-full text-left px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <span>{item.title}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Business Outcomes */}
          <div className="md:col-span-3 space-y-2 border-l border-slate-100 dark:border-slate-800/80 pl-4">
            <div className="text-xs font-mono font-medium tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-3">
              By Business Outcome
            </div>
            <div className="space-y-1">
              {MEGA_MENU_SOLUTIONS.businessOutcomes.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleClick(item.href)}
                  className="w-full text-left px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <span>{item.title}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer strip in mega menu */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Enterprise architecture: multi-tenant isolation, VPC endpoints, and strict zero-data-retention APIs.</span>
          <button
            onClick={() => handleClick('/solutions')}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            Explore all solutions <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  if (type === 'Insights') {
    return (
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[90vw] max-w-3xl mt-2 p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="text-xs font-mono font-medium tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-2">
              Research & Engineering Analyses
            </div>
            <div className="space-y-2">
              {MEGA_MENU_INSIGHTS.featuredCategories.map((cat) => (
                <button
                  key={cat.title}
                  onClick={() => handleClick(cat.href)}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group cursor-pointer"
                >
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {cat.title}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cat.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 border-l border-slate-100 dark:border-slate-800 pl-6">
            <div className="text-xs font-mono font-medium tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-2">
              Interactive Tools & Hubs
            </div>
            <div className="space-y-2.5">
              {MEGA_MENU_INSIGHTS.toolsAndResources.map((res) => (
                <button
                  key={res.title}
                  onClick={() => handleClick(res.href)}
                  className="w-full text-left p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-blue-400 mb-1">
                    <span>{res.badge}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {res.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'Company') {
    return (
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[90vw] max-w-2xl mt-2 p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
        <div className="text-xs font-mono font-medium tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-3">
          Platform Architecture & Operations
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {MEGA_MENU_COMPANY.links.map((link) => (
            <button
              key={link.title}
              onClick={() => handleClick(link.href)}
              className="text-left p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group cursor-pointer"
            >
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                <span>{link.title}</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{link.desc}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
