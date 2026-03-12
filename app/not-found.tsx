import Link from "next/link";
import { Shield, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-brand-navy flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[180px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[180px]" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                {/* Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 bg-brand-accent/10 rounded-full flex items-center justify-center border border-brand-accent/20">
                        <Shield className="w-12 h-12 text-brand-accent" />
                    </div>
                </div>

                {/* Error code */}
                <p className="font-mono text-brand-accent text-sm tracking-[0.3em] uppercase font-bold mb-4">
                    Erro 404
                </p>

                {/* Headline */}
                <h1 className="font-serif italic text-5xl md:text-7xl text-white leading-tight mb-6">
                    Esta página não{" "}
                    <span className="font-sans not-italic font-black text-brand-accent">
                        consta no roteiro
                    </span>
                </h1>

                {/* Subtext */}
                <p className="font-sans text-white/60 text-lg leading-relaxed mb-12 max-w-md mx-auto">
                    Assim como um item fora das conformidades sanitárias, esta página não existe. 
                    Mas não se preocupe — você pode voltar para a área regularizada do site.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 bg-brand-accent text-white px-8 py-4 rounded-full font-sans font-bold text-base shadow-lg shadow-brand-accent/30 hover:bg-blue-500 transition-all"
                    >
                        <Home className="w-5 h-5" />
                        Ir para o Início
                    </Link>
                    <Link
                        href="/cursos"
                        className="inline-flex items-center gap-3 bg-white/10 text-white px-8 py-4 rounded-full font-sans font-bold text-base border border-white/20 hover:bg-white/20 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Ver Cursos
                    </Link>
                </div>
            </div>
        </div>
    );
}
