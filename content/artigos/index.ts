import type { Artigo } from "./tipos";
import { hialuronidaseNaEstetica } from "./hialuronidase-na-estetica";
import { lei15524Comentada } from "./lei-15524-comentada";

// Mais novo primeiro.
export const ARTIGOS: Artigo[] = [lei15524Comentada, hialuronidaseNaEstetica];

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
