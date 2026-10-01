import React, { useState } from 'react';
import { ArrowRight, Check, Shield, ExternalLink } from 'lucide-react';
import { leadService } from '../../services/leadService';

interface FooterProps {
  onNavigate: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    leadService.saveLead({
      name: 'Newsletter Subscriber',
      email: email,
      company: 'Newsletter Audience',
      lead_source: 'Newsletter',
      landing_page: window.location.pathname,
      interest: 'AI Research & Platform Updates',
      business_problem: 'Subscribed to engineering newsletter.',
    });

    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Top Newsletter & Brand Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-200 dark:border-slate-800/80">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-mono font-bold text-xs">
                AI
              </div>
              <span className="font-semibold text-slate-900 dark:text-white tracking-tight text-sm">
                Enterprise AI Systems Platform
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Build, deploy and scale practical AI that improves how businesses work. Designed for enterprise security, low latency, and deterministic reliability.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-500">
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Zero-Trust Multi-Tenant Architecture
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="max-w-md lg:ml-auto w-full">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                Technical Systems Newsletter
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3.5">
                Monthly engineering deep dives on autonomous agents, hybrid RAG, and LLMOps economics. No marketing fluff.
              </p>
              {subscribed ? (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Subscribed. You will receive technical engineering dispatches.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineering@yourcompany.com"
                    required
                    aria-label="Work email address"
                    className="flex-1 px-3.5 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-blue-600 dark:bg-slate-100 dark:hover:bg-blue-500 text-white dark:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-14 border-b border-slate-200 dark:border-slate-800/80 text-xs">
          {/* Solutions */}
          <div className="space-y-3">
            <h4 className="font-mono text-slate-900 dark:text-white uppercase tracking-wider font-semibold text-[11px]">
              Solutions
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('/solutions/ai-as-a-service')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  AI as a Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/solutions/ai-agents')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  AI Agents
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/solutions/saas')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  SaaS Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/solutions/consulting')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Consulting & Implementation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/solutions/custom-ai-development')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Custom AI Development
                </button>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="space-y-3">
            <h4 className="font-mono text-slate-900 dark:text-white uppercase tracking-wider font-semibold text-[11px]">
              Capabilities
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('/solutions/custom-ai-development/enterprise-rag')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Enterprise RAG
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/solutions/custom-ai-development/generative-ai-applications')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Generative AI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/solutions/custom-ai-development/workflow-automation')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Workflow Automation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/solutions/custom-ai-development/predictive-ai')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Predictive & Machine Learning
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/technology/governance')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  AI Governance & Firewalls
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="font-mono text-slate-900 dark:text-white uppercase tracking-wider font-semibold text-[11px]">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('/company')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  About Platform
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/how-we-work')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  How We Work
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/careers')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/investors')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Investors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/partners')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Partners & Integrations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="font-mono text-slate-900 dark:text-white uppercase tracking-wider font-semibold text-[11px]">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('/insights')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Engineering Insights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resources/ai-readiness-assessment')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer text-blue-600 dark:text-blue-400 font-medium">
                  AI Readiness Assessment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/comparisons')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Architectural Comparisons
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/technology')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Technology Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/faq')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Global FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="font-mono text-slate-900 dark:text-white uppercase tracking-wider font-semibold text-[11px]">
              Legal & Trust
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('/privacy')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Terms of Use
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/cookies')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/acceptable-use')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Acceptable Use Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/crm')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer text-slate-400 dark:text-slate-500">
                  CRM Internal View
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Social Placeholders & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 text-xs">
            <span>© {new Date().getFullYear()} Enterprise AI Platform</span>
            <span>·</span>
            <span>All rights reserved</span>
            <span>·</span>
            <span className="font-mono text-[11px]">Production Systems</span>
          </div>

          {/* Social Placeholders for LinkedIn and YouTube */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 font-mono text-xs"
              aria-label="Visit LinkedIn profile"
            >
              LinkedIn <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-red-500 transition-colors inline-flex items-center gap-1 font-mono text-xs"
              aria-label="Visit YouTube channel"
            >
              YouTube <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
