import React from 'react';

/**
 * Componente para injeção de dados estruturados (JSON-LD) no <head>.
 * Ajuda o Google a entender a hierarquia do site e exibir Sitelinks.
 */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
