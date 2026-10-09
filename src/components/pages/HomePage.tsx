import React from 'react';
import { SeoHead } from '../common/SeoHead';
import { LaunchAnnouncementBanner } from '../common/LaunchAnnouncementBanner';
import { Hero } from '../home/Hero';
import { FlagshipProductBento } from '../home/FlagshipProductBento';
import { ArchitecturalSpecsSection } from '../home/ArchitecturalSpecsSection';
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

      {/* Top Launch Announcement Ribbon */}
      <LaunchAnnouncementBanner />

      {/* Hero: Sovereign Intelligence Engine & Centerpiece Product Video Theater (Priority #1) */}
      <Hero onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />

      {/* Flagship Product Portfolio (Apple-Style Bento Showcase) */}
      <FlagshipProductBento onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />

      {/* Engineered Without Compromise (Eternal / Apple Typographic Specs) */}
      <ArchitecturalSpecsSection onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />

      {/* The Four Commercial Pillars */}
      <PillarsSection onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />

      {/* Serene Final Call to Action */}
      <FinalCTASection onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />
    </div>
  );
};
