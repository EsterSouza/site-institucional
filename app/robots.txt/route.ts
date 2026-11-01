export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: https://www.treinavisa.com.br/sitemap.xml

# Content Signals — declaracao de preferencias de uso de conteudo por IA
# Spec: https://contentsignals.org / IETF Draft
Content-Signal: ai-train=no, search=yes, ai-input=yes
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
