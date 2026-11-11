import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ItemCard from "@/components/ItemCard";
import { SEGMENTOS, segmento, whatsapp } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
    return SEGMENTOS.map((s) => ({ segmento: s.slug }));
}

export function generateMetadata({ params }: { params: { segmento: string } }): Metadata {
    const s = segmento(params.segmento);
    if (!s) return {};
    return {
        title: `${s.nome}: aulas, pastas e serviços sanitários`,
        description: `${s.para} ${s.resumo}, com o TreinaVISA.`,
        alternates: { canonical: `/${s.slug}` },
    };
}

export default function PaginaSegmento({ params }: { params: { segmento: string } }) {
    const s = segmento(params.segmento);
    if (!s) notFound();

    const grupos = [
        { titulo: "Aprender", sub: "aulas e cursos", itens: s.aprender },
        { titulo: "Aplicar", sub: "pastas e materiais prontos", itens: s.aplicar },
        { titulo: "Contratar", sub: "serviço feito com você", itens: s.contratar },
    ].filter((g) => g.itens.length);

    return (
        <>
            <section className="seg-topo">
                <div className="wrap">
                    <Link href="/#segmentos" className="kicker" style={{ textDecoration: "none" }}>← Todos os tipos de negócio</Link>
                    <h1>{s.nome}</h1>
                    <p>{s.para}</p>
                    <p className="seg-quem">{s.quem}</p>
                </div>
            </section>
            <section className="secao">
                <div className="wrap">
                    {grupos.map((g) => (
                        <div key={g.titulo} className="grupo">
                            <div className="grupo-cabeca">
                                <h2>{g.titulo}</h2>
                                <span>{g.sub}</span>
                            </div>
                            <div className={`itens${g.itens.length > 2 ? " tres" : ""}`}>
                                {g.itens.map((i) => <ItemCard key={i.nome} item={i} />)}
                            </div>
                        </div>
                    ))}
                    <div className="cartao" style={{ marginTop: 36, display: "grid", gap: 12 }}>
                        <h2 style={{ fontSize: 22 }}>Não sabe por onde começar?</h2>
                        <p style={{ color: "var(--mudo)" }}>Conte como é o seu negócio. A gente indica o que faz sentido para você.</p>
                        <a
                            className="btn btn-zap btn-largo"
                            style={{ justifySelf: "start" }}
                            href={whatsapp(`Olá! Tenho um negócio de ${s.nome.toLowerCase()} e quero ajuda para escolher.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Falar no WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
