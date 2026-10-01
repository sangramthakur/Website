import React, { useState, useEffect } from 'react';
import { ExternalLink, X, Sparkles } from 'lucide-react';
import { trackScrabytExternalClick } from '../../services/analytics';

export const LaunchAnnouncementBanner: React.FC = () => {
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
      aria-label="New launch announcement"
      className="bg-slate-900 dark:bg-slate-950 text-white border-b border-slate-800 text-xs py-2 px-3 sm:px-6 relative z-50 animate-in fade-in slide-in-from-top-1 duration-200"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-[11px] sm:text-xs text-slate-300">
          <span className="px-1.5 py-0.2 rounded font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] uppercase">
            New
          </span>
          <span>
            <strong className="text-white font-semibold">Scrabyt</strong> — our Clinical Intelligence AI service is now live.
          </span>
          <a
            href="https://www.scrabyt.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore Scrabyt website — opens in a new tab"
            onClick={handleBannerClick}
            className="text-blue-400 hover:text-blue-300 underline font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap ml-1"
          >
            <span>Explore Scrabyt</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <button
          onClick={handleDismiss}
          aria-label="Dismiss launch announcement"
          className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
