import React from 'react';
import { Helmet } from 'react-helmet-async';
import { JsonLd } from './JsonLd';

export function SEO_Head({ 
  title, 
  description, 
  canonical, 
  schemaData,
  ogImage = "/og-image.jpg",
  ogType = "website"
}) {
  const siteUrl = "https://alexisdev.com.br";
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  const defaultTitle = "Alexis Dev • Marketing Digital";
  const finalTitle = title ? `${title} | Alexis Dev` : defaultTitle;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={fullCanonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {schemaData && <JsonLd data={schemaData} />}
    </Helmet>
  );
}
