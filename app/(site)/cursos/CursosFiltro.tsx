"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Shield, ArrowRight } from "lucide-react";
import WaitlistModal from "@/components/WaitlistModal";

type Curso = {
    id: string;
    segmento: string;
    tag: string;
    titulo: string;
    descricao: string;
    imagem: string | null;
    status: "aberto" | "breve";
    preco: string | null;
    precoAVista: string | null;
    href: string | null;
};

const segmentos = ["Todos", "Saúde", "ILPI", "Alimentos"];

export default function CursosFiltro({ cursos }: { cursos: Curso[] }) {
    const searchParams = useSearchParams();
    const querySegmento = searchParams.get("segmento");
    
    const [filtro, setFiltro] = useState("Todos");
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState("");

    useEffect(() => {
        if (querySegmento) {
            // Normalizar para bater com os nomes nos botões
            const found = segmentos.find(s => s.toLowerCase() === querySegmento.toLowerCase());
            if (found) {
                setFiltro(found);
            }
        }
    }, [querySegmento]);

    const filtrados =
        filtro === "Todos"
            ? cursos
            : cursos.filter((c) => c.segmento === filtro);

    return (
        <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
            {/* Filtros */}
            <div className="flex flex-wrap items-center gap-3 mb-12">
                <span className="font-sans text-sm text-text-secondary font-medium mr-2">
                    Filtrar por segmento:
                </span>
                {segmentos.map((seg) => (
                    <button
                        key={seg}
                        onClick={() => setFiltro(seg)}
                        className={`px-5 py-2.5 rounded-full font-sans text-sm font-bold transition-all duration-300 border ${filtro === seg
                            ? "bg-brand-accent text-white border-brand-accent shadow-md"
                            : "bg-white text-brand-navy border-gray-200 hover:border-brand-accent/50 hover:shadow-sm"
                            }`}
                    >
                        {seg}
                    </button>
                ))}
            </div>

            {/* Grid de cursos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtrados.map((curso) => {
                    const Card = (
                        <div
                            key={curso.id}
                            className={`group relative h-[450px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-xl bg-black border-4 border-transparent hover:border-brand-accent/50 hover:shadow-brand-accent/20 transition-all duration-500 flex flex-col ${curso.status === "aberto" ? "cursor-pointer" : "cursor-default"}`}
                        >
                            {/* Capa */}
                            {curso.imagem ? (
                                <>
                                    <Image
                                        src={curso.imagem}
                                        alt={curso.titulo}
                                        fill
                                        quality={90}
                                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />

                                    <div className="absolute top-6 left-6 z-10">
                                        <StatusBadge status={curso.status} />
                                    </div>
                                </>
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-navy to-brand-accent/60">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-40 group-hover:opacity-60 transition-opacity">
                                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-3 border border-white/20">
                                            <Shield className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    <div className="absolute top-6 left-6 z-10">
                                        <StatusBadge status={curso.status} />
                                    </div>
                                </div>
                            )}

                            {/* Conteúdo */}
                            <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end z-10 w-full">
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    <span className="font-mono text-white text-[10px] md:text-xs tracking-widest uppercase font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                        {curso.tag}
                                    </span>
                                    <span className="font-mono text-white text-[10px] md:text-xs tracking-widest uppercase font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                        {curso.segmento}
                                    </span>
                                </div>

                                <h3 className="font-sans font-black text-white text-2xl md:text-3xl leading-none mb-3 drop-shadow-lg">
                                    {curso.titulo}
                                </h3>

                                <p className="font-sans text-white/80 text-sm line-clamp-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    {curso.descricao}
                                </p>

                                <div className="h-auto mt-4">
                                    {curso.status === "aberto" ? (
                                        <div className="flex w-full justify-between items-center">
                                            <span className="font-sans font-bold text-brand-accent text-xs uppercase tracking-wider">
                                                Acessar agora
                                            </span>
                                            <span className="inline-flex items-center gap-2 text-brand-accent font-bold text-base transition-colors group-hover:text-white">
                                                Ver curso{" "}
                                                <ArrowRight className="w-5 h-5" />
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex w-full justify-between items-center">
                                            <span className="font-sans font-bold text-white/80 text-xs uppercase tracking-wider">
                                                Lista de espera
                                            </span>
                                            <span
                                                className="inline-flex flex-row items-center gap-2 text-brand-accent font-bold text-base transition-colors group-hover:text-white"
                                            >
                                                Entrar na lista{" "}
                                                <ArrowRight className="w-5 h-5" />
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );

                    return curso.href ? (
                        <a
                            key={curso.id}
                            href={curso.href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {Card}
                        </a>
                    ) : (
                        <div 
                            key={curso.id} 
                            onClick={() => {
                                setSelectedCourse(curso.titulo);
                                setIsWaitlistOpen(true);
                            }}
                        >
                            {Card}
                        </div>
                    );
                })}
            </div>

            {/* Empty state */}
            {filtrados.length === 0 && (
                <div className="text-center py-20">
                    <Shield className="w-16 h-16 text-brand-navy/15 mx-auto mb-6" />
                    <h3 className="font-sans font-bold text-brand-navy text-xl mb-2">
                        Nenhum curso neste segmento ainda
                    </h3>
                    <p className="font-sans text-text-secondary max-w-md mx-auto">
                        Estamos desenvolvendo novos cursos. Volte em breve ou
                        entre em contato para saber mais.
                    </p>
                </div>
            )}

            <WaitlistModal
                isOpen={isWaitlistOpen}
                onClose={() => setIsWaitlistOpen(false)}
                cursoNome={selectedCourse}
            />
        </section>
    );
}

function StatusBadge({ status }: { status: "aberto" | "breve" }) {
    return (
        <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg ${status === "aberto"
                ? "bg-brand-accent text-brand-navy"
                : "bg-white text-brand-navy"
                }`}
        >
            <span
                className={`w-2 h-2 rounded-full ${status === "aberto"
                    ? "bg-brand-navy animate-pulse"
                    : "bg-yellow-500"
                    }`}
            />
            {status === "aberto" ? "Inscrições Abertas" : "Em Breve"}
        </span>
    );
}
