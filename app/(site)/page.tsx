import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ChevronRight,
    ArrowRight,
    ShieldCheck,
    BookOpen,
    TrendingUp,
    PlayCircle,
    Users,
    MessageCircle,
    Zap,
    Shield,
    Bell,
    CheckCircle2,
    FileText,
    Target,
    Instagram,
    Mail,
    MapPin,
    AlertTriangle,
    Phone,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { allCursosQuery, latestPostsQuery, allEbooksQuery } from "@/sanity/lib/queries";
import { Curso, Post, Ebook } from "@/types";
import CourseCard from "@/components/CourseCard";
import BlogCard from "@/components/BlogCard";
import EbookCard from "@/components/EbookCard";
import ContactForm from "@/components/ContactForm";
import HomeCourseCarousel from "@/components/HomeCourseCarousel";

export const metadata: Metadata = {
    title: "TreinaVISA | Hub de Educação Sanitária e Conformidade ANVISA",
    description:
        "Evite interdições e trabalhe com segurança jurídica. Cursos práticos, checklists e comunidade exclusivos para Saúde, Estética, Alimentos e ILPI.",
    openGraph: {
        title: "TreinaVISA | Hub de Educação Sanitária",
        description: "Transforme normas técnicas em processos seguros e elimine riscos sanitários no seu negócio.",
        url: "https://treinavisa.com.br",
        siteName: "TreinaVISA",
        images: [
            {
                url: "/og-image.png", // Usuário precisará adicionar esta imagem depois
                width: 1200,
                height: 630,
            },
        ],
        locale: "pt_BR",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export const revalidate = 60;

/* ─── Dados Estáticos ─── */
const ecosistema = [
    {
        number: "01",
        icon: PlayCircle,
        title: "Formações & Capacitação Técnica",
        desc: "Aulas diretas ao ponto baseadas em experiências reais de fiscalização. O passo a passo exato para regularizar seu estabelecimento.",
        href: "#cursos",
        cta: "Ver formações",
        highlight: true,
    },
    {
        number: "02",
        icon: FileText,
        title: "Kits de Implementação",
        desc: "Ferramentas práticas para a verificação diária e adequação às normativas, prontas para impressão e uso pela sua equipe.",
        href: "#ebooks",
        cta: "Baixar materiais",
        highlight: false,
    },
    {
        number: "03",
        icon: Users,
        title: "Networking & Novidades",
        desc: "Networking qualificado e atualizações em tempo real sobre mudanças nas normativas para você nunca ser pego de surpresa.",
        href: "#comunidade",
        cta: "Fazer parte",
        highlight: false,
    },
];

const numeros = [
    { value: "Instrutores", label: "Com experiência na fiscalização pública sanitária." },
    { value: "4 Setores", label: "Metodologia validada para Saúde, Estética, Alimentação e ILPI." },
    { value: "100% Focado", label: "Em descomplicar as normas sanitárias para empresários." },
];

const beneficiosComunidade = [
    { icon: Bell, title: "Normas descomplicadas", desc: "Traduzimos as novas RDCs da ANVISA para que você aplique sem dúvidas." },
    { icon: Users, title: "Grupo de Networking", desc: "Troque experiências e contatos com outros gestores do setor regulado." },
    { icon: MessageCircle, title: "Tire suas dúvidas", desc: "Ambiente aberto para compartilhar desafios reais do dia a dia da fiscalização." },
    { icon: BookOpen, title: "Acesso antecipado", desc: "Receba nossos checklists e novos materiais antes de todo mundo." },
];

export default async function HomePage() {
    let cursos: Curso[] = [];
    let posts: Post[] = [];
    let ebooks: Ebook[] = [];

    try {
        const [cursosData, postsData, ebooksData] = await Promise.all([
            client.fetch<Curso[]>(allCursosQuery),
            client.fetch<Post[]>(latestPostsQuery),
            client.fetch<Ebook[]>(allEbooksQuery),
        ]);
        cursos = cursosData;
        posts = postsData;
        ebooks = ebooksData;
    } catch {
        // Fallback em caso de erro no Sanity
    }

    const featuredEbooks = ebooks.filter((e) => e.featured);
    const restEbooks = ebooks.filter((e) => !e.featured);

    return (
        <div className="bg-background">
            {/* ═══════════════════════════════════════
                 1. INÍCIO (HERO)
            ═══════════════════════════════════════ */}
            <section id="inicio" className="relative min-h-[100dvh] bg-[#001026] text-white overflow-hidden flex items-center pt-[72px]">
                <Image src="/freepik__faa-uma-foto-bem-parecida-como-essa-img1-de-no-fun__21053.png" alt="Hub Educacional TreinaVISA" fill sizes="100vw" quality={85} className="object-cover object-center mix-blend-overlay opacity-30" priority />
                <div className="absolute inset-0 bg-brand-navy/80" />
                <div className="absolute -bottom-1 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-white pointer-events-none z-0" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16 md:py-32 flex flex-col justify-center min-h-[85vh]">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 rounded-full px-5 py-2 mb-6 backdrop-blur-sm animate-fade-up">
                            <span className="w-2.5 h-2.5 bg-brand-accent rounded-full animate-pulse" />
                            <span className="font-mono text-[10px] md:text-[11px] text-brand-accent tracking-[0.2em] uppercase font-bold">
                                Hub de Educação Sanitária
                            </span>
                        </div>

                        <h1 className="text-white leading-[1.05] tracking-tight mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                            <span className="block font-sans font-black text-5xl md:text-8xl lg:text-[8rem] text-white tracking-tighter uppercase mb-2 drop-shadow-xl">
                                Treina<span className="text-shimmer">VISA</span>
                            </span>
                            <span className="block font-serif italic text-2xl md:text-4xl lg:text-5xl text-white/80 font-light mt-4 md:mt-6">
                                Educação sanitária com quem <br className="hidden md:block" />
                                <span className="text-white font-medium">já esteve do outro lado.</span>
                            </span>
                        </h1>

                        <p className="font-sans text-base md:text-xl text-white/60 leading-relaxed max-w-2xl mb-10 md:mb-12 animate-fade-up border-l-2 border-brand-accent/40 pl-6" style={{ animationDelay: "0.2s" }}>
                            O Hub Educacional para profissionais de Saúde, Estética e Alimentação. Transforme normas técnicas em processos seguros e <strong className="text-white font-semibold">elimine o risco do seu negócio</strong> com um método testado na prática.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                            <Link href="#cursos" className="magnetic-btn inline-flex items-center justify-center gap-3 bg-brand-accent text-white px-8 py-4 rounded-full font-sans font-bold text-base shadow-lg hover:bg-blue-600 transition-colors">
                                Acessar o Hub de Cursos <ChevronRight className="w-5 h-5" />
                            </Link>
                            <a href="#quem-somos" className="magnetic-btn inline-flex items-center justify-center gap-3 bg-white/5 text-white border border-white/15 px-8 py-4 rounded-full font-sans font-bold text-base backdrop-blur-sm hover:bg-white/10 transition-colors">
                                Entenda nosso Método <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* NÚMEROS DE BASTIDORES (Autoridade) */}
            <section className="bg-brand-navy relative z-10 -mt-10 mx-6 md:mx-12 rounded-[2rem] shadow-2xl py-12 px-6 border border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {numeros.map((n, i) => (
                            <div key={i} className="text-center md:text-left flex flex-col items-center md:items-start md:border-l-4 border-brand-accent md:pl-6 group">
                                <p className="font-sans font-black text-brand-accent text-4xl lg:text-5xl tracking-tight mb-2 group-hover:scale-105 transition-transform origin-left">{n.value}</p>
                                <p className="font-sans text-white/80 text-sm md:text-base leading-relaxed">{n.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                 2. QUEM SOMOS
            ═══════════════════════════════════════ */}
            <section id="quem-somos" className="py-28 px-6 md:px-12 bg-white text-brand-navy relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15,23,42,0.3) 1px, transparent 0)`,
                    backgroundSize: "24px 24px",
                }} />

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="max-w-4xl mb-24">
                        <span className="font-mono text-brand-accent text-xs tracking-[0.3em] uppercase font-bold block mb-6">
                            Nossa Filosofia
                        </span>
                        <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-brand-navy leading-tight mb-8">
                            Segurança para trabalhar e <br />
                            <span className="font-sans not-italic font-black text-brand-accent">
                                crescer.
                            </span>
                        </h2>
                        <div className="space-y-6">
                            <p className="font-sans text-text-secondary text-lg md:text-xl leading-relaxed">
                                Existe uma diferença enorme entre ler a norma e aplicar na rotina. O TreinaVISA não é uma consultoria que faz por você, <strong className="text-brand-navy">somos uma escola</strong> que ensina você e sua equipe a terem autonomia.
                            </p>
                            <p className="font-sans text-text-secondary text-lg leading-relaxed">
                                Unimos a vivência técnica de anos em diversos setores regulados com uma didática direta. O objetivo é simples: blindar sua operação contra riscos e garantir que você trabalhe com tranquilidade.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Ester Caiafa */}
                        <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] overflow-hidden relative group shadow-sm hover:shadow-xl transition-shadow">
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent z-10" />
                            <div className="relative h-[550px] w-full z-0">
                                <Image src="/ester-capa.png" alt="Ester Caiafa" fill quality={100} unoptimized className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-20">
                                <h3 className="font-serif italic text-3xl md:text-5xl text-white mb-2 drop-shadow-lg">
                                    Ester <span className="font-sans not-italic font-bold">Caiafa</span>
                                </h3>
                                <p className="font-sans text-brand-accent text-xs font-bold uppercase tracking-widest mb-4">Enfermeira Sanitarista</p>
                                <p className="font-sans text-white/90 text-sm md:text-base leading-relaxed max-w-md drop-shadow-md">
                                    Especialista em Vigilância Sanitária pelo <strong className="text-white">IVISA-RIO</strong> e Pós-graduanda em Gestão de Clínicas. Experiência direta na fiscalização pública de serviços de saúde e estética.
                                </p>
                            </div>
                        </div>

                        {/* Ana Roberta */}
                        <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] overflow-hidden relative group shadow-sm hover:shadow-xl transition-shadow">
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent z-10" />
                            <div className="relative h-[550px] w-full z-0">
                                <Image src="/ana-capa.png" alt="Ana Roberta Ribeiro" fill quality={100} unoptimized className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-20">
                                <h3 className="font-serif italic text-3xl md:text-5xl text-white mb-2 drop-shadow-lg">
                                    Ana Roberta <span className="font-sans not-italic font-bold">Ribeiro</span>
                                </h3>
                                <p className="font-sans text-brand-accent text-xs font-bold uppercase tracking-widest mb-4">Nutricionista</p>
                                <p className="font-sans text-white/90 text-sm md:text-base leading-relaxed max-w-md drop-shadow-md">
                                    Especialista em Gerontologia e em Vigilância Sanitária. Ampla experiência na fiscalização, auditoria e gestão sanitária de estabelecimentos de alimentação.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                 3. EDUCAÇÃO CONTÍNUA (Z-PATTERN)
            ═══════════════════════════════════════ */}
            <section id="ecossistema" className="py-28 px-6 md:px-12 bg-brand-navy relative overflow-hidden text-white">
                {/* Gradiente de transição do topo (Branco -> Navy) */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-brand-navy pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-8">
                        <span className="font-mono text-brand-accent text-xs tracking-[0.25em] uppercase font-bold block mb-3">
                            Ecossistema TreinaVISA
                        </span>
                        <h2 className="font-serif italic text-4xl md:text-5xl text-white tracking-tight mb-4">
                            Tudo que você precisa para{" "}
                            <span className="font-sans not-italic font-black text-white">elevar sua gestão sanitária.</span>
                        </h2>
                        <p className="font-sans text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
                            Cursos técnicos atualizados, checklists operacionais e interligação direta em comunidade para empresários em crescimento.
                        </p>
                    </div>

                    <div className="space-y-32">
                        {/* Bloco 1: Formações (Img Right) */}
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                            <div className="lg:w-1/2">
                                <span className="font-mono text-xl text-brand-accent font-bold block mb-4">01</span>
                                <h3 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">Formações &<br />Capacitação Técnica</h3>
                                <p className="font-sans text-white/70 text-lg md:text-xl leading-relaxed mb-8">
                                    Aulas diretas ao ponto baseadas em experiências reais de fiscalização. O passo a passo exato para regularizar seu estabelecimento e dominar a gestão sanitária do zero.
                                </p>
                                <Link href="/cursos" className="inline-flex items-center gap-2 font-sans font-bold text-brand-accent hover:text-white transition-colors">
                                    Explorar o Catálogo <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                            <div className="lg:w-1/2 relative h-[500px] md:h-[600px] w-full pt-10 lg:pt-0">
                                <Image src="/mockup-curso-novo.png" alt="Formações" fill quality={100} unoptimized className="object-contain object-center scale-[1.25] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-[1.30] transition-transform duration-700" />
                            </div>
                        </div>

                        {/* Bloco 2: Kits (Img Left) */}
                        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
                            <div className="lg:w-1/2">
                                <span className="font-mono text-xl text-brand-accent font-bold block mb-4">02</span>
                                <h3 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">Kits de Implementação</h3>
                                <p className="font-sans text-white/70 text-lg md:text-xl leading-relaxed mb-8">
                                    Ferramentas de verificação prontas para impressão e uso diário da equipe. Padronize seus processos sem precisar começar do zero com os checklists validados em campo.
                                </p>
                                <Link href="#ebooks" className="inline-flex items-center gap-2 font-sans font-bold text-brand-accent hover:text-white transition-colors">
                                    Ver Ferramentas <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                            <div className="lg:w-1/2 relative h-[500px] md:h-[600px] w-full pt-10 lg:pt-0">
                                <Image src="/mockup-comunidade-novo.png" alt="Kits de Implementação" fill quality={100} unoptimized className="object-contain object-center scale-[1.15] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-[1.20] transition-transform duration-700" />
                            </div>
                        </div>

                        {/* Bloco 3: Networking (Img Right) */}
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 pb-12">
                            <div className="lg:w-1/2">
                                <span className="font-mono text-xl text-brand-accent font-bold block mb-4">03</span>
                                <h3 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">Networking &<br />Novidades</h3>
                                <p className="font-sans text-white/70 text-lg md:text-xl leading-relaxed mb-8">
                                    Atualizações em tempo real sobre normativas sanitárias e conexão com empresários que também valorizam a conformidade e a segurança jurídica.
                                </p>
                                <Link href="#comunidade" className="inline-flex items-center gap-2 font-sans font-bold text-brand-accent hover:text-white transition-colors">
                                    Fazer parte <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                            <div className="lg:w-1/2 relative h-[500px] md:h-[650px] w-full pt-10 lg:pt-0">
                                <Image src="/freepik__faa-um-mockup-de-celular-iphone-mostrando-uma-comu__21051.png" alt="App Comunidade VIP" fill quality={100} unoptimized className="object-contain object-center scale-[1.35] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-[1.40] transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gradiente de transição para a Masterclass (Navy -> Slate 50) */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-slate-50 pointer-events-none" />
            </section>

            {/* ═══════════════════════════════════════
                 CURSOS – CARROSSEL NETFLIX
            ═══════════════════════════════════════ */}
            <section id="cursos" className="pt-12 pb-28 px-0 bg-slate-50 relative z-10 w-full overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
                    <h3 className="font-serif italic text-4xl md:text-5xl text-brand-navy">
                        Aprenda com quem{" "}
                        <span className="font-sans not-italic font-bold text-brand-accent">entende de vigilância sanitária</span>
                    </h3>
                    <p className="font-sans text-text-secondary mt-3 text-lg">Cursos práticos desenvolvidos por quem fiscalizou. Escolha o seu segmento.</p>
                </div>

                <HomeCourseCarousel initialCursos={cursos} />

                {/* Botão para ver todos os cursos */}
                <div className="flex justify-center mt-8 relative z-20">
                    <Link href="/cursos" className="inline-flex items-center gap-3 bg-brand-navy text-white px-8 py-4 rounded-full font-sans font-bold text-sm shadow-xl shadow-brand-navy/20 hover:bg-brand-accent hover:-translate-y-1 transition-all">
                        Ver Todos os Cursos <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                 4. COMUNIDADE
            ═══════════════════════════════════════ */}
            <section id="comunidade" className="py-28 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-brand-navy rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 relative overflow-hidden flex flex-col items-center text-center shadow-2xl">
                        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent rounded-full blur-[100px]" />
                        </div>
                        <div className="relative z-10 w-full">
                            <span className="font-mono text-brand-accent text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold block mb-4">Entrada Gratuita</span>
                            <h2 className="font-serif italic text-3xl md:text-5xl text-white mb-6">
                                Comunidade <span className="font-sans not-italic font-bold">TreinaVISA</span>
                            </h2>
                            <p className="font-sans text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-10 md:mb-16">
                                Um espaço para troca de experiências entre profissionais que buscam segurança e conformidade na rotina. Sem burocracia desnecessária, com foco em quem faz acontecer.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-12 text-left max-w-4xl mx-auto">
                                {beneficiosComunidade.map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-sm">
                                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-brand-accent mb-4" />
                                            <p className="font-sans font-bold text-white text-sm md:text-base mb-2">{item.title}</p>
                                            <p className="font-sans text-white/50 text-[13px] md:text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <a href="https://t.me/treinavisa" target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-brand-accent text-white px-8 md:px-10 py-4 rounded-full font-sans font-bold text-base md:text-lg hover:bg-blue-600 transition-all hover:scale-105 active:scale-100 shadow-lg shadow-brand-accent/30">
                                <MessageCircle className="w-5 h-5" /> Entrar no Telegram
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* GARANTIA RISCO ZERO */}
            <section className="py-16 px-6 md:px-12 bg-slate-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-[2rem] p-8 md:p-12 shadow-sm text-center flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 shrink-0 bg-brand-navy rounded-full flex items-center justify-center text-brand-accent">
                        <ShieldCheck className="w-16 h-16" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-sans font-black text-brand-navy text-2xl mb-3">Garantia Blindada de 7 Dias</h3>
                        <p className="font-sans text-text-secondary text-sm md:text-base leading-relaxed">
                            Acreditamos tanto no nosso conteúdo que você tem <strong>7 dias</strong> para acessar toda a Masterclass e os Checklists. Se você achar que a qualidade não gerou valor para a sua clínica, basta solicitar o reembolso <strong>diretamente na plataforma de acesso ao curso</strong> e devolvemos 100% do seu investimento. O risco fica inteiramente nas nossas costas.
                        </p>
                    </div>
                </div>
            </section>


            {/* ═══════════════════════════════════════
                 6. E-BOOKS
            ═══════════════════════════════════════ */}
            <section id="ebooks" className="py-24 px-6 md:px-12 bg-slate-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="font-mono text-brand-accent text-xs tracking-widest uppercase font-bold block mb-4">Download Rápido</span>
                        <h2 className="font-serif italic text-4xl md:text-5xl text-brand-navy mb-4">
                            Checklists e <span className="font-sans not-italic font-bold">Manuais Grátis</span>
                        </h2>
                        <p className="font-sans text-text-secondary text-lg max-w-2xl mx-auto">Materiais de apoio focados na aplicação diária. Baixe, imprima e implemente com sua equipe.</p>
                    </div>

                    {featuredEbooks.length > 0 || restEbooks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredEbooks.map((e) => <EbookCard key={e._id} ebook={e} />)}
                            {restEbooks.map((e) => <EbookCard key={e._id} ebook={e} />)}
                        </div>
                    ) : (
                        <div className="text-center py-20 px-4 bg-white border border-gray-200 rounded-[2rem] shadow-sm max-w-2xl mx-auto">
                            <FileText className="w-16 h-16 text-brand-accent mx-auto mb-6" />
                            <p className="font-sans font-black text-brand-navy text-2xl mb-4">Materiais em produção</p>
                            <p className="font-sans text-text-secondary text-lg leading-relaxed">
                                Estamos estruturando nossa biblioteca de checklists e manuais para ajudar na sua operação diária.
                                <strong className="block mt-4 font-bold text-brand-navy bg-slate-50 py-3 rounded-xl border border-gray-100">Cada material terá seu próprio site de download de forma automatizada. Em breve!</strong>
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════
                 7. FALE CONOSCO (CONTATO) E CTA FINAL
            ═══════════════════════════════════════ */}
            <section id="contato" className="py-24 px-6 md:px-12 bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Info cards */}
                        <div className="space-y-6">
                            <h2 className="font-serif italic text-4xl text-brand-navy mb-8">
                                Fale <span className="font-sans not-italic font-bold text-brand-accent">conosco.</span>
                            </h2>
                            <a href="https://instagram.com/treinavisa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-slate-50 rounded-[1.5rem] p-5 border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                                    <Instagram className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-sans font-bold text-brand-navy text-sm">Instagram</p>
                                    <p className="font-sans text-text-secondary text-sm">@treinavisa</p>
                                </div>
                            </a>
                            <a href="mailto:contato@treinavisa.com.br" className="flex items-center gap-4 bg-slate-50 rounded-[1.5rem] p-5 border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                                <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-sans font-bold text-brand-navy text-sm">E-mail Corporativo</p>
                                    <p className="font-sans text-text-secondary text-sm">contato@treinavisa.com.br</p>
                                </div>
                            </a>
                            <div className="flex items-center gap-4 bg-slate-50 rounded-[1.5rem] p-5 border border-gray-200 shadow-sm">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100">
                                    <MapPin className="w-6 h-6 text-brand-accent" />
                                </div>
                                <div>
                                    <p className="font-sans font-bold text-brand-navy text-sm">Operações</p>
                                    <p className="font-sans text-text-secondary text-sm">Rio de Janeiro / Foco Nacional</p>
                                </div>
                            </div>
                        </div>

                        {/* Implementação do Form Client Component */}
                        <div className="lg:col-span-2 bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-200 shadow-xl">
                            <ContactForm />
                        </div>
                    </div>
                </div>

                {/* CTA Final */}
                <div className="max-w-5xl mx-auto">
                    <div className="bg-brand-navy rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-brand-accent/20 rounded-full blur-[80px]" />
                        <div className="relative z-10">
                            <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                                A principal chave é a <span className="font-sans not-italic font-black text-brand-accent">capacitação técnica.</span>
                            </h2>
                            <p className="font-sans text-white/80 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                                Adequar-se não precisa ser um processo doloroso que drena o caixa do seu negócio. Educação sanitária é sinônimo de segurança patrimonial.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="https://wa.me/5521993397315?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20TreinaVISA." target="_blank" rel="noopener noreferrer" className="magnetic-btn inline-flex items-center justify-center gap-3 bg-green-600 text-white px-10 py-4 rounded-full font-sans font-bold text-base shadow-lg shadow-green-600/30 hover:bg-green-500 transition-colors">
                                    <Phone className="w-5 h-5" /> Atendimento via WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
