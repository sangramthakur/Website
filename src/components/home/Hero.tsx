import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Sparkles, Shield, Cpu, ExternalLink } from 'lucide-react';
import { Hero3DScene } from './Hero3DScene';

interface HeroProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

const PHRASES = ['AI Products.', 'AI Agents.', 'AI as a Service.'];

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenLeadModal }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        setFadeState('in');
      }, 350);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden border-b border-slate-100 dark:border-slate-800/60">
      {/* Background radial gradients for clean visual depth */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-blue-500/10 via-cyan-500/5 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Top kicker label without generic pill enclosing */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping inline-block" />
              <span>ENTERPRISE AI ARCHITECTURE</span>
              <span aria-hidden="true">·</span>
              <span>ZERO-TRUST INFERENCE</span>
            </div>

            {/* Headline and animated secondary phrase */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                Turn AI into real business capability.
              </h1>
              {/* Only the secondary phrase transitions */}
              <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300 min-h-[1.3em]">
                <span
                  className={`inline-block transition-all duration-300 transform ${
                    fadeState === 'in' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}
                >
                  {PHRASES[phraseIndex]}
                </span>
              </div>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Build, deploy and scale intelligent products, autonomous workflows and custom AI systems designed around real business problems.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenLeadModal('Hero Primary')}
                className="px-6 py-3.5 bg-slate-950 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500 text-white dark:text-slate-950 dark:hover:text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Talk to an AI Expert</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/solutions')}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl border border-slate-200/80 dark:border-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Solutions</span>
              </button>
            </div>

            {/* Tertiary Link: AI Readiness Assessment */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/resources/ai-readiness-assessment')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline cursor-pointer group"
              >
                <span>Take the AI Readiness Assessment</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Key Architectural Trust Indicators without fake claims */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                <span>Zero Data Retention APIs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-500" />
                <span>Sub-500ms P95 Inference</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Multi-Agent State Mesh</span>
              </div>
            </div>
          </div>

          {/* Right 3D Visual Centerpiece */}
          <div className="lg:col-span-6 relative">
            <Hero3DScene />
          </div>
        </div>
      </div>
    </section>
  );
};
