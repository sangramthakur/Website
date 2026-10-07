import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchDialog } from './components/common/SearchDialog';
import { CookieConsent } from './components/common/CookieConsent';
import { AdaptiveLeadModal } from './components/forms/AdaptiveLeadModal';
import { LeadChatbot } from './components/forms/LeadChatbot';

// Page components
import { HomePage } from './components/pages/HomePage';
import { SolutionsHubPage, SolutionDetailPage } from './components/pages/SolutionDetailPage';
import { AiAsAServicePage } from './components/pages/AiAsAServicePage';
import { ScrabytDetailPage } from './components/pages/ScrabytDetailPage';
import { ProductsPage } from './components/pages/ProductsPage';
import { TechnologyPage } from './components/pages/TechnologyPage';
import { HowWeWorkPage } from './components/pages/HowWeWorkPage';
import { InsightsPage, ArticleDetailPage } from './components/pages/InsightsPage';
import { ComparisonsPage } from './components/pages/ComparisonsPage';
import { AssessmentPage } from './components/pages/AssessmentPage';
import { CareersPage } from './components/pages/CareersPage';
import { InvestorsPage } from './components/pages/InvestorsPage';
import { PartnersPage } from './components/pages/PartnersPage';
import { CompanyPage } from './components/pages/CompanyPage';
import { ContactPage } from './components/pages/ContactPage';
import { FaqPage } from './components/pages/FaqPage';
import { LegalPage } from './components/pages/LegalPage';
import { MiniCrm } from './components/crm/MiniCrm';
import { CsmPortal } from './components/cms/CsmPortal';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [leadModalState, setLeadModalState] = useState<{ isOpen: boolean; source: string }>({
    isOpen: false,
    source: 'General',
  });

  // Sync with browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    // Initialize current path
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname || '/');
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (href: string) => {
    // If it has query parameters, separate pathname
    const [path] = href.split('?');
    window.history.pushState({}, '', href);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLeadModal = (source: string) => {
    setLeadModalState({ isOpen: true, source });
  };

  const handleCloseLeadModal = () => {
    setLeadModalState({ isOpen: false, source: 'General' });
  };

  // Route Resolver
  const renderCurrentView = () => {
    // Exact root
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={navigate} onOpenLeadModal={handleOpenLeadModal} />;
    }

    // Solutions
    if (currentPath === '/solutions') {
      return <SolutionsHubPage onNavigate={navigate} onOpenLeadModal={handleOpenLeadModal} />;
    }

    // Scrabyt Overview Page (Section 7)
    if (
      currentPath === '/solutions/ai-as-a-service/scrabyt' ||
      currentPath === '/ai-as-a-service/scrabyt'
    ) {
      return <ScrabytDetailPage onNavigate={navigate} onOpenLeadModal={handleOpenLeadModal} />;
    }

    // AI as a Service Landing Page (Section 3 & 11)
    if (currentPath === '/solutions/ai-as-a-service' || currentPath === '/ai-as-a-service') {
      return <AiAsAServicePage onNavigate={navigate} onOpenLeadModal={handleOpenLeadModal} />;
    }

    if (currentPath.startsWith('/solutions/')) {
      const slug = currentPath.replace('/solutions/', '');
      return <SolutionDetailPage slug={slug} onNavigate={navigate} onOpenLeadModal={handleOpenLeadModal} />;
    }

    // Products
    if (currentPath === '/products') {
      return <ProductsPage onNavigate={navigate} onOpenLeadModal={handleOpenLeadModal} />;
    }

    // Technology / Architecture / Security / Governance
    if (currentPath.startsWith('/technology')) {
      return <TechnologyPage onNavigate={navigate} onOpenLeadModal={handleOpenLeadModal} />;
    }

    // How We Work
    if (currentPath === '/how-we-work') {
      return <HowWeWorkPage onNavigate={navigate} onOpenLeadModal={handleOpenLeadModal} />;
    }

    // Insights & Articles
    if (currentPath === '/insights') {
      return <InsightsPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/insights/')) {
      const slug = currentPath.replace('/insights/', '');
      return <ArticleDetailPage slug={slug} onNavigate={navigate} />;
    }

    // Comparisons
    if (currentPath === '/comparisons') {
      return <ComparisonsPage onNavigate={navigate} onOpenLeadModal={handleOpenLeadModal} />;
    }

    // AI Readiness Assessment
    if (currentPath === '/resources/ai-readiness-assessment' || currentPath === '/assessment') {
      return <AssessmentPage onNavigate={navigate} />;
    }

    // Company, Careers, Investors, Partners, Contact, FAQ
    if (currentPath === '/careers') {
      return <CareersPage onNavigate={navigate} />;
    }

    if (currentPath === '/investors') {
      return <InvestorsPage onNavigate={navigate} onOpenLeadModal={handleOpenLeadModal} />;
    }

    if (currentPath === '/partners') {
      return <PartnersPage onNavigate={navigate} onOpenLeadModal={handleOpenLeadModal} />;
    }

    if (currentPath === '/company') {
      return <CompanyPage onNavigate={navigate} onOpenLeadModal={handleOpenLeadModal} />;
    }

    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    if (currentPath === '/faq') {
      return <FaqPage onNavigate={navigate} onOpenLeadModal={handleOpenLeadModal} />;
    }

    // Legal routes
    if (currentPath === '/privacy') {
      return <LegalPage type="privacy" onNavigate={navigate} />;
    }
    if (currentPath === '/terms') {
      return <LegalPage type="terms" onNavigate={navigate} />;
    }
    if (currentPath === '/cookies') {
      return <LegalPage type="cookies" onNavigate={navigate} />;
    }
    if (currentPath === '/acceptable-use') {
      return <LegalPage type="acceptable-use" onNavigate={navigate} />;
    }

    // Mini CRM Internal Route
    if (currentPath === '/crm' || currentPath === '/admin/crm') {
      return <MiniCrm />;
    }

    // CSM / CMS Portal (SEO & GEO Blog Studio)
    if (
      currentPath === '/cms' ||
      currentPath === '/csm' ||
      currentPath === '/geo-studio' ||
      currentPath === '/admin/cms' ||
      currentPath === '/csm-portal'
    ) {
      return <CsmPortal onNavigate={navigate} />;
    }

    // Default Fallback: Home
    return <HomePage onNavigate={navigate} onOpenLeadModal={handleOpenLeadModal} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Global Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLeadModal={handleOpenLeadModal}
      />

      {/* Main View Area */}
      <main className="flex-1 pt-16">
        {renderCurrentView()}
      </main>

      {/* Global Clean Footer */}
      <Footer onNavigate={navigate} />

      {/* Global Modal Components */}
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigate}
      />

      <AdaptiveLeadModal
        isOpen={leadModalState.isOpen}
        ctaSource={leadModalState.source}
        onClose={handleCloseLeadModal}
      />

      {/* Floating Lead Chatbot Navigator */}
      <LeadChatbot />

      {/* Region-Aware Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}
