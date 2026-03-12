import { defineField, defineType } from "sanity";

export const cursoType = defineType({
    name: "curso",
    title: "Curso",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Título do Curso",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug (URL interna)",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "shortDescription",
            title: "Descrição Curta",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required().max(200),
        }),
        defineField({
            name: "fullDescription",
            title: "Descrição Completa",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "image",
            title: "Imagem do Curso",
            type: "image",
            options: { hotspot: true },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "externalLink",
            title: "Link Externo (landing page / checkout)",
            type: "url",
        }),
        defineField({
            name: "price",
            title: "Preço (ex: R$ 97,00 ou 12x R$ 9,67)",
            type: "string",
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "Ativo / Disponível", value: "active" },
                    { title: "Em Breve", value: "coming_soon" },
                    { title: "Esgotado", value: "sold_out" },
                ],
                layout: "radio",
            },
            initialValue: "active",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "modality",
            title: "Modalidade",
            type: "string",
            options: {
                list: [
                    { title: "Online / Remoto", value: "online" },
                    { title: "Presencial", value: "presencial" },
                    { title: "Híbrido", value: "hibrido" },
                ],
                layout: "radio",
            },
            initialValue: "online",
        }),
        defineField({
            name: "category",
            title: "Categoria",
            type: "string",
            options: {
                list: [
                    { title: "Alimentos", value: "alimentos" },
                    { title: "ILPI", value: "ilpi" },
                    { title: "Saúde", value: "saude" },
                    { title: "Beleza", value: "beleza" },
                ],
                layout: "dropdown",
            },
        }),
        defineField({
            name: "order",
            title: "Ordem de exibição",
            type: "number",
            description: "Número para controlar a ordem de exibição (menor = primeiro)",
        }),
        defineField({
            name: "featured",
            title: "Curso em Destaque",
            type: "boolean",
            initialValue: false,
        }),
    ],
    orderings: [
        {
            title: "Ordem de Exibição",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "status",
            media: "image",
        },
        prepare({ title, subtitle, media }) {
            const statusMap: Record<string, string> = {
                active: "✅ Disponível",
                coming_soon: "🕐 Em Breve",
                sold_out: "❌ Esgotado",
            };
            return { title, subtitle: statusMap[subtitle] || subtitle, media };
        },
    },
});
