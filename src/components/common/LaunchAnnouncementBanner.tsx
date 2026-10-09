import React, { useState, useEffect } from 'react';
import { ExternalLink, X, ArrowRight, Sparkles } from 'lucide-react';
import { trackScrabytExternalClick } from '../../services/analytics';
import { soundEngine } from '../../services/soundEngine';

interface LaunchAnnouncementBannerProps {
  onNavigate?: (href: string) => void;
}

export const LaunchAnnouncementBanner: React.FC<LaunchAnnouncementBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem('scrabyt_launch_banner_v2_dismissed');
      if (!isDismissed) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    setIsVisible(false);
    try {
      sessionStorage.setItem('scrabyt_launch_banner_v2_dismissed', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const handleBannerClick = () => {
    soundEngine.playClick();
    trackScrabytExternalClick('header_home_bottom', 'launch_pill');
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="New Product Launch: Scrabyt"
      className="group relative inline-flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 py-1.5 px-3 sm:px-4 rounded-xl sm:rounded-full bg-slate-950/92 dark:bg-black/92 text-white border border-emerald-500/40 hover:border-emerald-400/80 shadow-lg shadow-emerald-950/40 backdrop-blur-xl text-xs transition-all duration-300 select-none animate-in fade-in slide-in-from-top-1"
    >
      {/* Iridescent ambient glow behind the capsule */}
      <div
        className="absolute -inset-0.5 rounded-xl sm:rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-blue-500/10 blur-sm opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Pill Badge */}
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] uppercase tracking-wider shrink-0 shadow-xs">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        New Product Launch
      </span>

      {/* Headline & Description */}
      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
        <span className="text-slate-300 font-normal">
          Introducing <strong className="text-white font-semibold tracking-tight">Scrabyt</strong> — Ambient Sovereign Clinical Intelligence OS
        </span>
      </div>

      {/* Action links */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto sm:ml-0">
        <a
          href="https://www.scrabyt.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Explore Scrabyt live product at scrabyt.com — opens in a new tab"
          onClick={handleBannerClick}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-300 hover:text-white font-medium text-[11px] border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <span>Explore Scrabyt Live</span>
          <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {onNavigate && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundEngine.playClick();
              onNavigate('/ai-as-a-service/scrabyt');
            }}
            className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Architecture Specs</span>
            <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}

        <button
          onClick={handleDismiss}
          aria-label="Dismiss new product launch banner"
          title="Dismiss banner"
          className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-0.5"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
