import React, { useRef } from 'react';
import { ArrowRight, Play, Shield, Cpu, Activity, Sparkles, ChevronRight, Maximize2 } from 'lucide-react';
import { HeroProductVideoTheater } from './HeroProductVideoTheater';
import { soundEngine } from '../../services/soundEngine';

interface HeroProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenLeadModal }) => {
  const videoTheaterRef = useRef<HTMLDivElement>(null);

  const handleWatchFilmClick = () => {
    soundEngine.playClick();
    window.dispatchEvent(new CustomEvent('open-video-fullscreen'));
  };

  const handleHeadlineClick = () => {
    soundEngine.playClick();
    window.dispatchEvent(new CustomEvent('open-video-fullscreen'));
  };

  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden border-b border-slate-100 dark:border-slate-800/60 bg-gradient-to-b from-transparent via-slate-50/40 to-transparent dark:via-slate-900/30">
      {/* Soothing Ethereal Ambient Atmosphere */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-blue-400/15 via-indigo-400/10 to-teal-400/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-soothing-pulse"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Centered Editorial Header (Posh premium typography) */}
        <div className="text-center max-w-4xl mx-auto space-y-7 mb-12 sm:mb-16">
          {/* Refined eye-catching frosted status pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/[0.03] dark:bg-white/[0.05] border border-slate-900/[0.07] dark:border-white/10 backdrop-blur-md shadow-xs text-xs font-medium tracking-wide text-slate-700 dark:text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sovereign Architecture</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span>Regulated Enterprise</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span>Clinical Grade</span>
          </div>

          {/* Grand Posh Headline with eye-pleasing depth - Click to launch full screen video walkthrough */}
          <div className="inline-block group">
            <h1
              onClick={handleHeadlineClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleHeadlineClick();
                }
              }}
              title="Click to launch full-screen architecture video walkthrough"
              className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-slate-950 dark:text-white leading-[1.08] cursor-pointer transition-transform duration-300 group-hover:scale-[1.008] active:scale-[0.99] select-none"
            >
              Enterprise AI systems. <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 dark:from-white dark:via-slate-200 dark:to-blue-200 bg-clip-text text-transparent group-hover:opacity-90">
                Built for sovereign scale.
              </span>
            </h1>
            <div className="mt-2.5 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-blue-600 dark:text-blue-400 font-medium">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Click headline to watch full-screen film</span>
            </div>
          </div>

          {/* Minimalist Subtext */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            We build and operate mission-critical autonomous agents and specialized vertical AI products on zero-retention private infrastructure.
          </p>

          {/* Clean Action Buttons with subtle tactile depth */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => onOpenLeadModal('Hero Investor CTA')}
              className="relative group overflow-hidden w-full sm:w-auto px-7 py-3.5 bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-medium text-sm rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>Schedule Investor & Architecture Briefing</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={handleWatchFilmClick}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/70 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium text-sm rounded-xl border border-slate-200/90 dark:border-slate-800 backdrop-blur-md transition-all shadow-xs hover:border-slate-300 dark:hover:border-slate-700 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Play className="w-3.5 h-3.5 fill-current opacity-70" />
              <span>Watch Architecture Walkthrough</span>
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
