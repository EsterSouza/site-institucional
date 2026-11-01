import Link from "next/link";
import { whatsapp } from "@/content/site";

const LINKS = [
    { href: "/#segmentos", texto: "Seu negócio" },
    { href: "/#aulas", texto: "Aulas" },
    { href: "/#equipe", texto: "Equipe" },
    { href: "/blog", texto: "Blog" },
    { href: "/#contato", texto: "Contato" },
];
const ZAP = whatsapp("Olá! Vim pelo site do TreinaVISA.");

export default function Topo() {
    return (
        <header className="topo">
            <div className="wrap topo-in">
                <Link href="/" className="topo-logo" aria-label="TreinaVISA, página inicial">
                    <img src="/logo-azul.png" alt="TreinaVISA" width={160} height={40} />
                </Link>
                <nav className="topo-menu" aria-label="Menu">
                    {LINKS.map((l) => (
                        <Link key={l.href} href={l.href}>{l.texto}</Link>
                    ))}
                    <a className="btn btn-azul" href={ZAP} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </nav>
                {/* No celular, o menu abre sem JavaScript. */}
                <details className="topo-mobile">
                    <summary aria-label="Abrir o menu">Menu</summary>
                    <nav aria-label="Menu">
                        {LINKS.map((l) => (
                            <Link key={l.href} href={l.href}>{l.texto}</Link>
                        ))}
                        <a className="btn btn-azul" href={ZAP} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
                    </nav>
                </details>
            </div>
        </header>
    );
}
