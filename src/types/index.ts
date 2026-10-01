export type ThemeMode = 'light' | 'dark';

export type PillarId = 'ai-as-a-service' | 'ai-agents' | 'saas' | 'consulting';

export interface CommercialPillar {
  id: PillarId;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  ctaText: string;
  ctaHref: string;
  metricsKicker: string;
  architectureHighlight: string;
}

export interface BusinessProblem {
  id: string;
  title: string;
  description: string;
  outcome: string;
  suggestedPillar: PillarId;
  route: string;
  capabilities: string[];
}

export interface TechnicalCapability {
  id: string;
  title: string;
  summary: string;
  technicalStack: string[];
  primaryUse: string;
  route: string;
}

export interface SaaSProductItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  category: 'Workflow Intelligence' | 'Knowledge Retrieval' | 'Autonomous Operations' | 'Model Orchestration';
  status: 'Alpha' | 'Beta' | 'Preview' | 'Active Development';
  heroVisual: string;
  capabilities: string[];
  useCases: string[];
  cta: string;
  seoTitle: string;
  seoDescription: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
  };
  publicationDate: string;
  updatedDate: string;
  category: 'AI Agents' | 'AI as a Service' | 'Enterprise RAG' | 'Automation' | 'AI Strategy' | 'MLOps / LLMOps' | 'Governance';
  tags: string[];
  buyerStage: 'Learn' | 'Evaluate' | 'Compare' | 'Implement';
  readTime: string;
  body: string[];
  relatedSolutions: { title: string; href: string }[];
  seoTitle: string;
  seoDescription: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: 'AI Research & Engineering' | 'Distributed Systems' | 'Product & Solutions' | 'Security & Governance';
  location: string;
  workModel: 'Remote-first' | 'Hybrid' | 'On-site';
  employmentType: 'Full-time' | 'Contract';
  description: string;
  requirements: string[];
  publishedStatus: 'Open' | 'Interviewing';
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Company' | 'AI as a Service' | 'SaaS' | 'AI Agents' | 'Consulting' | 'Security' | 'Privacy' | 'Deployment' | 'Integration' | 'Getting Started';
}

export interface AssessmentQuestion {
  id: number;
  category: 'Strategy' | 'Data' | 'Technology' | 'Processes' | 'People' | 'Governance';
  question: string;
  options: {
    label: string;
    score: number; // 1 to 4
    explanation: string;
  }[];
}

export interface AssessmentResultData {
  overallScore: number;
  categoryScores: {
    Strategy: number;
    Data: number;
    Technology: number;
    Processes: number;
    People: number;
    Governance: number;
  };
  maturityLevel: 'Exploratory' | 'Foundational' | 'Operational' | 'Transformational';
  interpretation: string;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
}

export type LeadSource =
  | 'Organic Search'
  | 'Direct'
  | 'Referral'
  | 'LinkedIn'
  | 'Google Ads'
  | 'Newsletter'
  | 'AI Readiness Assessment'
  | 'Chatbot'
  | 'Contact Form'
  | 'Demo'
  | 'Consultation';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Meeting Booked'
  | 'Proposal'
  | 'Won'
  | 'Lost';

export interface LeadRecord {
  lead_id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  job_title?: string;
  lead_source: LeadSource;
  landing_page: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  interest: string;
  business_problem: string;
  assessment_score?: number;
  assessment_categories?: Record<string, number>;
  lead_status: LeadStatus;
  owner?: string;
  notes?: string;
  last_contact?: string;
  deal_value?: number;
}

export interface ComparisonItem {
  slug: string;
  title: string;
  subtitle: string;
  optionA: string;
  optionB: string;
  summary: string;
  tradeoffs: {
    criteria: string;
    optionAAssessment: string;
    optionBAssessment: string;
    recommendation: string;
  }[];
  bestForA: string[];
  bestForB: string[];
}

export type AIaaSOffering = {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  longDescription?: string;
  capabilities: string[];
  status: 'live' | 'coming-soon';
  featured: boolean;
  external: boolean;
  externalUrl?: string;
  websiteLabel?: string;
  seoTitle?: string;
  seoDescription?: string;
};
