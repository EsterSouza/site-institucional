import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";
import { Post } from "@/types";
import BlogCard from "@/components/BlogCard";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
    title: "Blog — Educação Sanitária",
    description:
        "Artigos gratuitos sobre vigilância sanitária, ANVISA, boas práticas e gestão sanitária para empreendedores do setor regulado.",
};

export const revalidate = 60;

export default async function BlogPage() {
    let posts: Post[] = [];

    try {
        posts = await client.fetch<Post[]>(allPostsQuery);
    } catch {
        // Sanity não configurado
    }

    return (
        <div className="bg-bg-primary pt-[72px]">
            {/* Hero */}
            <section className="bg-brand-navy text-white py-20 px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="font-mono text-brand-accent text-xs tracking-widest uppercase font-bold block mb-4">Blog</span>
                    <h1 className="font-serif italic text-5xl md:text-6xl text-white mb-6">
                        Conteúdo <span className="font-sans not-italic font-bold">gratuito</span>
                    </h1>
                    <p className="font-sans text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
                        Artigos técnicos sobre vigilância sanitária, ANVISA e gestão de negócios no setor regulado — em linguagem acessível.
                    </p>
                </div>
            </section>

            {/* Grid de posts */}
            <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <BlogCard key={post._id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <FileText className="w-16 h-16 text-brand-navy/20 mx-auto mb-6" />
                        <h2 className="font-sans font-bold text-brand-navy text-2xl mb-3">
                            Em breve: novos artigos
                        </h2>
                        <p className="font-sans text-text-secondary max-w-md mx-auto">
                            Estamos preparando conteúdo de qualidade para você. Volte em breve ou configure o Sanity CMS para publicar posts.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
