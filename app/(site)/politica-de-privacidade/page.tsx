import type { Metadata } from "next";
import { ShieldCheck, Trash2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Política de Privacidade",
    description:
        "Entenda como a TreinaVISA trata dados pessoais, incluindo atendimentos realizados pelo Instagram Direct.",
    alternates: {
        canonical: "/politica-de-privacidade",
    },
};

const sectionClassName = "scroll-mt-24";

export default function PoliticaDePrivacidadePage() {
    return (
        <div className="bg-bg-primary pt-[72px]">
            <section className="bg-brand-navy px-6 py-16 text-white md:px-12 md:py-20">
                <div className="mx-auto max-w-4xl">
                    <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-widest text-brand-accent">
                        Transparência e privacidade
                    </span>
                    <h1 className="font-serif text-4xl italic text-white md:text-6xl">
                        Política de <span className="font-sans font-bold not-italic">Privacidade</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                        Saiba como tratamos dados pessoais ao atender você pelos nossos canais, incluindo o Instagram Direct.
                    </p>
                    <p className="mt-6 text-sm text-white/60">
                        Última atualização: 10 de agosto de 2026.
                    </p>
                </div>
            </section>

            <article className="mx-auto max-w-4xl px-6 py-14 md:px-12 md:py-20">
                <div className="mb-12 rounded-2xl border border-brand-accent/20 bg-blue-50 p-6 text-text-secondary">
                    <div className="flex gap-4">
                        <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-brand-accent" aria-hidden="true" />
                        <p className="text-sm leading-relaxed md:text-base">
                            Esta política explica o tratamento de dados pessoais pela TreinaVISA, em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais — LGPD).
                        </p>
                    </div>
                </div>

                <div className="space-y-12 text-base leading-relaxed text-text-secondary">
                    <section className={sectionClassName}>
                        <h2 className="mb-4 font-sans text-2xl font-bold text-brand-navy">1. Quem é o controlador dos dados</h2>
                        <p>
                            O controlador dos seus dados pessoais é <strong className="text-brand-navy">53.297.694 Ester Souza da Silva</strong>, inscrito no CNPJ sob o nº <strong className="text-brand-navy">53.297.694/0001-37</strong>, com endereço na Avenida Embaixador Abelardo Bueno, nº 1 (Edifício Lagoa / Dimension Office Park), Barra Olímpica / Jacarepaguá, Rio de Janeiro - RJ, CEP 22775-040. Para assuntos relacionados à privacidade e à proteção de dados, entre em contato pelo e-mail <a href="mailto:otreinavisa@gmail.com" className="font-semibold text-brand-navy underline decoration-brand-accent underline-offset-4 hover:text-brand-accent">otreinavisa@gmail.com</a>.
                        </p>
                    </section>

                    <section className={sectionClassName}>
                        <h2 className="mb-4 font-sans text-2xl font-bold text-brand-navy">2. Dados coletados pelo Instagram Direct</h2>
                        <p>Quando você entra em contato conosco pelo Instagram Direct, podemos tratar os seguintes dados disponibilizados pela plataforma:</p>
                        <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-brand-accent">
                            <li>nome de usuário e nome de exibição;</li>
                            <li>foto de perfil pública;</li>
                            <li>conteúdo das mensagens enviadas, inclusive mídias e anexos;</li>
                            <li>data e hora das interações.</li>
                        </ul>
                    </section>

                    <section className={sectionClassName}>
                        <h2 className="mb-4 font-sans text-2xl font-bold text-brand-navy">3. Finalidades do tratamento</h2>
                        <p>Usamos esses dados para responder às suas mensagens, manter o histórico de atendimento, enviar informações que você solicitar e cumprir obrigações legais ou regulatórias aplicáveis.</p>
                    </section>

                    <section className={sectionClassName}>
                        <h2 className="mb-4 font-sans text-2xl font-bold text-brand-navy">4. Compartilhamento de dados</h2>
                        <p>Para viabilizar o atendimento, os dados podem ser processados pela plataforma Chatwoot, hospedada em servidor próprio da TreinaVISA, e pela infraestrutura da Meta Platforms, responsável pelo Instagram. Não vendemos dados pessoais e não os compartilhamos para fins publicitários.</p>
                    </section>

                    <section className={sectionClassName}>
                        <h2 className="mb-4 font-sans text-2xl font-bold text-brand-navy">5. Retenção e descarte</h2>
                        <p>Os dados de atendimento são armazenados por <strong className="text-brand-navy">5 anos após o último contato</strong>, ou pelo período necessário para cumprir obrigações legais e exercer direitos. Após esse prazo, os dados serão eliminados ou anonimizados de forma segura, salvo quando a manutenção for exigida por lei.</p>
                    </section>

                    <section className={sectionClassName}>
                        <h2 className="mb-4 font-sans text-2xl font-bold text-brand-navy">6. Seus direitos como titular</h2>
                        <p>Nos termos da LGPD, você pode solicitar a confirmação da existência de tratamento, o acesso aos seus dados, a correção de dados incompletos, inexatos ou desatualizados, a eliminação de dados tratados em desconformidade com a lei e informações sobre as entidades com as quais seus dados são compartilhados, observadas as hipóteses legais aplicáveis.</p>
                    </section>

                    <section id="exclusao" className="scroll-mt-24 rounded-2xl border border-brand-accent/30 bg-white p-6 shadow-sm md:p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <Trash2 className="h-6 w-6 text-brand-accent" aria-hidden="true" />
                            <h2 className="font-sans text-2xl font-bold text-brand-navy">7. Como solicitar a exclusão dos seus dados</h2>
                        </div>
                        <p>Envie uma solicitação para <a href="mailto:otreinavisa@gmail.com?subject=Exclus%C3%A3o%20de%20dados" className="font-semibold text-brand-navy underline decoration-brand-accent underline-offset-4 hover:text-brand-accent">otreinavisa@gmail.com</a>, usando o assunto “Exclusão de dados”. Para localizar o atendimento, informe seu nome de usuário do Instagram e, se possível, a data aproximada da conversa. Analisaremos e responderemos à solicitação nos prazos previstos pela legislação aplicável.</p>
                        <p className="mt-4">Você também pode revogar o acesso do aplicativo diretamente no Instagram: <strong className="text-brand-navy">Instagram → Configurações → Apps e sites</strong>.</p>
                    </section>

                    <section className={sectionClassName}>
                        <h2 className="mb-4 font-sans text-2xl font-bold text-brand-navy">8. Segurança</h2>
                        <p>Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados, incluindo transmissão por HTTPS e acesso restrito à equipe autorizada. Nenhum ambiente digital é totalmente livre de riscos; por isso, revisamos nossas práticas de segurança periodicamente.</p>
                    </section>

                    <section className={sectionClassName}>
                        <h2 className="mb-4 font-sans text-2xl font-bold text-brand-navy">9. Menores de idade</h2>
                        <p>O atendimento não é direcionado a menores de idade. Caso identifiquemos o tratamento indevido de dados de crianças ou adolescentes, adotaremos as medidas cabíveis, observando a legislação aplicável e o melhor interesse do menor.</p>
                    </section>

                    <section className={sectionClassName}>
                        <h2 className="mb-4 font-sans text-2xl font-bold text-brand-navy">10. Alterações nesta política</h2>
                        <p>Esta política poderá ser atualizada para refletir mudanças nas nossas práticas ou na legislação. A versão vigente estará sempre disponível nesta página, com a data da última atualização indicada no topo.</p>
                    </section>
                </div>
            </article>
        </div>
    );
}
