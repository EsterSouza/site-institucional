import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* --- GOOGLE TAG MANAGER / ANALYTICS --- */}
            {/* 
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX');
                `}
            </Script>
            */}

            {/* --- META PIXEL (FACEBOOK) --- */}
            {/* 
            <Script id="meta-pixel" strategy="afterInteractive">
                {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', 'SEU_PIXEL_ID_AQUI');
                fbq('track', 'PageView');
                `}
            </Script>
            */}

            {/* --- MANYCHAT --- */}
            {/* 
            <Script src="https://widget.manychat.com/SEU_ID_MANYCHAT.js" defer />
            */}

            <Navbar />
            <main className="min-h-screen overflow-x-hidden max-w-full">{children}</main>
            <Footer />
        </>
    );
}
