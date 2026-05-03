import { useState, useEffect } from "react";
import { alexis } from "@/api/alexisClient";

export function useSEO(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchSEO = async () => {
      try {
        const { data: list } = await alexis.entities.SiteMetadata.list();
        if (active) {
          setData(list.find(i => i.path === path));
        }
      } catch (e) {
        console.error("SEO_HOOK_ERR", e);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchSEO();
    return () => { active = false; };
  }, [path]);

  return { seoData: data, isLoading: loading };
}
