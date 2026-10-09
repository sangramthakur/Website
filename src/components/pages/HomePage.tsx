import React from 'react';
import { SeoHead } from '../common/SeoHead';
import { Hero } from '../home/Hero';
import { InvestmentThesisSection } from '../home/InvestmentThesisSection';
import { FlagshipProductBento } from '../home/FlagshipProductBento';
import { EnterpriseTractionSection } from '../home/EnterpriseTractionSection';
import { PillarsSection } from '../home/PillarsSection';
import { FinalCTASection } from '../home/FinalCTASection';

interface HomePageProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenLeadModal }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white">
      <SeoHead
        title="Enterprise AI Systems Platform – Sovereign AI Infrastructure & Clinical Intelligence"
        description="Build, deploy and scale practical AI systems with zero data retention, sub-340ms inference, and sovereign agent orchestration. Featuring Scrabyt Clinical Intelligence."
        canonicalPath="/"
      />

      {/* Hero: Sovereign Intelligence Engine & Centerpiece Product Video Theater (Priority #1) */}
      <Hero onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />

      {/* Flagship Product Portfolio (Apple-Style Bento Showcase - Brought directly to the top after the video) */}
      <FlagshipProductBento onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />

      {/* Market Shift & Investment Thesis Bridge */}
      <InvestmentThesisSection onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />

      {/* Market Scalability & Enterprise Traction Validation */}
      <EnterpriseTractionSection onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />

      {/* The Four Commercial Pillars */}
      <PillarsSection onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />

      {/* Serene Final Call to Action */}
      <FinalCTASection onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />
    </div>
  );
};
