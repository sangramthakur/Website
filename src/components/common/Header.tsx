import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, ArrowRight, Award, ExternalLink } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '../../data/navigation';
import { ThemeToggle } from './ThemeToggle';
import { soundEngine } from '../../services/soundEngine';
import { LaunchAnnouncementBanner } from './LaunchAnnouncementBanner';
import { trackScrabytExternalClick } from '../../services/analytics';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenLeadModal: (source: string) => void;
  onOpenJuryModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenLeadModal,
  onOpenJuryModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    soundEngine.playClick();
    onNavigate(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pt-3 transition-all duration-300 pointer-events-none">
      <div
        ref={navContainerRef}
        className={`pointer-events-auto mx-auto max-w-7xl transition-all duration-300 rounded-2xl ${
          isScrolled
            ? 'bg-white/85 dark:bg-slate-900/85 shadow-lg shadow-slate-900/5 dark:shadow-black/25 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl py-2.5 px-4 sm:px-5'
            : 'bg-white/70 dark:bg-slate-950/70 border border-slate-200/60 dark:border-white/[0.08] backdrop-blur-md py-3 px-4 sm:px-6 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Architectural Moniker – Global Home Button on Every Page */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setMobileMenuOpen(false);
              onNavigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="Enterprise AI Platform – Home"
            aria-label="Enterprise AI Platform – Return to Home page"
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1 transition-transform active:scale-95"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-mono font-bold text-xs tracking-wider shadow-xs transition-all duration-200 group-hover:scale-105 group-hover:shadow-md group-hover:ring-2 group-hover:ring-blue-500/40 border border-slate-800 dark:border-slate-200">
              AI
            </div>
            <div>
              <div className="font-medium text-sm tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                <span>Enterprise AI Platform</span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 tracking-wider uppercase leading-none font-normal flex items-center gap-1.5">
                <span>Sovereign Systems</span>
                <span className="text-[9px] text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">· Home</span>
                <span className="hidden md:inline-flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  New Launch Below
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3 py-1.5 rounded-lg text-xs tracking-tight font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-slate-950 dark:text-white font-semibold bg-slate-100 dark:bg-white/10'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Elements */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenSearch();
              }}
              aria-label="Open search dialog"
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100/60 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-[11px] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.5">
                ⌘K
              </span>
            </button>

            {/* Awards Jury Inspector Quick Action */}
            {onOpenJuryModal && (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenJuryModal();
                }}
                aria-label="Open Awards Jury Inspector"
                title="Awwwards & Webby Jury Mode (Key: ?)"
                className="hidden md:flex p-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 rounded-lg hover:bg-amber-500/10 transition-colors cursor-pointer items-center gap-1 text-xs"
              >
                <Award className="w-4 h-4" />
                <span className="hidden 2xl:inline text-[11px] font-medium">Jury</span>
              </button>
            )}

            {/* Dark / Light Mode Toggle */}
            <ThemeToggle />

            {/* Primary CTA */}
            <button
              onClick={() => onNavigate('/investors')}
              className="hidden sm:inline-flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 text-xs font-medium px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <span>Investor Briefing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* New Product Launch: Positioned directly at the bottom of the homebutton */}
      <div className="pointer-events-auto mx-auto max-w-7xl pt-2 px-1 flex items-center justify-start">
        <LaunchAnnouncementBanner onNavigate={onNavigate} />
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden fixed inset-x-3 top-20 max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-5 z-50 space-y-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="space-y-1">
            <button
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(false);
                onNavigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                currentPath === '/' || currentPath === ''
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-mono text-[10px] font-bold">
                  AI
                </span>
                <span>Home</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Scrabyt New Product Launch Card directly under Home in Mobile Menu */}
            <div className="p-3 my-2 rounded-xl bg-slate-950 dark:bg-black text-white border border-emerald-500/35 space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono font-semibold bg-emerald-500/20 text-emerald-300 text-[10px] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  New Product Launch
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Scrabyt Live</span>
              </div>
              <p className="text-xs text-slate-300">
                Ambient Sovereign Clinical Intelligence OS is live.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://www.scrabyt.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackScrabytExternalClick('mobile_menu', 'launch_card')}
                  className="flex-1 py-1.5 px-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs text-center flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Explore Live</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('/ai-as-a-service/scrabyt');
                  }}
                  className="px-2.5 py-1.5 rounded-lg border border-white/20 hover:border-white/40 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  Specs
                </button>
              </div>
            </div>
            {MAIN_NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(item.href);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                  currentPath === item.href
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/investors');
              }}
              className="w-full text-left px-3 py-2 text-xs font-mono text-blue-600 dark:text-blue-400 cursor-pointer flex items-center justify-between"
            >
              <span>Investor Briefing & Deck</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/technology');
              }}
              className="w-full text-left px-3 py-2 text-xs font-mono text-slate-500 dark:text-slate-400 cursor-pointer"
            >
              Inspect Architecture & Security →
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/investors');
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Investor Deck & Briefing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
