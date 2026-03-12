import { defineField, defineType } from "sanity";

export const ebookType = defineType({
  name: "ebook",
  title: "E-book / Material",
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
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de Capa",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pdfFile",
      title: "Arquivo PDF",
      type: "file",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "externalLink",
      title: "Link Externo (alternativa ao PDF)",
      description: "Use se o PDF estiver no Google Drive",
      type: "url",
    }),
    defineField({
      name: "tags",
      title: "Tags / Categoria",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Vigilância Sanitária", value: "vigilancia-sanitaria" },
          { title: "ANVISA", value: "anvisa" },
          { title: "Checklist", value: "checklist" },
          { title: "Boas Práticas", value: "boas-praticas" },
          { title: "Alimentos", value: "alimentos" },
          { title: "Saúde", value: "saude" },
          { title: "Guia", value: "guia" },
        ],
      },
    }),
    defineField({
      name: "featured",
      title: "Destaque",
      type: "boolean",
      description: "Marcar como material em destaque",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
  },
});
