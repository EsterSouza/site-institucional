import { MetadataRoute } from "next";
import { SEGMENTOS } from "@/content/site";
import { ARTIGOS } from "@/content/artigos";

const BASE_URL = "https://www.treinavisa.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
    const paginas = ["", ...SEGMENTOS.map((s) => `/${s.slug}`), "/blog", "/politica-de-privacidade"].map((r) => ({
        url: `${BASE_URL}${r}`,
        changeFrequency: "weekly" as const,
        priority: r === "" ? 1 : 0.8,
    }));
    const artigos = ARTIGOS.map((a) => ({
        url: `${BASE_URL}/blog/${a.slug}`,
        lastModified: a.data,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));
    return [...paginas, ...artigos];
}
