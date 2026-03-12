"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import WaitlistModal from "./WaitlistModal";
import { urlFor } from "@/sanity/lib/image";

interface HomeCourseCarouselProps {
    initialCursos?: any[];
}

export default function HomeCourseCarousel({ initialCursos = [] }: HomeCourseCarouselProps) {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState("");

    const handleWaitlistClick = (e: React.MouseEvent, courseName: string) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedCourse(courseName);
        setIsWaitlistOpen(true);
    };

    // Fallback caso não venha nada do Sanity
    const fallbackCursos = [
        {
            title: "Gabaritando a Fiscalização em Estética",
            slug: { current: "gabaritando-estetica" },
            shortDescription: "Domine os 25 itens críticos da ANVISA e elimine o risco de interdições na sua clínica.",
            image: "/capa-curso-estetica.png",
            status: "active",
            modality: "online",
            category: "saude-estetica",
            externalLink: "https://masterclass-gabaritando-estetica.vercel.app"
        },
        {
            title: "Boas Práticas para Manipuladores",
            slug: { current: "manipuladores-alimentos" },
            shortDescription: "Da cozinha ao laudo: aprenda a montar o sistema de Boas Práticas conforme RDC 216/04.",
            image: "/capa-curso-manipuladores.png",
            status: "coming_soon",
            modality: "online",
            category: "alimentos"
        },
        {
            title: "Boas Práticas de Funcionamento (ILPI)",
            slug: { current: "ilpi-boas-praticas" },
            shortDescription: "Adequação completa das casas de repouso às exigências da ANVISA e Vigilância Estadual.",
            image: "/capa-curso-ilpi.png",
            status: "coming_soon",
            modality: "online",
            category: "ilpi"
        }
    ];

    // Se o Sanity tiver menos de 3 cursos, complementa com os fallbacks
    // Dedup por título normalizado para evitar duplicatas mesmo com slugs diferentes
    const MIN_COURSES = 3;
    let displayCursos = initialCursos.length > 0 ? [...initialCursos] : [...fallbackCursos];
    if (displayCursos.length < MIN_COURSES) {
        const normalizeTitle = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, "");
        const existingTitles = new Set(displayCursos.map((c: any) => normalizeTitle(c.title)));
        const extras = fallbackCursos.filter(f => !existingTitles.has(normalizeTitle(f.title)));
        displayCursos = [...displayCursos, ...extras];
    }

    // Duplicamos 4x para o loop infinito (animação translateX(-25%))
    const carouselItems = [...displayCursos, ...displayCursos, ...displayCursos, ...displayCursos];

    return (
        <div className="relative w-full overflow-hidden">
            <style>{`
                .carousel-track {
                    display: flex;
                    width: max-content;
                }

                @media (min-width: 768px) {
                    .carousel-track {
                        animation: scrollCarousel 28s linear infinite;
                    }
                    .carousel-track:hover {
                        animation-play-state: paused;
                    }
                    @keyframes scrollCarousel {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-25%); }
                    }
                }

                @media (max-width: 767px) {
                    .carousel-container {
                        overflow-x: auto;
                        scroll-snap-type: x mandatory;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                    }
                    .carousel-container::-webkit-scrollbar {
                        display: none;
                    }
                    .carousel-item {
                        scroll-snap-align: center;
                    }
                }
            `}</style>

            <div className="carousel-container w-full relative">
                {/* Fade edges - Only on Desktop */}
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                <div className={`carousel-track py-6 md:py-10 ${isWaitlistOpen ? "[animation-play-state:paused]" : ""}`}>
                    <div className="flex gap-4 md:gap-8 px-6 md:px-16">
                        {carouselItems.map((curso, idx) => {
                            const isAberto = curso.status === "active";
                            const imageUrl = typeof curso.image === 'string' ? curso.image : (curso.image ? urlFor(curso.image).url() : "");
                            const tagSegmento = curso.category === "saude" ? "Saúde" : (
                            curso.category === "alimentos" ? "Alimentos" : (
                                curso.category === "ilpi" ? "ILPI" : (
                                    curso.category === "beleza" ? "Beleza" : "Curso"
                                )
                            )
                        );

                            return (
                                <div key={`${curso.title}-${idx}`} className="carousel-item flex-shrink-0">
                                    {isAberto ? (
                                        <a href={curso.externalLink || "#"} target="_blank" rel="noopener noreferrer"
                                            className="group relative flex flex-col w-[280px] md:w-[340px] h-[350px] md:h-[425px] rounded-[2rem] overflow-hidden shadow-xl bg-black border-4 border-transparent hover:border-brand-accent/50 hover:shadow-brand-accent/20 transition-all duration-500 cursor-pointer">
                                            <Image src={imageUrl} alt={curso.title} fill sizes="(max-width: 768px) 280px, 340px" quality={85} className="object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                                            
                                            <div className="absolute top-4 md:top-6 left-4 md:left-6 z-10">
                                                <span className="inline-flex items-center gap-2 bg-brand-accent text-brand-navy px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg">
                                                    <span className="w-2 h-2 bg-brand-navy rounded-full animate-pulse" /> Inscrições Abertas
                                                </span>
                                            </div>

                                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end z-10">
                                                <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                                                    <span className="font-mono text-white text-[9px] md:text-xs tracking-widest uppercase font-bold bg-white/20 backdrop-blur-md px-2 md:px-3 py-1 rounded-full border border-white/10">{curso.modality === 'online' ? 'Online' : 'Curso'}</span>
                                                    <span className="font-mono text-white text-[9px] md:text-xs tracking-widest uppercase font-bold bg-white/20 backdrop-blur-md px-2 md:px-3 py-1 rounded-full border border-white/10">{tagSegmento}</span>
                                                </div>
                                                <h4 className="font-sans font-black text-white text-xl md:text-2xl leading-tight mb-2 drop-shadow-lg">{curso.title}</h4>
                                                <p className="font-sans text-white/80 text-[13px] md:text-sm line-clamp-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    {curso.shortDescription}
                                                </p>
                                                <div className="h-auto mt-4 flex justify-between items-center w-full">
                                                    <span className="font-sans font-bold text-brand-accent text-[10px] md:text-xs uppercase tracking-wider">Acessar agora</span>
                                                    <span className="inline-flex items-center gap-2 text-brand-accent font-bold text-sm md:text-base">Ver curso <ArrowRight className="w-5 h-5" /></span>
                                                </div>
                                            </div>
                                        </a>
                                    ) : (
                                        <div 
                                            onClick={(e) => handleWaitlistClick(e, curso.title)}
                                            className="group relative flex flex-col w-[280px] md:w-[340px] h-[350px] md:h-[425px] rounded-[2rem] overflow-hidden shadow-xl bg-black border-4 border-transparent hover:border-white/20 transition-all duration-500 cursor-pointer"
                                        >
                                            <Image src={imageUrl} alt={curso.title} fill sizes="(max-width: 768px) 280px, 340px" quality={85} className="object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                                            
                                            <div className="absolute top-4 md:top-6 left-4 md:left-6 z-10">
                                                <span className="inline-flex items-center gap-2 bg-white text-brand-navy px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg">
                                                    <span className="w-2 h-2 bg-yellow-500 rounded-full" /> Em Breve
                                                </span>
                                            </div>

                                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end z-10">
                                                <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                                                    <span className="font-mono text-white text-[9px] md:text-xs tracking-widest uppercase font-bold bg-white/20 backdrop-blur-md px-2 md:px-3 py-1 rounded-full border border-white/10">{curso.modality === 'online' ? 'Online' : 'Curso'}</span>
                                                    <span className="font-mono text-white text-[9px] md:text-xs tracking-widest uppercase font-bold bg-white/20 backdrop-blur-md px-2 md:px-3 py-1 rounded-full border border-white/10">{tagSegmento}</span>
                                                </div>
                                                <h4 className="font-sans font-black text-white text-xl md:text-2xl leading-tight mb-2 drop-shadow-lg">{curso.title}</h4>
                                                <p className="font-sans text-white/80 text-[13px] md:text-sm line-clamp-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    {curso.shortDescription}
                                                </p>
                                                <div className="h-auto mt-4 flex justify-between items-center w-full">
                                                    <span className="font-sans font-bold text-white/80 text-[10px] md:text-xs uppercase tracking-wider">Lista de Espera</span>
                                                    <button className="inline-flex items-center gap-2 text-brand-accent font-bold text-sm md:text-base hover:text-white transition-colors">Entrar <ArrowRight className="w-4 h-4 md:w-5 md:h-5" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            <WaitlistModal 
                isOpen={isWaitlistOpen}
                onClose={() => setIsWaitlistOpen(false)}
                cursoNome={selectedCourse}
            />
        </div>
    );
}
