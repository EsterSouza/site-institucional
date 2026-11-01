"use client";

import { useEffect, useState } from "react";
import { desvioTeste } from "@/content/black";

// Hora atual no navegador (null até montar, para não divergir do HTML do servidor).
export function useAgora(intervalo = 1000) {
    const [t, setT] = useState<number | null>(null);
    useEffect(() => {
        const desvio = desvioTeste();
        const tic = () => setT(Date.now() + desvio);
        tic();
        const id = setInterval(tic, intervalo);
        return () => clearInterval(id);
    }, [intervalo]);
    return t;
}
