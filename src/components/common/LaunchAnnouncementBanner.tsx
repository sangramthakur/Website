import React, { useState, useEffect } from 'react';
import { ExternalLink, X, ArrowRight } from 'lucide-react';
import { trackScrabytExternalClick } from '../../services/analytics';
import { soundEngine } from '../../services/soundEngine';

interface LaunchAnnouncementBannerProps {
  onNavigate?: (href: string) => void;
}

export const LaunchAnnouncementBanner: React.FC<LaunchAnnouncementBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem('scrabyt_launch_banner_dismissed');
      if (!isDismissed) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    soundEngine.playClick();
    setIsVisible(false);
    try {
      sessionStorage.setItem('scrabyt_launch_banner_dismissed', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const handleBannerClick = () => {
    trackScrabytExternalClick('homepage', 'top_announcement_banner');
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="New Product Launch: Scrabyt"
      className="bg-slate-950 text-white border-b border-white/10 text-xs py-1.5 px-3 sm:px-6 relative z-50 animate-in fade-in slide-in-from-top-1 duration-200 select-none shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left / Center Message */}
        <div className="flex-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[11px] sm:text-xs">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            New Product Launch
          </span>

          <span className="text-slate-300">
            Introducing <strong className="text-white font-semibold tracking-tight">Scrabyt</strong> — Sovereign Clinical Intelligence OS is now live.
          </span>

          <div className="inline-flex items-center gap-2.5">
            <a
              href="https://www.scrabyt.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore Scrabyt live product at scrabyt.com — opens in a new tab"
              onClick={handleBannerClick}
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Explore Scrabyt</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {onNavigate && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onNavigate('/ai-as-a-service/scrabyt');
                }}
                className="hidden md:inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-[11px]"
              >
                <span>Read Overview</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss new product launch banner"
          title="Dismiss banner"
          className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
