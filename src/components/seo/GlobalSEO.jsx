import React from 'react';
import { JsonLd } from './JsonLd';

/**
 * Metadados globais que induzem Sitelinks e visibilidade de marca.
 */
export function GlobalSEO() {
  const siteUrl = "https://alexisdev.com.br";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Alexis Dev • Marketing Digital",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`, // Substituir pelo caminho real do logo
    "alternateName": "Alexis Marketing",
    "sameAs": [
      "https://instagram.com/alexisdev.authority",
      "https://facebook.com/alexisdev.authority"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-32-98703-7221",
      "contactType": "Vendas e Suporte",
      "areaServed": "BR",
      "availableLanguage": ["Portuguese"]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteUrl,
    "name": "Alexis Dev",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/busca?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
    </>
  );
}
