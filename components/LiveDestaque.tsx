"use client";

import { useEffect, useState } from "react";
import { LIVE } from "@/content/site";

// Depois que a live acaba, o mesmo espaço passa a vender o replay.
export default function LiveDestaque() {
    const [acabou, setAcabou] = useState(false);
    useEffect(() => {
        const fim = +new Date(LIVE.fim);
        const ver = () => setAcabou(Date.now() >= fim);
        ver();
        const id = setInterval(ver, 60000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="live" aria-label="Live em destaque">
            <div className="live-foto">
                <img src="/fotos/rosalia.webp" alt="Rosalia Cova" width={900} height={1125} />
                <span className="live-selo">{acabou ? "Replay disponível" : "Live ao vivo"}</span>
            </div>
            <div className="live-info">
                <span className="kicker">{acabou ? "Assista quando quiser" : "Nova aula · alimentação"}</span>
                <h2>{LIVE.titulo}</h2>
                <p className="live-com">
                    com <b>{LIVE.com}</b>, nutricionista com mais de 20 anos de fiscalização sanitária
                </p>
                {acabou ? (
                    <ul className="conferido">
                        <li>As 3 horas da live, para rever quando quiser</li>
                        <li>Acesso por 1 ano</li>
                    </ul>
                ) : (
                    <>
                        <div className="live-quando">
                            <span>Terça, 01/12</span>
                            <span>Ao vivo, online</span>
                        </div>
                        <ul className="conferido">
                            <li>O que o fiscal olha na cozinha em dezembro, na manipulação dos alimentos de festa</li>
                            <li>Certificado de 3 horas e e-book da aula</li>
                            <li>Entrada no grupo VIP do TreinaVISA</li>
                        </ul>
                    </>
                )}
                <div className="live-compra">
                    <span className="live-preco">
                        {acabou ? LIVE.replayPreco : LIVE.preco}
                        <small>{acabou ? "replay" : "ingresso"}</small>
                    </span>
                    <a
                        className="btn btn-compra btn-largo"
                        href={acabou ? LIVE.replayLink : LIVE.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {acabou ? "Quero o replay" : "Garantir meu ingresso"}
                    </a>
                </div>
            </div>
        </section>
    );
}
