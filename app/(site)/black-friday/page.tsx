import type { Metadata } from "next";
import { LIVE } from "@/content/site";

export const metadata: Metadata = {
    title: "Black November do TreinaVISA",
    description:
        "Documentos prontos, vistoria com plano de ação e aula com quem fiscalizou, com desconto até 30/11. Ofertas da Ester Caiafa, da Ana Roberta e a live da Rosalia Cova.",
    alternates: { canonical: "/black-friday" },
    robots: { index: false, follow: true },
};

// A lista de cada data vem da API da Consultora, a mesma do bf26.js: só sai de lá o que já abriu,
// pelo relógio do servidor. Esta página se refaz a cada minuto, então a data nova aparece sozinha.
export const revalidate = 60;

const API = process.env.BF_API ?? "https://www.consultorasanitaria.com.br/api/black-friday";

type Item = { nome: string; href: string; nota?: string; ana?: true; curso?: true; area?: string };
type Onda = { onda: string; dia: string; titulo: string; frase?: string; oferta: string; itens: Item[] };
type Linha = Item & { quem: string; selo?: string };

// Título e frase de cada data no TreinaVISA: curtos. Nunca falar mal de modelo pronto, porque as
// pastas prontas são nossas. Ficam no servidor e só vão para a página quando a data abre.
const TITULO: Record<string, string> = { nov11: "Pastas prontas e ferramentas" };
const TEXTO: Record<string, string> = {
    nov03: "Dê o primeiro passo para receber a fiscalização com tranquilidade.",
    nov11: "Documentos editáveis para quem quer começar agora e montar a pasta por conta própria.",
    nov18: "Alguém do seu lado o ano inteiro.",
};

// As datas que ainda não abriram mostram só a dica, a mesma do post fixado no Instagram.
const PROXIMAS = [
    { dia: "18/11", abre: "2026-11-18T00:00:00-03:00", dica: "Para quem quer alguém do lado o ano inteiro." },
    { dia: "30/11", abre: "2026-11-30T00:00:00-03:00", dica: "A última. A oferta mais completa fica para o fim." },
];

async function ondasAbertas(): Promise<Onda[]> {
    try {
        const u = new URL(API);
        u.searchParams.set("itens", "1");
        const r = await fetch(u, { next: { revalidate: 60 } });
        if (!r.ok) return [];
        const j = await r.json();
        return Array.isArray(j.ofertas) ? j.ofertas : [];
    } catch {
        return [];
    }
}

const quem = (i: Item) => (i.ana ? "Ana Roberta · Consultora Nutricionista" : "Ester Caiafa · Consultora Sanitária");

function Lista({ itens }: { itens: Linha[] }) {
    return (
        <ul className="bfn-lista">
            {itens.map((i) => (
                <li key={i.nome}>
                    <a href={i.href}>
                        <span className="bfn-item">
                            <span className="bfn-marcas">
                                {i.area && (
                                    <span className={`bfn-carimbo${i.area === "Alimentos" ? " bfn-carimbo-alimentos" : ""}`}>
                                        {i.area}
                                    </span>
                                )}
                                {i.selo && <span className="bfn-selo bfn-selo-item">{i.selo}</span>}
                            </span>
                            <strong>{i.nome}</strong>
                            <span className="bfn-quem">{i.quem}</span>
                            {/* "R$" nunca fica numa linha e o valor na outra. */}
                            {i.nota && <span className="bfn-nota">{i.nota.replace(/R\$ /g, "R$ ")}</span>}
                        </span>
                        <span className="bfn-seta" aria-hidden>
                            →
                        </span>
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default async function BlackNovember() {
    const agora = Date.now();
    const ondas = (await ondasAbertas()).reverse();
    const lote = agora <= +new Date(LIVE.lote.fim);
    const live: Linha = {
        nome: `Live: ${LIVE.titulo}`,
        href: LIVE.link,
        area: "Alimentos",
        quem: "Rosalia Cova · Mais de 20 anos de fiscalização",
        selo: lote ? `Lote promocional até ${LIVE.lote.ate}` : undefined,
        nota: `Ao vivo em 01/12. ${LIVE.preco} com certificado${
            lote ? `. Replay por ${LIVE.lote.replay} até ${LIVE.lote.ate}` : ""
        }.`,
    };
    const proximas = PROXIMAS.filter((p) => agora < +new Date(p.abre));

    return (
        <div className="bfn">
            <section className="bfn-abre">
                <div className="wrap">
                    <h1>Black November do TreinaVISA</h1>
                    <p>
                        Em novembro, quem já esteve do outro lado do balcão entrega o caminho das pedras com
                        desconto, para você receber a fiscalização com tranquilidade.
                    </p>
                </div>
            </section>

            {agora < +new Date(LIVE.fim) && (
                <section id="lives" className="bfn-onda">
                    <div className="wrap bfn-grade">
                        <div className="bfn-cabeca">
                            <h2>Lives</h2>
                            <p>O que conferir na cozinha em dezembro, com quem fiscalizou por mais de 20 anos.</p>
                        </div>
                        <Lista itens={[live]} />
                    </div>
                </section>
            )}

            {ondas.map((o) => {
                // Curso fica de fora: a seção de aulas desta página é só a live.
                const itens = o.itens.filter((i) => !i.curso).map((i) => ({ ...i, quem: quem(i) }));
                if (!itens.length) return null;
                return (
                    <section key={o.onda} id={o.onda} className="bfn-onda">
                        <div className="wrap bfn-grade">
                            <div className="bfn-cabeca">
                                <span className="bfn-selo">{o.oferta}</span>
                                <h2>{TITULO[o.onda] ?? o.titulo}</h2>
                                {(TEXTO[o.onda] ?? o.frase) && <p>{TEXTO[o.onda] ?? o.frase}</p>}
                            </div>
                            <Lista itens={itens} />
                        </div>
                    </section>
                );
            })}

            {proximas.length > 0 && (
                <section id="proximas" className="bfn-onda">
                    <div className="wrap bfn-grade">
                        <div className="bfn-cabeca">
                            <h2>Próximas datas</h2>
                        </div>
                        <div className="bfn-proximas">
                            <ul>
                                {proximas.map((p) => (
                                    <li key={p.dia}>
                                        <span className="bfn-dia">{p.dia}</span>
                                        <strong className="bfn-dica">{p.dica}</strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
