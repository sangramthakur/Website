import React, { useRef } from 'react';
import { ArrowRight, Play, Shield, Cpu, Activity, Sparkles, ChevronRight } from 'lucide-react';
import { HeroProductVideoTheater } from './HeroProductVideoTheater';

interface HeroProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenLeadModal }) => {
  const videoTheaterRef = useRef<HTMLDivElement>(null);

  const handleWatchFilmClick = () => {
    if (videoTheaterRef.current) {
      videoTheaterRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden border-b border-slate-100 dark:border-slate-800/60 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950">
      {/* Apple / Eternal Ambient Atmosphere */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-500/10 via-cyan-500/5 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Centered Editorial Header (Apple & Eternal aesthetic) */}
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-10 sm:mb-14">
          {/* Subtitle / Kicker tag */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-semibold tracking-wider uppercase">OmniCore Architecture v4.2</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Zero-Trust Sovereign Systems</span>
          </div>

          {/* Grand Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            The Sovereign <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
              Intelligence Engine.
            </span>
          </h1>

          {/* Minimalist Subtext */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Deterministic autonomous agents. Zero-retention private inference. Real-time neural retrieval. Built without compromise for enterprises that demand verifiable reliability.
          </p>

          {/* Clean Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenLeadModal('Hero Primary')}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-950 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500 text-white dark:text-slate-950 dark:hover:text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Experience Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleWatchFilmClick}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl border border-slate-200/80 dark:border-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch the Film (3m 18s)</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/solutions')}
              className="w-full sm:w-auto px-5 py-3.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium text-sm flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <span>Explore Solutions</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Centerpiece Hero Product Video Theater (Priority #1 on the Home Page) */}
        <div ref={videoTheaterRef} className="w-full pt-2">
          <HeroProductVideoTheater
            onOpenConsultation={() => onOpenLeadModal('Hero Video Cinema')}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </section>
  );
};
