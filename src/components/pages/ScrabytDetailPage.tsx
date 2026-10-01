import React, { useEffect } from 'react';
import {
  ArrowRight,
  ExternalLink,
  Shield,
  Activity,
  FileText,
  Workflow,
  Receipt,
  CalendarCheck,
  TrendingUp,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { ScrabytServiceFlowVisual } from '../solutions/ScrabytServiceFlowVisual';
import { trackEvent, trackScrabytExternalClick } from '../../services/analytics';
import { AIAAS_OFFERINGS } from '../../data/aiAsAService';

interface ScrabytDetailPageProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const ScrabytDetailPage: React.FC<ScrabytDetailPageProps> = ({
  onNavigate,
  onOpenLeadModal,
}) => {
  const scrabytData = AIAAS_OFFERINGS.find((item) => item.id === 'scrabyt')!;

  useEffect(() => {
    trackEvent('scrabyt_aiaas_page_view', {
      product: 'Scrabyt',
      category: 'AI as a Service',
      source_page: '/solutions/ai-as-a-service/scrabyt',
    });
  }, []);

  const handleExternalClick = (sectionName: string) => {
    trackScrabytExternalClick('/solutions/ai-as-a-service/scrabyt', sectionName);
  };

  const capabilities = [
    {
      title: 'Clinical Intelligence',
      icon: Activity,
      desc: 'Ambient audio ingestion with multi-speaker diarization and clinical fact extraction, transforming spoken doctor-patient interactions into verified medical semantics without manual transcription burden.',
    },
    {
      title: 'Documentation Automation',
      icon: FileText,
      desc: 'Auto-generation of structured SOAP notes, specialist consult briefs, and discharge summaries formatted to custom clinic EMR templates, complete with inline sentence-level evidence attribution.',
    },
    {
      title: 'Healthcare Workflow Automation',
      icon: Workflow,
      desc: 'Orchestration of downstream clinical tasks: prescription verification checks, lab test requisition synthesis, patient referral dispatches, and diagnostic code pre-matching with physician-in-the-loop gates.',
    },
    {
      title: 'Operational Intelligence',
      icon: TrendingUp,
      desc: 'Real-time clinic-wide analytics identifying documentation bottlenecks, room turnaround delays, encounter duration variance, and queue throughput trends to optimize staffing and patient flow.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SeoHead
        title="Scrabyt | AI as a Service for Clinical Intelligence"
        description="Discover Scrabyt, an AI-powered clinical intelligence service connecting healthcare conversations, documentation and operational workflows."
        canonicalPath="/solutions/ai-as-a-service/scrabyt"
      />

      <Breadcrumbs
        items={[
          { label: 'Solutions', href: '/solutions' },
          { label: 'AI as a Service', href: '/solutions/ai-as-a-service' },
          { label: 'Scrabyt' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Hero Header */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>FEATURED AI AS A SERVICE OFFERING</span>
          <span aria-hidden="true">·</span>
          <span>CLINICAL INTELLIGENCE OS</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Scrabyt
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300">
            Clinical intelligence delivered as an AI-powered service.
          </p>
        </div>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          Scrabyt is an AI-powered clinical intelligence service for modern clinics and healthcare organizations. It connects clinical conversations with documentation, prescriptions, billing workflows, follow-ups and operational intelligence.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <a
            href="https://www.scrabyt.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore Scrabyt website — opens in a new tab"
            onClick={() => handleExternalClick('Hero_Primary')}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 group"
          >
            <span>Explore Scrabyt</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <button
            onClick={() => onOpenLeadModal('Scrabyt AIaaS Inquiry')}
            className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-xl border border-slate-200/80 dark:border-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Discuss Clinical AI Architecture</span>
          </button>
        </div>

        {/* Capability Tags */}
        <div className="pt-2 flex flex-wrap gap-2">
          {scrabytData.capabilities.map((cap) => (
            <span
              key={cap}
              className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300"
            >
              {cap}
            </span>
          ))}
        </div>
      </div>

      {/* Scrabyt Service Flow Visualization */}
      <div className="space-y-4">
        <div className="max-w-2xl">
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            End-to-End Service Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            How Clinical Encounters Flow Through Scrabyt
          </h2>
        </div>
        <ScrabytServiceFlowVisual />
      </div>

      {/* Deep-Dive Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          return (
            <div
              key={cap.title}
              className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-sm hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {cap.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {cap.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* How Scrabyt Fits Within AI as a Service */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Category Placement & Platform Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            How Scrabyt Fits Within AI as a Service
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Scrabyt represents the first live realization of our AI as a Service commercial pillar. Rather than requiring healthcare organizations to assemble complex speech models, vector indexes, and workflow orchestrators from scratch, Scrabyt delivers these capabilities as a fully managed, production-grade intelligence layer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold block uppercase">
              Zero-Retention Security
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Operates under strict zero-data-retention inference boundaries where clinical audio and protected data are never stored for foundation model training.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold block uppercase">
              Modular Integration
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Connects seamlessly to existing EMR systems, billing engines, and clinic schedules via standardized FHIR-compliant API adapters and webhooks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold block uppercase">
              Managed Operations
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Sub-500ms p95 latency, continuous model tuning on clinical terminology, and 99.99% availability backed by enterprise service level agreements.
            </p>
          </div>
        </div>
      </div>

      {/* External Redirect Callout Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-slate-800">
        <div className="space-y-2 max-w-xl">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-wider">
            Official Product Ecosystem
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to experience Scrabyt in clinic operations?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Visit the official Scrabyt platform to explore specialized clinical workflows, documentation previews, and practice onboarding.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a
            href="https://www.scrabyt.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore Scrabyt website — opens in a new tab"
            onClick={() => handleExternalClick('Bottom_CTA')}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>Explore Scrabyt ↗</span>
          </a>

          <button
            onClick={() => onNavigate('/solutions/ai-as-a-service')}
            className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors border border-slate-800 flex items-center justify-center cursor-pointer whitespace-nowrap"
          >
            <span>Back to AI as a Service</span>
          </button>
        </div>
      </div>
    </div>
  );
};
