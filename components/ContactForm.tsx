"use client";

import { useState } from "react";
import { Instagram, Mail, Send, Loader2, CheckCircle2, MapPin } from "lucide-react";

const assuntos = [
    "Informações sobre cursos",
    "Dúvidas sobre e-books",
    "Parceria / Colaboração",
    "Imprensa / Mídia",
    "Outro assunto",
];

export default function ContactForm() {
    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        empresa: "",
        assunto: "",
        mensagem: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => setForm({ ...form, [e.target.name]: e.target.value });

    const validate = () => {
        if (!form.nome.trim() || form.nome.trim().split(" ").length < 2) {
            setError("Informe seu nome completo.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("Informe um e-mail válido.");
            return false;
        }
        if (!form.telefone.trim()) {
            setError("Informe um número de telefone ou celular.");
            return false;
        }
        if (!form.assunto) {
            setError("Selecione um assunto.");
            return false;
        }
        if (form.mensagem.trim().length < 20) {
            setError("A mensagem deve ter pelo menos 20 caracteres.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!validate()) return;

        setStatus("loading");

        try {
            const sheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
            if (sheetsUrl && sheetsUrl !== "https://script.google.com/macros/s/SEU_SCRIPT_ID/exec") {
                await fetch(sheetsUrl, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...form,
                        source: "formulario-contato",
                        timestamp: new Date().toISOString(),
                    }),
                });
            }

            // Monta a mensagem estruturada para o WhatsApp
            const estabelecimentoStr = form.empresa.trim() ? form.empresa : "Não informado";
            const whatsappMessage = `*Novo Contato - Site TreinaVISA*

- *Nome:* ${form.nome}
- *E-mail:* ${form.email}
- *Celular:* ${form.telefone}
- *Estabelecimento:* ${estabelecimentoStr}
- *Assunto:* ${form.assunto}

*Mensagem:*
${form.mensagem}`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/5521993397315?text=${encodedMessage}`;

            setStatus("success");

            // Redireciona para o WhatsApp em uma nova aba
            setTimeout(() => {
                window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            }, 1500);

        } catch {
            setStatus("error");
            setError("Houve um erro ao enviar. Tente novamente ou chame no Instagram.");
        }
    };

    if (status === "success") {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-brand-accent" />
                </div>
                <h3 className="font-sans font-bold text-brand-navy text-2xl mb-3">
                    Mensagem enviada! 🎉
                </h3>
                <p className="font-sans text-text-secondary leading-relaxed max-w-sm mx-auto">
                    Recebemos seu contato. Você será redirecionado para o nosso WhatsApp em instantes...
                </p>
                <a
                    href="https://instagram.com/treinavisa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 bg-brand-accent text-white px-6 py-3 rounded-full font-sans font-bold text-sm hover:opacity-90 transition-opacity"
                >
                    <Instagram className="w-4 h-4" /> @treinavisa
                </a>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="font-serif italic text-3xl text-brand-navy mb-2">
                Envie uma mensagem
            </h2>
            <p className="font-sans text-text-secondary text-sm mb-6">
                Responderemos o mais rápido possível.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-sans text-xs font-bold text-brand-navy mb-1.5 uppercase tracking-wide">
                        Nome completo *
                    </label>
                    <input
                        name="nome"
                        type="text"
                        required
                        placeholder="Nome e sobrenome"
                        value={form.nome}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-brand-navy placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all"
                    />
                </div>
                <div>
                    <label className="block font-sans text-xs font-bold text-brand-navy mb-1.5 uppercase tracking-wide">
                        E-mail *
                    </label>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-brand-navy placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all"
                    />
                </div>
                <div>
                    <label className="block font-sans text-xs font-bold text-brand-navy mb-1.5 uppercase tracking-wide">
                        Telefone / Celular *
                    </label>
                    <input
                        name="telefone"
                        type="tel"
                        required
                        placeholder="+55 (11) 99999-9999"
                        value={form.telefone}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-brand-navy placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <div>
                <label className="block font-sans text-xs font-bold text-brand-navy mb-1.5 uppercase tracking-wide">
                    Estabelecimento / Empresa
                </label>
                <input
                    name="empresa"
                    type="text"
                    placeholder="Opcional"
                    value={form.empresa}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-brand-navy placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all"
                />
            </div>

            <div>
                <label className="block font-sans text-xs font-bold text-brand-navy mb-1.5 uppercase tracking-wide">
                    Assunto *
                </label>
                <select
                    name="assunto"
                    required
                    value={form.assunto}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all appearance-none"
                >
                    <option value="" className="bg-white">Selecione um assunto</option>
                    {assuntos.map((a) => (
                        <option key={a} value={a} className="bg-white">{a}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block font-sans text-xs font-bold text-brand-navy mb-1.5 uppercase tracking-wide">
                    Mensagem *
                </label>
                <textarea
                    name="mensagem"
                    required
                    rows={4}
                    placeholder="Como podemos te ajudar?"
                    value={form.mensagem}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-brand-navy placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all resize-none"
                />
            </div>

            {error && (
                <p className="font-sans text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-3 bg-brand-accent text-white hover:bg-blue-500 py-4 rounded-full font-sans font-bold text-base transition-all shadow-lg shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {status === "loading" ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        Enviar mensagem
                    </>
                )}
            </button>
        </form>
    );
}
