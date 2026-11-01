// Mesmas datas do bf26.js da Consultora (fuso -03:00).
export const INICIO = +new Date("2026-11-03T00:00:00-03:00");
export const CYBER = +new Date("2026-11-30T00:00:00-03:00");
export const FIM = +new Date("2026-11-30T23:59:59-03:00");

// ?bf=2026-11-03T10:00 no endereço simula outro dia, como no bf26.js.
export function desvioTeste() {
    const t = new URLSearchParams(location.search).get("bf");
    const t0 = t ? +new Date(t.length <= 16 ? `${t}:00-03:00` : t) : NaN;
    return isNaN(t0) ? 0 : t0 - Date.now();
}
