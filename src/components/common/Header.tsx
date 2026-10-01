import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Menu, X, ArrowRight, Shield } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '../../data/navigation';
import { ThemeToggle } from './ThemeToggle';
import { MegaMenu } from './MegaMenu';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenLeadModal: (source: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenLeadModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'Solutions' | 'Insights' | 'Company' | null>(null);
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

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (href: string, hasMegaMenu?: boolean, label?: string) => {
    if (hasMegaMenu) {
      if (activeMegaMenu === label) {
        setActiveMegaMenu(null);
      } else {
        setActiveMegaMenu(label as any);
      }
    } else {
      setActiveMegaMenu(null);
      onNavigate(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pt-3 transition-all duration-300 pointer-events-none">
      <div
        ref={navContainerRef}
        className={`pointer-events-auto mx-auto max-w-7xl transition-all duration-300 rounded-2xl ${
          isScrolled
            ? 'bg-white/90 dark:bg-slate-900/90 shadow-lg shadow-slate-900/5 dark:shadow-black/20 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md py-2.5 px-4 sm:px-5'
            : 'bg-white/70 dark:bg-slate-950/70 border border-slate-200/50 dark:border-slate-800/40 backdrop-blur-sm py-3.5 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Architectural Moniker */}
          <button
            onClick={() => {
              setActiveMegaMenu(null);
              onNavigate('/');
            }}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-mono font-bold text-sm tracking-tighter shadow-sm transition-transform group-hover:scale-105">
              AI
            </div>
            <div>
              <div className="font-semibold text-sm tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Enterprise AI Platform</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tracking-wider uppercase leading-none">
                Systems & Infrastructure
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
              const isMenuOpen = activeMegaMenu === item.label;

              return (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => handleNavClick(item.href, item.hasMegaMenu, item.label)}
                    aria-expanded={item.hasMegaMenu ? isMenuOpen : undefined}
                    className={`px-3 py-1.5 rounded-lg text-xs tracking-tight font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                      isActive || isMenuOpen
                        ? 'text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasMegaMenu && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isMenuOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'
                        }`}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Right Action Elements */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Open search dialog"
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100/60 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-[11px] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.5">
                ⌘K
              </span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <ThemeToggle />

            {/* Primary CTA */}
            <button
              onClick={() => onOpenLeadModal('Talk to an AI Expert')}
              className="hidden sm:inline-flex items-center gap-1.5 bg-slate-950 hover:bg-blue-600 text-white dark:bg-white dark:hover:bg-blue-500 dark:text-slate-950 dark:hover:text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <span>Talk to an AI Expert</span>
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

        {/* Desktop Active Mega Menu Dropdown */}
        {activeMegaMenu && (
          <div className="hidden lg:block relative">
            <MegaMenu
              type={activeMegaMenu}
              onNavigate={(href) => {
                setActiveMegaMenu(null);
                onNavigate(href);
              }}
              onClose={() => setActiveMegaMenu(null)}
            />
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden fixed inset-x-3 top-20 max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-5 z-50 space-y-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="space-y-1">
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
                onNavigate('/resources/ai-readiness-assessment');
              }}
              className="w-full text-left px-3 py-2 text-xs font-mono text-blue-600 dark:text-blue-400 cursor-pointer"
            >
              Take AI Readiness Assessment →
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
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/crm');
              }}
              className="w-full text-left px-3 py-2 text-xs font-mono text-slate-400 dark:text-slate-500 cursor-pointer"
            >
              Internal CRM Workspace →
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal('Talk to an AI Expert');
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Talk to an AI Expert</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
