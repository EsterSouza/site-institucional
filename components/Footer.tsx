import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Mail, MapPin } from "lucide-react";

const footerLinks = [
    {
        title: "Conteúdo",
        links: [
            { href: "/cursos", label: "Cursos" },
            { href: "/#ebooks", label: "E-books" },
        ],
    },
    {
        title: "TreinaVISA",
        links: [
            { href: "/#quem-somos", label: "Quem Somos" },
            { href: "/#comunidade", label: "Comunidade" },
            { href: "/contato", label: "Contato" },
            { href: "/politica-de-privacidade", label: "Política de Privacidade" },
        ],
    },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#000514] text-white pt-16 pb-8 px-6 md:px-12 border-t border-white/5 relative rounded-t-[2.5rem] mt-auto overflow-hidden">
            {/* Glow decorativo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            <div className="max-w-6xl mx-auto">
                {/* Top row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Image
                            src="/logo-new.png"
                            alt="TreinaVISA"
                            width={140}
                            height={40}
                            className="object-contain h-[40px] w-auto mb-4 invert brightness-0"
                        />
                        <p className="text-white/50 font-sans text-sm leading-relaxed max-w-xs">
                            Seu hub de Educação Sanitária. Traduzindo a legislação em processos simples e seguros para empreendedores do setor regulado.
                        </p>
                        {/* Social */}
                        <div className="flex items-center gap-3 mt-6">
                            <a
                                href="https://instagram.com/treinavisa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all group"
                                aria-label="Instagram TreinaVISA"
                            >
                                <Instagram className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                            </a>
                            <a
                                href="mailto:contato@treinavisa.com.br"
                                className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all group"
                                aria-label="E-mail TreinaVISA"
                            >
                                <Mail className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    {footerLinks.map((group) => (
                        <div key={group.title}>
                            <h4 className="font-sans font-bold text-white/90 text-sm uppercase tracking-widest mb-4">
                                {group.title}
                            </h4>
                            <ul className="space-y-3">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-white/30 font-sans text-xs">
                        &copy; {year} Grupo TreinaVISA. Todos os direitos reservados.
                    </p>
                    <p className="text-white/20 font-sans text-xs">
                        Fundado por Ester Caiafa · Enfermeira Sanitarista
                    </p>
                </div>
            </div>
        </footer>
    );
}
