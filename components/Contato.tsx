"use client";

import { useState } from "react";
import { CONTATO, SEGMENTOS, whatsapp } from "@/content/site";

const ASSUNTOS = [
    "Curso ou aula",
    "Pasta pronta",
    "Vistoria, pasta personalizada ou consultoria",
    "Parceria",
    "Outro assunto",
];

// Grava na planilha (se configurada) e abre o WhatsApp do TreinaVISA com a mensagem pronta.
export default function Contato() {
    const [erro, setErro] = useState("");
    const [enviado, setEnviado] = useState(false);

    function enviar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
        if (d.nome.trim().length < 3) return setErro("Escreva seu nome.");
        if (d.telefone.replace(/\D/g, "").length < 10) return setErro("Escreva seu WhatsApp com DDD.");
        setErro("");

        const planilha = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
        if (planilha && !planilha.includes("SEU_SCRIPT_ID")) {
            fetch(planilha, {
                method: "POST",
                mode: "no-cors",
                keepalive: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...d, source: "formulario-contato", timestamp: new Date().toISOString() }),
            }).catch(() => {});
        }

        const texto = [
            "*Contato pelo site do TreinaVISA*",
            `Nome: ${d.nome}`,
            `WhatsApp: ${d.telefone}`,
            d.negocio && `Negócio: ${d.negocio}`,
            `Assunto: ${d.assunto}`,
            d.mensagem && `\n${d.mensagem}`,
        ].filter(Boolean).join("\n");
        window.open(whatsapp(texto), "_blank", "noopener");
        setEnviado(true);
    }

    return (
        <div className="contato">
            <form className="cartao form" onSubmit={enviar}>
                <div className="form-duas">
                    <label>Seu nome<input name="nome" autoComplete="name" required /></label>
                    <label>Seu WhatsApp<input name="telefone" type="tel" inputMode="tel" autoComplete="tel" required /></label>
                </div>
                <div className="form-duas">
                    <label>
                        Seu negócio
                        <select name="negocio" defaultValue="">
                            <option value="">Escolha</option>
                            {SEGMENTOS.map((s) => <option key={s.slug}>{s.nome}</option>)}
                            <option>Outro</option>
                        </select>
                    </label>
                    <label>
                        Assunto
                        <select name="assunto" defaultValue={ASSUNTOS[0]}>
                            {ASSUNTOS.map((a) => <option key={a}>{a}</option>)}
                        </select>
                    </label>
                </div>
                <label>Sua mensagem<textarea name="mensagem" /></label>
                {erro && <p className="form-erro" role="alert">{erro}</p>}
                {enviado && <p role="status">Abrimos o WhatsApp com a sua mensagem. É só tocar em enviar.</p>}
                <button className="btn btn-azul btn-largo" type="submit">Enviar pelo WhatsApp</button>
            </form>
            <div className="canais">
                <a className="cartao canal" href={CONTATO.whatsappLink} target="_blank" rel="noopener noreferrer">
                    <b>WhatsApp</b><span>{CONTATO.whatsapp}</span>
                </a>
                <a className="cartao canal" href={`mailto:${CONTATO.email}`}>
                    <b>E-mail</b><span>{CONTATO.email}</span>
                </a>
                <a className="cartao canal" href={CONTATO.instagramLink} target="_blank" rel="noopener noreferrer">
                    <b>Instagram</b><span>{CONTATO.instagram}</span>
                </a>
            </div>
        </div>
    );
}
