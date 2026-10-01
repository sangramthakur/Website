import React, { useState } from 'react';
import {
  ArrowRight,
  Shield,
  Layers,
  Cpu,
  Lock,
  CheckCircle2,
  Workflow,
  Server,
  Zap,
  ChevronRight,
  Database,
  Terminal,
} from 'lucide-react';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface SolutionDetailProps {
  slug: string;
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const SolutionDetailPage: React.FC<SolutionDetailProps> = ({
  slug,
  onNavigate,
  onOpenLeadModal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'value' | 'architecture' | 'security'>('overview');

  // Map slug to detail configuration
  const getSolutionData = (s: string) => {
    switch (s) {
      case 'ai-agents':
        return {
          title: 'Autonomous AI Agents',
          pillarTag: 'Commercial Pillar 02',
          tagline: 'Stateful reasoning, dynamic tool invocation, and autonomous task execution.',
          description:
            'Autonomous AI Agents move beyond prompt-completion chat. Designed around cyclical state machines, our agents decompose objectives into discrete tasks, evaluate confidence scores, execute sandboxed external tools, and handle errors gracefully.',
          businessValue: [
            {
              title: 'Reclaim Operational Bandwidth',
              description: 'Delegate multi-step ticket triage, data extraction, and cross-system reconciliation to agents operating 24/7 with zero fatigue.',
            },
            {
              title: 'Drastic Reduction in Turnaround Latency',
              description: 'Compress multi-department approval and verification handoffs from 48 hours to under 3 minutes.',
            },
            {
              title: 'Auditable Execution Trails',
              description: 'Every tool invocation, intermediate reasoning step, and state transition is cryptographically logged for governance audits.',
            },
          ],
          architecturePrims: [
            { name: 'State Graph Engine', desc: 'LangGraph & Actor model for branching cyclical logic with deterministic checkpoints.' },
            { name: 'Sandboxed Tool Execution', desc: 'Isolated containerized runtimes for executing Python, SQL, REST APIs, and bash tools safely.' },
            { name: 'Persistent Memory Bank', desc: 'Episodic and semantic memory stores allowing agents to maintain operational context across sessions.' },
            { name: 'Human-in-the-Loop Gates', desc: 'Deterministic policy gates halting autonomous execution whenever action impact requires human sign-off.' },
          ],
          securityPoints: [
            'Zero-trust tool authentication using ephemeral scoped access tokens.',
            'Deterministic prompt injection firewalls inspecting tool inputs and outputs.',
            'Strict per-tenant rate-limiting and maximum step budgets to prevent runaway token spend.',
            'Encrypted persistent state storage with customer-managed encryption keys (CMEK).',
          ],
        };

      case 'ai-as-a-service':
        return {
          title: 'AI as a Service',
          pillarTag: 'Commercial Pillar 01',
          tagline: 'Production-ready AI capabilities without building or managing GPU clusters.',
          description:
            'Access high-performance model inference, managed hybrid RAG, semantic vector caching, and automated token routing through hardened, low-latency API endpoints backed by enterprise SLAs.',
          businessValue: [
            {
              title: 'Immediate Time-to-Market',
              description: 'Integrate state-of-the-art multimodal reasoning into your products within days, skipping months of infrastructure R&D.',
            },
            {
              title: 'Drastic Inference Cost Optimization',
              description: 'High-speed semantic caching and dynamic complexity-based model routing reduce raw token expenditure by 35% to 60%.',
            },
            {
              title: '99.99% Availability & Predictable Latency',
              description: 'Active-active multi-region failover ensures your customer-facing applications never suffer provider outages.',
            },
          ],
          architecturePrims: [
            { name: 'Inference Proxy Gateway', desc: 'Sub-5ms overhead edge routing layer with per-tenant rate limits and authentication.' },
            { name: 'Semantic Response Cache', desc: 'In-memory vector store matching incoming prompt semantics to return cached completions instantly.' },
            { name: 'Dynamic Model Router', desc: 'Heuristic complexity classifier routing straightforward requests to distilled models and complex queries to frontier models.' },
            { name: 'Hybrid Embedding Engine', desc: 'Managed dense vector and sparse lexical index pipelines updated in near real-time.' },
          ],
          securityPoints: [
            'Strict zero-data-retention policy guaranteed contractually for all inference calls.',
            'Pre-inference PII redactor sanitizing customer credentials and identifiers automatically.',
            'VPC peering and private service connects into Google Cloud or AWS networks.',
            'FIPS 140-2 validated encryption in transit and at rest.',
          ],
        };

      case 'saas':
        return {
          title: 'SaaS Products & Applications',
          pillarTag: 'Commercial Pillar 03',
          tagline: 'Modular, AI-powered software designed to solve repeatable enterprise business challenges.',
          description:
            'Our suite of turnkey software products combines domain-optimized foundation models with modern workflow interfaces, allowing business units to deploy immediate automation with minimal technical overhead.',
          businessValue: [
            {
              title: 'Immediate Turnkey Utility',
              description: 'Pre-packaged business solutions with out-of-the-box integrations for ERPs, document management, and ticketing queues.',
            },
            {
              title: 'Modular Customization',
              description: 'Configure prompt templates, confidence thresholds, and review workflows without writing backend code.',
            },
            {
              title: 'Continuous Model Upgrades',
              description: 'Benefit automatically from newly released frontier models without re-engineering your internal codebase.',
            },
          ],
          architecturePrims: [
            { name: 'Multi-Tenant Isolation', desc: 'Strict database and cache tenant partitioning ensuring zero data contamination across organizations.' },
            { name: 'Webhook & Event Bus', desc: 'Idempotent bi-directional event subscribers connecting SaaS events to internal systems.' },
            { name: 'Enterprise Identity Hub', desc: 'Turnkey SAML 2.0 and OIDC single sign-on with SCIM automated user provisioning.' },
            { name: 'Configurable Confidence Engine', desc: 'Rules engine routing low-confidence model inferences into human review queues.' },
          ],
          securityPoints: [
            'Dedicated encryption keys per enterprise tenant (BYOK support available).',
            'Full audit logging tracking every document access and inference event.',
            'Regular automated static code analysis and third-party penetration testing.',
            'Strict role-based access control (RBAC) supporting granular departmental scoping.',
          ],
        };

      default:
        return {
          title: 'AI Consulting & Implementation',
          pillarTag: 'Commercial Pillar 04',
          tagline: 'End-to-end engineering partnership from strategic discovery to enterprise scale.',
          description:
            'We partner directly with enterprise CTOs and engineering leadership to evaluate feasibility, design distributed architectures, train or fine-tune models, and deploy production AI systems.',
          businessValue: [
            {
              title: 'De-Risked AI Investments',
              description: 'Rigorous 2-week feasibility proof-of-concepts before committing capital to long-term infrastructure rollouts.',
            },
            {
              title: 'Accelerated Engineering Velocity',
              description: 'Embed senior distributed systems and AI research engineers directly with your core technical teams.',
            },
            {
              title: 'Intellectual Property Ownership',
              description: 'All custom weights, orchestration pipelines, and proprietary integrations remain 100% owned by your enterprise.',
            },
          ],
          architecturePrims: [
            { name: 'Systems Discovery Framework', desc: 'Comprehensive audit of internal data schemas, API readiness, and operational bottlenecks.' },
            { name: 'Custom Fine-Tuning Pipelines', desc: 'Parameter-efficient LoRA adapters and custom domain embeddings aligned to corporate vocabularies.' },
            { name: 'Production Evaluation Harness', desc: 'Automated regression test suites measuring hallucination rates, precision, and latency.' },
            { name: 'Enterprise Rollout Playbooks', desc: 'Blue/green deployment patterns with shadow inference testing and automated rollback triggers.' },
          ],
          securityPoints: [
            'Architecture reviews aligned to NIST AI Risk Management Framework.',
            'Customer-managed VPC deployments keeping data within your network perimeter.',
            'Confidentiality protocols safeguarding proprietary internal datasets and IP.',
            'Continuous monitoring for model drift and adversarial vulnerabilities.',
          ],
        };
    }
  };

  const data = getSolutionData(slug);

  return (
    <div className="py-12 sm:py-16">
      <SeoHead
        title={`${data.title} – Enterprise Solutions`}
        description={data.description}
        canonicalPath={`/solutions/${slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Solutions', href: '/solutions' },
            { label: data.title },
          ]}
          onNavigate={onNavigate}
        />

        {/* Hero Section */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>{data.pillarTag}</span>
            <span aria-hidden="true">·</span>
            <span>ENTERPRISE SPECIFICATION</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            {data.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {data.tagline}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenLeadModal(`Solution: ${data.title}`)}
              className="px-6 py-3 bg-slate-900 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500 text-white dark:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
            >
              <span>Talk to a Solutions Architect</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('/resources/ai-readiness-assessment')}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
            >
              Check Organizational Readiness
            </button>
          </div>
        </div>

        {/* Progressively Disclosed Tabs (Overview, Business Value, Architecture, Security) */}
        <div className="border-b border-slate-200 dark:border-slate-800">
          <nav className="flex space-x-8" aria-label="Solution Tabs">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'value', label: 'Business Value' },
              { id: 'architecture', label: 'Architecture & Primitives' },
              { id: 'security', label: 'Security & Trust' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="pt-4">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  System Overview
                </h2>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {data.description}
                </p>
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
                  <span className="text-xs font-mono uppercase text-slate-400">
                    Target Deployment Context
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Designed for high-throughput environments where unverified hallucinations or unpredictable latency carry real operational liability. Operates across hybrid cloud, private VPCs, and serverless edge runtimes.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <div className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-semibold">
                  Engineering Primitives
                </div>
                <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                  {data.architecturePrims.map((prim) => (
                    <li key={prim.name} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block">{prim.name}</span>
                        <span className="text-slate-500 dark:text-slate-400">{prim.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'value' && (
            <div className="space-y-6 max-w-4xl">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Measurable Business Outcomes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {data.businessValue.map((val, idx) => (
                  <div
                    key={val.title}
                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
                  >
                    <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">
                      Outcome 0{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {val.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-8">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Technical Architecture & Component Flow
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Progressively disclosed architectural specifications for systems engineers and enterprise architects.
                </p>
              </div>

              {/* Interactive Architecture Diagram Component */}
              <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-white font-mono text-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <span className="text-slate-400">DATA PIPELINE & INFERENCE TOPOLOGY</span>
                  <span className="text-emerald-400">STATE: VERIFIED</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 space-y-2">
                    <span className="text-[10px] text-blue-400">STAGE 1</span>
                    <div className="font-bold text-slate-100">Ingestion Gateway</div>
                    <div className="text-[10px] text-slate-400">PII Redaction · Token Limiter</div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 space-y-2">
                    <span className="text-[10px] text-cyan-400">STAGE 2</span>
                    <div className="font-bold text-slate-100">Semantic Router</div>
                    <div className="text-[10px] text-slate-400">Cache Match · Complexity Scoring</div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 space-y-2">
                    <span className="text-[10px] text-indigo-400">STAGE 3</span>
                    <div className="font-bold text-slate-100">State Execution Loop</div>
                    <div className="text-[10px] text-slate-400">Tool Sandboxes · Vector Context</div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 space-y-2">
                    <span className="text-[10px] text-emerald-400">STAGE 4</span>
                    <div className="font-bold text-slate-100">Audit & Dispatch</div>
                    <div className="text-[10px] text-slate-400">Schema Validation · Provenance Log</div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 text-center">
                  Sub-500ms p95 execution latency across distributed edge nodes.
                </div>
              </div>

              {/* Primitives Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.architecturePrims.map((prim) => (
                  <div
                    key={prim.name}
                    className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  >
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {prim.name}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {prim.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 max-w-4xl">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Zero-Trust Security & Compliance Posture
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {data.securityPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3"
                  >
                    <Shield className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const SolutionsHubPage: React.FC<{
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}> = ({ onNavigate, onOpenLeadModal }) => {
  return (
    <div className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SeoHead
        title="Solutions Architecture – Enterprise AI Platform"
        description="Explore commercial pillars, custom engineering solutions, and problem-led AI implementations."
        canonicalPath="/solutions"
      />

      <div className="max-w-3xl space-y-4">
        <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Enterprise Solutions Portfolio
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Practical AI engineered for business capability.
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Inspect our four core commercial pillars or explore custom engineering frameworks tailored to your operational architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: 'AI as a Service',
            slug: 'ai-as-a-service',
            desc: 'Access production-ready AI capabilities without building everything from scratch.',
            tags: ['Managed APIs', 'Hybrid RAG', 'Low-Latency Inference'],
          },
          {
            title: 'AI Agents',
            slug: 'ai-agents',
            desc: 'Intelligent agents that reason, use tools and execute business workflows.',
            tags: ['Workflow Agents', 'Sandboxed Tools', 'Multi-Agent Mesh'],
          },
          {
            title: 'SaaS Products',
            slug: 'saas',
            desc: 'AI-powered software designed to solve repeatable business problems.',
            tags: ['Turnkey Software', 'Tenant Isolation', 'SSO/SAML'],
          },
          {
            title: 'Consulting & Implementation',
            slug: 'consulting',
            desc: 'From AI strategy to deployment, integration and continuous improvement.',
            tags: ['Architecture Discovery', 'Evaluation Suites', 'VPC Rollout'],
          },
        ].map((sol) => (
          <div
            key={sol.slug}
            className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 transition-all flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{sol.title}</h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {sol.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {sol.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4">
              <button
                onClick={() => onNavigate(`/solutions/${sol.slug}`)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>View Solution Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
