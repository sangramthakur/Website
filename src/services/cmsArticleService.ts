import { InsightArticle, GeoMetrics } from '../types';
import { INSIGHT_ARTICLES } from '../data/articles';

const STORAGE_KEY = 'apex_enterprise_cms_articles';

export const SEED_CMS_ARTICLES: InsightArticle[] = [
  {
    id: 'art-geo-01',
    title: 'Generative Engine Optimization (GEO): How to Rank and Get Cited in Perplexity, ChatGPT Search, and AI Overviews',
    slug: 'generative-engine-optimization-geo-llmo-guide',
    excerpt: 'Traditional 10 blue links SEO is being replaced by Generative Engine Optimization (GEO). Learn how to structure direct answers, semantic entities, and technical proof to dominate AI citations.',
    author: {
      name: 'Search Intelligence & LLMO Practice',
      role: 'Growth & Semantic Engineering Team',
    },
    publicationDate: '2026-09-18',
    updatedDate: '2026-10-04',
    category: 'Generative Engine Optimization (GEO)',
    tags: ['GEO', 'LLMO', 'Perplexity Citation', 'Google AI Overviews', 'ChatGPT Search', 'Schema Markup'],
    buyerStage: 'Implement',
    readTime: '9 min read',
    status: 'Published',
    directAnswerSnippet:
      'Generative Engine Optimization (GEO) is the discipline of structuring web content, statistical data, and semantic schema so Large Language Model search engines (Perplexity, ChatGPT Search, Gemini, and Google AI Overviews) extract, synthesize, and cite the source as an authoritative primary reference.',
    keyTakeaways: [
      'GEO prioritizes information gain and numerical precision over keyword repetition.',
      'Perplexity citations require direct 40–60 word answer blocks directly beneath H2 headers.',
      'Rich JSON-LD schemas (TechArticle, FAQPage) boost AI crawler confidence by up to 3.8x.',
      'Empirical benchmarks with verifiable units (e.g. "sub-350ms p95 latency") outperform vague marketing adjectives.',
    ],
    targetKeywords: ['Generative Engine Optimization', 'GEO strategy', 'LLMO', 'Perplexity SEO', 'AI Overviews ranking'],
    targetEntities: ['Large Language Models', 'Perplexity AI', 'Google AI Overviews', 'Retrieval-Augmented Generation', 'JSON-LD', 'Schema.org'],
    faqItems: [
      {
        question: 'What is the difference between SEO and GEO (Generative Engine Optimization)?',
        answer: 'Traditional SEO optimizes for keyword rank and click-through rates on search engine result pages (SERPs). GEO (Generative Engine Optimization) optimizes for LLM synthesis, multi-hop citation extraction, and presence in generative AI answers.',
      },
      {
        question: 'How do AI engines select which sources to cite in their answers?',
        answer: 'Generative search engines use semantic chunk rerankers, entity authority graphs, and factual consistency checks. Articles with concise direct-answer paragraphs, verifiable metrics, and valid schema markup achieve the highest citation probabilities.',
      },
      {
        question: 'What is LLMO (Large Language Model Optimization)?',
        answer: 'LLMO is the practice of training, tuning, or structuring information architecture so LLM agents and assistant interfaces accurately summarize and reference a brand when queried by enterprise users.',
      },
    ],
    body: [
      'The paradigm of discovery has undergone a seismic shift. For twenty-five years, digital discoverability was mediated by PageRank, keyword volume indices, and ten blue hyperlinks. Today, over 40% of technical and enterprise queries are resolved through generative synthesis in Perplexity, ChatGPT Search, Gemini, and Google AI Overviews.',
      'In this generative landscape, being on "Page 1" is irrelevant if an LLM synthesizes an answer without referencing your architecture. This has given birth to Generative Engine Optimization (GEO) and Large Language Model Optimization (LLMO).',
      'Through analyzing over 12,000 generative query responses across enterprise AI topics, our research team identified the five core criteria governing LLM citation priority: Direct Answer Density, Empirical Grounding, Entity Co-occurrence, Structural Scannability, and Cryptographic Schema Provenance.',
      'By implementing deliberate GEO content engineering—replacing flowery introductions with definitive answer paragraphs and backing every assertion with benchmark data—enterprises can ensure their proprietary systems remain the authoritative source in generative search.',
    ],
    relatedSolutions: [
      { title: 'AI as a Service Infrastructure', href: '/solutions/ai-as-a-service' },
      { title: 'Enterprise RAG Architecture', href: '/solutions/custom-ai-development/enterprise-rag' },
    ],
    seoTitle: 'Generative Engine Optimization (GEO) & LLMO Technical Guide 2026',
    seoDescription: 'Master Generative Engine Optimization (GEO). Learn how to engineer content for citation in Perplexity, ChatGPT Search, and Google AI Overviews.',
    seoScore: 96,
    geoMetrics: {
      directAnswerScore: 98,
      dataDensityScore: 92,
      entityClarityScore: 95,
      schemaReadinessScore: 96,
      overallGeoScore: 95,
      aiTargets: ['Perplexity', 'ChatGPT Search', 'Google AI Overviews', 'Claude', 'Gemini'],
    },
  },
  ...INSIGHT_ARTICLES.map((art, idx) => ({
    ...art,
    status: (idx === 0 ? 'Published' : idx === 1 ? 'Published' : 'In Review') as any,
    directAnswerSnippet: art.excerpt,
    keyTakeaways: [
      'Empirical benchmarks verified in staging runtimes.',
      'Sub-500ms p95 latency SLA across cloud deployments.',
      'Strict zero-retention enterprise privacy guarantees.',
    ],
    targetKeywords: art.tags,
    targetEntities: [art.category, 'Enterprise AI', 'Distributed Systems'],
    faqItems: [
      {
        question: `How does ${art.category} scale in production?`,
        answer: `${art.title} explains deterministic state boundaries, memory checkpoints, and token cost optimization.`,
      },
    ],
    seoScore: 88 + (idx * 3) % 10,
    geoMetrics: {
      directAnswerScore: 85 + (idx * 4) % 12,
      dataDensityScore: 80 + (idx * 5) % 15,
      entityClarityScore: 88 + (idx * 2) % 10,
      schemaReadinessScore: 90,
      overallGeoScore: 86 + (idx * 3) % 11,
      aiTargets: ['Perplexity', 'ChatGPT Search', 'Google AI Overviews'] as any,
    },
  })),
];

export const cmsArticleService = {
  getArticles(): InsightArticle[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_CMS_ARTICLES));
        return SEED_CMS_ARTICLES;
      }
      return JSON.parse(stored);
    } catch {
      return SEED_CMS_ARTICLES;
    }
  },

  getArticleBySlug(slug: string): InsightArticle | undefined {
    const list = this.getArticles();
    return list.find((a) => a.slug === slug);
  },

  saveArticle(article: InsightArticle): InsightArticle {
    const list = this.getArticles();
    const existingIndex = list.findIndex((a) => a.id === article.id || a.slug === article.slug);

    // Compute updated scores
    const { geoMetrics, seoScore } = this.calculateScores(article);
    const enriched: InsightArticle = {
      ...article,
      updatedDate: new Date().toISOString().split('T')[0],
      seoScore,
      geoMetrics,
    };

    if (existingIndex >= 0) {
      list[existingIndex] = enriched;
    } else {
      list.unshift(enriched);
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save CMS article', e);
    }
    return enriched;
  },

  deleteArticle(id: string): boolean {
    const list = this.getArticles();
    const filtered = list.filter((a) => a.id !== id);
    if (filtered.length === list.length) return false;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
    return true;
  },

  calculateScores(article: Partial<InsightArticle>): { geoMetrics: GeoMetrics; seoScore: number } {
    let directAnswerScore = 40;
    if (article.directAnswerSnippet && article.directAnswerSnippet.length > 50) {
      directAnswerScore = 95;
    } else if (article.excerpt && article.excerpt.length > 50) {
      directAnswerScore = 80;
    }

    let dataDensityScore = 50;
    const bodyText = (article.body || []).join(' ') + (article.directAnswerSnippet || '');
    const numMatches = bodyText.match(/\d+(%|ms|s|x|k|\$|\b)/gi);
    if (numMatches && numMatches.length > 6) {
      dataDensityScore = 95;
    } else if (numMatches && numMatches.length > 2) {
      dataDensityScore = 80;
    }

    let entityClarityScore = 60;
    if (article.targetEntities && article.targetEntities.length >= 3) {
      entityClarityScore = 95;
    } else if (article.tags && article.tags.length >= 2) {
      entityClarityScore = 82;
    }

    let schemaReadinessScore = 50;
    if (article.faqItems && article.faqItems.length >= 2) {
      schemaReadinessScore = 95;
    } else if (article.faqItems && article.faqItems.length === 1) {
      schemaReadinessScore = 75;
    }

    const overallGeoScore = Math.round(
      directAnswerScore * 0.35 +
      dataDensityScore * 0.25 +
      entityClarityScore * 0.2 +
      schemaReadinessScore * 0.2
    );

    // Traditional SEO Score
    let seoScore = 70;
    if (article.seoTitle && article.seoTitle.length >= 30 && article.seoTitle.length <= 65) {
      seoScore += 10;
    }
    if (article.seoDescription && article.seoDescription.length >= 110 && article.seoDescription.length <= 165) {
      seoScore += 10;
    }
    if (article.targetKeywords && article.targetKeywords.length > 0) {
      seoScore += 10;
    }
    seoScore = Math.min(100, seoScore);

    return {
      geoMetrics: {
        directAnswerScore,
        dataDensityScore,
        entityClarityScore,
        schemaReadinessScore,
        overallGeoScore,
        aiTargets: article.geoMetrics?.aiTargets || ['Perplexity', 'ChatGPT Search', 'Google AI Overviews'],
      },
      seoScore,
    };
  },

  generateJsonLd(article: InsightArticle): string {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TechArticle',
          '@id': `https://enterprise-ai.internal/insights/${article.slug}#article`,
          headline: article.seoTitle || article.title,
          description: article.seoDescription || article.excerpt,
          abstract: article.directAnswerSnippet || article.excerpt,
          datePublished: article.publicationDate,
          dateModified: article.updatedDate || article.publicationDate,
          author: {
            '@type': 'Organization',
            name: article.author.name,
            jobTitle: article.author.role,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Enterprise AI Platform',
            url: 'https://enterprise-ai.internal',
          },
          keywords: (article.targetKeywords || article.tags).join(', '),
          about: (article.targetEntities || []).map((entity) => ({
            '@type': 'Thing',
            name: entity,
          })),
        },
        ...(article.faqItems && article.faqItems.length > 0
          ? [
              {
                '@type': 'FAQPage',
                '@id': `https://enterprise-ai.internal/insights/${article.slug}#faq`,
                mainEntity: article.faqItems.map((f) => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: f.answer,
                  },
                })),
              },
            ]
          : []),
      ],
    };
    return JSON.stringify(jsonLd, null, 2);
  },
};
