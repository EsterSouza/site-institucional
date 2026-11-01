import Link from "next/link";
import LiveDestaque from "@/components/LiveDestaque";
import VitrineBlack from "@/components/VitrineBlack";
import ItemCard from "@/components/ItemCard";
import Contato from "@/components/Contato";
import { EQUIPE, GRUPOS_VIP, SEGMENTOS, segmento } from "@/content/site";
import { ARTIGOS, dataLonga } from "@/content/artigos";

export default function Home() {
    const aulas = segmento("alimentacao")!.aprender;
    const ultimo = ARTIGOS[0];

    return (
        <>
            <section className="abertura">
                <div className="wrap">
                    <div className="abertura-topo">
                        <div>
                            <span className="kicker">TreinaVISA · educação e serviços sanitários</span>
                            <h1 style={{ marginTop: 12 }}>Soluções sanitárias com quem já esteve do outro lado.</h1>
                        </div>
                        <div>
                            <p className="abertura-sub">
                                Aulas, pastas prontas, vistorias e consultoria para alimentação, estética e beleza, saúde e ILPI. Escolha o seu tipo de negócio:
                            </p>
                            <nav className="chips" aria-label="Tipos de negócio">
                                {SEGMENTOS.map((s) => (
                                    <Link key={s.slug} href={`/${s.slug}`}>{s.nome}</Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                    <LiveDestaque />
                </div>
            </section>

            <VitrineBlack />

            <section className="secao" id="segmentos">
                <div className="wrap">
                    <div className="secao-cabeca">
                        <span className="kicker">Por tipo de negócio</span>
                        <h2>O que o TreinaVISA tem para o seu negócio</h2>
                        <p>Em cada um: o que aprender, o que aplicar já e o que contratar quando precisar de alguém do seu lado.</p>
                    </div>
                    <div className="segs">
                        {SEGMENTOS.map((s) => (
                            <Link key={s.slug} href={`/${s.slug}`} className="cartao seg">
                                <h3>{s.nome}</h3>
                                <p>{s.para}</p>
                                <span className="seg-tem">{s.resumo}</span>
                                <span className="seg-ir">Ver soluções →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="secao" id="aulas" style={{ background: "#fff", borderTop: "1px solid var(--borda)", borderBottom: "1px solid var(--borda)" }}>
                <div className="wrap">
                    <div className="secao-cabeca">
                        <span className="kicker">Aulas abertas</span>
                        <h2>Para aprender com quem conhece a rotina da fiscalização</h2>
                    </div>
                    <div className="itens">
                        {aulas.map((a) => <ItemCard key={a.nome} item={a} />)}
                    </div>
                </div>
            </section>

            <section className="secao" id="equipe">
                <div className="wrap">
                    <div className="secao-cabeca">
                        <span className="kicker">Quem está por trás</span>
                        <h2>A equipe do TreinaVISA</h2>
                    </div>
                    <div className="ppl">
                        {EQUIPE.map((p) => (
                            <article key={p.nome} className="cartao pessoa">
                                <img src={p.foto} alt={p.nome} loading="lazy" />
                                <div>
                                    <h3>{p.nome}</h3>
                                    <span className="papel">{p.papel}</span>
                                    <p>{p.bio}</p>
                                    {p.link && <a href={p.link}>{p.linkTexto} →</a>}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {GRUPOS_VIP.map((g) => (
                <section key={g.link} className="vip">
                    <div className="wrap vip-in">
                        <div>
                            <h2>{g.nome}</h2>
                            <p>{g.texto}</p>
                        </div>
                        <a className="btn btn-zap btn-largo" href={g.link} target="_blank" rel="noopener noreferrer">
                            Entrar no grupo
                        </a>
                    </div>
                </section>
            ))}

            {ultimo && (
                <section className="secao">
                    <div className="wrap">
                        <div className="secao-cabeca">
                            <span className="kicker">Blog</span>
                            <h2>Para ler antes da próxima inspeção</h2>
                        </div>
                        <div className="posts">
                            <Link href={`/blog/${ultimo.slug}`} className="cartao post">
                                <span className="post-meta">{ultimo.segmento} · {dataLonga(ultimo.data)} · {ultimo.leitura} min</span>
                                <h3>{ultimo.titulo}</h3>
                                <p>{ultimo.resumo}</p>
                                <span className="post-ir">Ler o artigo →</span>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <section className="secao" id="contato" style={{ background: "#fff", borderTop: "1px solid var(--borda)" }}>
                <div className="wrap">
                    <div className="secao-cabeca">
                        <span className="kicker">Contato</span>
                        <h2>Conte o que o seu negócio precisa</h2>
                        <p>A gente responde pelo WhatsApp e indica o caminho certo: aula, pasta pronta ou serviço.</p>
                    </div>
                    <Contato />
                </div>
            </section>
        </>
    );
}
