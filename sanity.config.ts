import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { postType, ebookType, cursoType } from "./sanity/schemas";

export default defineConfig({
    name: "treinavisa",
    title: "TreinaVISA — Painel de Conteúdo",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    basePath: "/studio",
    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title("Conteúdo TreinaVISA")
                    .items([
                        S.listItem()
                            .title("📚 Cursos")
                            .child(S.documentTypeList("curso").title("Cursos")),
                        S.listItem()
                            .title("✍️ Blog")
                            .child(S.documentTypeList("post").title("Posts do Blog")),
                        S.listItem()
                            .title("📄 E-books & Materiais")
                            .child(S.documentTypeList("ebook").title("E-books")),
                    ]),
        }),
        visionTool(),
    ],
    schema: {
        types: [postType, ebookType, cursoType],
    },
});
