import React from 'react';
import { SeoHead } from '../common/SeoHead';
import { LaunchAnnouncementBanner } from '../common/LaunchAnnouncementBanner';
import { Hero } from '../home/Hero';
import { PillarsSection } from '../home/PillarsSection';
import { RecentProductLaunchSection } from '../home/RecentProductLaunchSection';
import { ProblemDiscoverySection } from '../home/ProblemDiscoverySection';
import { CapabilityExplorerSection } from '../home/CapabilityExplorerSection';
import { AssessmentCTASection } from '../home/AssessmentCTASection';
import { InsightsPreviewSection } from '../home/InsightsPreviewSection';
import { FinalCTASection } from '../home/FinalCTASection';

interface HomePageProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenLeadModal }) => {
  return (
    <div>
      <SeoHead
        title="Enterprise AI Systems Platform – Build, Deploy & Scale Practical AI"
        description="Build, deploy and scale intelligent products, autonomous workflows and custom AI systems designed around real business problems."
        canonicalPath="/"
      />

      <LaunchAnnouncementBanner />
      <Hero onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />
      <PillarsSection onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />
      <RecentProductLaunchSection onNavigate={onNavigate} />
      <ProblemDiscoverySection onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />
      <CapabilityExplorerSection onNavigate={onNavigate} />
      <AssessmentCTASection onNavigate={onNavigate} />
      <InsightsPreviewSection onNavigate={onNavigate} />
      <FinalCTASection onNavigate={onNavigate} onOpenLeadModal={onOpenLeadModal} />
    </div>
  );
};

