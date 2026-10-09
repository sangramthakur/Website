import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Layers,
  Lock,
  FileText,
  Calendar,
  CheckCircle2,
  Users,
  Target,
  Clock,
  Briefcase,
  DollarSign,
  Download,
  Award,
  Cpu,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface InvestorsPageProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const InvestorsPage: React.FC<InvestorsPageProps> = ({ onNavigate, onOpenLeadModal }) => {
  const [activeDeckTab, setActiveDeckTab] = useState<'overview' | 'financials' | 'tech'>('overview');

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SeoHead
        title="Investor Briefing & Seed Round Overview – Enterprise AI Platform"
        description="Executive investment briefing, current $2.5M seed round mechanics, unit economics, founding team pedigree, and confidential data room access."
        canonicalPath="/investors"
      />

      <Breadcrumbs items={[{ label: 'Company', href: '/company' }, { label: 'Investors' }]} onNavigate={onNavigate} />

      {/* Hero Header: 10-Second Executive Summary */}
      <div className="max-w-4xl space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Active Seed Round Open • $2.5M Target Allocation
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-950 dark:text-white tracking-tight leading-[1.15]">
          Deterministic AI infrastructure built for mission-critical enterprise scale.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          We bridge the chasm between fragile LLM prototypes and production-grade enterprise deployments through stateful orchestration runtimes, sub-100ms inference routing, and sovereign VPC privacy guarantees.
        </p>

        {/* Primary Investor CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => onOpenLeadModal('Investor Deck Request')}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Request Confidential Pitch Deck & Data Room</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>
          <button
            onClick={() => onOpenLeadModal('Founder Briefing')}
            className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl text-xs sm:text-sm font-medium inline-flex items-center gap-2 transition-all border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Book 20-Min Founder Briefing</span>
          </button>
        </div>
      </div>

      {/* Current Round Mechanics & Capital Status Dashboard */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 relative z-10">
          <div>
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-400" />
              Round Term Sheet & Structure
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-white">
              Seed Financing Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Priced Equity / Post-Money SAFE Structure with Institutional Lead Terms
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Allocating $1.2M Committed
            </span>
            <button
              onClick={() => onOpenLeadModal('Term Sheet Request')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Request Term Sheet
            </button>
          </div>
        </div>

        {/* 4 Metric Tiles for Round Mechanics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Target Round Size</span>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">$2.5M USD</div>
            <p className="text-[11px] text-slate-400">Post-Money SAFE / Priced Seed</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Funded Runway</span>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">24 Months</div>
            <p className="text-[11px] text-slate-400">Cash breakeven buffer to Series A</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Series A Target</span>
            <div className="text-2xl sm:text-3xl font-bold text-blue-400 tracking-tight">$4.2M ARR</div>
            <p className="text-[11px] text-slate-400">Target milestone at Month 20</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Target Gross Margin</span>
            <div className="text-2xl sm:text-3xl font-bold text-indigo-400 tracking-tight">78% - 82%</div>
            <p className="text-[11px] text-slate-400">Model routing + edge caching</p>
          </div>
        </div>

        {/* Capital Allocation & Milestone Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 relative z-10">
          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-blue-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                Engineering & R&D
              </span>
              <span className="font-mono text-slate-300">55% ($1.38M)</span>
            </div>
            <div className="w-full bg-slate-700/60 rounded-full h-2 overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '55%' }} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Expand core distributed graph compiler, state-machine determinism engines, and private enterprise VPC orchestration nodes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Enterprise GTM & Sales
              </span>
              <span className="font-mono text-slate-300">30% ($750K)</span>
            </div>
            <div className="w-full bg-slate-700/60 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '30%' }} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Targeted enterprise forward-deployed engineering, high-ACV healthcare & fintech customer acquisition, and enterprise proofs-of-concept.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-purple-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Compliance & Security
              </span>
              <span className="font-mono text-slate-300">15% ($375K)</span>
            </div>
            <div className="w-full bg-slate-700/60 rounded-full h-2 overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: '15%' }} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              SOC 2 Type II attestation, ISO 42001 (AI Management), HIPAA BAA legal frameworks, and ongoing zero-day penetration testing.
            </p>
          </div>
        </div>
      </div>

      {/* Snapshot Grid: 4 Core Pillars for Fast Comprehension */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-blue-600 dark:text-blue-400">
            <Layers className="w-4 h-4" />
            <span>COMMERCIAL WEDGE</span>
          </div>
          <h3 className="text-base font-bold text-slate-950 dark:text-white">Dual Revenue Engine</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Fast time-to-value via turnkey SaaS agents (e.g. Scrabyt platform) combined with high-ACV custom AI as a Service platforms.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-4 h-4" />
            <span>UNIT ECONOMICS</span>
          </div>
          <h3 className="text-base font-bold text-slate-950 dark:text-white">Software Gross Margins</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Optimized edge caching and model tiering drive 78%+ software-grade gross margins, decoupling compute costs from user expansion.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-purple-600 dark:text-purple-400">
            <Lock className="w-4 h-4" />
            <span>DEFENSIBILITY</span>
          </div>
          <h3 className="text-base font-bold text-slate-950 dark:text-white">Deterministic Execution IP</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Proprietary stateful graph compiler, sandboxed tool rollback, and zero-leakage security boundaries create enduring technical moats.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-amber-600 dark:text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>DEPLOYMENT REACH</span>
          </div>
          <h3 className="text-base font-bold text-slate-950 dark:text-white">Sovereign & Private VPC</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Deployable on air-gapped infrastructure, private VPCs, and sovereign clouds for regulated healthcare, finance, and industrial sectors.
          </p>
        </div>
      </div>

      {/* Founding Leadership & Technical Pedigree (Crucial for Seed Stage Conviction) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8">
        <div>
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider font-semibold">
            Founding Team & Execution Pedigree
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight mt-1">
            Built by Distributed Systems & Enterprise AI Architects
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-2">
            The team pairs deep algorithmic research in reliable stateful agent graphs with a track record of enterprise scaling at venture-backed tech leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                AK
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">Arjun Kapoor</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Co-Founder & CEO</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ex-Engineering Director, Distributed Systems. Led enterprise infrastructure teams delivering 99.999% availability at scale. Specializes in low-latency runtime compilers and enterprise go-to-market.
            </p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Domain: Systems & GTM</span>
              <span className="text-blue-600 dark:text-blue-400">12+ Yrs Exp</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                ES
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">Elena Sokolova, Ph.D.</h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Co-Founder & CTO</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ph.D. in Machine Learning & Program Synthesis. Author of 14 peer-reviewed publications on deterministic execution and neural verification. Architected our proprietary stateful agent compiler.
            </p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Domain: AI & Formal Methods</span>
              <span className="text-indigo-600 dark:text-indigo-400">Ph.D. ML</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                MR
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">Marcus Vance</h3>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Head of Enterprise Security & InfoSec</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Former Lead Security Auditor & CISO Advisor. Led SOC 2 Type II, FedRAMP, and HIPAA compliance rollouts for multi-billion dollar healthcare SaaS providers.
            </p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Domain: Zero-Trust & InfoSec</span>
              <span className="text-purple-600 dark:text-purple-400">CISSP / CISM</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Investment Thesis */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider font-semibold">
            Investment Thesis
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight mt-1">
            Why We Win in Enterprise AI
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">The Chasm</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Foundation models are cheap commodities. The scarce, high-value layer is production reliability: deterministic state machines, latency management, schema enforcement, and tool failure recovery.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">The Product Wedge</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We lead with high-impact vertical products like the Scrabyt automated intelligence suite to demonstrate measurable ROI immediately, followed by platform expansion across core operations.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">The Capital Efficiency</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our engineering-first distribution model achieves high revenue retention and low customer acquisition costs by directly embedding into existing enterprise infrastructure without long custom consulting cycles.
            </p>
          </div>
        </div>
      </div>

      {/* Confidential Data Room & Due Diligence Deck Access Drawer */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Confidential Due Diligence Vault
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                Access Verified Pitch Deck & Data Room
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                Data Room v2.4 (Q4 Updated)
              </span>
            </div>
          </div>

          {/* Interactive Material Preview Selector */}
          <div className="flex border-b border-slate-800 gap-6 text-xs sm:text-sm">
            <button
              onClick={() => setActiveDeckTab('overview')}
              className={`pb-3 font-semibold transition-colors cursor-pointer border-b-2 ${
                activeDeckTab === 'overview'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Executive Deck (12 Slides)
            </button>
            <button
              onClick={() => setActiveDeckTab('financials')}
              className={`pb-3 font-semibold transition-colors cursor-pointer border-b-2 ${
                activeDeckTab === 'financials'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Unit Economics & Model (3 Yr)
            </button>
            <button
              onClick={() => setActiveDeckTab('tech')}
              className={`pb-3 font-semibold transition-colors cursor-pointer border-b-2 ${
                activeDeckTab === 'tech'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Architectural Whitepaper & IP
            </button>
          </div>

          {/* Tab Previews */}
          {activeDeckTab === 'overview' && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-3">
              <div className="font-semibold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                Included in Executive Deck:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Executive Problem Statement & LLM Production Failure Modes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Product Architecture & Deterministic Orchestration Engine</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Enterprise Customer Case Studies & Production Benchmarks</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> GTM Strategy, Target Accounts, and Expansion Milestones</li>
              </ul>
            </div>
          )}

          {activeDeckTab === 'financials' && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-3">
              <div className="font-semibold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                Included in Financial Model:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 3-Year Bottoms-Up Projections (Headcount, Compute, COGS)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ACV Escalation & Net Revenue Retention (NRR) Sensitivities</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Serverless GPU vs Dedicated VPC Cost Model Break-Evens</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Capital Allocation vs Runaway Scenarios ($2.0M vs $3.0M)</li>
              </ul>
            </div>
          )}

          {activeDeckTab === 'tech' && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-3">
              <div className="font-semibold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                Included in Technical Whitepaper:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Stateful Graph Execution Engine formal verification benchmarks</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Zero-Retention Memory Sandboxing & Enclave Architecture</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Tool Failure Recovery & Schema Guardrails Formal Specifications</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Multi-Cloud VPC Deployment Topology & Security Audits</li>
              </ul>
            </div>
          )}

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenLeadModal('Investor Deck Request')}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-semibold cursor-pointer shadow-lg inline-flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Request Instant Confidential Vault Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenLeadModal('Founder Briefing')}
              className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-medium border border-slate-700 cursor-pointer transition-all inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              Schedule 20-Min Partner Call
            </button>
            <button
              onClick={() => onNavigate('/solutions/ai-as-a-service/scrabyt')}
              className="px-4 py-3.5 text-slate-400 hover:text-white text-xs sm:text-sm font-medium transition-all inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Live Product Proof</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

