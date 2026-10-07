import { FaqItem, SaaSProductItem, TechnicalCapability, JobPosting, ComparisonItem } from '../types';
import { FAQ_ITEMS } from '../data/faq';
import { SAAS_PRODUCTS } from '../data/products';
import { TECHNICAL_CAPABILITIES } from '../data/capabilities';
import { JOB_POSTINGS } from '../data/jobs';
import { COMPARISONS } from '../data/comparisons';

const FAQ_STORAGE_KEY = 'apex_cms_global_faqs';
const PRODUCTS_STORAGE_KEY = 'apex_cms_products';
const CAPABILITIES_STORAGE_KEY = 'apex_cms_capabilities';
const JOBS_STORAGE_KEY = 'apex_cms_jobs';
const COMPARISONS_STORAGE_KEY = 'apex_cms_comparisons';
const SETTINGS_STORAGE_KEY = 'apex_cms_site_settings';

export interface SiteSettings {
  siteName: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  canonicalDomain: string;
  ogImageUrl: string;
  twitterHandle: string;
  aiCrawlerPolicy: {
    allowPerplexityBot: boolean;
    allowGptBot: boolean;
    allowClaudeBot: boolean;
    allowGoogleExtended: boolean;
  };
  contactEmail: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Enterprise AI Platform',
  defaultMetaTitle: 'Enterprise AI Platform – Autonomous Systems, Agents & Infrastructure',
  defaultMetaDescription: 'Production-grade enterprise AI systems, stateful autonomous agents, managed AI as a Service, and private VPC deployments.',
  canonicalDomain: 'https://enterprise-ai.internal',
  ogImageUrl: 'https://enterprise-ai.internal/og-cover.png',
  twitterHandle: '@EnterpriseAI',
  aiCrawlerPolicy: {
    allowPerplexityBot: true,
    allowGptBot: true,
    allowClaudeBot: true,
    allowGoogleExtended: true,
  },
  contactEmail: 'engineering@enterprise-ai.internal',
};

export const cmsDataService = {
  // ==========================================
  // 1. GLOBAL FAQS
  // ==========================================
  getFaqs(): FaqItem[] {
    try {
      const stored = localStorage.getItem(FAQ_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(FAQ_STORAGE_KEY, JSON.stringify(FAQ_ITEMS));
        return FAQ_ITEMS;
      }
      return JSON.parse(stored);
    } catch {
      return FAQ_ITEMS;
    }
  },

  saveFaq(faq: FaqItem, originalQuestion?: string): FaqItem {
    const list = this.getFaqs();
    const targetQ = originalQuestion || faq.question;
    const index = list.findIndex((f) => f.question === targetQ);

    if (index >= 0) {
      list[index] = faq;
    } else {
      list.unshift(faq);
    }

    try {
      localStorage.setItem(FAQ_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
    return faq;
  },

  deleteFaq(question: string): boolean {
    const list = this.getFaqs();
    const filtered = list.filter((f) => f.question !== question);
    if (filtered.length === list.length) return false;

    try {
      localStorage.setItem(FAQ_STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
    return true;
  },

  resetFaqs(): FaqItem[] {
    localStorage.setItem(FAQ_STORAGE_KEY, JSON.stringify(FAQ_ITEMS));
    return FAQ_ITEMS;
  },

  // ==========================================
  // 2. SAAS PRODUCTS
  // ==========================================
  getProducts(): SaaSProductItem[] {
    try {
      const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(SAAS_PRODUCTS));
        return SAAS_PRODUCTS;
      }
      return JSON.parse(stored);
    } catch {
      return SAAS_PRODUCTS;
    }
  },

  saveProduct(prod: SaaSProductItem): SaaSProductItem {
    const list = this.getProducts();
    const index = list.findIndex((p) => p.id === prod.id || p.slug === prod.slug);

    if (index >= 0) {
      list[index] = prod;
    } else {
      list.unshift(prod);
    }

    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
    return prod;
  },

  deleteProduct(id: string): boolean {
    const list = this.getProducts();
    const filtered = list.filter((p) => p.id !== id);
    if (filtered.length === list.length) return false;

    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
    return true;
  },

  // ==========================================
  // 3. CAPABILITIES / SOLUTIONS
  // ==========================================
  getCapabilities(): TechnicalCapability[] {
    try {
      const stored = localStorage.getItem(CAPABILITIES_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(CAPABILITIES_STORAGE_KEY, JSON.stringify(TECHNICAL_CAPABILITIES));
        return TECHNICAL_CAPABILITIES;
      }
      return JSON.parse(stored);
    } catch {
      return TECHNICAL_CAPABILITIES;
    }
  },

  saveCapability(cap: TechnicalCapability): TechnicalCapability {
    const list = this.getCapabilities();
    const index = list.findIndex((c) => c.id === cap.id);

    if (index >= 0) {
      list[index] = cap;
    } else {
      list.unshift(cap);
    }

    try {
      localStorage.setItem(CAPABILITIES_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
    return cap;
  },

  deleteCapability(id: string): boolean {
    const list = this.getCapabilities();
    const filtered = list.filter((c) => c.id !== id);
    if (filtered.length === list.length) return false;

    try {
      localStorage.setItem(CAPABILITIES_STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
    return true;
  },

  // ==========================================
  // 4. CAREERS & JOB POSTINGS
  // ==========================================
  getJobs(): JobPosting[] {
    try {
      const stored = localStorage.getItem(JOBS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(JOB_POSTINGS));
        return JOB_POSTINGS;
      }
      return JSON.parse(stored);
    } catch {
      return JOB_POSTINGS;
    }
  },

  saveJob(job: JobPosting): JobPosting {
    const list = this.getJobs();
    const index = list.findIndex((j) => j.id === job.id);

    if (index >= 0) {
      list[index] = job;
    } else {
      list.unshift(job);
    }

    try {
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
    return job;
  },

  deleteJob(id: string): boolean {
    const list = this.getJobs();
    const filtered = list.filter((j) => j.id !== id);
    if (filtered.length === list.length) return false;

    try {
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
    return true;
  },

  // ==========================================
  // 5. ARCHITECTURAL COMPARISONS
  // ==========================================
  getComparisons(): ComparisonItem[] {
    try {
      const stored = localStorage.getItem(COMPARISONS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(COMPARISONS_STORAGE_KEY, JSON.stringify(COMPARISONS));
        return COMPARISONS;
      }
      return JSON.parse(stored);
    } catch {
      return COMPARISONS;
    }
  },

  saveComparison(comp: ComparisonItem): ComparisonItem {
    const list = this.getComparisons();
    const index = list.findIndex((c) => c.slug === comp.slug);

    if (index >= 0) {
      list[index] = comp;
    } else {
      list.unshift(comp);
    }

    try {
      localStorage.setItem(COMPARISONS_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
    return comp;
  },

  deleteComparison(slug: string): boolean {
    const list = this.getComparisons();
    const filtered = list.filter((c) => c.slug !== slug);
    if (filtered.length === list.length) return false;

    try {
      localStorage.setItem(COMPARISONS_STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
    return true;
  },

  // ==========================================
  // 6. SITE-WIDE SEO, GEO & AI BOT SETTINGS
  // ==========================================
  getSettings(): SiteSettings {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
        return DEFAULT_SETTINGS;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: SiteSettings): SiteSettings {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
    return settings;
  },

  generateRobotsTxt(settings: SiteSettings): string {
    const directives = [
      '# Enterprise AI Platform – robots.txt',
      'User-agent: *',
      'Allow: /',
      'Disallow: /crm',
      'Disallow: /cms',
      '',
      '# Generative Engine Optimization (GEO) AI Crawlers',
      `User-agent: PerplexityBot\n${settings.aiCrawlerPolicy.allowPerplexityBot ? 'Allow: /' : 'Disallow: /'}`,
      `User-agent: GPTBot\n${settings.aiCrawlerPolicy.allowGptBot ? 'Allow: /' : 'Disallow: /'}`,
      `User-agent: ClaudeBot\n${settings.aiCrawlerPolicy.allowClaudeBot ? 'Allow: /' : 'Disallow: /'}`,
      `User-agent: Google-Extended\n${settings.aiCrawlerPolicy.allowGoogleExtended ? 'Allow: /' : 'Disallow: /'}`,
      '',
      `Sitemap: ${settings.canonicalDomain}/sitemap.xml`,
    ];
    return directives.join('\n');
  },
};
