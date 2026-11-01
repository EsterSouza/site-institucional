"use client";

import { CYBER, FIM, INICIO } from "@/content/black";
import { whatsapp } from "@/content/site";
import { useAgora } from "./useAgora";

// Nome e oferta de cada surpresa só aparecem quando ela abre.
const CALENDARIO = [
    { dia: "03/11", abre: INICIO, nome: "Pastas prontas", oferta: "30% OFF" },
    { dia: "11/11", abre: +new Date("2026-11-11T00:00:00-03:00"), nome: "Vistorias e pastas personalizadas", oferta: "30% OFF" },
    { dia: "18/11", abre: +new Date("2026-11-18T00:00:00-03:00"), nome: "Consultoria 360º", oferta: "R$ 1.000 OFF" },
    { dia: "30/11", abre: CYBER, nome: "Cyber Monday", oferta: "SÓ HOJE" },
];

const AVISO = whatsapp("Olá! Quero receber as surpresas da Black Friday do TreinaVISA assim que abrirem.");
const IMERSAO_ANTES = whatsapp("Olá! Quero saber da Black Friday da Imersão em Boas Práticas de Manipulação.");
const IMERSAO_CUPOM = whatsapp("Olá! Quero o cupom da Black Friday da Imersão em Boas Práticas de Manipulação.");

const z = (n: number) => String(n).padStart(2, "0");

export default function VitrineBlack() {
    const t = useAgora();

    if (t === null || t > FIM) return null;

    const vez = CALENDARIO.find((c) => t < c.abre)?.abre ?? null;
    let titulo, sub, alvo;
    if (t >= CYBER) {
        titulo = <>Último dia da <em>Black Friday.</em></>;
        sub = "A oferta única de hoje termina em";
        alvo = FIM;
    } else if (t < INICIO) {
        titulo = <>Quatro surpresas. <em>Uma de cada vez.</em></>;
        sub = "Cada uma abre à meia-noite do seu dia. A primeira abre em";
        alvo = INICIO;
    } else {
        titulo = <>A Black Friday <em>começou.</em></>;
        sub = "A próxima surpresa abre em";
        alvo = vez ?? FIM;
    }
    const s = Math.max(0, Math.floor((alvo - t) / 1000));
    const partes = [
        [Math.floor(s / 86400), "dias"],
        [Math.floor((s % 86400) / 3600), "horas"],
        [Math.floor((s % 3600) / 60), "min"],
        [s % 60, "seg"],
    ] as const;

    return (
        <section className="bf" aria-label="Black Friday">
            <div className="wrap bf-in">
                <div>
                    <span className="bf-selo">BLACK FRIDAY</span>
                    <h2>{titulo}</h2>
                    <p className="bf-rot">{sub}</p>
                    <div className="bf-relogio" role="timer">
                        {partes.map(([n, r]) => (
                            <div key={r}><b>{z(n)}</b><span>{r}</span></div>
                        ))}
                    </div>
                    <div className="bf-cal">
                        {CALENDARIO.map((c, i) =>
                            t >= c.abre ? (
                                <div key={c.dia} className="bf-dia aberta">
                                    <span className="bf-data">{c.dia}</span>
                                    <b>{c.nome}</b>
                                    <em>{c.oferta}</em>
                                    <small>já abriu</small>
                                </div>
                            ) : (
                                <div key={c.dia} className={`bf-dia${c.abre === vez ? " vez" : ""}`}>
                                    <span className="bf-data">{c.dia}</span>
                                    <b>{i === 3 ? "Cyber Monday: oferta única de 24 horas" : `Surpresa nº ${i + 1}`}</b>
                                    <em>???</em>
                                    <small>abre à meia-noite</small>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="bf-lado">
                    <div className="bf-imersao">
                        {t < INICIO ? (
                            <>
                                <span className="bf-selo">??? OFF</span>
                                <h3>Imersão em Boas Práticas de Manipulação</h3>
                                <p>A imersão da nutricionista Ana Roberta também entra na Black Friday.</p>
                                <a className="btn bf-btn" href={IMERSAO_ANTES} target="_blank" rel="noopener noreferrer">
                                    Quero saber o desconto
                                </a>
                            </>
                        ) : (
                            <>
                                <span className="bf-selo">30% OFF</span>
                                <h3>Imersão em Boas Práticas de Manipulação</h3>
                                <p>Com a nutricionista Ana Roberta. De R$ 97 por <b>R$ 67,90</b> com o cupom.</p>
                                <a className="btn bf-btn" href={IMERSAO_CUPOM} target="_blank" rel="noopener noreferrer">
                                    Quero o cupom
                                </a>
                            </>
                        )}
                    </div>
                    <div className="bf-aviso">
                        <h3>Quer saber antes de todo mundo?</h3>
                        <p>Mande um oi no WhatsApp do TreinaVISA. Cada surpresa chega para você no minuto em que abrir.</p>
                        <a className="btn btn-zap" href={AVISO} target="_blank" rel="noopener noreferrer">
                            Avisar pelo WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
