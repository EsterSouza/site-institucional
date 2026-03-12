import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag } from "lucide-react";
import { Post } from "@/types";
import { urlFor } from "@/sanity/lib/image";

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default function BlogCard({ post }: { post: Post }) {
    const imageUrl = post.coverImage
        ? urlFor(post.coverImage).width(640).height(360).url()
        : null;

    return (
        <Link
            href={`/blog/${post.slug.current}`}
            className="group bg-white rounded-[1.75rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
        >
            {/* Cover image */}
            <div className="relative h-48 bg-slate-50 overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-navy/10 to-brand-accent/10 flex items-center justify-center">
                        <span className="font-serif italic text-brand-navy/40 text-lg">TreinaVISA</span>
                    </div>
                )}
                {/* Tags overlay */}
                {post.tags && post.tags.length > 0 && (
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 bg-brand-navy/90 text-white text-[11px] font-sans font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                            <Tag className="w-3 h-3" />
                            {post.tags[0].replace(/-/g, " ")}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                {/* Date */}
                <div className="flex items-center gap-1.5 text-text-secondary font-sans text-xs mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.publishedAt)}
                </div>

                {/* Title */}
                <h3 className="font-sans font-bold text-brand-navy text-lg leading-snug mb-3 group-hover:text-brand-accent transition-colors line-clamp-2">
                    {post.title}
                </h3>

                {/* Summary */}
                <p className="font-sans text-text-secondary text-sm leading-relaxed flex-1 line-clamp-3">
                    {post.summary}
                </p>

                {/* Read more */}
                <div className="mt-4 pt-4 border-t border-gray-50">
                    <span className="font-sans text-sm font-bold text-brand-accent group-hover:underline">
                        Ler artigo →
                    </span>
                </div>
            </div>
        </Link>
    );
}
