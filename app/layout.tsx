import type { Metadata } from "next";
import { Sora, Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-titulo" });
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-sans" });

const BASE_URL = "https://www.treinavisa.com.br";
const DESCRICAO =
    "Cursos, pastas prontas, vistorias e consultoria sanitária para alimentação, estética e beleza, saúde e ILPI. Soluções sanitárias com quem já esteve do outro lado.";

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "TreinaVISA · Soluções sanitárias por tipo de negócio",
        template: "%s | TreinaVISA",
    },
    description: DESCRICAO,
    keywords: [
        "vigilância sanitária",
        "pasta sanitária",
        "boas práticas de manipulação",
        "consultoria sanitária",
        "vistoria sanitária",
        "curso vigilância sanitária",
        "ILPI",
        "clínica de estética",
        "TreinaVISA",
    ],
    authors: [{ name: "Ester Caiafa", url: "https://www.consultorasanitaria.com.br" }],
    creator: "TreinaVISA",
    publisher: "TreinaVISA",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
        type: "website",
        locale: "pt_BR",
        url: BASE_URL,
        siteName: "TreinaVISA",
        title: "TreinaVISA · Soluções sanitárias por tipo de negócio",
        description: DESCRICAO,
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TreinaVISA" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "TreinaVISA · Soluções sanitárias por tipo de negócio",
        description: DESCRICAO,
        images: ["/og-image.png"],
    },
    icons: {
        icon: "/favicon claro.png",
        shortcut: "/favicon claro.png",
        apple: "/favicon claro.png",
    },
    other: {
        "llms:description":
            "TreinaVISA: hub sanitário que reúne cursos, pastas prontas e serviços (vistoria, pasta personalizada e consultoria) para alimentação, estética e beleza, saúde e ILPI. Leva aos serviços da Consultora Sanitária (Ester Caiafa) e da nutricionista Ana Roberta.",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TreinaVISA",
    description: DESCRICAO,
    url: BASE_URL,
    logo: `${BASE_URL}/logo-azul.png`,
    sameAs: ["https://instagram.com/treinavisa"],
    email: "contato@treinavisa.com.br",
    telephone: "+55-21-99053-0863",
    founder: {
        "@type": "Person",
        name: "Ester Caiafa",
        jobTitle: "Enfermeira sanitarista, especialista em Vigilância Sanitária",
        url: "https://www.consultorasanitaria.com.br",
    },
    address: { "@type": "PostalAddress", addressLocality: "Rio de Janeiro", addressRegion: "RJ", addressCountry: "BR" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <head>
                <Script
                    id="json-ld-org"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Microsoft Clarity */}
                <Script id="ms-clarity" strategy="afterInteractive">
                    {`(function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "y109t0glph");`}
                </Script>
            </head>
            <body className={`${sora.variable} ${sourceSans.variable}`}>
                {children}
                {/* Black November: o mesmo arquivo do site da Consultora. Carrega uma vez só, sem data-onda;
                    cada página marca com data-bf26-casa onde o bloco entra. */}
                <Script
                    src="https://www.consultorasanitaria.com.br/bf26.js"
                    strategy="afterInteractive"
                    data-api="https://www.consultorasanitaria.com.br/api/black-friday"
                />
            </body>
        </html>
    );
}
