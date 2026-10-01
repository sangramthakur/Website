import React, { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  schemaData?: object;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  schemaData,
}) => {
  useEffect(() => {
    // Update Title
    const fullTitle = title.includes('Enterprise AI') ? title : `${title} – Enterprise AI Systems Platform`;
    document.title = fullTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update Canonical URL
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${origin}${canonicalPath}`);
    }

    // JSON-LD structured data injection
    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Enterprise AI Systems Platform',
      url: origin,
      description: 'Production AI infrastructure, autonomous agents, and enterprise AI engineering platform.',
      sameAs: [
        'https://www.linkedin.com',
        'https://www.youtube.com',
      ],
    };

    const targetSchema = schemaData || defaultSchema;
    let scriptTag = document.getElementById('json-ld-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-structured-data';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(targetSchema);
  }, [title, description, canonicalPath, type, schemaData]);

  return null;
};
