# 🏛️ Site Institucional TreinaVISA — Planejamento Completo

## 📋 Prompt para o Novo Chat

> Cole exatamente este texto no novo chat para que o assistente já tenha todo o contexto necessário:

---

```
Crie o site institucional completo do TreinaVISA em Next.js 14 (App Router) + Sanity CMS
na pasta: c:\Users\miche\OneDrive - MSFT\TreinaVISA\site\site-institucional

## Sobre a marca
TreinaVISA é um hub educacional de Educação Sanitária para Clínicas de Estética.
Fundada por Ester Caiafa (Enfermeira Sanitarista, especialista em Vigilância Sanitária).
Paleta: Azul marinho (#000f2d como principal), Azul elétrico (#2563eb como accent), Branco e tons de slate.
Tom de voz: Técnico, mas acessível. Autoritativo e direto.
Tagline: "Seu hub de Educação Sanitária"

## Páginas necessárias (rotas)
1. / → Home (institucional com hero, diferenciais, CTA para cursos)
2. /cursos → Catálogo de cursos (cada card linka para a landing page externa no Vercel)
3. /blog → Listagem de posts (grid)
4. /blog/[slug] → Artigo individual
5. /ebooks → Galeria de e-books e materiais para download (PDF)
6. /comunidade → Página de acesso à comunidade (link para plataforma externa: WhatsApp/Circle/Discord)
7. /sobre → Sobre o Hub TreinaVISA e sobre a Ester Caiafa
8. /contato → Formulário de contato (sem backend, usar Resend ou EmailJS)

## CMS — Sanity.io
- Blog: posts com titulo, slug, resumo, conteúdo rico (portable text), imagem, data, tags
- E-books: titulo, capa (imagem), arquivo PDF, descrição, tag
- Cursos: titulo, descrição curta, imagem, link externo (para a landing page), preço, status (ativo/em breve)
- A Ester deve conseguir criar/editar tudo pelo painel do Sanity sem precisar de código

## Requisitos técnicos
- Next.js 14 App Router
- Sanity.io v3 integrado (npx create-sanity@latest)
- TailwindCSS para estilização
- Design premium, dark/light mode opcional, animações suaves
- SEO completo (metadados, OG, sitemap, robots.txt)
- Totalmente responsivo (mobile-first)
- Deploy: Vercel
- Git: repositório GitHub separado

## Estrutura de arquivos esperada
site-institucional/
  app/
    (site)/           ← grupo de rotas públicas
      page.tsx        ← Home
      cursos/page.tsx
      blog/page.tsx
      blog/[slug]/page.tsx
      ebooks/page.tsx
      comunidade/page.tsx
      sobre/page.tsx
      contato/page.tsx
      layout.tsx      ← Layout compartilhado com Navbar e Footer
    layout.tsx        ← Root layout com metadados globais
  sanity/
    schemas/          ← Schemas do Sanity (blog, ebook, curso)
    lib/client.ts     ← Cliente Sanity configurado
  components/
    Navbar.tsx
    Footer.tsx
    BlogCard.tsx
    EbookCard.tsx
    CourseCard.tsx
    CTABanner.tsx
  public/
    logo-new.png      ← Copiar do site-masterclass

## Design Reference
Inspect and draw inspiration from the masterclass landing page already built at:
c:\Users\miche\OneDrive - MSFT\TreinaVISA\site\site-masterclass\app\page.tsx
Same color system, same font stack (Inter + Playfair Display + JetBrains Mono), same rounded card style.
The tailwind.config.ts from site-masterclass has all brand tokens already defined.

## Ordem de execução
1. Inicializar projeto Next.js
2. Configurar Tailwind + copiar design tokens do site-masterclass
3. Criar schemas no Sanity e populate com dados de exemplo
4. Construir componentes compartilhados (Navbar, Footer)
5. Construir página Home com hero + diferenciais + CTA
6. Construir páginas Cursos, Blog, E-books, Comunidade, Sobre, Contato
7. Configurar SEO global
8. Deploy no GitHub + Vercel
```

---

## 🗺️ Arquitetura Visual das Páginas

### Home (`/`)
- **Hero:** Headline forte, subline, CTA "Ver Cursos" e "Acessar Comunidade"
- **Diferenciais:** 3 cards (Conteúdo técnico, Instrutora especialista, Comunidade ativa)
- **Courses strip:** os últimos 3 cursos do catálogo (vindos do Sanity)
- **Blog strip:** os 3 posts mais recentes
- **CTA final:** "Faça parte do TreinaVISA"

### Cursos (`/cursos`)
- Grid de cards com foto, título, preço, status e botão "Saiba mais"
- Cards com tag "Em breve" para cursos futuros

### Blog (`/blog` e `/blog/[slug]`)
- Grid de posts com capa, tag, data e resumo
- Post individual com rich text, imagem de capa e compartilhamento

### E-books (`/ebooks`)
- Galeria de materiais com capa, título, descrição e botão de download
- PDFs servidos direto do Sanity ou Google Drive

### Comunidade (`/comunidade`)
- Página de "vendas" da comunidade gratuita
- Benefícios listados + botão de acesso direto ao link externo

### Sobre (`/sobre`)
- Missão e visão do TreinaVISA
- Bio da Ester Caiafa com foto
- Linha do tempo da empresa

### Contato (`/contato`)
- Formulário: nome, e-mail, assunto, mensagem
- Links de redes sociais (Instagram)

---

## 🎨 Design System (mesmo do site-masterclass)

```
Cores:
  --brand-navy: #000f2d
  --brand-navy-light: #001f5c
  --brand-accent: #2563eb
  --text-primary: #0f172a
  --text-secondary: #475569
  --bg-primary: #f8fafc

Fonts:
  --font-sans: Inter
  --font-serif: Playfair Display (italic)
  --font-mono: JetBrains Mono
```
