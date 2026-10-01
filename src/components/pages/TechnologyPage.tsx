import React from 'react';
import { Shield, Lock, Server, Cpu, Database, FileCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface TechnologyPageProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ onNavigate, onOpenLeadModal }) => {
  const sections = [
    {
      title: 'Infrastructure & Serving Topology',
      desc: 'Distributed inference orchestration designed for sub-500ms p95 latency, multi-provider active-active routing, and automatic failover across Google Cloud Platform and customer VPCs.',
      icon: Server,
      points: [
        'Serverless GPU container pools with warm model cache preservation.',
        'High-speed semantic caching with sub-5ms vector distance checks.',
        'Zero-downtime blue/green rollouts with automated canary health verification.',
      ],
    },
    {
      title: 'Zero-Trust Security & Data Handling',
      desc: 'Enterprise boundary controls ensuring your proprietary data, customer context, and weights never leak or train external models.',
      icon: Lock,
      points: [
        'Contractual zero-data-retention agreements for all inference calls.',
        'Automated pre-inference PII redactor masking sensitive entities prior to context injection.',
        'FIPS 140-2 validated encryption in transit (TLS 1.3) and at rest (AES-256 with CMEK option).',
      ],
    },
    {
      title: 'AI Governance & Safety Firewalls',
      desc: 'Deterministic guardrail evaluation layers inspecting prompt inputs and completion outputs against corporate safety policies and hallucination boundaries.',
      icon: Shield,
      points: [
        'Pre-inference prompt injection firewalls blocking jailbreak and exfiltration vectors.',
        'Grounding verification algorithms verifying citation provenance for generated tokens.',
        'Cryptographic audit trails logging prompt hashes, model parameters, and confidence scores.',
      ],
    },
    {
      title: 'Access Control & Multi-Tenancy',
      desc: 'Granular identity-aware access controls ensuring strict isolation between enterprise departments and external entities.',
      icon: Database,
      points: [
        'Role-Based and Attribute-Based Access Control (RBAC & ABAC).',
        'Turnkey SAML 2.0 / OIDC enterprise authentication with SCIM sync.',
        'Logical and physical tenant partitioning in storage and vector memory banks.',
      ],
    },
  ];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SeoHead
        title="Technology, Security & Governance Hub – Enterprise AI Platform"
        description="Inspect our distributed systems architecture, zero-trust data boundaries, pre-inference firewalls, and AI governance standards."
        canonicalPath="/technology"
      />

      <Breadcrumbs items={[{ label: 'Technology' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Enterprise Systems Architecture
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Security, Architecture & Responsible AI Governance
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Built for security architects, CTOs, and compliance teams requiring verifiable cryptographic provenance and zero proprietary data exposure.
        </p>
      </div>

      {/* 4 Core Technology Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((sec) => (
          <div
            key={sec.title}
            className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <sec.icon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {sec.title}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {sec.desc}
            </p>

            <ul className="space-y-2 pt-2 text-xs text-slate-700 dark:text-slate-300">
              {sec.points.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Compliance Information Placeholder as specified in Section 34 */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            Compliance & Certification Roadmap
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Compliance information will be published as certifications are completed. Our architecture is designed and operated following SOC 2 Type II, ISO 27001, and NIST AI Risk Management Framework specifications.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 rounded-3xl bg-slate-950 text-white text-center space-y-4">
        <h3 className="text-2xl font-bold">Request a Security Architecture Deep-Dive</h3>
        <p className="text-xs text-slate-300 max-w-xl mx-auto">
          Schedule an audit discussion with our distributed systems security lead to inspect VPC isolation topologies and pre-inference inspection firewalls.
        </p>
        <button
          onClick={() => onOpenLeadModal('Security Architecture Inquiry')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl cursor-pointer"
        >
          Talk to a Security Architect
        </button>
      </div>
    </div>
  );
};
