import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Cpu, Network, Box, Wrench, CheckCircle2 } from 'lucide-react';
import { COMMERCIAL_PILLARS } from '../../data/pillars';
import { PillarId } from '../../types';

interface PillarsSectionProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ onNavigate, onOpenLeadModal }) => {
  // Mobile accordion state (only one card expanded at a time)
  const [expandedMobilePillar, setExpandedMobilePillar] = useState<PillarId>('ai-as-a-service');
  // Desktop hover / active focus
  const [activeDesktopPillar, setActiveDesktopPillar] = useState<PillarId>('ai-as-a-service');

  const getPillarIcon = (id: PillarId) => {
    switch (id) {
      case 'ai-as-a-service':
        return <Cpu className="w-5 h-5 text-blue-500" />;
      case 'ai-agents':
        return <Network className="w-5 h-5 text-indigo-500" />;
      case 'saas':
        return <Box className="w-5 h-5 text-cyan-500" />;
      case 'consulting':
        return <Wrench className="w-5 h-5 text-emerald-500" />;
    }
  };

  const handleCtaClick = (pillar: typeof COMMERCIAL_PILLARS[0]) => {
    if (pillar.id === 'consulting') {
      onOpenLeadModal('Request a Consultation');
    } else {
      onNavigate(pillar.ctaHref);
    }
  };

  return (
    <section id="commercial-pillars" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
            The Commercial Foundation
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Four pillars engineered for production impact.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            From managed infrastructure and autonomous agent swarms to data-driven SaaS applications and technical advisory.
          </p>
        </div>

        {/* Desktop View: Interactive 4-Column Card Grid with contextual expansion on hover */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {COMMERCIAL_PILLARS.map((pillar) => {
            const isHovered = activeDesktopPillar === pillar.id;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActiveDesktopPillar(pillar.id)}
                className={`relative flex flex-col justify-between p-7 rounded-2xl border transition-all duration-300 ${
                  isHovered
                    ? 'border-blue-500/80 bg-white dark:bg-slate-900 shadow-xl shadow-blue-500/5 -translate-y-1'
                    : 'border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Identifier & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                      {getPillarIcon(pillar.id)}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase">
                      {pillar.metricsKicker.split('·')[0].trim()}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1 mb-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {pillar.title}
                    </h3>
                    <div className="text-xs font-mono text-blue-600 dark:text-blue-400 font-medium">
                      {pillar.tagline}
                    </div>
                  </div>

                  {/* Exact description from brief */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Core Capabilities:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {pillar.capabilities.map((cap) => (
                        <li key={cap} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contextual Architecture preview (revealed on focus) */}
                  <div
                    className={`pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 transition-opacity duration-200 ${
                      isHovered ? 'opacity-100' : 'opacity-60'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-slate-400 block mb-1">ARCHITECTURE</span>
                    <p className="line-clamp-3 leading-relaxed text-[11px]">
                      {pillar.architectureHighlight}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-6 mt-4">
                  <button
                    onClick={() => handleCtaClick(pillar)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isHovered
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{pillar.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View: Vertical Accordion (One expanded at a time as requested in Section 9) */}
        <div className="lg:hidden space-y-3">
          {COMMERCIAL_PILLARS.map((pillar) => {
            const isExpanded = expandedMobilePillar === pillar.id;

            return (
              <div
                key={pillar.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
              >
                {/* Header click toggles accordion */}
                <button
                  onClick={() => setExpandedMobilePillar(isExpanded ? ('ai-as-a-service' as PillarId) : pillar.id)}
                  className="w-full text-left p-5 flex items-center justify-between cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                      {getPillarIcon(pillar.id)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-base">
                        {pillar.title}
                      </div>
                      <div className="text-xs font-mono text-blue-600 dark:text-blue-400">
                        {pillar.tagline}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>

                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        Capabilities:
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {pillar.capabilities.map((cap) => (
                          <div key={cap} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0" />
                            <span className="truncate">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {pillar.architectureHighlight}
                    </div>

                    <button
                      onClick={() => handleCtaClick(pillar)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>{pillar.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
