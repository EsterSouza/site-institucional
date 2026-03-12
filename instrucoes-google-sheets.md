# Integração da Lista de Espera com o Google Sheets

Para que os dados preenchidos no modal do site caiam **diretamente na sua planilha**, siga estes passos rápidos:

## Passo 1: Preparar a Planilha
1. Abra a sua Planilha no Google Sheets (aquela `Planilha sem título` que você está usando).
2. Na primeira linha (você pode colocar em negrito para organizar), crie as seguintes colunas de A a E:
   - `nome`
   - `email`
   - `telefone`
   - `curso`
   - `datahora`

## Passo 2: Criar a Ponte (Google Apps Script)
1. No menu superior da sua Planilha, clique em **Extensões** > **Apps Script**.
2. Vai abrir uma nova aba. Apague o código padrão (`function myFunction() {}`) e **cole exatamente o código abaixo**:

```javascript
function doPost(e) {
  try {
    // Pega automaticamente a primeira aba da planilha, independente do nome (Página1, Sheet1, etc)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    
    // Se e.parameter for vazio (alguém acessando direto a URL), evita erro
    if (!e || !e.parameter) {
        return ContentService.createTextOutput("Por favor, envie via requisição POST do formulário.").setMimeType(ContentService.MimeType.TEXT);
    }

    const rowData = [
      e.parameter.nome || "",
      e.parameter.email || "",
      e.parameter.telefone || "",
      e.parameter.curso || "",
      e.parameter.datahora || ""
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Clique no ícone de disquete para **Salvar** (ou pressione `Ctrl+S`).
4. No canto superior direito, clique em **Implantar** > **Nova implantação** (Deploy).
5. Clique no ícone de engrenagem "⚙️" ao lado de "Selecione o tipo" e escolha **App da Web**.
6. Configure exatamente assim:
   - Descrição: `Webhook de Lista de Espera`
   - Executar como: `Eu (seu e-mail)`
   - Quem pode acessar: `Qualquer pessoa`
7. Clique em **Implantar**. 
   *(Obs: Na primeira vez, o Google pedirá para "Autorizar acesso". Faça login na sua conta do Google, se aparecer um aviso de segurança, clique em "Avançado" lá embaixo e depois em "Acessar Projeto").*
8. Após implantar, o Google mostrará uma tela com a **URL do app da Web** (uma URL grandona que começa com `https://script.google.com/macros/s/...`). **Copie essa URL!**

## Passo 3: Colar a URL no Código do Site
1. Volte ao seu projeto aqui no editor.
2. Na raiz da pasta `site-institucional` crie um novo arquivo chamado `.env.local` (com o ponto na frente).
3. Adicione a seguinte linha dentro dele, colando a URL que você gerou:

```env
GOOGLE_SHEETS_WEBHOOK_URL="URL-QUE-VOCE-COPIOU"
```

## Pronto! 🎉
Sempre que um visitante preencher o modal "Entrar na Lista de Espera", os dados vão aparecer **magicamente** em forma de nova linha na sua planilha. Como o site já detecta em qual curso a pessoa clicou, a coluna 'curso' também será preenchida automaticamente com o nome ("Gabaritando...", "ILPI", etc).
