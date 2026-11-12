import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTIGOS, artigo, dataLonga } from "@/content/artigos";
import { EQUIPE } from "@/content/site";

export const dynamicParams = false;

// Marca cada trecho de `destaques` com <mark>, na ordem em que aparece no texto.
function realce(texto: string, destaques: string[] = []) {
    const partes: (string | JSX.Element)[] = [];
    let resto = texto;
    for (const d of destaques) {
        const i = resto.indexOf(d);
        if (i < 0) continue;
        partes.push(resto.slice(0, i), <mark key={d}>{d}</mark>);
        resto = resto.slice(i + d.length);
    }
    partes.push(resto);
    return partes;
}

// Âncora do H2 a partir do texto: sem acento, minúsculas e hífen.
function ancora(texto: string) {
    return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

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
        openGraph: {
            type: "article",
            title: a.titulo,
            description: a.resumo,
            publishedTime: a.data,
            authors: [a.autora],
            ...(a.compartilhar && { images: [{ url: a.compartilhar.src, width: 1200, height: 630, alt: a.compartilhar.alt }] }),
        },
        ...(a.compartilhar && { twitter: { card: "summary_large_image", title: a.titulo, description: a.resumo, images: [a.compartilhar.src] } }),
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
        ...(a.compartilhar && { image: a.compartilhar.src }),
    };
    const titulos = a.blocos.flatMap((b) => (b.tipo === "h2" ? [b.texto] : []));
    const faq = a.blocos.flatMap((b) => (b.tipo === "faq" ? b.itens : []));
    const faqLd = faq.length > 0 && {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.pergunta, acceptedAnswer: { "@type": "Answer", text: f.resposta } })),
    };

    return (
        <article>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
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
                        if (b.tipo === "h2") return <h2 key={i} id={ancora(b.texto)}>{b.texto}</h2>;
                        if (b.tipo === "sumario")
                            return (
                                <nav key={i} className="artigo-sumario" aria-label="Neste artigo">
                                    <span className="artigo-lei-tag">Neste artigo</span>
                                    <ol>{titulos.map((t) => <li key={t}><a href={`#${ancora(t)}`}>{t}</a></li>)}</ol>
                                </nav>
                            );
                        if (b.tipo === "faq")
                            return (
                                <div key={i} className="artigo-faq">
                                    {b.itens.map((f) => (
                                        <div key={f.pergunta}>
                                            <h3>{f.pergunta}</h3>
                                            <p>{f.resposta}</p>
                                        </div>
                                    ))}
                                </div>
                            );
                        if (b.tipo === "isca")
                            return (
                                <aside key={i} className="artigo-isca">
                                    <img src={b.capa} alt={`Capa do material ${b.titulo}`} width={640} height={905} loading="lazy" />
                                    <div>
                                        <span className="artigo-lei-tag">Material gratuito</span>
                                        <h3>{b.titulo}</h3>
                                        <p>{b.texto}</p>
                                        <a className="btn btn-azul" href={b.href} target="_blank" rel="noopener noreferrer">{b.rotulo}</a>
                                    </div>
                                </aside>
                            );
                        if (b.tipo === "lista") return <ul key={i} className="conferido">{b.itens.map((t) => <li key={t}>{t}</li>)}</ul>;
                        if (b.tipo === "nota") return <p key={i} className="artigo-nota">{b.texto}</p>;
                        if (b.tipo === "lei")
                            return (
                                <blockquote key={i} className="artigo-lei">
                                    <span className="artigo-lei-tag">Texto da lei · {b.artigo}</span>
                                    {b.paragrafos.map((t) => <p key={t}>{realce(t, b.destaques)}</p>)}
                                </blockquote>
                            );
                        if (b.tipo === "etapas")
                            return (
                                <ol key={i} className="artigo-etapas">
                                    {b.itens.map((e) => <li key={e.titulo}><b>{e.titulo}</b>{e.texto}</li>)}
                                </ol>
                            );
                        if (b.tipo === "tabela")
                            return (
                                <div key={i} className="artigo-tabela">
                                    <table>
                                        <thead><tr>{b.colunas.map((c) => <th key={c}>{c}</th>)}</tr></thead>
                                        <tbody>{b.linhas.map((l) => <tr key={l[0]}>{l.map((c, j) => <td key={j} data-col={b.colunas[j]}>{c}</td>)}</tr>)}</tbody>
                                    </table>
                                </div>
                            );
                        if (b.tipo === "imagem")
                            return (
                                <figure key={i} className="artigo-imagem">
                                    <img src={b.src} alt={b.alt} width={b.largura} height={b.altura} loading="lazy" />
                                    <figcaption>{b.legenda}</figcaption>
                                </figure>
                            );
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
