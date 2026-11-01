/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        // Endereços do site antigo que não existem mais.
        return [
            { source: "/cursos", destination: "/#aulas", permanent: true },
            { source: "/ebooks", destination: "/", permanent: true },
            { source: "/comunidade", destination: "/", permanent: true },
            { source: "/sobre", destination: "/#equipe", permanent: true },
            { source: "/contato", destination: "/#contato", permanent: true },
            { source: "/studio/:path*", destination: "/", permanent: false },
        ];
    },
};

module.exports = nextConfig;
