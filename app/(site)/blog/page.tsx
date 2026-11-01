import type { Metadata } from "next";
import Link from "next/link";
import { ARTIGOS, dataLonga } from "@/content/artigos";

export const metadata: Metadata = {
    title: "Blog",
    description: "Artigos sobre vigilância sanitária para quem tem negócio de alimentação, estética e beleza, saúde e ILPI.",
    alternates: { canonical: "/blog" },
};

export default function Blog() {
    return (
        <>
            <section className="seg-topo">
                <div className="wrap">
                    <span className="kicker">Blog do TreinaVISA</span>
                    <h1>Para ler antes da próxima inspeção</h1>
                    <p>Normas explicadas para a rotina de quem atende o público.</p>
                </div>
            </section>
            <section className="secao">
                <div className="wrap posts">
                    {ARTIGOS.map((a) => (
                        <Link key={a.slug} href={`/blog/${a.slug}`} className="cartao post">
                            <span className="post-meta">{a.segmento} · {dataLonga(a.data)} · {a.leitura} min</span>
                            <h2 style={{ fontSize: 22 }}>{a.titulo}</h2>
                            <p>{a.resumo}</p>
                            <span className="post-ir">Ler o artigo →</span>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
