/*
 * Black Friday 2026 da Consultora Sanitária.
 * Cópia no site do TreinaVISA: data-sem-link tira o link do calendário enquanto a /black-friday não está no ar.
 * Um arquivo só para todas as páginas: datas, faixa do topo e bloco da oferta.
 * Cada página diz qual é a sua onda pelos atributos data-* da própria tag <script>.
 * Para testar um dia: ?bf=2026-11-03T10:00 no endereço, ou data-agora na tag.
 */
(function () {
  var tag = document.currentScript;
  var cfg = tag ? tag.dataset : {};

  var INICIO = +new Date('2026-11-03T00:00:00-03:00');
  var CYBER = +new Date('2026-11-30T00:00:00-03:00');
  var FIM = +new Date('2026-11-30T23:59:59-03:00');
  var ONDAS = {
    pastas: +new Date('2026-11-03T00:00:00-03:00'),
    servicos: +new Date('2026-11-11T00:00:00-03:00'),
    consultoria: +new Date('2026-11-18T00:00:00-03:00'),
    cyber: CYBER
  };
  var PAGINA_BF = 'https://www.consultorasanitaria.com.br/black-friday';
  // O calendário só revela nome e oferta de cada surpresa quando ela abre.
  var CALENDARIO = [
    { k: 'pastas', dia: '03/11', nome: 'Pastas prontas', oferta: '30% OFF', link: PAGINA_BF + '#pastas' },
    { k: 'servicos', dia: '11/11', nome: 'Vistorias e pastas personalizadas', oferta: '30% OFF', link: PAGINA_BF + '#servicos' },
    { k: 'consultoria', dia: '18/11', nome: 'Consultoria 360º', oferta: 'R$ 1.000 OFF', link: 'https://www.consultorasanitaria.com.br/consultoria-360' },
    { k: 'cyber', dia: '30/11', nome: 'Cyber Monday', oferta: 'SÓ HOJE', link: PAGINA_BF + '#cyber' }
  ];

  var desvio = 0;
  var teste = cfg.agora || new URLSearchParams(location.search).get('bf');
  if (teste) {
    var t0 = +new Date(teste.length <= 16 ? teste + ':00-03:00' : teste);
    if (!isNaN(t0)) desvio = t0 - Date.now();
  }
  function agora() { return Date.now() + desvio; }

  function proxima(t) {
    for (var i = 0; i < CALENDARIO.length; i++) if (t < ONDAS[CALENDARIO[i].k]) return ONDAS[CALENDARIO[i].k];
    return null;
  }
  function partes(ms) {
    var s = Math.max(0, Math.floor(ms / 1000));
    return { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
  }
  function z(n) { return (n < 10 ? '0' : '') + n; }
  function curto(ms) { var p = partes(ms); return (p.d ? p.d + 'd ' : '') + z(p.h) + 'h ' + z(p.m) + 'm ' + z(p.s) + 's'; }
  function relogio(ms) {
    var p = partes(ms);
    return '<div class="bf26-relogio" role="timer">' +
      '<div><b>' + z(p.d) + '</b><span>dias</span></div><div><b>' + z(p.h) + '</b><span>horas</span></div>' +
      '<div><b>' + z(p.m) + '</b><span>min</span></div><div><b>' + z(p.s) + '</b><span>seg</span></div></div>';
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // Repassa UTM e identificadores de clique da página para o checkout.
  function comOrigem(url) {
    if (!url) return url;
    var u = new URL(url, location.href), q = new URLSearchParams(location.search);
    q.forEach(function (v, k) { if (/^(utm_|sck|src|fbclid|gclid)/.test(k) && !u.searchParams.has(k)) u.searchParams.set(k, v); });
    return u.toString();
  }
  function evento(nome) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: nome, bf_onda: cfg.onda || 'site' });
  }

  var css = '' +
    '.bf26-faixa{background:#0E0B0C;color:#fff;font-weight:600;font-size:13px;line-height:1.35;padding:9px 16px;text-align:center;display:flex;flex-wrap:wrap;gap:4px 10px;justify-content:center;align-items:center;position:relative;z-index:60}' +
    '.bf26-faixa a{color:#fff}' +
    '.bf26-faixa b{background:#E3242B;color:#fff;padding:2px 7px;border-radius:4px;letter-spacing:.04em;font-weight:800}' +
    '.bf26-faixa .bf26-t{font-variant-numeric:tabular-nums;font-weight:800}' +
    '.bf26-bloco{background:#0E0B0C;color:#fff;padding:40px max(16px,env(safe-area-inset-left,0px))}' +
    '.bf26-in{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:32px;align-items:start}' +
    '@media (max-width:820px){.bf26-in{grid-template-columns:1fr;gap:20px}}' +
    '.bf26-col{display:grid;gap:14px;align-content:start}' +
    '.bf26-selo{justify-self:start;background:#E3242B;color:#fff;font-weight:800;font-size:13px;letter-spacing:.08em;padding:5px 11px;border-radius:6px}' +
    '.bf26-grande{font-family:Fraunces,"Fraunces fb",Georgia,serif;font-weight:700;font-size:clamp(56px,11vw,104px);line-height:.9;letter-spacing:-.03em;color:#E3242B;margin:0}' +
    '.bf26-titulo{font-family:Fraunces,"Fraunces fb",Georgia,serif;font-weight:700;font-size:clamp(30px,5vw,46px);line-height:1.05;letter-spacing:-.02em;margin:0;color:#fff}' +
    '.bf26-titulo em{font-style:normal;color:#E3242B}' +
    '.bf26-preco{font-family:Fraunces,"Fraunces fb",Georgia,serif;font-weight:700;font-size:clamp(44px,8vw,72px);line-height:.95;margin:0;font-variant-numeric:tabular-nums}' +
    '.bf26-txt{font-size:16px;color:#E6DADD;margin:0}' +
    '.bf26-rot{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#BFAFB4;margin:0}' +
    '.bf26-lista{margin:0;padding-left:20px;display:grid;gap:4px;font-size:15px}' +
    '.bf26-relogio{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:420px}' +
    '.bf26-relogio div{background:#211A1C;border-radius:10px;padding:10px 0;text-align:center}' +
    '.bf26-relogio b{display:block;font-size:30px;font-variant-numeric:tabular-nums;line-height:1.1}' +
    '.bf26-relogio span{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#BFAFB4}' +
    '.bf26-cal{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}' +
    '.bf26-dia{background:#211A1C;border:1px solid #3A2E32;border-radius:14px;padding:14px;display:grid;gap:6px;align-content:start;color:#fff;text-decoration:none;min-height:132px}' +
    '.bf26-dia .bf26-data{font-family:Fraunces,"Fraunces fb",Georgia,serif;font-weight:700;font-size:28px;line-height:1;font-variant-numeric:tabular-nums}' +
    '.bf26-dia b{font-size:15px;line-height:1.25}' +
    '.bf26-dia small{font-size:12.5px;color:#BFAFB4}' +
    '.bf26-dia em{justify-self:start;font-style:normal;font-weight:800;font-size:13px;padding:4px 9px;border-radius:6px;background:#3A2E32}' +
    '.bf26-dia.bf26-aberta{border:2px solid #E3242B}' +
    '.bf26-dia.bf26-aberta em{background:#E3242B}' +
    '.bf26-dia.bf26-vez{border-color:#8C7680}' +
    '.bf26-form{background:#1A1416;border:1px solid #3A2E32;border-radius:16px;padding:20px;display:grid;gap:10px}' +
    '.bf26-form h3{margin:0;font-size:20px;line-height:1.2;color:#fff}' +
    '.bf26-form p{margin:0;font-size:14.5px;color:#D9CCCF}' +
    '.bf26-form label{display:grid;gap:4px;font-size:13px;font-weight:600;color:#D9CCCF}' +
    '.bf26-form input{font:inherit;font-size:16px;color:#fff;background:#0E0B0C;border:1px solid #4A3C41;border-radius:10px;padding:12px;min-height:48px}' +
    '.bf26-form input:focus-visible{outline:3px solid #E3242B;outline-offset:1px}' +
    '.bf26-btn{display:block;width:100%;text-align:center;font:inherit;font-weight:800;font-size:16px;padding:15px;border-radius:12px;border:0;background:#E3242B;color:#fff;cursor:pointer;text-decoration:none;min-height:52px}' +
    '.bf26-btn:focus-visible{outline:3px solid #fff;outline-offset:2px}' +
    '.bf26-sem{display:block;text-align:center;color:#D9CCCF;font-size:14px;padding:6px}' +
    '.bf26-cupom{border:2px dashed #E3242B;border-radius:12px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;gap:10px}' +
    '.bf26-cupom span{display:block;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#BFAFB4}' +
    '.bf26-cupom strong{font-size:26px;letter-spacing:.06em}' +
    '.bf26-copiar{font:inherit;font-weight:800;background:#fff;color:#0E0B0C;border:0;border-radius:8px;padding:10px 14px;cursor:pointer;min-height:44px}' +
    '.bf26-ok{background:#211A1C;border-radius:12px;padding:14px;font-weight:600}' +
    '.bf26-nota{font-size:12.5px;color:#BFAFB4;margin:0}' +
    '.bf26-erro{color:#FFB3B6;font-size:13px;margin:0}' +
    '@media (prefers-reduced-motion:no-preference){.bf26-grande,.bf26-vez em{animation:bf26-pulso 1.8s ease-in-out infinite}}' +
    '@keyframes bf26-pulso{50%{opacity:.6}}';

  var estilo = document.createElement('style');
  estilo.textContent = css;
  document.head.appendChild(estilo);

  // Faixa do topo: nunca diz o que abre, nem quanto.
  var faixa = document.createElement('div');
  faixa.className = 'bf26-faixa';
  faixa.setAttribute('role', 'status');
  function textoFaixa(t) {
    if (t > FIM) return '';
    var cal = (cfg.onda === 'vitrine' || cfg.semLink !== undefined) ? '' : ' <a href="' + PAGINA_BF + '">ver o calendário</a>';
    if (t >= CYBER) return '<span>CYBER MONDAY</span><b>ÚLTIMO DIA</b><span>a oferta única de hoje termina em <span class="bf26-t">' + curto(FIM - t) + '</span></span>' + cal;
    if (t < INICIO) return '<span>BLACK FRIDAY</span><b>??? OFF</b><span>começa em <span class="bf26-t">' + curto(INICIO - t) + '</span></span>' + cal;
    return '<span>BLACK FRIDAY</span><b>JÁ COMEÇOU</b><span>próxima surpresa em <span class="bf26-t">' + curto(proxima(t) - t) + '</span></span>' + cal;
  }

  var bloco = null, estado = '', enviado = false, cupom = '';
  function campos(botao) {
    return '<label>Seu nome<input name="nome" autocomplete="name" required></label>' +
      '<label>Seu e-mail<input name="email" type="email" autocomplete="email" inputmode="email" required></label>' +
      '<label>Seu WhatsApp<input name="whatsapp" type="tel" autocomplete="tel" inputmode="tel" required></label>' +
      '<p class="bf26-erro" hidden></p><button class="bf26-btn" type="submit">' + botao + '</button>';
  }
  function avise(titulo, texto) {
    return '<form class="bf26-form" data-bf26="aviso"><h3>' + titulo + '</h3>' +
      (enviado ? '<p class="bf26-ok">Pronto! Você recebe no e-mail e no WhatsApp assim que abrir.</p>' : '<p>' + texto + '</p>' + campos('Quero saber primeiro')) + '</form>';
  }
  function itens() {
    if (!cfg.itens) return '';
    return '<ul class="bf26-lista">' + cfg.itens.split('|').map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
  }

  // Site principal: calendário de surpresas.
  function montarVitrine(t) {
    var vez = proxima(t), titulo, sub, alvo;
    if (t >= CYBER) { titulo = 'Último dia da <em>Black Friday.</em>'; sub = 'A oferta única de hoje termina em'; alvo = FIM; }
    else if (t < INICIO) { titulo = 'Quatro surpresas. <em>Uma de cada vez.</em>'; sub = 'Cada uma abre à meia-noite do seu dia. A primeira abre em'; alvo = INICIO; }
    else { titulo = 'A Black Friday <em>começou.</em>'; sub = 'A próxima surpresa abre em'; alvo = vez; }
    var dias = CALENDARIO.map(function (o, i) {
      var abre = ONDAS[o.k];
      if (t >= abre) {
        return '<a class="bf26-dia bf26-aberta" href="' + esc(o.link) + '"><span class="bf26-data">' + o.dia + '</span><b>' + esc(o.nome) + '</b><em>' + esc(o.oferta) + '</em><small>Ver a oferta →</small></a>';
      }
      var nome = o.k === 'cyber' ? 'Cyber Monday: oferta única de 24 horas' : 'Surpresa nº ' + (i + 1);
      return '<div class="bf26-dia' + (abre === vez ? ' bf26-vez' : '') + '"><span class="bf26-data">' + o.dia + '</span><b>' + nome + '</b><em>???</em><small>abre à meia-noite</small></div>';
    }).join('');
    return '<div class="bf26-in"><div class="bf26-col"><span class="bf26-selo">BLACK FRIDAY</span>' +
      '<p class="bf26-titulo">' + titulo + '</p><p class="bf26-rot">' + sub + '</p>' +
      '<div data-bf26-relogio>' + relogio(alvo - t) + '</div><div class="bf26-cal">' + dias + '</div></div>' +
      avise('Quer saber antes de todo mundo?', 'Deixe seu contato. Cada surpresa chega no seu e-mail e no WhatsApp no minuto em que abrir.') + '</div>';
  }

  // Página de produto: surpresa antes de abrir, cupom depois.
  function montar(t) {
    if (cfg.onda === 'vitrine') return montarVitrine(t);
    var abre = ONDAS[cfg.onda];
    if (t < abre) {
      var sem = cfg.semDesconto ? '<a class="bf26-sem" href="' + esc(comOrigem(cfg.semDesconto)) + '">Quero comprar agora, sem o desconto</a>' : '';
      return '<div class="bf26-in"><div class="bf26-col">' +
        '<span class="bf26-selo">BLACK FRIDAY</span><p class="bf26-grande">??? OFF</p>' +
        '<p class="bf26-txt">Tem surpresa chegando nesta página. Quem deixa o contato fica sabendo primeiro.</p>' +
        '<p class="bf26-rot">Abre em</p><div data-bf26-relogio>' + relogio(abre - t) + '</div>' + sem + '</div>' +
        avise('Me avise quando abrir', 'Você recebe no e-mail e no WhatsApp no minuto em que a surpresa desta página abrir.') + '</div>';
    }
    var revelado = enviado && cupom;
    return '<div class="bf26-in"><div class="bf26-col">' +
      '<span class="bf26-selo">BLACK FRIDAY · ' + esc(cfg.oferta || '') + '</span>' +
      '<p class="bf26-preco">' + esc(cfg.preco || '') + '</p>' +
      '<p class="bf26-txt">com o cupom' + (cfg.precoNormal ? '. Depois volta para ' + esc(cfg.precoNormal) : '') + '.</p>' +
      itens() + '<p class="bf26-rot">A oferta termina em</p><div data-bf26-relogio>' + relogio(FIM - t) + '</div></div>' +
      '<form class="bf26-form" data-bf26="cupom"><h3>' + (revelado ? 'Seu cupom' : 'Resgate seu cupom') + '</h3>' +
      (revelado
        ? '<div class="bf26-cupom"><div><span>Cupom</span><strong>' + esc(cupom) + '</strong></div><button type="button" class="bf26-copiar" data-bf26-copiar>copiar</button></div>' +
          '<a class="bf26-btn" href="' + esc(comOrigem(cfg.checkout)) + '" data-bf26-comprar>Comprar com o cupom</a>' +
          '<p class="bf26-nota">Cole o cupom no checkout antes de pagar.</p>'
        : '<p>Deixe seu contato e o cupom aparece aqui na hora.</p>' + campos('Resgatar meu cupom')) +
      '</form></div>';
  }

  // Grava o contato. Sem data-api (prévia), só simula.
  function enviar(form, tipo) {
    var d = new FormData(form), erro = form.querySelector('.bf26-erro');
    var dados = { tipo: tipo, onda: cfg.onda, pagina: location.href, nome: d.get('nome'), email: d.get('email'), whatsapp: d.get('whatsapp') };
    var fim = function (codigo) {
      enviado = true; cupom = codigo || '';
      evento(tipo === 'cupom' ? 'cupom_resgatado' : 'bf_aviso_cadastrado');
      estado = ''; desenhar();
    };
    if (!cfg.api) return fim(cfg.cupomPrevia);
    fetch(cfg.api, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados) })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (j) { fim(j.cupom); })
      .catch(function () { erro.hidden = false; erro.textContent = 'Não deu para enviar agora. Tente de novo em instantes.'; });
  }

  function desenhar() {
    var t = agora();
    var f = textoFaixa(t);
    if (f) { faixa.innerHTML = f; if (!faixa.parentNode) document.body.insertBefore(faixa, document.body.firstChild); }
    else if (faixa.parentNode) faixa.remove();

    if (!bloco) return;
    if (t > FIM) { bloco.hidden = true; return; }
    var vitrine = cfg.onda === 'vitrine';
    var novo = vitrine ? 'v' + (proxima(t) || 'cyber') : t < ONDAS[cfg.onda] ? 'antes' : 'aberta';
    var digitando = bloco.contains(document.activeElement) && document.activeElement.tagName === 'INPUT';
    if (novo !== estado && !digitando) { estado = novo; bloco.innerHTML = montar(t); bloco.hidden = false; return; }
    var alvo = vitrine ? (t >= CYBER ? FIM : t < INICIO ? INICIO : proxima(t)) : t < ONDAS[cfg.onda] ? ONDAS[cfg.onda] : FIM;
    var r = bloco.querySelector('[data-bf26-relogio]');
    if (r) r.innerHTML = relogio(alvo - t);
  }

  function iniciar() {
    if (ONDAS[cfg.onda] || cfg.onda === 'vitrine') {
      bloco = document.createElement('section');
      bloco.className = 'bf26-bloco';
      bloco.setAttribute('aria-label', 'Black Friday');
      var alvo = cfg.alvo && document.querySelector(cfg.alvo);
      if (alvo) alvo.parentNode.insertBefore(bloco, alvo); else document.body.appendChild(bloco);
      bloco.addEventListener('submit', function (e) {
        e.preventDefault();
        enviar(e.target, e.target.getAttribute('data-bf26'));
      });
      bloco.addEventListener('click', function (e) {
        var b = e.target.closest('[data-bf26-copiar]');
        if (b) (navigator.clipboard ? navigator.clipboard.writeText(cupom) : Promise.reject()).then(function () { b.textContent = 'copiado'; }, function () { b.textContent = cupom; });
        if (e.target.closest('[data-bf26-comprar]')) evento('bf_comprar');
      });
    }
    desenhar();
    setInterval(desenhar, 1000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
