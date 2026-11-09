// Gerador dos cartões-marcador da atividade "Tipos de mar".
// Uso (dentro da pasta do projeto):   node ferramentas/gerar-marcadores.js
// Cria: marcadores/*.png, marcadores/*.patt e marcadores/cartoes_para_imprimir.pdf
// Não precisa instalar nada além do Node. O professor NÃO precisa rodar isto:
// os arquivos prontos já estão na pasta marcadores/.

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PASTA = path.join(__dirname, '..', 'marcadores');
fs.mkdirSync(PASTA, { recursive: true });

// ---------- 1. Os três desenhos (6x6 células; 1 = preto, 0 = branco) ----------
// Os desenhos foram ESCOLHIDOS POR BUSCA para serem o mais diferentes possível entre
// si (mesmo girados) e sem simetria, para o celular nunca confundir um cartão com outro
// nem errar qual lado é "para cima". Desenhos "bonitos" (anel, C aberto) foram testados
// e descartados: ficavam parecidos demais para o reconhecimento por imagem.
// Em volta fica sempre uma moldura branca de 1 célula (a grade real é 8x8).
const CARTOES = [
  {
    id: 'fechado', nome: 'Mar fechado', patt: 'fechado.patt',
    desenho: [
      [1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 1, 1],
      [0, 1, 1, 0, 0, 1],
      [1, 0, 1, 1, 1, 0],
      [0, 1, 0, 1, 1, 1]
    ]
  },
  {
    id: 'interior', nome: 'Mar interior ou continental', patt: 'interior.patt',
    desenho: [
      [1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0]
    ]
  },
  {
    id: 'aberto', nome: 'Mar aberto', patt: 'aberto.patt',
    desenho: [
      [1, 1, 1, 1, 0, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0],
      [1, 1, 1, 0, 0, 1],
      [0, 1, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0]
    ]
  }
];

// ---------- 2. Conferência: os desenhos são diferentes entre si (mesmo girados)? ----------
function grade8(d) {                      // coloca o desenho 6x6 dentro de uma grade 8x8 branca
  const g = Array.from({ length: 8 }, () => Array(8).fill(0));
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) g[r + 1][c + 1] = d[r][c];
  return g;
}
function girar(g) {                       // gira 90 graus
  const n = g.length;
  return g.map((_, r) => g.map((__, c) => g[n - 1 - c][r]));
}
function dist(a, b) {
  let n = 0; for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (a[r][c] !== b[r][c]) n++;
  return n;
}
function confere() {
  const gs = CARTOES.map(c => grade8(c.desenho));
  let menorEntre = 99, menorPropria = 99;
  gs.forEach((a, i) => {
    let r = a; for (let k = 1; k < 4; k++) { r = girar(r); menorPropria = Math.min(menorPropria, dist(a, r)); }
    gs.forEach((b, j) => {
      if (j <= i) return;
      let rb = b; for (let k = 0; k < 4; k++) { menorEntre = Math.min(menorEntre, dist(a, rb)); rb = girar(rb); }
    });
  });
  console.log('Menor diferença entre dois cartões diferentes (de 64 células, qualquer giro):', menorEntre);
  console.log('Menor diferença de um cartão com ele mesmo girado (quanto maior, melhor):', menorPropria);
  if (menorEntre < 16 || menorPropria < 12) throw new Error('Desenhos parecidos demais: refaça os desenhos.');
}
confere();

// ---------- 3. Desenho dos marcadores em imagem ----------
// Tamanho: quadrado preto de 800 px, com 80 px de margem branca (imagem de 960 px).
// A borda preta tem 25% do lado (200 px) e o miolo 50% (400 px = 8 células de 50 px),
// que é o formato que o AR.js espera (patternRatio 0,5).
const LADO = 960, MARGEM = 80, PRETO = 800, BORDA = 200, CEL = 50;
function renderiza(d) {
  const g8 = grade8(d);
  const px = Buffer.alloc(LADO * LADO, 255);
  for (let y = MARGEM; y < MARGEM + PRETO; y++) px.fill(0, y * LADO + MARGEM, y * LADO + MARGEM + PRETO);
  const x0 = MARGEM + BORDA;
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    const v = g8[r][c] ? 0 : 255;
    for (let y = 0; y < CEL; y++) px.fill(v, (x0 + r * CEL + y) * LADO + x0 + c * CEL, (x0 + r * CEL + y) * LADO + x0 + (c + 1) * CEL);
  }
  return px;
}

// ---------- 4. PNG sem bibliotecas ----------
const crcTab = (() => { const t = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(buf) { let c = 0xffffffff; for (const b of buf) c = crcTab[(c ^ b) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function bloco(tipo, dados) {
  const len = Buffer.alloc(4); len.writeUInt32BE(dados.length);
  const t = Buffer.from(tipo, 'latin1');
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, dados])));
  return Buffer.concat([len, t, dados, crc]);
}
function png(px, w, h) {
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 0;
  const linhas = Buffer.alloc((w + 1) * h);
  for (let y = 0; y < h; y++) { linhas[y * (w + 1)] = 0; px.copy(linhas, y * (w + 1) + 1, y * w, (y + 1) * w); }
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), bloco('IHDR', ihdr),
    bloco('IDAT', zlib.deflateSync(linhas, { level: 9 })), bloco('IEND', Buffer.alloc(0))]);
}

// ---------- 5. Arquivo .patt (formato do AR.js/ARToolKit: 16x16, 3 canais B,G,R, 4 giros) ----------
function patt(d) {
  let g = grade8(d), saida = '';
  for (let giro = 0; giro < 4; giro++) {
    if (giro) saida += '\n';
    for (let canal = 0; canal < 3; canal++) {          // ordem B, G, R (iguais, pois é preto e branco)
      for (let y = 0; y < 16; y++) {
        const linha = [];
        for (let x = 0; x < 16; x++) linha.push(String(g[y >> 1][x >> 1] ? 0 : 255).padStart(3, ' '));
        saida += linha.join(' ') + '\n';
      }
    }
    g = girar(g);
  }
  return saida;
}

// ---------- 6. PDF sem bibliotecas (3 páginas A4, um cartão por página) ----------
function latin(s) { return Buffer.from(s, 'latin1'); }
function esc(s) { return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)'); }
function pdf(cartoes) {
  const objs = [];                         // objs[i] = Buffer do objeto número i+1
  const novo = b => { objs.push(b); return objs.length; };
  const A4W = 595.28, A4H = 841.89, CM = 28.3465;
  const lado = 12 * CM;                    // imagem total de 12 cm = quadrado preto de 10 cm + 1 cm de margem
  const fonteB = novo(latin('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'));
  const fonteN = novo(latin('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'));
  const reservaPaginas = novo(latin('PLACEHOLDER'));            // objeto "Pages", preenchido no fim
  const paginas = [];
  const texto = (t, tam, bold, y, cor) => {
    const larg = t.length * tam * (bold ? 0.56 : 0.5);          // largura aproximada para centralizar
    return `BT ${cor} rg /${bold ? 'F1' : 'F2'} ${tam} Tf ${((A4W - larg) / 2).toFixed(2)} ${y} Td (${esc(t)}) Tj ET\n`;
  };
  cartoes.forEach((c, i) => {
    const px = renderiza(c.desenho);
    const dados = zlib.deflateSync(px, { level: 9 });
    const img = novo(Buffer.concat([latin(`<< /Type /XObject /Subtype /Image /Width ${LADO} /Height ${LADO} /ColorSpace /DeviceGray /BitsPerComponent 8 /Filter /FlateDecode /Length ${dados.length} >>\nstream\n`), dados, latin('\nendstream')]));
    const x = (A4W - lado) / 2, y = A4H - 120 - lado;
    let cont = '';
    cont += texto('Tipos de mar: cartão ' + (i + 1) + ' de 3', 14, false, 790, '0.35 0.35 0.35');
    cont += `q ${lado.toFixed(2)} 0 0 ${lado.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm /Im1 Do Q\n`;
    cont += texto(c.nome, 30, true, y - 50, '0 0 0');
    cont += texto('Imprima em papel fosco, cole em papelão e mantenha o cartão plano.', 12, false, y - 85, '0.25 0.25 0.25');
    cont += texto('Quadrado preto com cerca de 10 cm de lado.', 12, false, y - 102, '0.25 0.25 0.25');
    const cb = latin(cont);
    const conteudo = novo(Buffer.concat([latin(`<< /Length ${cb.length} >>\nstream\n`), cb, latin('endstream')]));
    paginas.push(novo(latin(`<< /Type /Page /Parent ${reservaPaginas} 0 R /MediaBox [0 0 ${A4W} ${A4H}] /Contents ${conteudo} 0 R /Resources << /Font << /F1 ${fonteB} 0 R /F2 ${fonteN} 0 R >> /XObject << /Im1 ${img} 0 R >> >> >>`)));
  });
  objs[reservaPaginas - 1] = latin(`<< /Type /Pages /Count ${paginas.length} /Kids [${paginas.map(p => p + ' 0 R').join(' ')}] >>`);
  const raiz = novo(latin(`<< /Type /Catalog /Pages ${reservaPaginas} 0 R >>`));
  let saida = Buffer.concat([latin('%PDF-1.4\n')]);
  const pos = [];
  objs.forEach((b, i) => { pos.push(saida.length); saida = Buffer.concat([saida, latin(`${i + 1} 0 obj\n`), b, latin('\nendobj\n')]); });
  const xref = saida.length;
  let tab = `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + pos.map(p => String(p).padStart(10, '0') + ' 00000 n \n').join('');
  tab += `trailer\n<< /Size ${objs.length + 1} /Root ${raiz} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.concat([saida, latin(tab)]);
}

// ---------- 7. Grava tudo ----------
CARTOES.forEach(c => {
  fs.writeFileSync(path.join(PASTA, `marcador-${c.id}.png`), png(renderiza(c.desenho), LADO, LADO));
  fs.writeFileSync(path.join(PASTA, c.patt), patt(c.desenho));
});
fs.writeFileSync(path.join(PASTA, 'cartoes_para_imprimir.pdf'), pdf(CARTOES));
console.log('Pronto. Arquivos em:', PASTA);
