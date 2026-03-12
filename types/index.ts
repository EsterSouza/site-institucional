import { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
    hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
}

export interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    summary: string;
    coverImage?: SanityImage;
    publishedAt: string;
    tags?: string[];
    body?: PortableTextBlock[];
}

export interface Ebook {
    _id: string;
    title: string;
    slug: { current: string };
    description: string;
    coverImage?: SanityImage;
    pdfFile?: { asset: { url: string } };
    externalLink?: string;
    tags?: string[];
    featured?: boolean;
}

export interface Curso {
    _id: string;
    title: string;
    slug: { current: string };
    shortDescription: string;
    image?: SanityImage;
    externalLink?: string;
    price?: string;
    status: "active" | "coming_soon" | "sold_out";
    modality?: "online" | "presencial" | "hibrido";
    category?: string;
    featured?: boolean;
}
