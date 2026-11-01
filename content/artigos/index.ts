import type { Artigo } from "./tipos";
import { hialuronidaseNaEstetica } from "./hialuronidase-na-estetica";

// Mais novo primeiro.
export const ARTIGOS: Artigo[] = [hialuronidaseNaEstetica];

export function artigo(slug: string) {
    return ARTIGOS.find((a) => a.slug === slug);
}

export function dataLonga(iso: string) {
    return new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "America/Sao_Paulo",
    });
}
