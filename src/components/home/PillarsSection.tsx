import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Cpu, Network, Box, Wrench, CheckCircle2, ExternalLink, Sparkles, Radio } from 'lucide-react';
import { COMMERCIAL_PILLARS } from '../../data/pillars';
import { PillarId } from '../../types';
import { trackScrabytExternalClick, trackEvent } from '../../services/analytics';

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
    <section id="commercial-pillars" className="py-20 sm:py-28 relative bg-transparent">
      {/* Soothing background radial glow */}
      <div
        className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-gradient-to-bl from-indigo-500/5 via-blue-500/5 to-transparent rounded-full blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-3">
            <span>Commercial Pillars</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>Production Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900 dark:text-white leading-tight">
            Four pillars engineered for <span className="font-serif italic font-normal bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 dark:from-white dark:via-slate-200 dark:to-blue-200 bg-clip-text text-transparent">production impact.</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal">
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
                className={`relative flex flex-col justify-between p-7 rounded-2xl border transition-all duration-300 backdrop-blur-md ${
                  isHovered
                    ? 'border-blue-300 dark:border-slate-600 bg-white dark:bg-slate-900/90 shadow-xl shadow-blue-500/5'
                    : 'border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700'
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

                  {/* Scrabyt proof-of-capability for AI as a Service (Section 14) */}
                  {pillar.id === 'ai-as-a-service' && (
                    <div className="mb-4 p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900/50 text-[11px]">
                      <div className="text-slate-500 dark:text-slate-400 font-mono text-[10px] uppercase font-semibold">
                        Live AIaaS offering
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                        Scrabyt — Clinical Intelligence OS
                      </div>
                      <a
                        href="https://www.scrabyt.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Explore Scrabyt website — opens in a new tab"
                        onClick={(e) => {
                          e.stopPropagation();
                          trackScrabytExternalClick('/', 'PillarsCard_AIaaS');
                        }}
                        className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold mt-1"
                      >
                        <span>Explore Scrabyt</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

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
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isHovered
                        ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm'
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

                    {/* Scrabyt proof for mobile */}
                    {pillar.id === 'ai-as-a-service' && (
                      <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900/50 text-xs">
                        <div className="text-slate-500 dark:text-slate-400 font-mono text-[10px] uppercase">
                          Live Offering:
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                          Scrabyt — Clinical Intelligence OS
                        </div>
                        <a
                          href="https://www.scrabyt.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Explore Scrabyt website — opens in a new tab"
                          onClick={(e) => {
                            e.stopPropagation();
                            trackScrabytExternalClick('/', 'PillarsAccordion_AIaaS');
                          }}
                          className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold mt-1.5"
                        >
                          <span>Explore Scrabyt</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}

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

        {/* Live Product in Production Strip */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">Live Platform Product: </span>
              <span className="font-medium text-blue-600 dark:text-blue-400">Scrabyt Clinical OS</span>
              <span className="hidden md:inline text-slate-500 dark:text-slate-400"> — Ambient intelligence deployed across clinical EHR systems.</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://www.scrabyt.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackScrabytExternalClick('/', 'Pillars_Bottom_LiveLink')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-xs transition-colors cursor-pointer"
            >
              <span>Launch Live Product</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => onNavigate('/products')}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium cursor-pointer"
            >
              All Products →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
