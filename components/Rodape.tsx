import Link from "next/link";
import { CONTATO, SEGMENTOS } from "@/content/site";

export default function Rodape() {
    return (
        <footer className="rodape">
            <div className="wrap">
                <div className="rodape-in">
                    <div>
                        <img src="/logo-new.png" alt="TreinaVISA" width={160} height={34} />
                        <p style={{ marginTop: 14 }}>Soluções sanitárias com quem já esteve do outro lado.</p>
                    </div>
                    <div>
                        <h3>Seu negócio</h3>
                        <ul>
                            {SEGMENTOS.map((s) => (
                                <li key={s.slug}><Link href={`/${s.slug}`}>{s.nome}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Serviços</h3>
                        <ul>
                            <li><a href="https://www.consultorasanitaria.com.br">Consultora Sanitária (Ester)</a></li>
                            <li><a href="https://institucional-ana.consultorasanitaria.com.br">Consultoria de alimentos (Ana)</a></li>
                            <li><Link href="/blog">Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Contato</h3>
                        <ul>
                            <li><a href={CONTATO.whatsappLink} target="_blank" rel="noopener noreferrer">WhatsApp {CONTATO.whatsapp}</a></li>
                            <li><a href={`mailto:${CONTATO.email}`}>{CONTATO.email}</a></li>
                            <li><a href={CONTATO.instagramLink} target="_blank" rel="noopener noreferrer">Instagram {CONTATO.instagram}</a></li>
                        </ul>
                    </div>
                </div>
                <div className="rodape-fim">
                    <span>© {new Date().getFullYear()} TreinaVISA · CNPJ {CONTATO.cnpj}</span>
                    <Link href="/politica-de-privacidade">Política de privacidade</Link>
                </div>
            </div>
        </footer>
    );
}
