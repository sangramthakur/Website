import { AssessmentQuestion, AssessmentResultData } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Strategy
  {
    id: 1,
    category: 'Strategy',
    question: 'How clearly defined are your organization\'s commercial and operational AI objectives?',
    options: [
      { label: 'Informal or ad-hoc curiosity without defined business goals', score: 1, explanation: 'Early exploration stage' },
      { label: 'High-level executive interest but lacking quantified business KPIs', score: 2, explanation: 'Emerging mandate' },
      { label: 'Prioritized operational use cases with expected ROI metrics identified', score: 3, explanation: 'Active roadmap' },
      { label: 'Executive-backed AI portfolio integrated directly into corporate strategy', score: 4, explanation: 'Strategic alignment' },
    ],
  },
  {
    id: 2,
    category: 'Strategy',
    question: 'How is AI investment and experimentation funded across business units?',
    options: [
      { label: 'No dedicated budget; grassroots employee experiments only', score: 1, explanation: 'Unfunded' },
      { label: 'Occasional discretionary project budgets from general IT funds', score: 2, explanation: 'Project-based' },
      { label: 'Dedicated annual AI innovation or transformation budget pool', score: 3, explanation: 'Dedicated allocation' },
      { label: 'Sustained institutional capital with clear hurdle rates and ROI tracking', score: 4, explanation: 'Capitalized program' },
    ],
  },
  // Data
  {
    id: 3,
    category: 'Data',
    question: 'Where does your key institutional knowledge and operational data currently reside?',
    options: [
      { label: 'Scattered across unindexed personal drives, inboxes, and local files', score: 1, explanation: 'Siloed & fragmented' },
      { label: 'Central cloud storage (Drive/SharePoint) but largely unstructured and untagged', score: 2, explanation: 'Consolidated but unstructured' },
      { label: 'Clean departmental data warehouses with indexed document repositories', score: 3, explanation: 'Indexed & accessible' },
      { label: 'Unified enterprise data lakehouse with automated vectorization pipelines', score: 4, explanation: 'AI-ready data layer' },
    ],
  },
  {
    id: 4,
    category: 'Data',
    question: 'How structured and clean is your proprietary training and retrieval data?',
    options: [
      { label: 'High rates of duplicate, outdated, and conflicting documentation', score: 1, explanation: 'High noise' },
      { label: 'Periodic manual reviews; significant legacy documentation debt', score: 2, explanation: 'Moderate drift' },
      { label: 'Document lifecycles and authoritative source-of-truth registries exist', score: 3, explanation: 'Curated knowledge' },
      { label: 'Continuous automated validation, deduplication, and chunk provenance tagging', score: 4, explanation: 'Production-grade data pipeline' },
    ],
  },
  // Technology
  {
    id: 5,
    category: 'Technology',
    question: 'What is your current infrastructure maturity regarding modern APIs and microservices?',
    options: [
      { label: 'Legacy monolithic on-premises systems with limited API accessibility', score: 1, explanation: 'Legacy bound' },
      { label: 'Mixed hybrid cloud with partial REST APIs and batch sync integrations', score: 2, explanation: 'Hybrid transitional' },
      { label: 'Cloud-native services with authenticated REST/gRPC endpoints and webhook support', score: 3, explanation: 'Modern connected' },
      { label: 'Event-driven, distributed service mesh designed for low-latency asynchronous calls', score: 4, explanation: 'Autonomous-ready' },
    ],
  },
  {
    id: 6,
    category: 'Technology',
    question: 'What tooling do you use today for machine learning, inference, or LLM evaluation?',
    options: [
      { label: 'None or individual team members using consumer web interfaces (e.g. standard ChatGPT)', score: 1, explanation: 'Consumer-level only' },
      { label: 'Basic API keys without central logging, rate limiting, or cost tracking', score: 2, explanation: 'Ungoverned API calls' },
      { label: 'Centralized model gateway with rate limits, latency metrics, and access controls', score: 3, explanation: 'Managed gateway' },
      { label: 'Full LLMOps pipeline with automated evaluation suites, synthetic regression, and semantic caching', score: 4, explanation: 'Enterprise MLOps' },
    ],
  },
  // Processes
  {
    id: 7,
    category: 'Processes',
    question: 'How documented and standardized are your core operational workflows?',
    options: [
      { label: 'Tribal knowledge; procedures vary widely depending on the individual operator', score: 1, explanation: 'Undocumented' },
      { label: 'Static written standard operating procedures (SOPs) that are rarely updated', score: 2, explanation: 'Static documentation' },
      { label: 'Digitized, standardized workflows with tracked steps and measurable cycle times', score: 3, explanation: 'Standardized workflows' },
      { label: 'Orchestrated dynamic state machines with programmatic error handling and checkpoints', score: 4, explanation: 'Machine-actionable' },
    ],
  },
  {
    id: 8,
    category: 'Processes',
    question: 'What is your process for testing and validating AI outputs before operational deployment?',
    options: [
      { label: 'Informal spot-checking by individual developers or prompt authors', score: 1, explanation: 'Ad-hoc checks' },
      { label: 'Manual staging review with subjective human feedback rubrics', score: 2, explanation: 'Manual QA' },
      { label: 'Standardized golden test datasets with automated precision/recall scoring', score: 3, explanation: 'Automated benchmarks' },
      { label: 'Continuous shadow testing, LLM-as-a-judge evaluation harnesses, and canary rollouts', score: 4, explanation: 'Production evaluation system' },
    ],
  },
  // People
  {
    id: 9,
    category: 'People',
    question: 'What level of internal AI and machine learning engineering expertise exists in your team?',
    options: [
      { label: 'No dedicated technical AI talent on staff', score: 1, explanation: 'No technical depth' },
      { label: 'Generalist software engineers exploring prompt libraries on the side', score: 2, explanation: 'Generalist engineers' },
      { label: 'Dedicated data engineers and applied AI developers building custom applications', score: 3, explanation: 'Applied AI team' },
      { label: 'Cross-functional AI Center of Excellence with systems architects and research engineers', score: 4, explanation: 'Specialized Center of Excellence' },
    ],
  },
  {
    id: 10,
    category: 'People',
    question: 'How receptive is your operational workforce to collaborating with AI agents and automation?',
    options: [
      { label: 'Skepticism, mistrust, or fear of displacement across frontline teams', score: 1, explanation: 'Cultural friction' },
      { label: 'Cautious curiosity with significant training and change management gaps', score: 2, explanation: 'Hesitant adoption' },
      { label: 'Enthusiastic adoption of productivity tools with ongoing enablement workshops', score: 3, explanation: 'Active adoption' },
      { label: 'Mature co-pilot culture where human-in-the-loop agent handoffs are standard operating practice', score: 4, explanation: 'Collaborative culture' },
    ],
  },
  // Governance
  {
    id: 11,
    category: 'Governance',
    question: 'How do you prevent proprietary or sensitive customer data from leaking into foundation models?',
    options: [
      { label: 'No formal controls or written company guidance yet established', score: 1, explanation: 'High risk' },
      { label: 'Written employee policy prohibiting pasting company secrets into web tools', score: 2, explanation: 'Policy-only' },
      { label: 'Zero-data-retention enterprise API agreements and network-level inspection gates', score: 3, explanation: 'Contractual & network isolation' },
      { label: 'Automated pre-inference PII redactors, prompt firewalls, and immutable cryptographic audit logs', score: 4, explanation: 'Zero-trust governance layer' },
    ],
  },
  {
    id: 12,
    category: 'Governance',
    question: 'How are ethical standards, bias detection, and algorithmic transparency managed?',
    options: [
      { label: 'Not currently evaluated or audited', score: 1, explanation: 'Unaudited' },
      { label: 'Addressed ad-hoc only if an adverse incident or user complaint arises', score: 2, explanation: 'Reactive posture' },
      { label: 'Defined responsible AI framework with review committees for high-impact models', score: 3, explanation: 'Formal review board' },
      { label: 'Continuous automated guardrail evaluation with deterministic safety boundaries and source attribution', score: 4, explanation: 'Enforced algorithmic safeguards' },
    ],
  },
  // Processes / Strategy bonus
  {
    id: 13,
    category: 'Strategy',
    question: 'What is your timeline for moving AI prototypes into high-scale production systems?',
    options: [
      { label: 'No committed timeline; exploratory only', score: 1, explanation: 'Undefined timeframe' },
      { label: '6 to 12 months for initial pilot projects', score: 2, explanation: 'Moderate horizon' },
      { label: '1 to 3 months for prioritized pilot rollouts', score: 3, explanation: 'Urgent execution' },
      { label: 'Currently in production with active need to scale and stabilize infrastructure', score: 4, explanation: 'Production scaling' },
    ],
  },
  {
    id: 14,
    category: 'Technology',
    question: 'How do you handle latency and uptime guarantees for customer-facing AI interactions?',
    options: [
      { label: 'Standard commercial consumer endpoints with no uptime guarantees', score: 1, explanation: 'Unpredictable SLA' },
      { label: 'Direct single-vendor API keys without failover routing', score: 2, explanation: 'Single point of failure' },
      { label: 'Multi-region deployments with basic health checks and retry queues', score: 3, explanation: 'Redundant setup' },
      { label: 'Multi-provider active-active routing, semantic caching, and strict sub-500ms p95 SLAs', score: 4, explanation: 'Enterprise resilience' },
    ],
  },
  {
    id: 15,
    category: 'Data',
    question: 'What is your capability to trace exactly why an AI system produced a specific output?',
    options: [
      { label: 'Completely black-box; impossible to trace source or reasoning', score: 1, explanation: 'Opaque' },
      { label: 'Manual review of raw chat logs after the fact', score: 2, explanation: 'Manual log inspection' },
      { label: 'Prompt version history and retrieved document chunk IDs saved with completion records', score: 3, explanation: 'Basic provenance' },
      { label: 'Full execution graph tracing with prompt hash, temperature, chunk vectors, and confidence metrics recorded in telemetry', score: 4, explanation: 'Cryptographic provenance' },
    ],
  },
];

export function calculateReadiness(answers: Record<number, number>): AssessmentResultData {
  let totalScoreSum = 0;
  let maxPossibleScore = ASSESSMENT_QUESTIONS.length * 4;

  const categories: Array<'Strategy' | 'Data' | 'Technology' | 'Processes' | 'People' | 'Governance'> = [
    'Strategy',
    'Data',
    'Technology',
    'Processes',
    'People',
    'Governance',
  ];

  const categoryTotals: Record<string, { sum: number; count: number }> = {};
  categories.forEach((cat) => {
    categoryTotals[cat] = { sum: 0, count: 0 };
  });

  ASSESSMENT_QUESTIONS.forEach((q) => {
    const chosenScore = answers[q.id] || 1;
    totalScoreSum += chosenScore;
    if (categoryTotals[q.category]) {
      categoryTotals[q.category].sum += chosenScore;
      categoryTotals[q.category].count += 1;
    }
  });

  const overallScore = Math.round((totalScoreSum / maxPossibleScore) * 100);

  const categoryScores: any = {};
  categories.forEach((cat) => {
    const { sum, count } = categoryTotals[cat];
    categoryScores[cat] = Math.round((sum / (count * 4)) * 100);
  });

  let maturityLevel: 'Exploratory' | 'Foundational' | 'Operational' | 'Transformational' = 'Exploratory';
  let interpretation = '';

  if (overallScore < 40) {
    maturityLevel = 'Exploratory';
    interpretation = 'Your organization is in early experimentation. While curiosity is high, foundational investments in unified data architecture, security guardrails, and standardized workflows are recommended before scaling complex autonomous systems.';
  } else if (overallScore < 65) {
    maturityLevel = 'Foundational';
    interpretation = 'You have established key building blocks including initial cloud architecture and executive interest. The immediate priority is moving beyond fragile prototypes toward governed API gateways, hybrid RAG pipelines, and deterministic evaluation benchmarks.';
  } else if (overallScore < 85) {
    maturityLevel = 'Operational';
    interpretation = 'Your organization possesses strong technical foundations and modern service connectivity. You are ideally positioned to deploy autonomous AI agents, multi-agent workflow orchestration, and managed AI as a Service across core operations.';
  } else {
    maturityLevel = 'Transformational';
    interpretation = 'Exceptional readiness across technical infrastructure, zero-trust governance, and organizational alignment. You are prepared to deploy frontier autonomous execution graphs and custom fine-tuned models at enterprise scale.';
  }

  const strengths: string[] = [];
  const gaps: string[] = [];

  categories.forEach((cat) => {
    if (categoryScores[cat] >= 70) {
      strengths.push(`High ${cat} readiness (${categoryScores[cat]}% score): strong foundational capabilities in place.`);
    } else if (categoryScores[cat] <= 50) {
      gaps.push(`${cat} requires reinforcement (${categoryScores[cat]}% score): prioritize standardization and infrastructure hardening.`);
    }
  });

  if (strengths.length === 0) {
    strengths.push('High organizational ambition and early clarity on operational pain points.');
  }
  if (gaps.length === 0) {
    gaps.push('Maintain continuous evaluation testing to protect against latency drift and edge-case hallucination.');
  }

  const recommendations = [
    'Establish centralized model governance and zero-data-retention API boundaries.',
    'Implement a hybrid RAG architecture (dense vector + sparse BM25) for institutional knowledge retrieval.',
    'Pilot stateful AI agents on bounded, repetitive operational queues before expanding to cross-system orchestration.',
    'Create automated golden evaluation benchmark suites to measure precision and latency on real business tasks.',
  ];

  return {
    overallScore,
    categoryScores,
    maturityLevel,
    interpretation,
    strengths,
    gaps,
    recommendations,
  };
}
