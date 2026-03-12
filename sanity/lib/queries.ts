import { groq } from "next-sanity";

// ==================== POSTS ====================

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    summary,
    coverImage,
    publishedAt,
    tags
  }
`;

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0..2] {
    _id,
    title,
    slug,
    summary,
    coverImage,
    publishedAt,
    tags
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    summary,
    coverImage,
    publishedAt,
    tags,
    body
  }
`;

export const allPostSlugsQuery = groq`
  *[_type == "post"] { "slug": slug.current }
`;

// ==================== EBOOKS ====================

export const allEbooksQuery = groq`
  *[_type == "ebook"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    coverImage,
    pdfFile { asset-> { url } },
    externalLink,
    tags,
    featured
  }
`;

// ==================== CURSOS ====================

export const allCursosQuery = groq`
  *[_type == "curso"] | order(order asc, _createdAt asc) {
    _id,
    title,
    slug,
    shortDescription,
    image,
    externalLink,
    price,
    status,
    modality,
    category,
    featured
  }
`;

export const latestCursosQuery = groq`
  *[_type == "curso" && status == "active"] | order(order asc)[0..2] {
    _id,
    title,
    slug,
    shortDescription,
    image,
    externalLink,
    price,
    status,
    modality
  }
`;
