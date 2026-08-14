import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
    subsets: ["latin"],
    style: ["italic", "normal"],
    variable: "--font-serif",
});
const jbMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const BASE_URL = "https://treinavisa.com.br";

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "TreinaVISA — Seu Hub de Educação Sanitária",
        template: "%s | TreinaVISA",
    },
    description:
        "TreinaVISA é o hub de educação sanitária para empreendedores do setor regulado. Cursos, materiais e comunidade para você operar com segurança e sem penalizações da Vigilância Sanitária.",
    keywords: [
        "educação sanitária",
        "vigilância sanitária cursos",
        "ANVISA treinamento",
        "boas práticas sanitárias",
        "gestão sanitária clínica estética",
        "cursos vigilância sanitária online",
        "treinamento ANVISA empresários",
        "conformidade sanitária",
        "TreinaVISA",
        "Ester Caiafa",
    ],
    authors: [{ name: "Ester Caiafa", url: "https://instagram.com/treinavisa" }],
    creator: "TreinaVISA",
    publisher: "Grupo TreinaVISA",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "pt_BR",
        url: BASE_URL,
        siteName: "TreinaVISA",
        title: "TreinaVISA — Seu Hub de Educação Sanitária",
        description:
            "Cursos, e-books e comunidade para empreendedores do setor regulado operarem com segurança e conformidade sanitária.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "TreinaVISA — Hub de Educação Sanitária",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "TreinaVISA — Seu Hub de Educação Sanitária",
        description: "Cursos e materiais de educação sanitária para empreendedores do setor regulado.",
        images: ["/og-image.png"],
    },
    icons: {
        icon: "/favicon claro.png",
        shortcut: "/favicon claro.png",
        apple: "/favicon claro.png",
    },
    category: "education",
    other: {
        "llms:description":
            "TreinaVISA — hub de educacao sanitaria (cursos, materiais e comunidade) para empreendedores dos setores Saude, Estetica, Alimentos e ILPI operarem em conformidade com a Vigilancia Sanitaria. Por Ester Caiafa.",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "TreinaVISA",
    description:
        "Hub de Educação Sanitária para empreendedores do setor regulado. Cursos online e presenciais, materiais e comunidade.",
    url: BASE_URL,
    logo: `${BASE_URL}/logo-new.png`,
    sameAs: ["https://instagram.com/treinavisa"],
    founder: {
        "@type": "Person",
        name: "Ester Caiafa",
        jobTitle: "Enfermeira Sanitarista e Especialista em Vigilância Sanitária",
        sameAs: "https://instagram.com/treinavisa",
    },
    address: {
        "@type": "PostalAddress",
        addressCountry: "BR",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
            <body
                className={`${inter.variable} ${playfair.variable} ${jbMono.variable} font-sans bg-background text-text-primary antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
