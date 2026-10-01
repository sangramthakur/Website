import { AIaaSOffering } from '../types';

export const AIAAS_OFFERINGS: AIaaSOffering[] = [
  {
    id: 'scrabyt',
    name: 'Scrabyt',
    slug: 'scrabyt',
    category: 'Clinical Intelligence OS',
    shortDescription: 'AI-powered clinical intelligence for modern healthcare.',
    longDescription:
      'Scrabyt transforms clinical conversations and healthcare workflows into structured intelligence that can support documentation, prescriptions, billing, follow-ups and operational processes.',
    capabilities: [
      'Clinical Intelligence',
      'AI Documentation',
      'Workflow Automation',
      'Healthcare Operations',
      'Billing Workflows',
      'Patient Follow-up',
      'Operational Intelligence',
    ],
    status: 'live',
    featured: true,
    external: true,
    externalUrl: 'https://www.scrabyt.com/',
    websiteLabel: 'Explore Scrabyt',
    seoTitle: 'Scrabyt | AI as a Service for Clinical Intelligence',
    seoDescription:
      'Discover Scrabyt, an AI-powered clinical intelligence service connecting healthcare conversations, documentation and operational workflows.',
  },
  {
    id: 'enterprise-rag-service',
    name: 'Managed Neural RAG Service',
    slug: 'enterprise-rag-service',
    category: 'Knowledge Retrieval Infrastructure',
    shortDescription:
      'Managed hybrid retrieval and neural reranking service connecting enterprise data repositories to low-latency LLM endpoints.',
    longDescription:
      'A multi-tenant, cloud-managed neural search service that indexes internal wikis, manuals, and databases with automatic PII sanitization and citation provenance.',
    capabilities: [
      'Hybrid Vector & BM25 Search',
      'Neural Cross-Encoder Reranking',
      'Zero-Retention Ingestion',
      'Provenance Verification',
      'Streaming Sub-300ms Search',
    ],
    status: 'coming-soon',
    featured: false,
    external: false,
    websiteLabel: 'Inquire About Preview',
  },
  {
    id: 'high-throughput-inference-gateway',
    name: 'Model Orchestration & Gateway Service',
    slug: 'model-orchestration-service',
    category: 'Inference Infrastructure',
    shortDescription:
      'Global low-latency API gateway delivering semantic caching, multi-model fallback routing, and token cost governance.',
    longDescription:
      'A serverless AI infrastructure service providing unified API endpoints across frontier foundation models with sub-5ms semantic cache hits.',
    capabilities: [
      'Semantic Vector Caching',
      'Multi-Provider Routing',
      'Token Quota Enforcement',
      'Private VPC Peering',
    ],
    status: 'coming-soon',
    featured: false,
    external: false,
    websiteLabel: 'Inquire About Preview',
  },
];

export const getFeaturedAiaasOffering = (): AIaaSOffering | undefined => {
  return AIAAS_OFFERINGS.find((item) => item.featured && item.id === 'scrabyt');
};

export const getAiaasOfferingBySlug = (slug: string): AIaaSOffering | undefined => {
  return AIAAS_OFFERINGS.find((item) => item.slug === slug);
};
