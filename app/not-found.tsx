import Link from "next/link";
import Topo from "@/components/Topo";
import Rodape from "@/components/Rodape";

export default function NotFound() {
    return (
        <>
            <Topo />
            <main className="secao">
                <div className="wrap" style={{ display: "grid", gap: 16, justifyItems: "start" }}>
                    <span className="kicker">Erro 404</span>
                    <h1 style={{ fontSize: 36 }}>Esta página não consta no roteiro</h1>
                    <p style={{ color: "var(--mudo)" }}>O endereço mudou ou não existe mais. Escolha o seu tipo de negócio na página inicial.</p>
                    <Link href="/" className="btn btn-azul">Ir para a página inicial</Link>
                </div>
            </main>
            <Rodape />
        </>
    );
}
