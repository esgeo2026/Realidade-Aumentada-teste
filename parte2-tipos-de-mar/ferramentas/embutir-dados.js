// Gera o arquivo dados-embutidos.js, que guarda DENTRO de um .js as fotos, os arquivos dos cartões (.patt)
// e o arquivo de calibração da câmera.
//
// Por quê? Quando a atividade é aberta com dois cliques no index.html (endereço file://), o Chrome BLOQUEIA
// a leitura de arquivos de apoio (erro de CORS) e a RA não funciona. Arquivos .js carregados por <script>
// são permitidos, então guardamos os dados dentro de um.
//
// Uso (dentro da pasta do projeto):   node ferramentas/embutir-dados.js
// Rode de novo sempre que trocar uma foto ou refizer os cartões. O professor não precisa rodar isto
// (o arquivo pronto já está na pasta).

const fs = require('fs');
const path = require('path');
const RAIZ = path.join(__dirname, '..');

const dataUrl = (arquivo, tipo) => `data:${tipo};base64,` + fs.readFileSync(path.join(RAIZ, arquivo)).toString('base64');

const dados = {
  camera: dataUrl('libs/camera_para.dat', 'application/octet-stream'),
  patt: {
    fechado: dataUrl('marcadores/fechado.patt', 'text/plain'),
    interior: dataUrl('marcadores/interior.patt', 'text/plain'),
    aberto: dataUrl('marcadores/aberto.patt', 'text/plain')
  },
  foto: {
    fechado: dataUrl('imagens/mar-caspio.jpg', 'image/jpeg'),
    interior: dataUrl('imagens/mar-mediterraneo.jpg', 'image/jpeg'),
    aberto: dataUrl('imagens/mar-do-norte.jpg', 'image/jpeg')
  }
};

const saida = '// ARQUIVO GERADO por ferramentas/embutir-dados.js. Não edite à mão.\n' +
  'window.EMBUTIDOS = ' + JSON.stringify(dados) + ';\n';
fs.writeFileSync(path.join(RAIZ, 'dados-embutidos.js'), saida);
console.log('dados-embutidos.js gerado:', Math.round(saida.length / 1024), 'KB');
