import React from 'react';
import { Helmet } from 'react-helmet-async';
import { JsonLd } from './JsonLd';

/**
 * Wrapper de SEO para gerenciar metatags e dados estruturados por página.
 * @param {string} title - Título da página
 * @param {string} description - Meta descrição
 * @param {string} canonical - URL canônica da página
 * @param {object} schemaData - Dados extras do Schema.org (JSON-LD)
 */
export function SEO_Head({ 
  title, 
  description, 
  canonical, 
  schemaData,
  ogImage = "/og-image.jpg",
  ogType = "website"
}) {
  const siteUrl = "https://alexisdev.com.br"; // Base URL original
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Metatags Básicas */}
      <title>{title ? `${title} | Alexis Dev • Marketing` : "Alexis Dev • Especialista em Sites e SEO"}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={fullCanonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* JSON-LD Structured Data */}
      {schemaData && <JsonLd data={schemaData} />}
    </Helmet>
  );
}
