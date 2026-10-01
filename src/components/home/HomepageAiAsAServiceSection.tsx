import React from 'react';
import {
  ArrowRight,
  Zap,
  Server,
  Network,
  Database,
  Cpu,
  Workflow,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface HomepageAiAsAServiceSectionProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const HomepageAiAsAServiceSection: React.FC<HomepageAiAsAServiceSectionProps> = ({
  onNavigate,
  onOpenLeadModal,
}) => {
  const capabilities = [
    {
      title: 'AI APIs',
      desc: 'High-throughput, low-latency API endpoints for embedding generation and multimodal inference.',
      icon: Zap,
      tag: '<500ms p95',
    },
    {
      title: 'Managed AI',
      desc: 'Serverless foundation model clusters with automatic health monitoring and auto-scaling.',
      icon: Server,
      tag: '99.99% SLA',
    },
    {
      title: 'AI Agents as a Service',
      desc: 'Autonomous reasoning state machines with sandboxed tool runtimes and persistent memory.',
      icon: Network,
      tag: 'Stateful loops',
    },
    {
      title: 'Enterprise RAG',
      desc: 'Managed hybrid vector retrieval with neural reranking and strict citation provenance.',
      icon: Database,
      tag: 'Zero-retention',
    },
    {
      title: 'Model Inference',
      desc: 'Sub-5ms semantic cache hits, dynamic token routing, and private VPC deployment options.',
      icon: Cpu,
      tag: 'Semantic cache',
    },
    {
      title: 'Workflow Intelligence',
      desc: 'Event-driven logic transforming unstructured clinical and enterprise streams into verified actions.',
      icon: Workflow,
      tag: 'Audit logged',
    },
  ];

  return (
    <section
      id="ai-as-a-service-section"
      aria-label="AI as a Service Platform"
      className="py-16 sm:py-24 relative border-b border-slate-100 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Platform Pillar 01 · Infrastructure & Managed Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              AI as a Service
            </h2>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
              Production-ready AI capabilities delivered as services.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              Access high-performance foundation model inference, managed hybrid RAG, autonomous agent execution, and vertical intelligence engines without building or maintaining GPU clusters from scratch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/solutions/ai-as-a-service')}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Explore AI as a Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenLeadModal('Homepage AIaaS Consultation')}
              className="px-5 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center cursor-pointer"
            >
              <span>Talk to an Architect</span>
            </button>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 hover:border-blue-500/60 transition-all shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    {cap.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {cap.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Context strip tying back to live deployments */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="text-slate-700 dark:text-slate-300">
              Enterprise contract guarantees: strict zero-data-retention, pre-inference PII redactors, and private VPC peering options.
            </span>
          </div>

          <button
            onClick={() => onNavigate('/solutions/ai-as-a-service/scrabyt')}
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>Inspect Scrabyt Live Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
