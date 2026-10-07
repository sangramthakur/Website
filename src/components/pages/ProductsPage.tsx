import React from 'react';
import { ArrowRight, Box, CheckCircle2, Shield, Sparkles, ExternalLink } from 'lucide-react';
import { cmsDataService } from '../../services/cmsDataService';
import { SeoHead } from '../common/SeoHead';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { trackScrabytExternalClick } from '../../services/analytics';

interface ProductsPageProps {
  onNavigate: (href: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate, onOpenLeadModal }) => {
  const products = cmsDataService.getProducts();
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SeoHead
        title="SaaS Products – Enterprise AI Applications"
        description="Scalable, turnkey AI software applications designed to solve repeatable operational bottlenecks."
        canonicalPath="/products"
      />

      <Breadcrumbs items={[{ label: 'Products' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Modular SaaS Systems Portfolio
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          AI software designed for repeatable business challenges.
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Data-driven products engineered for immediate operational deployment with tenant isolation, SSO/SAML, and audit logging.
        </p>
      </div>

      {/* AI as a Service Cross-Reference Note (Section 9) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span className="text-slate-700 dark:text-slate-300">
            Looking for specialized clinical intelligence? <strong className="text-slate-900 dark:text-white">Scrabyt (Clinical Intelligence OS)</strong> is classified under our <strong className="text-blue-600 dark:text-blue-400">AI as a Service</strong> pillar.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('/solutions/ai-as-a-service/scrabyt')}
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View Scrabyt under AI as a Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between shadow-sm hover:border-blue-500/60 transition-all"
          >
            <div className="space-y-6">
              {/* Top Status & Category */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs font-mono">
                <span className="text-slate-400 uppercase tracking-wider">{product.category}</span>
                <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold">
                  {product.status}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {product.name}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Capabilities */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  Product Capabilities:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {product.capabilities.map((cap) => (
                    <div key={cap} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Use Cases */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs">
                <div className="text-[10px] font-mono uppercase text-slate-400">Target Operational Cases:</div>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  {product.useCases.map((uc) => (
                    <li key={uc} className="line-clamp-1">
                      · {uc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action */}
            <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onOpenLeadModal(`Product: ${product.name}`)}
                className="w-full py-3 bg-slate-900 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500 text-white dark:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <span>{product.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
