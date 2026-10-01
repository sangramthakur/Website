import React from 'react';
import { ArrowRight, ShieldCheck, Cpu, Code, CheckCircle2, Award, Users } from 'lucide-react';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface CompanyPageProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const CompanyPage: React.FC<CompanyPageProps> = ({ onNavigate, onOpenLeadModal }) => {
  const principles = [
    {
      title: 'Engineering-Led Integrity',
      desc: 'We do not sell speculative futures or inflated benchmarks. We measure success by whether an autonomous pipeline reliably resolves business tasks without manual intervention.',
    },
    {
      title: 'Customer Data Sovereignty',
      desc: 'Your data, customer context, and execution logs belong entirely to your enterprise. We maintain zero-data-retention APIs and strict customer VPC isolation.',
    },
    {
      title: 'Determinism Over Guesswork',
      desc: 'We wrap probabilistic foundation models in deterministic state machines, automated evaluation harnesses, and human-in-the-loop safeguards.',
    },
    {
      title: 'Industry-Agnostic Pragmatism',
      desc: 'Rather than organizing around industry buzzwords, we solve foundational business mechanics: repetitive workflows, knowledge retrieval, forecasting, and decisions.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SeoHead
        title="About the Platform – Enterprise AI Systems Platform"
        description="Our mission, engineering culture, and operating principles. Building, deploying, and scaling practical AI for enterprise capability."
        canonicalPath="/company"
      />

      <Breadcrumbs items={[{ label: 'Company' }]} onNavigate={onNavigate} />

      {/* Hero */}
      <div className="max-w-3xl space-y-4">
        <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Company & Systems Mission
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
          Turn AI into real business capability.
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          We are an applied AI and distributed systems technology company. We build, deploy, and scale intelligent products, autonomous workflows, and custom AI infrastructure designed around real business problems.
        </p>
      </div>

      {/* Core Principles */}
      <div className="space-y-6">
        <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
          Engineering & Operating Principles
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((pr) => (
            <div
              key={pr.title}
              className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{pr.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {pr.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Commercial Pillars Summary */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
        <div>
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Commercial Scope
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Four Pillars of Operation
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-1">
            <span className="font-mono text-blue-500 font-bold block">Pillar 01</span>
            <span className="font-bold text-slate-900 dark:text-white block text-sm">AI as a Service</span>
            <p className="text-slate-500 text-[11px]">Managed low-latency model APIs, semantic caching, and hybrid RAG.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-1">
            <span className="font-mono text-indigo-500 font-bold block">Pillar 02</span>
            <span className="font-bold text-slate-900 dark:text-white block text-sm">AI Agents</span>
            <p className="text-slate-500 text-[11px]">Autonomous agents with tool sandboxes, persistent memory, and state graphs.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-1">
            <span className="font-mono text-cyan-500 font-bold block">Pillar 03</span>
            <span className="font-bold text-slate-900 dark:text-white block text-sm">SaaS Products</span>
            <p className="text-slate-500 text-[11px]">Turnkey applications with tenant isolation and enterprise SSO/SAML.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-1">
            <span className="font-mono text-emerald-500 font-bold block">Pillar 04</span>
            <span className="font-bold text-slate-900 dark:text-white block text-sm">AI Consulting</span>
            <p className="text-slate-500 text-[11px]">End-to-end engineering from feasibility discovery to enterprise VPC rollout.</p>
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="text-center py-8 space-y-4">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          Begin an Architecture Conversation
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Our engineering team is prepared to evaluate your operational friction points under strict confidentiality.
        </p>
        <button
          onClick={() => onOpenLeadModal('Company Page CTA')}
          className="px-6 py-3 bg-slate-900 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500 text-white dark:text-slate-900 dark:hover:text-white font-semibold text-xs rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Talk to an AI Systems Expert</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
