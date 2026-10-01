import { ComparisonItem } from '../types';

export const COMPARISONS: ComparisonItem[] = [
  {
    slug: 'ai-agents-vs-traditional-automation',
    title: 'AI Agents vs. Traditional Rule-Based Automation',
    subtitle: 'A balanced comparison of deterministic RPA and autonomous, reasoning-driven agent systems.',
    optionA: 'AI Agents',
    optionB: 'Traditional Automation (RPA/Scripts)',
    summary: 'While traditional Robotic Process Automation (RPA) excels at rigid, unchanging procedural tasks, AI agents handle ambiguity, unstructured data, and dynamic operational exceptions.',
    tradeoffs: [
      {
        criteria: 'Tolerance to Unstructured Data',
        optionAAssessment: 'High. Can parse messy PDFs, emails, unstructured conversations, and raw sensor logs.',
        optionBAssessment: 'Low. Breaks if fields move, CSS selectors change, or document layout deviates.',
        recommendation: 'Use AI Agents when inputs vary continuously across suppliers or channels.',
      },
      {
        criteria: 'Execution Determinism',
        optionAAssessment: 'Probabilistic. Requires confidence gating, verification schemas, and human fallback.',
        optionBAssessment: '100% Deterministic. Executes exact predetermined bytecode without deviation.',
        recommendation: 'Use Traditional Automation for rigid double-entry accounting ledgers where variation is forbidden.',
      },
      {
        criteria: 'Maintenance Overhead',
        optionAAssessment: 'Moderate. Requires evaluation benchmark suites and prompt drift monitoring.',
        optionBAssessment: 'High. Requires constant script rewrites whenever underlying UI screens change.',
        recommendation: 'Evaluate total lifecycle maintenance costs rather than initial script development time.',
      },
    ],
    bestForA: [
      'Customer support triage and multi-system ticket resolution',
      'Vendor invoice reconciliation across hundreds of irregular formats',
      'Dynamic research, document synthesis, and scenario drafting',
    ],
    bestForB: [
      'Exact database-to-database nightly batch syncs',
      'Fixed-format payroll calculations governed by strict statutory rules',
      'Simple programmatic cron jobs with static endpoints',
    ],
  },
  {
    slug: 'rag-vs-fine-tuning',
    title: 'Enterprise RAG vs. Model Fine-Tuning',
    subtitle: 'Choosing between dynamic knowledge retrieval and behavioral weight adaptation.',
    optionA: 'Enterprise RAG (Retrieval-Augmented Generation)',
    optionB: 'Model Fine-Tuning (LoRA / Full Parameter)',
    summary: 'RAG injects external proprietary data at inference time; fine-tuning modifies the model weights to instill specific styles, vocabularies, or reasoning patterns.',
    tradeoffs: [
      {
        criteria: 'Knowledge Freshness & Updatability',
        optionAAssessment: 'Instant. Update your vector database and new knowledge is live within seconds.',
        optionBAssessment: 'Slow. Updating factual knowledge requires retraining and re-evaluating the model.',
        recommendation: 'Choose RAG for fast-evolving internal documents, policies, and operational catalogs.',
      },
      {
        criteria: 'Hallucination Mitigation & Provenance',
        optionAAssessment: 'Verifiable. Every statement can cite specific source document chunk IDs.',
        optionBAssessment: 'Opaque. Factual recall from weights cannot guarantee exact source attribution.',
        recommendation: 'Choose RAG whenever legal or operational audits require verifiable source citations.',
      },
      {
        criteria: 'Style, Format, and Tone Adherence',
        optionAAssessment: 'Prompt-dependent. Requires detailed system prompts in every context window.',
        optionBAssessment: 'Native. Weights internalize complex corporate syntax and shorthand effortlessly.',
        recommendation: 'Choose Fine-Tuning when teaching models specialized symbolic languages or domain jargon.',
      },
    ],
    bestForA: [
      'Corporate knowledge bases and wikis with frequent revisions',
      'Customer support over product manuals and warranty documents',
      'Regulatory compliance interrogation requiring verbatim citations',
    ],
    bestForB: [
      'Domain-specific code generation in proprietary internal languages',
      'Strict structured output classification where prompt tokens must be minimized',
      'Ultra-low-latency classification tasks where retrieval roundtrips are unacceptable',
    ],
  },
  {
    slug: 'build-vs-buy-ai',
    title: 'Build In-House vs. Partner with Managed AI Platforms',
    subtitle: 'Evaluating engineering opportunity costs, talent acquisition, and time-to-production.',
    optionA: 'Managed AI Platform / Implementation Partner',
    optionB: 'In-House AI Engineering from Scratch',
    summary: 'Building custom AI stacks from the metal provides complete control but demands specialized distributed systems talent, MLOps tooling, and prolonged R&D cycles.',
    tradeoffs: [
      {
        criteria: 'Time-to-Production',
        optionAAssessment: 'Weeks to a few months. Pre-built infrastructure, connectors, and evaluation pipelines.',
        optionBAssessment: '9 to 18 months. Building evaluation harnesses, vector infrastructure, and serving layers.',
        recommendation: 'Partner when rapid operational ROI is required to capture market windows.',
      },
      {
        criteria: 'Talent & CapEx Commitment',
        optionAAssessment: 'Predictable OpEx. No need to recruit rare PhD-level ML infrastructure engineers.',
        optionBAssessment: 'High fixed payroll and upfront reserved GPU cluster commitments.',
        recommendation: 'Build in-house only if core AI model architecture IS your primary commercial product.',
      },
      {
        criteria: 'IP Ownership and Customization',
        optionAAssessment: 'High when built on open standards, decoupled data stores, and customer-owned tenant isolation.',
        optionBAssessment: '100% proprietary ownership of internal codebase.',
        recommendation: 'Ensure your platform partner provides clear architecture off-ramps and data ownership.',
      },
    ],
    bestForA: [
      'Enterprises modernizing core operations without diverting primary software engineers',
      'Mid-market leaders needing battle-tested security, SOC2-ready patterns, and quick delivery',
      'Teams wanting rapid prototyping that scales cleanly into production',
    ],
    bestForB: [
      'Deep-tech startups developing novel foundation model architectures',
      'Institutions operating air-gapped sovereign data centers with strict regulatory bans on external software',
    ],
  },
];
