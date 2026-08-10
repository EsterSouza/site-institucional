import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allPostSlugsQuery } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const BASE_URL = "https://treinavisa.com.br";

    const staticRoutes = [
        "",
        "/cursos",
        "/blog",
        "/ebooks",
        "/comunidade",
        "/sobre",
        "/contato",
        "/politica-de-privacidade",
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1.0 : 0.8,
    }));

    try {
        const posts = await client.fetch<{ slug: string }[]>(allPostSlugsQuery);
        const postRoutes = posts.map((post) => ({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }));

        return [...staticRoutes, ...postRoutes];
    } catch {
        return staticRoutes;
    }
}
