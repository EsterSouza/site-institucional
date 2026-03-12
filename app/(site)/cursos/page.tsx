import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Shield, ArrowRight, ChevronRight, BookOpen } from "lucide-react";
import CursosFiltro from "./CursosFiltro";
import { client } from "@/sanity/lib/client";
import { allCursosQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
    title: "Cursos e Formações Sanitárias | TreinaVISA",
    description:
        "Catálogo completo de cursos práticos para Saúde, Estética, Alimentos e ILPI. Aprenda a implementar Boas Práticas e evite multas da Vigilância Sanitária.",
};

export const revalidate = 60; // Revalida a cada minuto

/* ──────────────────────────────────
   Dados dos cursos (Fallback)
   ────────────────────────────────── */
const cursosFallback = [
    {
        id: "gabaritando-estetica",
        segmento: "Saúde",
        tag: "Masterclass · Online",
        titulo: "Gabaritando a Fiscalização em Estética",
        descricao:
            "Domine os 25 itens críticos do roteiro oficial da ANVISA. Regularize sua clínica de estética e elimine o risco de autos de infração.",
        imagem: "/capa-curso-estetica.png",
        status: "aberto" as const,
        preco: "12x R$ 9,68",
        precoAVista: "ou R$ 97,00 à vista",
        href: "https://masterclass-gabaritando-estetica.vercel.app",
    },
    {
        id: "manipuladores-alimentos",
        segmento: "Alimentos",
        tag: "Imersão · Online",
        titulo: "Imersão em Boas Práticas para Manipuladores de Alimentos",
        descricao:
            "Da cozinha ao laudo: aprenda a montar um sistema de Boas Práticas de Manipulação de Alimentos conforme a RDC 216/04 e legislações estaduais.",
        imagem: "/capa-curso-manipuladores.png",
        status: "breve" as const,
        preco: null,
        precoAVista: null,
        href: null,
    },
    {
        id: "ilpi-boas-praticas",
        segmento: "ILPI",
        tag: "Formação · Online",
        titulo: "Boas Práticas de Funcionamento para ILPI",
        descricao:
            "Adequação completa de Instituições de Longa Permanência para Idosos às exigências da ANVISA e Vigilância Sanitária Estadual, evitando intervenções e penalidades.",
        imagem: "/capa-curso-ilpi.png",
        status: "breve" as const,
        preco: null,
        precoAVista: null,
        href: null,
    },
];

export default async function CursosPage() {
    let cursos = [];

    try {
        const sanityCursos = await client.fetch(allCursosQuery);
        
        if (sanityCursos && sanityCursos.length > 0) {
            cursos = sanityCursos.map((c: any) => {
                // Mapeamento de categorias de valor técnico para amigável
                const catMap: Record<string, string> = {
                    "alimentos": "Alimentos",
                    "ilpi": "ILPI",
                    "saude": "Saúde",
                    "beleza": "Beleza"
                };

                // Mapeamento de modalidade
                const modalityMap: Record<string, string> = {
                    "online": "Online",
                    "presencial": "Presencial",
                    "hibrido": "Híbrido"
                };

                return {
                    id: c.slug?.current || c._id,
                    segmento: catMap[c.category] || "Saúde",
                    tag: `${c.modality ? modalityMap[c.modality] : 'Online'} · ${c.category ? catMap[c.category] : 'Curso'}`,
                    titulo: c.title,
                    descricao: c.shortDescription,
                    imagem: c.image ? urlFor(c.image).url() : null,
                    status: c.status === "active" ? "aberto" : "breve",
                    preco: c.price || null,
                    precoAVista: null, // Campo não existente no schema por enquanto
                    href: c.externalLink || null,
                };
            });
        } else {
            cursos = cursosFallback;
        }
    } catch (error) {
        console.error("Erro ao carregar cursos do Sanity:", error);
        cursos = cursosFallback;
    }

    return (
        <div className="bg-background">
            {/* Hero */}
            <section className="bg-brand-navy text-white pt-[calc(72px+5rem)] pb-20 px-6 md:px-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent rounded-full blur-[200px]" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[200px]" />
                </div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <span className="font-mono text-brand-accent text-xs tracking-widest uppercase font-bold block mb-4">
                        Catálogo Completo
                    </span>
                    <h1 className="font-serif italic text-5xl md:text-6xl text-white mb-6 leading-tight">
                        Aprenda com quem{" "}
                        <span className="font-sans not-italic font-black text-brand-accent">
                            entende de vigilância sanitária
                        </span>
                    </h1>
                    <p className="font-sans text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                        Treinamentos práticos desenvolvidos por quem já esteve na fiscalização pública. Filtre por segmento e encontre o curso ideal para o seu negócio.
                    </p>
                </div>
            </section>

            {/* Cursos com filtro interativo (Client Component) */}
            <CursosFiltro cursos={cursos} />

            {/* CTA Final */}
            <section className="py-16 px-6 md:px-12 pb-24 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10 md:p-14 shadow-sm">
                        <BookOpen className="w-12 h-12 text-brand-accent mx-auto mb-5 opacity-80" />
                        <h3 className="font-serif italic text-2xl md:text-3xl text-brand-navy mb-4">
                            Não encontrou o que procura?
                        </h3>
                        <p className="font-sans text-text-secondary text-base leading-relaxed max-w-lg mx-auto mb-8">
                            Estamos sempre desenvolvendo novos conteúdos. Entre em contato e nos conte sobre a sua realidade — podemos ter algo sendo preparado para o seu segmento.
                        </p>
                        <Link
                            href="/#contato"
                            className="inline-flex items-center gap-2 bg-brand-accent text-white px-8 py-4 rounded-full font-sans font-bold text-sm shadow-md hover:bg-blue-600 transition-colors"
                        >
                            Falar com a Equipe <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
