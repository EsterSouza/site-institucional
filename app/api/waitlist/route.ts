import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nome, email, telefone, curso } = body;

        if (!nome || !email || !telefone || !curso) {
            return NextResponse.json(
                { error: "Todos os campos são obrigatórios." },
                { status: 400 }
            );
        }

        // URL do Webhook do Google Apps Script
        const googleSheetUrl = process.env.GOOGLE_SHEETS_WAITLIST_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;

        if (!googleSheetUrl) {
            console.error("GOOGLE_SHEETS_WEBHOOK_URL não configurada.");
            // Retorna sucesso mockado para ambiente de dev se não houver URL
            return NextResponse.json({ success: true, mocked: true });
        }

        // Formatação dos dados para enviar ao Google Sheets (FormData)
        const params = new URLSearchParams();
        params.append("nome", nome);
        params.append("email", email);
        params.append("telefone", telefone);
        params.append("curso", curso);
        params.append("datahora", new Date().toLocaleString("pt-BR"));

        const response = await fetch(googleSheetUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
            cache: 'no-store'
        });

        const responseText = await response.text();
        console.log("Waitlist Webhook Response Status:", response.status);
        console.log("Waitlist Webhook Response Data:", responseText);

        if (response.ok) {
            return NextResponse.json({ success: true, message: responseText });
        } else {
            console.error("Erro no Webhook:", responseText);
            throw new Error("Erro na integração com Google Sheets");
        }
    } catch (error) {
        console.error("Waitlist Error:", error);
        return NextResponse.json(
            { error: "Erro interno no servidor ao processar a solicitação." },
            { status: 500 }
        );
    }
}
