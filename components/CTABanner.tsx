import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
    title?: string;
    subtitle?: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
}

export default function CTABanner({
    title = "Transforme a gestão sanitária do seu negócio",
    subtitle = "Acesse cursos, materiais e uma comunidade de empreendedores comprometidos com a conformidade sanitária.",
    primaryLabel = "Ver Cursos",
    primaryHref = "/cursos",
    secondaryLabel = "Acessar Comunidade",
    secondaryHref = "/comunidade",
}: CTABannerProps) {
    return (
        <section className="relative overflow-hidden bg-brand-navy rounded-[2.5rem] px-8 py-16 md:py-20 shadow-xl shadow-brand-navy/10">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            {/* Top gradient line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
                <span className="font-mono text-brand-accent text-xs tracking-[0.25em] uppercase font-bold block mb-4">
                    TreinaVISA Hub
                </span>

                <h2 className="font-serif italic text-white text-4xl md:text-5xl leading-tight mb-6">
                    {title}
                </h2>

                <p className="font-sans text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                    {subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
                    <Link
                        href={primaryHref}
                        className="inline-flex items-center gap-3 bg-white text-brand-navy px-8 py-4 rounded-full font-sans font-bold text-base hover:bg-gray-50 transition-all hover:scale-105 active:scale-100 shadow-lg"
                    >
                        {primaryLabel}
                        <ArrowRight className="w-5 h-5 text-brand-accent" />
                    </Link>

                    {secondaryLabel && (
                        <Link
                            href={secondaryHref}
                            className="inline-flex items-center gap-3 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-sans font-bold text-base hover:bg-white/10 hover:border-white/20 transition-all"
                        >
                            {secondaryLabel}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
