import { FaqItem } from '../types';

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Company',
    question: 'What is the core focus of the platform?',
    answer: 'We design, build, and deploy practical enterprise AI systems that solve real operational bottlenecks. Our offerings span four commercial pillars: AI as a Service, Autonomous AI Agents, SaaS Products, and Strategic Implementation Consulting. We are industry-agnostic, organizing our work around measurable business outcomes.',
  },
  {
    category: 'Company',
    question: 'How do you handle enterprise intellectual property and data ownership?',
    answer: 'Your data and intellectual property remain 100% yours. Customer inputs, vector embeddings, fine-tuned weights, and execution logs are never shared across tenants, and are never used to train public foundation models.',
  },
  {
    category: 'AI as a Service',
    question: 'What does AI as a Service include?',
    answer: 'It provides enterprise-grade, managed API endpoints for low-latency foundation model inference, hybrid retrieval-augmented generation (RAG), embedding generation, semantic caching, and dynamic token-rate throttling without requiring you to manage GPU clusters.',
  },
  {
    category: 'AI as a Service',
    question: 'How does semantic caching lower inference costs?',
    answer: 'Semantic caching analyzes the vector distance of incoming queries against a high-speed in-memory store. Highly similar queries can return cached verified completions in sub-5ms latency, eliminating redundant expensive LLM inference passes.',
  },
  {
    category: 'AI Agents',
    question: 'What differentiates an AI Agent from a basic chatbot?',
    answer: 'A chatbot typically produces conversational answers to single prompts. An AI Agent operates cyclically: it analyzes complex high-level objectives, decomposes them into subtasks, invokes sandboxed external tools (APIs, databases, systems), inspects execution results, recovers from errors, and executes end-to-end workflows.',
  },
  {
    category: 'AI Agents',
    question: 'How do you ensure AI agents do not enter runaway loops or make unapproved actions?',
    answer: 'Every agent runs inside a deterministic state machine with strict step budgets, maximum execution tokens, and hard tool constraints. Critical actions (e.g. initiating payments or deleting records) enforce mandatory human-in-the-loop authorization gates.',
  },
  {
    category: 'SaaS',
    question: 'Are SaaS products customizable for our internal workflows?',
    answer: 'Yes. Our SaaS software is built on an extensible modular architecture with webhook listeners, custom prompt templating, configurable confidence thresholds, and enterprise identity integration (SSO/SAML).',
  },
  {
    category: 'Consulting',
    question: 'What does an AI Consulting engagement entail?',
    answer: 'We provide senior architectural guidance across our 6-phase engineering lifecycle: Discover, Define, Design, Build, Deploy, and Improve. We evaluate technical feasibility, benchmark model performance, develop production prototypes, and partner through enterprise integration.',
  },
  {
    category: 'Security',
    question: 'What security standards are applied to inference and data in transit?',
    answer: 'All data is encrypted in transit using TLS 1.3 and at rest with AES-256. We enforce strict role-based access control (RBAC), tenant boundary isolation, and pre-inference sanitization to detect and block prompt injection attempts.',
  },
  {
    category: 'Privacy',
    question: 'How is personally identifiable information (PII) handled?',
    answer: 'Our ingestion gateway includes automated pre-inference PII redactors. Sensitive fields (Social Security numbers, payment cards, national IDs) are masked or tokenized before entering model context windows.',
  },
  {
    category: 'Deployment',
    question: 'Where can your systems be deployed?',
    answer: 'We support flexible deployment architectures including Google Cloud Platform, Firebase App Hosting, multi-cloud VPCs, and customer-managed private cloud environments depending on compliance requirements.',
  },
  {
    category: 'Integration',
    question: 'Which enterprise business systems do you integrate with?',
    answer: 'Our platform interfaces via standard REST/gRPC APIs, webhooks, and secure message brokers. We routinely connect to enterprise CRM, ERP, ticketing, document repositories, and communication hubs.',
  },
  {
    category: 'Getting Started',
    question: 'What is the recommended first step for evaluating the platform?',
    answer: 'We recommend taking our interactive AI Readiness Assessment to benchmark your organizational maturity across strategy, data, technology, and governance. Alternatively, contact our engineering team to book an architecture discovery discussion.',
  },
];
