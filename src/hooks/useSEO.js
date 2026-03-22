import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Hook para carregar dados de SEO dinâmicos de uma rota.
 * @param {string} path - Caminho da rota (ex: '/')
 */
export function useSEO(path) {
  const [seoData, setSeoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const { data } = await base44.entities.SiteMetadata.list();
        const matched = data.find(item => item.path === path);
        if (matched) {
          setSeoData(matched);
        }
      } catch (error) {
        console.error("Erro ao carregar SEO dinâmico:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSEO();
  }, [path]);

  return { seoData, isLoading };
}
