"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";

import { ChevronDown } from "lucide-react";

const navLinks = [
    { href: "/#quem-somos", label: "Quem Somos" },
    { href: "/#comunidade", label: "Comunidade" },
    { href: "/#ebooks", label: "E-books" },
    { href: "/#contato", label: "Contato" },
];

const courseCategories = [
    { href: "/cursos?segmento=Alimentos", label: "Alimentos" },
    { href: "/cursos?segmento=ILPI", label: "ILPI" },
    { href: "/cursos?segmento=Saúde", label: "Saúde" },
    { href: "/cursos?segmento=Beleza", label: "Beleza" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 h-[72px] w-full max-w-full px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${isScrolled
                    ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                    : "bg-transparent backdrop-blur-sm"
                    }`}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center shrink-0">
                    <Image
                        src="/logo-new.png"
                        alt="TreinaVISA"
                        width={150}
                        height={42}
                        className="object-contain h-[42px] w-auto"
                        priority
                    />
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                    <Link href="/#quem-somos" className="font-sans text-sm font-medium text-white/80 hover:text-white transition-colors hover:-translate-y-px duration-200">
                        Quem Somos
                    </Link>

                    {/* Cursos Dropdown Menu Desktop */}
                    <div className="relative group">
                        <Link href="/cursos" className="font-sans text-sm font-medium text-white/80 hover:text-white transition-colors hover:-translate-y-px duration-200 flex items-center gap-1.5 py-4">
                            Cursos <ChevronDown className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                        </Link>
                        {/* Dropdown Panel */}
                        <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                            <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 w-[180px] flex flex-col gap-1">
                                {courseCategories.map((cat) => (
                                    <Link key={cat.href} href={cat.href} className="font-sans text-sm text-white/80 hover:text-white hover:bg-brand-accent/20 px-4 py-2.5 rounded-lg transition-colors">
                                        {cat.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link href="/#comunidade" className="font-sans text-sm font-medium text-white/80 hover:text-white transition-colors hover:-translate-y-px duration-200">
                        Comunidade
                    </Link>

                    <Link href="/#ebooks" className="font-sans text-sm font-medium text-white/80 hover:text-white transition-colors hover:-translate-y-px duration-200">
                        E-books
                    </Link>

                    <Link href="/#contato" className="font-sans text-sm font-medium text-white/80 hover:text-white transition-colors hover:-translate-y-px duration-200">
                        Contato
                    </Link>
                </div>

                {/* Desktop CTA */}
                <Link
                    href="/#cursos"
                    className="hidden md:inline-flex items-center gap-2 bg-brand-accent text-[#0a0a0a] px-5 py-2.5 rounded-full font-sans font-bold text-sm hover:opacity-90 transition-all hover:scale-105 active:scale-100 shadow-lg shadow-brand-accent/20"
                >
                    Ver Cursos <ChevronRight className="w-4 h-4" />
                </Link>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </nav>

            {/* Mobile dropdown menu */}
            <div
                className={`fixed top-[72px] left-0 right-0 z-40 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 md:hidden overflow-hidden ${isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col px-6 py-6 gap-1 w-full overflow-hidden">
                    <Link href="/#quem-somos" onClick={() => setIsMenuOpen(false)} className="font-sans text-base font-medium text-white/80 hover:text-white py-3 border-b border-white/5 transition-colors flex items-center justify-between">Quem Somos <ChevronRight className="w-4 h-4 text-white/30" /></Link>

                    {/* Cursos Mobile Dropdown */}
                    <div className="flex flex-col border-b border-white/5 py-3">
                        <Link href="/cursos" onClick={() => setIsMenuOpen(false)} className="font-sans text-base font-medium text-white hover:text-white transition-colors flex items-center justify-between mb-3">
                            <span className="font-bold">Cursos Principais</span>
                            <ChevronRight className="w-4 h-4 text-white/30" />
                        </Link>
                        <div className="flex flex-col gap-3 pl-4 border-l-2 border-white/10 ml-2">
                            {courseCategories.map((cat) => (
                                <Link key={cat.href} href={cat.href} onClick={() => setIsMenuOpen(false)} className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                                    {cat.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link href="/#comunidade" onClick={() => setIsMenuOpen(false)} className="font-sans text-base font-medium text-white/80 hover:text-white py-3 border-b border-white/5 transition-colors flex items-center justify-between">Comunidade <ChevronRight className="w-4 h-4 text-white/30" /></Link>
                    <Link href="/#ebooks" onClick={() => setIsMenuOpen(false)} className="font-sans text-base font-medium text-white/80 hover:text-white py-3 border-b border-white/5 transition-colors flex items-center justify-between">E-books <ChevronRight className="w-4 h-4 text-white/30" /></Link>
                    <Link href="/#contato" onClick={() => setIsMenuOpen(false)} className="font-sans text-base font-medium text-white/80 hover:text-white py-3 border-b border-white/5 transition-colors flex items-center justify-between">Contato <ChevronRight className="w-4 h-4 text-white/30" /></Link>

                    <Link
                        href="/#cursos"
                        onClick={() => setIsMenuOpen(false)}
                        className="mt-4 flex items-center justify-center gap-2 bg-brand-accent text-[#0a0a0a] px-6 py-3.5 rounded-full font-sans font-bold text-base hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20"
                    >
                        Ver Cursos <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </>
    );
}
