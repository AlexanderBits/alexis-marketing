import React from 'react';
import { JsonLd } from './JsonLd';

export function GlobalSEO() {
  const siteUrl = "https://alexisdev.com.br";

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Alexis Dev • Marketing Digital",
      "url": siteUrl,
      "logo": `${siteUrl}/logo.png`,
      "alternateName": "Alexis Marketing",
      "sameAs": [
        "https://instagram.com/alexisdev.authority",
        "https://facebook.com/alexisdev.authority"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-32-98703-7221",
        "contactType": "sales",
        "areaServed": "BR"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": siteUrl,
      "name": "Alexis Dev",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/busca?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return <>{schemas.map((s, i) => <JsonLd key={i} data={s} />)}</>;
}
