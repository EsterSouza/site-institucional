import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTIGOS, artigo, dataLonga } from "@/content/artigos";
import { EQUIPE } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
    return ARTIGOS.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const a = artigo(params.slug);
    if (!a) return {};
    return {
        title: a.titulo,
        description: a.resumo,
        alternates: { canonical: `/blog/${a.slug}` },
        openGraph: { type: "article", title: a.titulo, description: a.resumo, publishedTime: a.data, authors: [a.autora] },
    };
}

export default function PaginaArtigo({ params }: { params: { slug: string } }) {
    const a = artigo(params.slug);
    if (!a) notFound();
    const autora = EQUIPE.find((p) => p.nome === a.autora);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: a.titulo,
        description: a.resumo,
        datePublished: a.data,
        author: { "@type": "Person", name: a.autora },
        publisher: { "@type": "Organization", name: "TreinaVISA" },
        inLanguage: "pt-BR",
    };

    return (
        <article>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <header className="artigo-topo">
                <div className="wrap">
                    <Link href="/blog" className="kicker" style={{ textDecoration: "none" }}>← Blog · {a.segmento}</Link>
                    <h1>{a.titulo}</h1>
                    <p className="post-meta">Por {a.autora} · {dataLonga(a.data)} · {a.leitura} min de leitura</p>
                </div>
            </header>
            <div className="wrap artigo-layout">
                <div className="artigo-corpo">
                    {a.blocos.map((b, i) => {
                        if (b.tipo === "h2") return <h2 key={i}>{b.texto}</h2>;
                        if (b.tipo === "lista") return <ul key={i} className="conferido">{b.itens.map((t) => <li key={t}>{t}</li>)}</ul>;
                        if (b.tipo === "nota") return <p key={i} className="artigo-nota">{b.texto}</p>;
                        if (b.tipo === "cta")
                            return (
                                <div key={i} className="artigo-cta">
                                    <p>{b.texto}</p>
                                    <a className="btn btn-compra btn-largo" style={{ justifySelf: "start" }} href={b.href} target="_blank" rel="noopener noreferrer">{b.rotulo}</a>
                                </div>
                            );
                        return <p key={i}>{b.texto}</p>;
                    })}
                    {a.fonte && <p className="artigo-fonte">Fonte: {a.fonte}</p>}
                </div>
                {autora && (
                    <aside className="artigo-lado">
                        <div className="cartao pessoa">
                            <img src={autora.foto} alt={autora.nome} loading="lazy" />
                            <div>
                                <h3>{autora.nome}</h3>
                                <span className="papel">{autora.papel}</span>
                                <p>{autora.bio}</p>
                                {autora.link && <a href={autora.link}>{autora.linkTexto} →</a>}
                            </div>
                        </div>
                    </aside>
                )}
            </div>
        </article>
    );
}
