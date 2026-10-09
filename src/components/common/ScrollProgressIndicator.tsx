import React, { useState, useEffect } from 'react';
import { Award, Volume2, VolumeX, ChevronUp } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

interface ScrollProgressIndicatorProps {
  onOpenJuryModal: () => void;
}

export const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  onOpenJuryModal,
}) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(soundEngine.getEnabled());
  const [activeChapter, setActiveChapter] = useState('01 Engine');

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, scrolled)));

      if (winScroll > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Simple chapter detection based on scroll percentage
      if (scrolled < 18) {
        setActiveChapter('01 Sovereign Engine');
      } else if (scrolled < 38) {
        setActiveChapter('02 Investment Thesis');
      } else if (scrolled < 58) {
        setActiveChapter('03 Flagship Bento');
      } else if (scrolled < 78) {
        setActiveChapter('04 Enterprise Traction');
      } else if (scrolled < 92) {
        setActiveChapter('05 Commercial Pillars');
      } else {
        setActiveChapter('06 Sovereign Briefing');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = soundEngine.toggle();
    setIsAudioActive(next);
  };

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Hairline Scroll Progress Bar with delicate luminous gradient */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2.5px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-400 shadow-[0_0_8px_rgba(59,130,246,0.4)] transition-all duration-75 ease-out"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Floating Jury Mode & Audio Dock */}
      <aside
        aria-label="Awards & Audio Dock"
        className="fixed bottom-4 sm:bottom-6 left-3 sm:left-6 z-40 flex items-center gap-2 pointer-events-auto"
      >
        <button
          onClick={() => {
            soundEngine.playClick();
            onOpenJuryModal();
          }}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 shadow-lg shadow-black/5 hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer text-xs"
          title="Open Webby & Awwwards Jury Evaluation Inspector (Key: ?)"
        >
          <Award className="w-3.5 h-3.5 text-amber-500 transition-transform group-hover:scale-110" />
          <span className="font-medium tracking-tight">Awards Jury Mode</span>
          <span className="hidden md:inline font-mono text-[10px] text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-2">
            9.9 UX
          </span>
        </button>

        {/* Tactile Audio Mute / Unmute Button */}
        <button
          onClick={handleAudioToggle}
          className={`p-2 rounded-full border transition-all cursor-pointer backdrop-blur-md ${
            isAudioActive
              ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-900 shadow-md'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 border-slate-200/80 dark:border-slate-800/80 hover:text-slate-900 dark:hover:text-white'
          }`}
          title={isAudioActive ? 'Mute synthesized soundscape' : 'Enable synthesized soundscape'}
          aria-label="Toggle soundscape"
        >
          {isAudioActive ? (
            <Volume2 className="w-3.5 h-3.5 text-amber-300" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Scroll To Top when scrolled */}
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer shadow-md"
            title="Return to top"
            aria-label="Return to top"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        )}
      </aside>

      {/* Floating Chapter Status (Subtle bottom-right HUD on desktop) */}
      {isVisible && (
        <div className="hidden lg:flex fixed bottom-5 right-6 z-40 items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 dark:bg-white/10 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono shadow-xl pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">{activeChapter}</span>
        </div>
      )}
    </>
  );
};
