import React, { useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  Cpu,
  Layers,
  Shield,
  Zap,
  CheckCircle2,
  Database,
  Network,
  Workflow,
  Sparkles,
  Server,
  Lock,
  ChevronDown,
} from 'lucide-react';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { ScrabytServiceFlowVisual } from '../solutions/ScrabytServiceFlowVisual';
import { trackScrabytExternalClick } from '../../services/analytics';
import { AIAAS_OFFERINGS } from '../../data/aiAsAService';

interface AiAsAServicePageProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const AiAsAServicePage: React.FC<AiAsAServicePageProps> = ({
  onNavigate,
  onOpenLeadModal,
}) => {
  const scrabyt = AIAAS_OFFERINGS.find((item) => item.id === 'scrabyt')!;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const capabilities = [
    {
      title: 'AI APIs',
      desc: 'High-throughput, low-latency API endpoints for embedding generation, multimodal inference, and structured entity extraction with enterprise SLAs.',
      icon: Zap,
    },
    {
      title: 'Managed AI',
      desc: 'Fully managed foundation model clusters with automatic health monitoring, horizontal autoscaling, and zero operational maintenance overhead.',
      icon: Server,
    },
    {
      title: 'AI Agents as a Service',
      desc: 'Autonomous reasoning engines with sandboxed tool runtimes, persistent state checkpoints, and cyclical execution loops ready to deploy into live queues.',
      icon: Network,
    },
    {
      title: 'Enterprise RAG',
      desc: 'Managed hybrid dense/sparse vector retrieval with cross-encoder neural reranking and strict citation provenance over corporate knowledge silos.',
      icon: Database,
    },
    {
      title: 'Model Inference',
      desc: 'Low-latency model serving with semantic vector response caching, dynamic token routing, and sub-500ms p95 latency guarantees.',
      icon: Cpu,
    },
    {
      title: 'Workflow Intelligence',
      desc: 'Event-driven logic bridges that transform unstructured emails, audio transcripts, and PDFs into verified business actions across ERPs and CRMs.',
      icon: Workflow,
    },
    {
      title: 'Custom AI Services',
      desc: 'Tailored domain model adapters, private LoRA checkpoints, and proprietary pipeline configurations engineered for specific enterprise boundaries.',
      icon: Sparkles,
    },
  ];

  const faqs = [
    {
      q: 'How does AI as a Service differ from building AI infrastructure in-house?',
      a: 'Building in-house requires recruiting specialized distributed systems and MLOps talent, reserving costly GPU clusters, and continuously managing model drift, cold-starts, and security patches. AI as a Service delivers production-ready capabilities via hardened endpoints with predictable latency and zero infrastructure management.',
    },
    {
      q: 'How is Scrabyt positioned within AI as a Service?',
      a: 'Scrabyt is the first live, vertical implementation of our AI as a Service pillar. It demonstrates how our underlying foundation model pipelines, speech diarization, and stateful workflow orchestration can be packaged as a specialized clinical intelligence service for modern clinics and healthcare organizations.',
    },
    {
      q: 'Is customer data protected under zero-retention agreements?',
      a: 'Yes. All AI as a Service workloads operate under strict zero-data-retention contracts. Audio, text prompts, retrieved context, and generated outputs are never stored for foundation model training.',
    },
    {
      q: 'Can AI as a Service endpoints be deployed inside our private cloud VPC?',
      a: 'Yes. We support managed multi-tenant cloud endpoints as well as dedicated private VPC deployments on Google Cloud Platform with private service connections.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SeoHead
        title="AI as a Service – Enterprise Model & Inference Infrastructure"
        description="Access production-ready AI capabilities without building everything from scratch. Featuring Scrabyt Clinical Intelligence OS."
        canonicalPath="/solutions/ai-as-a-service"
      />

      <Breadcrumbs
        items={[{ label: 'Solutions', href: '/solutions' }, { label: 'AI as a Service' }]}
        onNavigate={onNavigate}
      />

      {/* 1. Hero */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>COMMERCIAL PILLAR 01</span>
          <span aria-hidden="true">·</span>
          <span>PRODUCTION AI DELIVERED AS SERVICES</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          AI as a Service
        </h1>

        <p className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300">
          Production-ready AI capabilities delivered as services.
        </p>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          Access high-performance foundation model inference, autonomous workflow orchestration, managed hybrid RAG, and domain intelligence layers without building or maintaining GPU clusters from scratch.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={() => onOpenLeadModal('AI as a Service Hero')}
            className="px-6 py-3.5 bg-slate-900 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500 text-white dark:text-slate-900 dark:hover:text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Talk to an AI Expert</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#featured-aiaas"
            className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-xl border border-slate-200/80 dark:border-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Live Offerings</span>
          </a>
        </div>
      </div>

      {/* 2. What Is AI as a Service? */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          The Consumption Paradigm
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          What Is AI as a Service?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
          AI as a Service (AIaaS) decouples sophisticated artificial intelligence from operational infrastructure burdens. Instead of managing complex distributed Kubernetes clusters, fine-tuning weights from raw checkpoints, and troubleshooting memory bottlenecks, enterprises consume verified models, autonomous agents, and industry intelligence layers through standardized, low-latency API contracts with guaranteed service levels.
        </p>
      </div>

      {/* 3. Core Capabilities Grid */}
      <div className="space-y-6">
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            Platform Building Blocks
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Comprehensive AIaaS Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Designed for high concurrency, microsecond caching, and deterministic execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 hover:border-blue-500/60 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {cap.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Featured Live Offering: SCRABYT (Section 3 & 4) */}
      <section
        id="featured-aiaas"
        className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/30 border-2 border-blue-500/40 shadow-xl space-y-8 scroll-mt-24"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-blue-100 dark:border-slate-800">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>FEATURED LIVE AI AS A SERVICE OFFERING · LIVE</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  SCRABYT
                </h2>
                <span className="text-xs sm:text-sm font-mono text-blue-600 dark:text-blue-400 font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80">
                  {scrabyt.category}
                </span>
              </div>
              <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
                AI-powered clinical intelligence for modern healthcare.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {scrabyt.longDescription}
            </p>

            {/* Capability Tags */}
            <div className="pt-2 flex flex-wrap gap-1.5">
              {scrabyt.capabilities.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-2.5 shrink-0 self-start">
            <a
              href="https://www.scrabyt.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore Scrabyt website — opens in a new tab"
              onClick={() => trackScrabytExternalClick('/solutions/ai-as-a-service', 'Featured_Card')}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap active:scale-95 group"
            >
              <span>Explore Scrabyt</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={() => onNavigate('/solutions/ai-as-a-service/scrabyt')}
              className="px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>View Platform Overview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Embedded Service Flow Visual */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Scrabyt Service Architecture & Workflow Topology
          </div>
          <ScrabytServiceFlowVisual />
        </div>
      </section>

      {/* 5. How AIaaS Engagement Works */}
      <div className="space-y-6">
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            Operational Lifecycle
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            How AIaaS Engagement Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Transparent onboarding designed for enterprise technical leads and security officers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold block">
              01 · Provisioning & VPC Peering
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Instant Infrastructure Setup
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Deploy isolated tenant credentials, configure private network peering into Google Cloud or AWS, and establish token budgets.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold block">
              02 · Pipeline Integration & Testing
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Deterministic Schema Alignment
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Connect REST/gRPC endpoints, configure webhooks, and validate synthetic benchmark test datasets against our automated evaluation harnesses.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
              03 · Continuous SLA Optimization
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Autonomous Cache & Latency Tuning
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Benefit from automatic semantic response caching, distilled edge routing, and continuous foundation model upgrades with zero downtime.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Architecture & Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Serving & Latency Architecture
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Multi-region active-active proxies dispatch queries to nearest GPU clusters. In-memory semantic vector indices intercept duplicate or highly similar queries, delivering sub-5ms completions while dramatically lowering API token expenditure.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Zero-Retention Security & Firewalls
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Pre-inference firewalls redact sensitive PII identifiers in flight and sanitize prompts against indirect injection vulnerabilities. All calls are governed by enterprise zero-data-retention agreements and FIPS-compliant encryption.
          </p>
        </div>
      </div>

      {/* 7. FAQ */}
      <div className="space-y-4">
        <div className="max-w-2xl">
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            Questions Answered
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            AI as a Service FAQ
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. Talk to an AI Expert CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-lg sm:text-xl font-bold">
            Ready to consume AI capabilities without infrastructure friction?
          </div>
          <p className="text-xs text-slate-400">
            Schedule a technical architecture discussion with our inference systems leads.
          </p>
        </div>
        <button
          onClick={() => onOpenLeadModal('AI as a Service Page CTA')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl cursor-pointer whitespace-nowrap shadow-sm"
        >
          Talk to an AI Expert
        </button>
      </div>
    </div>
  );
};
