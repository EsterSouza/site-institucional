import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--bg-primary)",
                "background-secondary": "var(--bg-secondary)",
                "text-primary": "var(--text-primary)",
                "text-secondary": "var(--text-secondary)",
                brand: {
                    navy: "var(--brand-navy)",
                    "navy-light": "var(--brand-navy-light)",
                    accent: "var(--brand-accent)",
                },
                danger: "var(--danger)",
                success: "var(--success)",
            },
            fontFamily: {
                sans: ["var(--font-sans)"],
                serif: ["var(--font-titulo)"],
                mono: ["var(--font-sans)"],
            },
            container: {
                center: true,
                padding: "1.5rem",
                screens: {
                    "2xl": "1140px",
                },
            },
            animation: {
                "fade-up": "fadeUp 0.6s ease-out forwards",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                shimmer: "shimmer 2.5s linear infinite",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% center" },
                    "100%": { backgroundPosition: "200% center" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
