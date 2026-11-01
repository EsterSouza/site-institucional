export type Bloco =
    | { tipo: "p"; texto: string }
    | { tipo: "h2"; texto: string }
    | { tipo: "lista"; itens: string[] }
    | { tipo: "nota"; texto: string }
    | { tipo: "cta"; texto: string; rotulo: string; href: string };

export type Artigo = {
    slug: string;
    titulo: string;
    resumo: string;
    data: string;
    autora: string;
    segmento: string;
    leitura: number;
    blocos: Bloco[];
    fonte?: string;
};
