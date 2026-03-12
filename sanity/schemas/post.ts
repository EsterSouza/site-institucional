import { defineField, defineType } from "sanity";

export const postType = defineType({
    name: "post",
    title: "Post do Blog",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Título",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug (URL)",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "summary",
            title: "Resumo",
            type: "text",
            rows: 3,
            validation: (rule) => rule.required().max(280),
        }),
        defineField({
            name: "coverImage",
            title: "Imagem de Capa",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "publishedAt",
            title: "Data de Publicação",
            type: "datetime",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
            options: {
                list: [
                    { title: "Vigilância Sanitária", value: "vigilancia-sanitaria" },
                    { title: "ANVISA", value: "anvisa" },
                    { title: "Boas Práticas", value: "boas-praticas" },
                    { title: "Gestão", value: "gestao" },
                    { title: "Alimentos", value: "alimentos" },
                    { title: "Saúde", value: "saude" },
                    { title: "Regulatório", value: "regulatorio" },
                    { title: "Biossegurança", value: "biosseguranca" },
                ],
            },
        }),
        defineField({
            name: "body",
            title: "Conteúdo",
            type: "array",
            of: [
                { type: "block" },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            title: "Texto alternativo",
                            type: "string",
                        },
                        {
                            name: "caption",
                            title: "Legenda",
                            type: "string",
                        },
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "publishedAt",
            media: "coverImage",
        },
    },
});
