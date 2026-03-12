"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, FileText, Tag, X, CheckCircle2, Loader2 } from "lucide-react";
import { Ebook } from "@/types";
import { urlFor } from "@/sanity/lib/image";

interface LeadGateModalProps {
    ebook: Ebook;
    onClose: () => void;
}

function LeadGateModal({ ebook, onClose }: LeadGateModalProps) {
    const [form, setForm] = useState({ name: "", email: "", empresa: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState("");

    const validate = () => {
        if (!form.name.trim() || form.name.trim().split(" ").length < 2) {
            setError("Por favor, informe seu nome completo.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("Por favor, informe um e-mail válido.");
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
            // Send to Google Sheets via Apps Script
            const sheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
            if (sheetsUrl && sheetsUrl !== "https://script.google.com/macros/s/SEU_SCRIPT_ID/exec") {
                await fetch(sheetsUrl, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nome: form.name,
                        email: form.email,
                        empresa: form.empresa,
                        material: ebook.title,
                        timestamp: new Date().toISOString(),
                        source: "ebook-download",
                    }),
                });
            }

            setStatus("success");

            // Trigger download after a brief delay
            setTimeout(() => {
                const downloadUrl =
                    ebook.pdfFile?.asset?.url || ebook.externalLink;
                if (downloadUrl) {
                    const a = document.createElement("a");
                    a.href = downloadUrl;
                    a.download = `${ebook.title}.pdf`;
                    a.target = "_blank";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            }, 800);
        } catch {
            setStatus("error");
            setError("Houve um erro. Tente novamente em instantes.");
        }
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden">
                {/* Header gradient */}
                <div className="h-1.5 w-full bg-gradient-to-r from-brand-navy via-brand-accent to-brand-navy" />

                <div className="p-8">
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        aria-label="Fechar"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {status === "success" ? (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="font-sans font-bold text-brand-navy text-xl mb-2">
                                Tudo certo! Download iniciado 🎉
                            </h3>
                            <p className="font-sans text-text-secondary text-sm leading-relaxed">
                                O arquivo está sendo baixado. Verifique sua pasta de downloads.
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-6 font-sans text-sm text-brand-accent hover:underline"
                            >
                                Fechar
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-start gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5 text-brand-accent" />
                                </div>
                                <div>
                                    <p className="font-sans text-xs text-text-secondary uppercase tracking-widest font-bold mb-0.5">
                                        Download gratuito
                                    </p>
                                    <h3 className="font-sans font-bold text-brand-navy text-lg leading-snug">
                                        {ebook.title}
                                    </h3>
                                </div>
                            </div>

                            <p className="font-sans text-text-secondary text-sm mb-6 leading-relaxed">
                                Preencha seus dados para receber o material gratuitamente. O download começa automaticamente.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block font-sans text-xs font-bold text-brand-navy mb-1.5 uppercase tracking-wide">
                                        Nome completo *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Seu nome e sobrenome"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-brand-navy placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block font-sans text-xs font-bold text-brand-navy mb-1.5 uppercase tracking-wide">
                                        E-mail profissional *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="seu@email.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-brand-navy placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block font-sans text-xs font-bold text-brand-navy mb-1.5 uppercase tracking-wide">
                                        Nome da empresa / clínica
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Opcional"
                                        value={form.empresa}
                                        onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-brand-navy placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all"
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
                                    className="w-full flex items-center justify-center gap-3 bg-brand-navy text-white py-4 rounded-full font-sans font-bold text-base hover:bg-brand-navy-light transition-colors shadow-lg shadow-brand-navy/20 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processando...
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-5 h-5" />
                                            Baixar gratuitamente
                                        </>
                                    )}
                                </button>

                                <p className="font-sans text-center text-[11px] text-gray-400 leading-relaxed">
                                    Seus dados estão seguros. Sem spam, prometemos.
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function EbookCard({ ebook }: { ebook: Ebook }) {
    const [showModal, setShowModal] = useState(false);

    const imageUrl = ebook.coverImage
        ? urlFor(ebook.coverImage).width(400).height(560).url()
        : null;

    return (
        <>
            <div className="group bg-white rounded-[1.75rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                {/* Cover */}
                <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={ebook.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-16 h-16 text-slate-300" />
                        </div>
                    )}
                    {/* Tags */}
                    {ebook.tags && ebook.tags.length > 0 && (
                        <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center gap-1 bg-brand-accent/90 text-white text-[11px] font-sans font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                                <Tag className="w-3 h-3" />
                                {ebook.tags[0].replace(/-/g, " ")}
                            </span>
                        </div>
                    )}
                    {ebook.featured && (
                        <div className="absolute top-3 right-3">
                            <span className="bg-amber-400 text-amber-900 text-[11px] font-sans font-bold px-2 py-1 rounded-full">
                                Destaque
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-sans font-bold text-brand-navy text-base leading-snug mb-2 line-clamp-2">
                        {ebook.title}
                    </h3>
                    <p className="font-sans text-text-secondary text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                        {ebook.description}
                    </p>

                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center justify-center gap-2 bg-brand-navy text-white py-3 rounded-full font-sans font-bold text-sm hover:bg-brand-navy-light transition-colors group-hover:shadow-lg"
                    >
                        <Download className="w-4 h-4" />
                        Download gratuito
                    </button>
                </div>
            </div>

            {showModal && (
                <LeadGateModal ebook={ebook} onClose={() => setShowModal(false)} />
            )}
        </>
    );
}
