export type Bloco =
    | { tipo: "p"; texto: string }
    | { tipo: "h2"; texto: string }
    | { tipo: "lista"; itens: string[] }
    | { tipo: "nota"; texto: string }
    | { tipo: "cta"; texto: string; rotulo: string; href: string }
    | { tipo: "lei"; artigo: string; paragrafos: string[]; destaques?: string[] }
    | { tipo: "etapas"; itens: { titulo: string; texto: string }[] }
    | { tipo: "tabela"; colunas: string[]; linhas: string[][] }
    | { tipo: "imagem"; src: string; alt: string; legenda: string; largura: number; altura: number }
    // Lista os H2 do artigo com link para cada um.
    | { tipo: "sumario" }
    | { tipo: "faq"; itens: { pergunta: string; resposta: string }[] }
    // Chamada para material gratuito, com a capa ao lado.
    | { tipo: "isca"; titulo: string; texto: string; rotulo: string; href: string; capa: string };

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
    // Imagem 1200x630 para o compartilhamento em rede social e WhatsApp.
    compartilhar?: { src: string; alt: string };
};
