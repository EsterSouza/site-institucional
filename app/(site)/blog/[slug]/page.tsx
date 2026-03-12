import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Calendar, Tag, ArrowLeft, Share2 } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, allPostSlugsQuery } from "@/sanity/lib/queries";
import { Post } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import CTABanner from "@/components/CTABanner";

export const revalidate = 60;

export async function generateStaticParams() {
    try {
        const slugs = await client.fetch<{ slug: string }[]>(allPostSlugsQuery);
        return slugs.map((s) => ({ slug: s.slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    try {
        const post = await client.fetch<Post>(postBySlugQuery, { slug: params.slug });
        if (!post) return { title: "Post não encontrado" };
        return {
            title: post.title,
            description: post.summary,
            openGraph: {
                title: post.title,
                description: post.summary,
                images: post.coverImage
                    ? [{ url: urlFor(post.coverImage).width(1200).height(630).url() }]
                    : [],
            },
        };
    } catch {
        return { title: "Post" };
    }
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

const ptComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) return null;
            return (
                <figure className="my-8 rounded-[1.5rem] overflow-hidden">
                    <div className="relative aspect-video">
                        <Image
                            src={urlFor(value).width(1000).url()}
                            alt={value.alt || ""}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="text-center font-sans text-sm text-text-secondary mt-3 italic">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
    block: {
        h2: ({ children }: any) => (
            <h2 className="font-serif italic text-3xl text-brand-navy mt-10 mb-4">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="font-sans font-bold text-brand-navy text-2xl mt-8 mb-3">{children}</h3>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-brand-accent pl-6 my-6 text-text-secondary font-serif italic text-xl">
                {children}
            </blockquote>
        ),
        normal: ({ children }: any) => (
            <p className="font-sans text-text-secondary text-lg leading-relaxed mb-4">{children}</p>
        ),
    },
    marks: {
        strong: ({ children }: any) => (
            <strong className="font-bold text-brand-navy">{children}</strong>
        ),
        link: ({ value, children }: any) => (
            <a
                href={value.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-accent underline hover:text-blue-700 transition-colors"
            >
                {children}
            </a>
        ),
    },
};

export default async function BlogPostPage({
    params,
}: {
    params: { slug: string };
}) {
    let post: Post | null = null;

    try {
        post = await client.fetch<Post>(postBySlugQuery, { slug: params.slug });
    } catch {
        notFound();
    }

    if (!post) notFound();

    const imageUrl = post.coverImage
        ? urlFor(post.coverImage).width(1200).height(600).url()
        : null;

    return (
        <div className="bg-bg-primary pt-[72px]">
            {/* Hero com imagem */}
            <div className="relative h-[50vh] min-h-[360px] bg-brand-navy overflow-hidden">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-4xl mx-auto">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 bg-brand-accent/80 text-white text-xs font-bold px-3 py-1 rounded-full"
                                >
                                    <Tag className="w-3 h-3" />
                                    {tag.replace(/-/g, " ")}
                                </span>
                            ))}
                        </div>
                    )}
                    <h1 className="font-sans font-black text-white text-3xl md:text-5xl leading-tight mb-4">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-white/60 font-sans text-sm">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.publishedAt)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Back link */}
            <div className="max-w-4xl mx-auto px-6 md:px-12 pt-8">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 font-sans text-sm font-medium text-text-secondary hover:text-brand-navy transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
                </Link>
            </div>

            {/* Article body */}
            <article className="max-w-4xl mx-auto px-6 md:px-12 py-12">
                {/* Summary */}
                <p className="font-sans text-xl text-text-secondary leading-relaxed border-l-4 border-brand-accent pl-6 mb-10">
                    {post.summary}
                </p>

                {/* Portable Text */}
                {post.body && (
                    <div className="prose-custom">
                        <PortableText value={post.body} components={ptComponents} />
                    </div>
                )}

                {/* Share */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                    <p className="font-sans font-bold text-brand-navy">
                        Gostou? Compartilhe este artigo.
                    </p>
                    <a
                        href={`https://instagram.com/consultora.sanitaria`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-brand-navy text-white px-5 py-2.5 rounded-full font-sans text-sm font-bold hover:bg-brand-navy-light transition-colors"
                    >
                        <Share2 className="w-4 h-4" /> Seguir no Instagram
                    </a>
                </div>
            </article>

            {/* CTA */}
            <section className="py-16 px-6 md:px-12 pb-24">
                <div className="max-w-5xl mx-auto">
                    <CTABanner
                        title="Aprofunde seu conhecimento"
                        subtitle="Acesse nossos cursos e materiais para ir além dos artigos do blog."
                        primaryLabel="Ver Cursos"
                        primaryHref="/cursos"
                        secondaryLabel="Ver E-books gratuitos"
                        secondaryHref="/ebooks"
                    />
                </div>
            </section>
        </div>
    );
}
