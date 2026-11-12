import type { Metadata } from "next";
import { Sora, Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BF_FIM } from "@/content/site";

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
        images: [{ url: "/compartilhar-treinavisa.png", width: 1200, height: 630, alt: "TreinaVISA: soluções sanitárias com quem já esteve do outro lado" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "TreinaVISA · Soluções sanitárias por tipo de negócio",
        description: DESCRICAO,
        images: ["/compartilhar-treinavisa.png"],
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
        <html lang="pt-BR" suppressHydrationWarning>
            <head>
                {/* Black November: liga a classe antes da pintura; depois de BF_FIM a página volta sozinha
                    ao preço normal e aos links sem cupom. */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `if(Date.now()<Date.parse("${BF_FIM}"))document.documentElement.classList.add("bf-on")`,
                    }}
                />
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
                {/* Origem da visita (UTM, fbclid, gclid) guardada na aba e repassada no clique para o
                    checkout da Cakto e para as páginas da Consultora, que levam adiante até a compra. */}
                <Script id="origem" strategy="afterInteractive">
                    {`(function(){
                        var chave=/^(utm_|fbclid|gclid)/, o={};
                        try{o=JSON.parse(sessionStorage.getItem("tv_origem")||"{}")}catch(e){}
                        new URLSearchParams(location.search).forEach(function(v,k){if(chave.test(k))o[k]=v});
                        try{sessionStorage.setItem("tv_origem",JSON.stringify(o))}catch(e){}
                        document.addEventListener("click",function(e){
                            var a=e.target.closest&&e.target.closest("a[href]"),u;
                            if(!a)return;
                            try{u=new URL(a.href)}catch(x){return}
                            if(!/(^|\\.)(cakto|consultorasanitaria)\\.com\\.br$/.test(u.hostname))return;
                            for(var k in o)if(!u.searchParams.has(k))u.searchParams.set(k,o[k]);
                            a.href=u.toString();
                        },true);
                    })();`}
                </Script>
                {/* Black November: o mesmo arquivo do site da Consultora. Carrega uma vez só, sem data-onda;
                    a home marca com data-bf26-casa onde entra o calendário. data-preco-na-pagina: os preços
                    da Black e o cupom já estão nos cartões, então o bf26 não abre formulário nem desvia
                    o clique do checkout. data-pagina-bf: o "ver o calendário" da faixa leva à Black do próprio
                    TreinaVISA (/black-friday), e não à da Consultora. */}
                <Script
                    src="https://www.consultorasanitaria.com.br/bf26.js"
                    strategy="afterInteractive"
                    data-api="https://www.consultorasanitaria.com.br/api/black-friday"
                    data-pagina-bf="/black-friday"
                    data-preco-na-pagina=""
                />
                {/* Rastreio da Cakto: guarda a campanha (UTM, sck, src, fbclid, gclid) e completa os links
                    do checkout só com o que faltar. data-offer="-" é de propósito: falha na regra da Cakto
                    e não conta visita, porque o site vende vários produtos e a visita cairia no errado. */}
                <Script
                    src="https://api.cakto.com.br/api/product/checkout/tracker.js"
                    strategy="afterInteractive"
                    data-offer="-"
                />
            </body>
        </html>
    );
}
