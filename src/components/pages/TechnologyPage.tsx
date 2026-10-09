import React from 'react';
import {
  Shield,
  Lock,
  Server,
  Cpu,
  Database,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Layers,
  ExternalLink,
  Radio,
  Check,
  Sparkles,
  Zap,
} from 'lucide-react';
import { cmsDataService } from '../../services/cmsDataService';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { trackScrabytExternalClick } from '../../services/analytics';
import { soundEngine } from '../../services/soundEngine';

interface TechnologyPageProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ onNavigate, onOpenLeadModal }) => {
  const capabilities = cmsDataService.getCapabilities();
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

      {/* Production Technical Capabilities & Technology Stack (Managed in CMS) */}
      <div className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Full-Stack Engineering Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Production Technical Capabilities
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Core execution primitives and runtime stacks deployed across client environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between hover:border-blue-500/50 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                    {cap.id}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {cap.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {cap.summary}
                </p>
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Stack & Runtime:</span>
                  <div className="flex flex-wrap gap-1">
                    {cap.technicalStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {cap.route && (
                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onNavigate(cap.route!)}
                    className="text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
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

      {/* Live Sovereign Product Showcase (At the bottom of Platform) */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-6 sm:p-10 lg:p-12 text-white shadow-2xl shadow-blue-950/40">
        {/* Glow ambient background */}
        <div
          className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-8">
          {/* Top Banner Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE PRODUCT IN PRODUCTION</span>
                <span className="text-white/40">·</span>
                <span className="text-white/80">Ambient Clinical OS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white leading-tight">
                Experience the Platform Live: <span className="font-serif italic font-normal text-blue-300">Scrabyt</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Witness our sovereign AI runtime handling real clinical consultations in real time. Built with zero customer data retention, sub-340ms latency, and automated FHIR EHR synchronization.
              </p>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="https://www.scrabyt.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  soundEngine.playClick();
                  trackScrabytExternalClick('/technology', 'PlatformBottom_LiveProductLink');
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all cursor-pointer group"
              >
                <span>Launch Live Product (Scrabyt.com)</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onNavigate('/solutions/ai-as-a-service/scrabyt');
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs transition-colors cursor-pointer"
              >
                <span>Architecture Deep Dive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Live Telemetry Guarantees */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Production SLA</div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono">99.98%</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" /> Continuous Active
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Inference P95</div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono">&lt; 340ms</div>
              <div className="text-[11px] text-cyan-400">Semantic Warmth Cache</div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Data Retention</div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono">0.00%</div>
              <div className="text-[11px] text-indigo-300">Stateless Secure Enclave</div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Compliance Validated</div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono">HIPAA & GDPR</div>
              <div className="text-[11px] text-blue-300">Cryptographic Audit Trail</div>
            </div>
          </div>

          {/* Interactive Live URL Strip */}
          <div className="p-4 rounded-2xl bg-blue-900/30 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
              <span className="text-slate-300">
                Official Live Product URL:{' '}
                <a
                  href="https://www.scrabyt.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackScrabytExternalClick('/technology', 'PlatformBottom_LiveUrlLink')}
                  className="font-mono text-white font-semibold underline underline-offset-2 hover:text-blue-300 transition-colors"
                >
                  https://www.scrabyt.com/
                </a>
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-400 text-xs">
              <button
                onClick={() => onNavigate('/products')}
                className="hover:text-white transition-colors cursor-pointer font-medium"
              >
                All SaaS Products →
              </button>
              <button
                onClick={() => onOpenLeadModal('Live Product Sandbox Access')}
                className="hover:text-blue-300 transition-colors cursor-pointer font-medium"
              >
                Request Enterprise Access →
              </button>
            </div>
          </div>
        </div>
      </section>

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
