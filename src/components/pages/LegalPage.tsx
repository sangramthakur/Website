import React from 'react';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { ShieldCheck, AlertCircle } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies' | 'acceptable-use';
  onNavigate: (href: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const getLegalContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          tag: 'LEGAL / PRIVACY',
          summary: 'How our platform handles customer data, inference context, and personal identifiers.',
          sections: [
            {
              heading: '1. Zero-Data Retention Inference Principle',
              body: 'Our platform enforces zero-data-retention on all customer inference API calls. Customer prompts, embeddings, completion outputs, and retrieved document chunks are never used to train public or shared foundation models.',
            },
            {
              heading: '2. Pre-Inference PII Sanitization',
              body: 'Prior to context injection into foundation model inference endpoints, automated sanitization algorithms scan for sensitive entities (such as SSNs, payment card details, and personal contact identifiers) according to configured enterprise policy.',
            },
            {
              heading: '3. Data Storage & Customer-Managed Encryption',
              body: 'Persistent system records and vector indices are stored with AES-256 encryption at rest. Customer-Managed Encryption Keys (CMEK) and dedicated VPC peering are supported for enterprise deployments.',
            },
            {
              heading: '4. Legal Review Notice',
              body: '[PLACEHOLDER FOR COUNSEL REVIEW: Final statutory jurisdictional notices and localized Data Processing Addendums (GDPR / CCPA / HIPAA) will be appended prior to general enterprise commercial deployment.]',
            },
          ],
        };

      case 'terms':
        return {
          title: 'Terms of Use',
          tag: 'LEGAL / TERMS',
          summary: 'Governing parameters for accessing enterprise platform APIs, SaaS products, and consulting deliverables.',
          sections: [
            {
              heading: '1. Service Scope & Availability',
              body: 'Access to platform endpoints, autonomous agent runners, and software products is provided subject to executed Enterprise Master Service Agreements (MSAs) and stated Service Level Agreements (SLAs).',
            },
            {
              heading: '2. Intellectual Property & Customer Weights',
              body: 'The enterprise customer retains exclusive intellectual property rights to all proprietary data, fine-tuned model adapter weights (LoRAs), custom workflow graphs, and internal system integrations.',
            },
            {
              heading: '3. Permitted API Utilization & Rate Budgets',
              body: 'Customers agree to observe established token rate limits, concurrency ceilings, and deterministic safety firewalls.',
            },
            {
              heading: '4. Legal Review Notice',
              body: '[PLACEHOLDER FOR COUNSEL REVIEW: Master Terms of Service, liability limitation terms, and dispute resolution clauses to be finalized by corporate legal counsel.]',
            },
          ],
        };

      case 'cookies':
        return {
          title: 'Cookie Policy',
          tag: 'LEGAL / COOKIES',
          summary: 'Transparency regarding browser cookies, session authentication, and telemetry tracking.',
          sections: [
            {
              heading: '1. Necessary Cookies',
              body: 'Essential cookies required to maintain user sessions, enforce CSRF protection, and preserve dark/light theme preferences. These cannot be disabled.',
            },
            {
              heading: '2. Performance & Telemetry Cookies',
              body: 'Anonymized latency and route telemetry used to optimize Core Web Vitals and distributed edge cache routing. Gated upon user consent.',
            },
            {
              heading: '3. Marketing & Attribution Cookies',
              body: 'Used strictly to assess the performance of technical webinars and content referrals. Inactive until explicit affirmative consent.',
            },
            {
              heading: '4. Preference Management',
              body: 'Users can modify or revoke their cookie preferences at any time via the persistent Cookie Consent manager.',
            },
          ],
        };

      case 'acceptable-use':
        return {
          title: 'Acceptable Use Policy',
          tag: 'LEGAL / SAFETY',
          summary: 'Safety boundaries and operational constraints governing autonomous AI agents and model inference.',
          sections: [
            {
              heading: '1. Prohibited Applications',
              body: 'The platform must not be used to develop autonomous lethal systems, conduct deceptive impersonation, generate non-consensual deepfakes, or circumvent established cryptographic security mechanisms.',
            },
            {
              heading: '2. Human Oversight Requirements',
              body: 'High-risk autonomous workflows (including automated financial transactions exceeding configured thresholds or irreversible record deletions) must maintain human-in-the-loop authorization gates.',
            },
            {
              heading: '3. Adversarial Robustness & Prompt Firewalls',
              body: 'Users must not deliberately attempt to breach system firewalls, inject jailbreak vectors, or extract proprietary base model weights.',
            },
            {
              heading: '4. Compliance Notice',
              body: '[PLACEHOLDER FOR COUNSEL REVIEW: Alignment with international AI regulatory frameworks including the EU AI Act High-Risk Classification system.]',
            },
          ],
        };
    }
  };

  const data = getLegalContent();

  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SeoHead
        title={`${data.title} – Enterprise AI Platform`}
        description={data.summary}
        canonicalPath={`/${type}`}
      />

      <Breadcrumbs items={[{ label: 'Legal' }, { label: data.title }]} onNavigate={onNavigate} />

      <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          {data.tag}
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          {data.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          {data.summary}
        </p>
      </div>

      <div className="space-y-8">
        {data.sections.map((sec) => (
          <section key={sec.heading} className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {sec.heading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {sec.body}
            </p>
          </section>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-500">
        <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <span>
          This document is structured for production deployment and will be updated as formal legal reviews and jurisdiction-specific regulatory addendums are concluded.
        </span>
      </div>
    </div>
  );
};
