import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (href: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumbs" className="py-2.5 px-1 text-xs">
      <ol className="flex items-center flex-wrap gap-1.5 text-slate-500 dark:text-slate-400">
        <li>
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            aria-label="Home"
          >
            <Home className="w-3.5 h-3.5" />
          </button>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.label}>
              <li aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li>
                {isLast || !item.href ? (
                  <span className="font-medium text-slate-900 dark:text-white" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <button
                    onClick={() => onNavigate(item.href!)}
                    className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
