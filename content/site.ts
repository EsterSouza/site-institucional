// Tudo o que o site mostra sai daqui: contato, equipe, segmentos e produtos.
// Preços conferidos na Cakto em 01/11/2026.

export const CONTATO = {
    whatsapp: "(21) 99053-0863",
    whatsappLink: "https://wa.me/5521990530863",
    email: "contato@treinavisa.com.br",
    instagram: "@treinavisa",
    instagramLink: "https://instagram.com/treinavisa",
    cnpj: "53.297.694/0001-37",
};

export function whatsapp(texto: string) {
    return `${CONTATO.whatsappLink}?text=${encodeURIComponent(texto)}`;
}

export const LIVE = {
    titulo: "Festas de fim de ano na cozinha",
    com: "Rosalia Cova",
    quando: "Terça, 01/12, das 14h às 17h",
    inclui: "Live de 3 horas, certificado de 3h, e-book da aula e grupo VIP",
    preco: "R$ 47",
    link: "https://live-festas.treinavisa.com.br",
    fim: "2026-12-01T17:00:00-03:00",
    replayPreco: "R$ 47",
    replayLink: "https://pay.cakto.com.br/3fcqajs_1241984",
};

export type Pessoa = {
    nome: string;
    papel: string;
    bio: string;
    foto: string;
    link?: string;
    linkTexto?: string;
};

export const EQUIPE: Pessoa[] = [
    {
        nome: "Ester Caiafa",
        papel: "Fundadora · Enfermeira sanitarista",
        bio: "Especialista em Vigilância Sanitária pelo IVISA-Rio e pós-graduanda em Gestão de Clínicas. Atende clínicas de saúde e estética, salões e ILPIs na Consultora Sanitária.",
        foto: "/fotos/ester.webp",
        link: "https://www.consultorasanitaria.com.br",
        linkTexto: "Consultora Sanitária",
    },
    {
        nome: "Ana Roberta Ribeiro",
        papel: "Nutricionista · Alimentação",
        bio: "Especialista em Gerontologia e em Vigilância Sanitária, com experiência em fiscalização, auditoria e gestão sanitária de serviços de alimentação.",
        foto: "/fotos/ana.webp",
        link: "https://institucional-ana.consultorasanitaria.com.br",
        linkTexto: "Consultoria de alimentos",
    },
    {
        nome: "Rosalia Cova",
        papel: "Parceira · Nutricionista",
        bio: "Nutricionista formada há 35 anos, com mais de 20 anos de fiscalização no IVISA-Rio e mais de 5 mil capacitados.",
        foto: "/fotos/rosalia.webp",
        link: LIVE.link,
        linkTexto: "Live de 01/12",
    },
];

export const GRUPOS_VIP = [
    {
        nome: "Grupo VIP do TreinaVISA",
        texto: "Avisos de lives, aulas, materiais novos e ofertas, direto no WhatsApp.",
        link: "https://chat.whatsapp.com/FQ51he8Xo8x5BoVBTbl1zV",
    },
];

export type Item = {
    nome: string;
    detalhe: string;
    preco?: string;
    link: string;
    botao: string;
};

export type Segmento = {
    slug: string;
    nome: string;
    para: string;
    resumo: string;
    quem: string;
    aprender: Item[];
    aplicar: Item[];
    contratar: Item[];
};

const VISTORIA_ESTER: Item = {
    nome: "Vistoria + Plano de Ação",
    detalhe: "Diagnóstico do seu estabelecimento, com plano de ação priorizado.",
    preco: "R$ 997 online · R$ 1.297 presencial",
    link: "https://vistoria.consultorasanitaria.com.br",
    botao: "Ver a vistoria",
};
const PERSONALIZADA_ESTER: Item = {
    nome: "Pasta Sanitária Personalizada",
    detalhe: "Documentos escritos para a rotina do seu serviço, com os dados do seu estabelecimento.",
    preco: "a partir de R$ 597",
    link: "https://pasta-sanitaria.consultorasanitaria.com.br",
    botao: "Ver a pasta",
};
const CONSULTORIA_360: Item = {
    nome: "Consultoria 360º",
    detalhe: "Acompanhamento sanitário anual com a Consultora Sanitária.",
    link: "https://www.consultorasanitaria.com.br/consultoria-360",
    botao: "Conhecer a consultoria",
};

export const SEGMENTOS: Segmento[] = [
    {
        slug: "alimentacao",
        nome: "Alimentação",
        para: "Restaurantes, padarias, confeitarias, cozinhas industriais, buffets e quem produz comida para vender.",
        resumo: "Live, imersão, pastas prontas e consultoria",
        quem: "Com a nutricionista Ana Roberta e a convidada Rosalia Cova.",
        aprender: [
            {
                nome: "Live: Festas de fim de ano na cozinha",
                detalhe: `Com Rosalia Cova. ${LIVE.quando}. ${LIVE.inclui}.`,
                preco: LIVE.preco,
                link: LIVE.link,
                botao: "Garantir ingresso",
            },
            {
                nome: "Imersão em Boas Práticas de Manipulação",
                detalhe: "Curso online com a nutricionista Ana Roberta.",
                preco: "R$ 97",
                link: "https://pay.cakto.com.br/3aiebbp",
                botao: "Quero a imersão",
            },
        ],
        aplicar: [
            {
                nome: "Kit Pasta Sanitária para Serviços de Alimentação",
                detalhe: "54 documentos: Manual de Boas Práticas, POPs, planilhas e checklists.",
                preco: "R$ 47,99",
                link: "https://lp-pasta-alimentos.consultorasanitaria.com.br",
                botao: "Ver o kit",
            },
            {
                nome: "Kit Pasta Sanitária para Padaria, Confeitaria e Boleria",
                detalhe: "112 documentos para padaria, confeitaria e boleria.",
                preco: "R$ 97",
                link: "https://lp-padaria.consultorasanitaria.com.br",
                botao: "Ver o kit",
            },
        ],
        contratar: [
            {
                nome: "Pasta Sanitária Personalizada para Alimentação",
                detalhe: "Manual de Boas Práticas, POPs e planilhas feitos para a sua cozinha. Digital ou impressa.",
                preco: "a partir de R$ 497",
                link: "https://pasta-personalizada-alimentos.consultorasanitaria.com.br",
                botao: "Ver a pasta",
            },
            {
                nome: "Vistoria + Plano de Ação para alimentação",
                detalhe: "Diagnóstico técnico da sua cozinha, com plano de ação priorizado.",
                preco: "R$ 997 online · R$ 1.297 presencial",
                link: "https://lp-vistoria-restaurante.consultorasanitaria.com.br",
                botao: "Ver a vistoria",
            },
            {
                nome: "Consultoria com a Ana Roberta",
                detalhe: "Acompanhamento sanitário para negócios de alimentação, do diagnóstico à rotina.",
                link: "https://institucional-ana.consultorasanitaria.com.br",
                botao: "Falar com a Ana",
            },
        ],
    },
    {
        slug: "estetica-e-beleza",
        nome: "Estética e beleza",
        para: "Clínicas de estética, esteticistas, salões, manicures, pedicures e nail designers.",
        resumo: "Pastas prontas, vistoria e consultoria",
        quem: "Com a enfermeira sanitarista Ester Caiafa.",
        aprender: [],
        aplicar: [
            {
                nome: "Pasta Sanitária POPs e Fichas para Estética",
                detalhe: "142 documentos: POPs por procedimento, fichas de anamnese e documentos base.",
                preco: "R$ 39,97",
                link: "https://estetica.consultorasanitaria.com.br",
                botao: "Ver a pasta",
            },
            {
                nome: "Pasta Sanitária para Manicure, Pedicure e Nail Design",
                detalhe: "Pasta pronta para o atendimento de unhas.",
                preco: "R$ 97",
                link: "https://manicure.consultorasanitaria.com.br",
                botao: "Ver a pasta",
            },
        ],
        contratar: [PERSONALIZADA_ESTER, VISTORIA_ESTER, CONSULTORIA_360],
    },
    {
        slug: "saude",
        nome: "Saúde",
        para: "Clínicas, consultórios médicos e odontológicos e demais serviços de saúde.",
        resumo: "Revestimentos, vistoria e consultoria",
        quem: "Com a enfermeira sanitarista Ester Caiafa.",
        aprender: [],
        aplicar: [
            {
                nome: "Biblioteca de Revestimentos para Clínicas e Consultórios",
                detalhe: "Referência de revestimentos para a obra ou a reforma da clínica.",
                preco: "R$ 97",
                link: "https://revestimentos.consultorasanitaria.com.br",
                botao: "Ver a biblioteca",
            },
        ],
        contratar: [PERSONALIZADA_ESTER, VISTORIA_ESTER, CONSULTORIA_360],
    },
    {
        slug: "ilpi",
        nome: "ILPI",
        para: "Instituições de longa permanência para idosos e casas de repouso.",
        resumo: "Pasta pronta, kits e consultoria",
        quem: "Com a enfermeira sanitarista Ester Caiafa e a nutricionista Ana Roberta.",
        aprender: [],
        aplicar: [
            {
                nome: "Pasta Sanitária Básica para ILPI",
                detalhe: "Mais de 30 POPs prontos e editáveis. Na mesma página: kits de nutrição, de gestão e oficinas para idosos.",
                preco: "R$ 67",
                link: "https://lp-pasta-ilpi.consultorasanitaria.com.br",
                botao: "Ver a pasta",
            },
        ],
        contratar: [VISTORIA_ESTER, CONSULTORIA_360],
    },
];

export function segmento(slug: string) {
    return SEGMENTOS.find((s) => s.slug === slug);
}
