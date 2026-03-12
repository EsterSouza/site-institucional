"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Monitor, MapPin, Clock, ArrowRight } from "lucide-react";
import { Curso } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import WaitlistModal from "./WaitlistModal";

const statusConfig = {
    active: {
        label: "Inscrições Abertas",
        className: "bg-brand-accent text-brand-navy border-brand-accent",
    },
    coming_soon: {
        label: "Em Breve",
        className: "bg-white text-brand-navy border-gray-200",
    },
    sold_out: {
        label: "Esgotado",
        className: "bg-gray-100 text-gray-600 border-gray-200",
    },
};

const modalityLabel = {
    online: "Online",
    presencial: "Presencial",
    hibrido: "Híbrido",
};

export default function CourseCard({ curso }: { curso: Curso }) {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

    const imageUrl = curso.image
        ? urlFor(curso.image).width(640).height(480).url()
        : null;

    const status = statusConfig[curso.status] || statusConfig.active;
    const modality = curso.modality || "online";
    const isActive = curso.status === "active";

    const handleCardClick = (e: React.MouseEvent) => {
        if (!isActive && curso.status === "coming_soon") {
            setIsWaitlistOpen(true);
        }
    };

    const CardContent = (
        <div 
            onClick={handleCardClick}
            className={`group bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full ${!isActive ? "cursor-pointer" : ""}`}
        >
            {/* Image */}
            <div className="relative h-56 bg-gradient-to-br from-brand-navy/5 to-brand-accent/5 overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={curso.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Monitor className="w-16 h-16 text-brand-navy/20" />
                    </div>
                )}

                {/* Status badge */}
                <div className="absolute top-4 left-4 z-10">
                    <span
                        className={`inline-flex items-center gap-2 text-[10px] font-sans font-black px-4 py-1.5 rounded-full border shadow-sm uppercase tracking-wider ${status.className}`}
                    >
                        <span
                            className={`w-2 h-2 rounded-full ${isActive ? "bg-brand-navy animate-pulse" : "bg-yellow-500"
                                }`}
                        />
                        {status.label}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[10px] text-brand-accent font-bold uppercase tracking-widest bg-brand-accent/10 px-2 py-0.5 rounded">
                        {modalityLabel[modality]}
                    </span>
                    {curso.category && (
                        <span className="font-mono text-[10px] text-text-secondary uppercase tracking-widest">
                            {curso.category.replace(/-/g, " ")}
                        </span>
                    )}
                </div>

                <h3 className="font-sans font-black text-brand-navy text-xl leading-snug mb-3 group-hover:text-brand-accent transition-colors">
                    {curso.title}
                </h3>

                <p className="font-sans text-text-secondary text-sm leading-relaxed flex-1 line-clamp-3 mb-6">
                    {curso.shortDescription}
                </p>

                {/* Price or Waitlist CTA */}
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    {isActive ? (
                        <>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Acessar agora</span>
                                <span className="text-brand-navy font-black text-lg">{curso.price || "Saiba mais"}</span>
                            </div>
                            <span className="bg-brand-accent text-white p-2 rounded-full group-hover:bg-blue-600 transition-colors">
                                <ArrowRight className="w-5 h-5" />
                            </span>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Lista de espera</span>
                                <span className="text-brand-navy font-black text-lg">Em breve</span>
                            </div>
                            <span className="text-brand-accent font-bold flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                                Entrar <ArrowRight className="w-5 h-5" />
                            </span>
                        </>
                    )}
                </div>
            </div>

            <WaitlistModal 
                isOpen={isWaitlistOpen}
                onClose={() => setIsWaitlistOpen(false)}
                cursoNome={curso.title}
            />
        </div>
    );

    return isActive && curso.externalLink ? (
        <a href={curso.externalLink} target="_blank" rel="noopener noreferrer" className="block h-full">
            {CardContent}
        </a>
    ) : (
        <div className="h-full">
            {CardContent}
        </div>
    );
}
