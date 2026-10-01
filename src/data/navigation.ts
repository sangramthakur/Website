export interface NavItem {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Solutions', href: '/solutions', hasMegaMenu: true },
  { label: 'AI Agents', href: '/solutions/ai-agents' },
  { label: 'AI as a Service', href: '/solutions/ai-as-a-service' },
  { label: 'SaaS', href: '/solutions/saas' },
  { label: 'Consulting', href: '/solutions/consulting' },
  { label: 'Insights', href: '/insights', hasMegaMenu: true },
  { label: 'Company', href: '/company', hasMegaMenu: true },
];

export const MEGA_MENU_SOLUTIONS = {
  pillars: [
    {
      title: 'AI as a Service',
      description: 'Production-ready AI capabilities without infrastructure friction.',
      href: '/solutions/ai-as-a-service',
      kicker: 'Platform Pillar 01',
    },
    {
      title: 'AI Agents',
      description: 'Autonomous agents that reason, plan, execute tools, and automate workflows.',
      href: '/solutions/ai-agents',
      kicker: 'Platform Pillar 02',
    },
    {
      title: 'SaaS Products',
      description: 'AI-powered modular applications solving repeatable business challenges.',
      href: '/solutions/saas',
      kicker: 'Platform Pillar 03',
    },
    {
      title: 'AI Consulting & Implementation',
      description: 'From strategy and architecture to custom systems engineering and rollout.',
      href: '/solutions/consulting',
      kicker: 'Platform Pillar 04',
    },
  ],
  featuredAiaas: {
    title: 'Scrabyt',
    subtitle: 'Clinical Intelligence OS',
    status: 'LIVE',
    description: 'AI-powered clinical intelligence connecting conversations with documentation, prescriptions, and billing workflows.',
    href: '/solutions/ai-as-a-service/scrabyt',
    externalUrl: 'https://www.scrabyt.com/',
  },
  customEngineering: [
    { title: 'AI Agent Development', href: '/solutions/custom-ai-development/ai-agent-development' },
    { title: 'Enterprise RAG Systems', href: '/solutions/custom-ai-development/enterprise-rag' },
    { title: 'Generative AI Applications', href: '/solutions/custom-ai-development/generative-ai-applications' },
    { title: 'Predictive & Analytical AI', href: '/solutions/custom-ai-development/predictive-ai' },
    { title: 'Workflow Automation', href: '/solutions/custom-ai-development/workflow-automation' },
  ],
  businessOutcomes: [
    { title: 'Automate Repetitive Work', href: '/solutions/use-cases/automate-work' },
    { title: 'Find Knowledge Faster', href: '/solutions/use-cases/find-knowledge' },
    { title: 'Assist & Augment Decisions', href: '/solutions/use-cases/assist-decisions' },
    { title: 'Predict System Outcomes', href: '/solutions/use-cases/predict-outcomes' },
    { title: 'Orchestrate Business Workflows', href: '/solutions/use-cases/orchestrate-workflows' },
  ],
};

export const MEGA_MENU_INSIGHTS = {
  featuredCategories: [
    { title: 'AI Agents', href: '/insights?category=AI+Agents', desc: 'Autonomous reasoning, memory architectures, and tool orchestration.' },
    { title: 'Enterprise RAG', href: '/insights?category=Enterprise+RAG', desc: 'Hybrid search, vector indexing, reranking, and hallucination reduction.' },
    { title: 'AI as a Service', href: '/insights?category=AI+as+a+Service', desc: 'Inference pipelines, latency reduction, and micro-model deployments.' },
    { title: 'MLOps & Governance', href: '/insights?category=MLOps+%2F+LLMOps', desc: 'Observability, continuous evaluation, and compliance frameworks.' },
  ],
  toolsAndResources: [
    { title: 'AI Readiness Assessment', href: '/resources/ai-readiness-assessment', badge: 'Lead Tool' },
    { title: 'Architectural Comparisons', href: '/comparisons', badge: 'Evaluation' },
    { title: 'Technology & Security Hub', href: '/technology', badge: 'Engineering' },
  ],
};

export const MEGA_MENU_COMPANY = {
  links: [
    { title: 'About the Platform', href: '/company', desc: 'Mission, engineering principles, and core architecture.' },
    { title: 'How We Work', href: '/how-we-work', desc: 'Our 6-phase engineering and delivery methodology.' },
    { title: 'Technology & Security Hub', href: '/technology', desc: 'Architecture, zero-trust security, and responsible governance.' },
    { title: 'Careers', href: '/careers', desc: 'Join our research, distributed systems, and solution teams.' },
    { title: 'Investors', href: '/investors', desc: 'Strategic platform direction and architectural vision.' },
    { title: 'Partners & Ecosystem', href: '/partners', desc: 'Cloud infrastructure and solution integration network.' },
    { title: 'FAQ', href: '/faq', desc: 'Technical, operational, and commercial questions answered.' },
  ],
};
