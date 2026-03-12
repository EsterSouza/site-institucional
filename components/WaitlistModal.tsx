"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, CheckCircle2, Send } from "lucide-react";

type WaitlistModalProps = {
    isOpen: boolean;
    onClose: () => void;
    cursoNome: string;
};

export default function WaitlistModal({ isOpen, onClose, cursoNome }: WaitlistModalProps) {
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({ nome: "", email: "", telefone: "" });

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, curso: cursoNome }),
            });

            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    const modalContent = (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 min-h-screen">
            <div 
                className="absolute inset-0 bg-brand-navy/80 backdrop-blur-md animate-in fade-in duration-300" 
                onClick={onClose} 
            />
            
            <div className="relative bg-white rounded-[1.5rem] md:rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-20 text-gray-400 hover:text-brand-navy hover:rotate-90 transition-all duration-300 p-2"
                >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <div className="p-6 md:p-12">
                    {status === "success" ? (
                        <div className="text-center py-6 md:py-8 animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-green-500" />
                            </div>
                            <h3 className="font-serif italic text-2xl md:text-3xl text-brand-navy mb-4">
                                Tudo certo!
                            </h3>
                            <p className="font-sans text-text-secondary text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                                Seus dados foram salvos. Avisaremos você em primeira mão assim que liberarmos as vagas para o curso <strong>{cursoNome}</strong>, junto com sua condição especial.
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-brand-navy text-white px-8 py-3 rounded-full font-bold font-sans hover:bg-brand-accent transition-colors w-full md:w-auto"
                            >
                                Fechar
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 md:mb-8 mt-4 md:mt-0">
                                <span className="font-mono text-brand-accent text-[9px] md:text-[10px] tracking-widest uppercase font-bold block mb-2">Lista de Espera VIP</span>
                                <h3 className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-brand-navy mb-2 md:mb-3">
                                    Condição Especial
                                </h3>
                                <p className="font-sans text-text-secondary text-[13px] md:text-base leading-relaxed">
                                    Preencha os dados abaixo para entrar na lista de espera do curso <strong>{cursoNome}</strong>.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block font-sans text-xs font-bold text-brand-navy mb-1.5 ml-1">Nome completo</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.nome}
                                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-sans text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all text-sm md:text-base"
                                        placeholder="Digite seu nome"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-sans text-xs font-bold text-brand-navy mb-1.5 ml-1">E-mail de contato</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-sans text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all text-sm md:text-base"
                                            placeholder="seu@email.com.br"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-sans text-xs font-bold text-brand-navy mb-1.5 ml-1">WhatsApp</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.telefone}
                                            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-sans text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all text-sm md:text-base"
                                            placeholder="(11) 99999-9999"
                                        />
                                    </div>
                                </div>

                                {status === "error" && (
                                    <p className="text-red-500 text-xs font-sans mt-2">Ocorreu um erro ao salvar seus dados. Tente novamente.</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full mt-4 md:mt-6 bg-brand-accent text-white px-6 py-4 rounded-xl font-sans font-bold text-base shadow-lg shadow-brand-accent/30 hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {status === "loading" ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" /> Processando...</>
                                    ) : (
                                        <><Send className="w-5 h-5" /> Entrar para a Lista</>
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
