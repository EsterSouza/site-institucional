"use client";

import { FIM, INICIO } from "@/content/black";
import { whatsapp } from "@/content/site";
import { useAgora } from "./useAgora";

// Antes de abrir, só "??? OFF". Depois, oferta e preço, nunca o código do cupom.
export default function SeloBlack({ nome, oferta, preco }: { nome: string; oferta: string; preco: string }) {
    const t = useAgora(60000);
    if (t !== null && t > FIM) return null;
    if (t === null || t < INICIO) return <span className="item-selo">BLACK FRIDAY · <b>??? OFF</b></span>;
    return (
        <div className="item-black">
            <span className="item-selo">BLACK FRIDAY · <b>{oferta}</b></span>
            <span><b>{preco}</b> com o cupom</span>
            <a href={whatsapp(`Olá! Quero o cupom da Black Friday da ${nome}.`)} target="_blank" rel="noopener noreferrer">
                Pegar o cupom no WhatsApp →
            </a>
        </div>
    );
}
