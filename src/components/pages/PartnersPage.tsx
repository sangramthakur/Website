import React, { useState } from 'react';
import { ArrowRight, Layers, ShieldCheck, Network, Cpu, CheckCircle2 } from 'lucide-react';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface PartnersPageProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({ onNavigate, onOpenLeadModal }) => {
  const [partnerType, setPartnerType] = useState<'all' | 'technology' | 'systems'>('all');

  const categories = [
    {
      type: 'technology',
      title: 'Cloud & Foundation Model Infrastructure',
      desc: 'Seamless integration with hyperscale cloud environments and frontier model serving backends.',
      integrations: ['Google Cloud Platform & Vertex AI', 'Private VPC Networking', 'NVIDIA TensorRT-LLM', 'PostgreSQL / pgvector', 'Redis Vector Cache'],
    },
    {
      type: 'systems',
      title: 'Enterprise System Connectors',
      desc: 'Standardized connectors for bidirectional event ingestion and transactional writebacks.',
      integrations: ['Enterprise ERP Systems (SAP, NetSuite)', 'Ticketing & Queues (ServiceNow, Jira)', 'Identity Providers (Okta, Azure AD)', 'Data Lakehouses (BigQuery, Snowflake)'],
    },
    {
      type: 'systems',
      title: 'Systems Integrators & Advisory Partners',
      desc: 'Global implementation consultancies and boutique AI transformation practices.',
      integrations: ['Tier-1 Management Consultancies', 'Specialized MLOps Engineering Firms', 'Regional System Integrators'],
    },
  ];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SeoHead
        title="Partners & Integration Ecosystem – Enterprise AI Platform"
        description="Explore our technology integration connectors, cloud infrastructure alignments, and implementation partner network."
        canonicalPath="/partners"
      />

      <Breadcrumbs items={[{ label: 'Company', href: '/company' }, { label: 'Partners' }]} onNavigate={onNavigate} />

      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Integration Architecture & Network
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Partners & Ecosystem Architecture
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          We design our systems for open interoperability across cloud providers, enterprise data stores, and advisory networks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4"
          >
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{cat.title}</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{cat.desc}</p>
            <div className="pt-2 space-y-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Architecture Links:</span>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                {cat.integrations.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">Become an Ecosystem Partner</div>
          <p className="text-xs text-slate-500 mt-1">
            Build verified connectors or certify your systems integration practice on our platform.
          </p>
        </div>
        <button
          onClick={() => onOpenLeadModal('Partner Program Inquiry')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer shadow-sm"
        >
          Inquire About Ecosystem Partnership
        </button>
      </div>
    </div>
  );
};
