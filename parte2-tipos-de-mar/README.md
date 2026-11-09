# Tipos de mar em Realidade Aumentada (6º ano)

> Parte 2 do projeto de Realidade Aumentada. A Parte 1 (Rotação e Translação da Terra, com Sol e Lua) está na raiz deste repositório: `ratest.html`, `ratest_v2.html` e `ratest_v3.html`.

Atividade de Geografia para o celular. O aluno aponta a câmera para um cartão impresso e vê, sobre o cartão, uma foto de satélite real do mar. Assim compara os três tipos de mar:

| Cartão | Tipo de mar | Foto de satélite | Ideia principal |
|---|---|---|---|
| 1 | Mar fechado | Mar Cáspio | Mar cercado por terras, sem ligação com o oceano |
| 2 | Mar interior ou continental | Mar Mediterrâneo | Ligação estreita com o oceano |
| 3 | Mar aberto | Mar do Norte | Comunicação ampla com o oceano |

Em todos os casos, os mares recebem mais influência dos continentes do que os oceanos, por estarem mais próximos da costa, terem menor extensão e serem menos profundos.

Não precisa instalar aplicativo. Não pede cadastro e não coleta nenhum dado dos alunos.

---

## 1. O que tem dentro da pasta

| Arquivo ou pasta | Para que serve |
|---|---|
| `index.html` | A atividade inteira (telas, textos, RA, perguntas). **Abre com dois cliques no computador** |
| `ABRIR NO COMPUTADOR (camera liberada).bat` | **Atalho do Windows**: abre a atividade no Chrome ou no Edge já com a câmera liberada (veja a seção 2) |
| `dados-embutidos.js` | Fotos, cartões e calibração da câmera guardados dentro de um `.js`, para a atividade funcionar ao abrir com dois cliques |
| `marcadores/cartoes_para_imprimir.pdf` | **Os três cartões para imprimir** (uma página por cartão) |
| `marcadores/` | Também guarda as imagens dos cartões (`.png`) e os arquivos que o programa usa para reconhecê-los (`.patt`) |
| `imagens/` | As três fotos de satélite da NASA |
| `libs/` | Os programas de RA (A-Frame e AR.js), guardados aqui para a atividade não depender de sites de terceiros |
| `ferramentas/` | Só para quem quiser refazer os cartões (`gerar-marcadores.js`) ou o `dados-embutidos.js` (`embutir-dados.js`). O professor não precisa usar |
| `README.md` | Este guia |

---

## 2. Câmera não abre? O atalho das permissões

### No computador (Windows)
- **Dois cliques em `index.html`** já funcionam: o Chrome pergunta se pode usar a câmera e você escolhe **Permitir**.
- **Atalho com a câmera já liberada:** dê dois cliques em **`ABRIR NO COMPUTADOR (camera liberada).bat`**. Ele abre a atividade no Chrome (ou no Edge) aceitando a câmera automaticamente, num perfil separado (pasta `TiposDeMarRA`), sem mexer nos seus favoritos nem nas suas permissões do dia a dia. O navegador pode mostrar uma faixa amarela avisando que uma opção "não é compatível": pode ignorar. Use esse atalho só para esta atividade.
- Se o computador **não tem câmera** (comum em computador de mesa), use **Usar sem câmera**.

### Em qualquer aparelho: botão "Ajuda com a câmera"
Na tela inicial, toque em **Ajuda com a câmera**. A tela mostra:
- se a câmera está **liberada**, **bloqueada** ou **ainda não liberada** neste navegador;
- o botão **Permitir a câmera agora**, que pede a permissão de novo (só funciona se a câmera não estiver bloqueada);
- o **passo a passo** para o seu aparelho (Android, iPhone ou computador);
- no computador, o botão **Copiar o endereço das permissões** (`chrome://settings/content/camera`, ou `edge://...` no Edge) para colar numa nova aba e liberar o site.

Quando a câmera falha, a mensagem de erro traz também o **código técnico** (por exemplo, `NotAllowedError` ou `NotReadableError`). Se precisar de ajuda, me envie esse código.

---

## 3. Como imprimir os cartões

1. Abra `marcadores/cartoes_para_imprimir.pdf`.
2. Imprima em **tamanho real**, sem "ajustar à página" e sem "reduzir". No diálogo de impressão, escolha **Tamanho real** ou **100%**.
3. Use **papel fosco** (o sulfite comum serve). Papel brilhante ou plastificado reflete a luz da sala e faz a animação piscar ou sumir.
4. Confira com uma régua: o **quadrado preto** deve medir cerca de **10 cm** de lado.
5. Cole cada cartão em um papelão ou prancheta. O cartão precisa ficar **plano**: papel mole que dobra atrapalha o reconhecimento.
6. Imprima uma cópia por grupo, mais algumas reservas. O ideal é cada grupo ter os três cartões.

Dicas para o uso na sala:
- Luz uniforme. Evite lâmpada forte bem em cima do cartão (reflexo) e a janela atrás do cartão.
- Mantenha a **borda preta inteira** à vista. Um dedo cobrindo um canto faz a animação sumir.
- Se o cartão não for reconhecido, aproxime um pouco o celular e mantenha-o mais de frente.

---

## 4. Como publicar gratuitamente (o celular precisa de endereço seguro)

A câmera do celular só funciona em endereço que começa com **https://**. Abrir o arquivo direto do computador, ou por um endereço sem o "s", não libera a câmera no celular. Por isso é preciso publicar. Há dois caminhos gratuitos, os dois pelo navegador, sem terminal.

### Opção A: Netlify (a mais rápida, cerca de 2 minutos)

1. Entre em **app.netlify.com/drop** (o site pode pedir que você crie uma conta gratuita).
2. Arraste a **pasta inteira** `ra-tipos-de-mar` para a área indicada na página.
3. Em instantes o Netlify mostra um endereço terminado em `netlify.app`. Esse é o link da atividade.
4. Teste esse link no celular.

### Opção B: GitHub Pages

1. Crie uma conta gratuita em **github.com**.
2. Clique em **New repository** (novo repositório). Dê um nome, por exemplo `tipos-de-mar`, deixe **Public** e clique em **Create repository**.
3. Na página do repositório, clique em **uploading an existing file**. Arraste para lá **o conteúdo** da pasta `ra-tipos-de-mar` (o `index.html`, e as pastas `marcadores`, `imagens`, `libs` e `ferramentas`) e clique em **Commit changes**.
4. Vá em **Settings**, depois **Pages**. Em **Branch**, escolha `main` e a pasta `/ (root)` e salve.
5. Espere de 1 a 2 minutos. O endereço será parecido com `https://SEU-USUARIO.github.io/tipos-de-mar/`.
6. Teste esse link no celular.

Depois de publicar, você pode gerar um **QR code** do link (existem geradores gratuitos na internet) e imprimir junto com os cartões. Assim os alunos abrem a atividade só apontando a câmera para o QR.

---

## 5. Como testar (antes da aula)

No **celular**, abra o link publicado:
- Android: use o **Chrome**.
- iPhone: use o **Safari**.
- Abra o endereço direto no navegador, **fora de aplicativos** como WhatsApp, Instagram, TikTok ou Facebook. Os navegadores de dentro desses aplicativos costumam bloquear a câmera. Se o aluno receber o link por WhatsApp, peça que toque em "Abrir no navegador".

Roteiro de teste de 3 minutos:
1. Toque em **Começar** e permita a câmera.
2. Aponte para o cartão 1. Deve aparecer a foto do mar Cáspio sobre o cartão e o painel **Mar fechado**.
3. Faça o mesmo com os cartões 2 e 3.
4. Toque no painel: abre a ficha com definição, exemplos e influência.
5. Toque em **Comparar os três** e em **Perguntas**.
6. Tire o cartão da frente da câmera e espere 5 segundos: deve aparecer "Aponte a câmera para um cartão e aproxime um pouco".
7. Toque em **Sem câmera** para conferir o plano B.

### Plano B (sem câmera)
Se a câmera falhar (celular antigo, permissão negada, escola sem internet boa), toque em **Usar sem câmera**. O aluno escolhe o tipo de mar em botões e vê a mesma ficha, a comparação e as perguntas. A atividade pedagógica continua funcionando.

---

## 6. Por que o AR.js

Usei o **AR.js** (com o **A-Frame**) por estes motivos:
- Roda no navegador do celular, sem instalar aplicativo.
- É gratuito e de código aberto (licença MIT).
- É estável e bem conhecido, e funciona no Chrome (Android) e no Safari (iPhone).
- O reconhecimento por cartão (marcador) é leve, rápido e funciona bem em celulares simples.

Os cartões usam **marcadores de padrão**: um quadrado preto grosso com um desenho de alto contraste dentro, o formato de reconhecimento mais confiável do AR.js. Cada um dos três desenhos foi escolhido por busca para ser bem diferente dos outros (mesmo girado), para o celular não confundir um cartão com outro.

Foi uma escolha consciente não usar reconhecimento de imagens naturais (por exemplo, reconhecer a própria foto do mar impressa). Esse tipo de rastreamento é mais pesado, mais lento e menos confiável em celulares simples.

---

## 7. O que foi verificado e o que você precisa conferir

### Verificado no computador (Chrome sem tela, com câmera simulada)
- Os três cartões foram reconhecidos, cada um com o nome certo, sem confusão entre eles.
- O reconhecimento funcionou com o cartão inclinado (10, 15 e 30 graus) e com cartão pequeno na imagem.
- O painel, a ficha, "Comparar os três" e as três perguntas funcionam (certo: "Isso mesmo!"; errado: mostra a resposta correta).
- A mensagem "Aponte a câmera para um cartão e aproxime um pouco" aparece depois de 5 segundos sem cartão.
- As mensagens de erro da câmera (bloqueada, não encontrada, em uso por outro aplicativo) aparecem em português, e o modo sem câmera funciona.
- Os botões têm pelo menos 58 px de altura (o mínimo pedido era 48 px).
- O PDF tem 3 páginas, com acentos corretos e quadrado preto de 10 cm.
- A atividade funciona **abrindo com dois cliques** (endereço `file://`) e também por servidor (`http://localhost`). Os dois modos foram testados com os três cartões.
- Não houve erros no console do navegador.

### Ainda precisa de teste no celular real (não foi possível testar daqui)
- [ ] A câmera abrir no **Chrome do Android** e no **Safari do iPhone**.
- [ ] O reconhecimento com a **luz da sua sala** e com o cartão **impresso em papel comum**.
- [ ] A distância e o ângulo em que o cartão é reconhecido com a câmera real.
- [ ] O link publicado em **https** abrindo na rede Wi-Fi da escola.
- [ ] O desempenho em celulares mais simples dos alunos.

Se algo falhar, anote a **mensagem exata** que aparece na tela. Ela indica a causa.

---

## 8. Se algo der errado

| O que acontece | O que fazer |
|---|---|
| "A câmera foi bloqueada" | Toque no cadeado ao lado do endereço, libere a Câmera e recarregue a página |
| "Este navegador não liberou a câmera" | Abra o link com `https://` no Chrome ou no Safari, fora de WhatsApp ou Instagram |
| "A câmera está sendo usada por outro aplicativo" | Feche os outros aplicativos e abas que usam a câmera e toque em Tentar de novo |
| "Não consegui abrir a câmera" ao abrir com dois cliques | Use o atalho `ABRIR NO COMPUTADOR (camera liberada).bat` ou o botão Ajuda com a câmera |
| A foto aparece e some | Cartão cortado, reflexo ou pouca luz. Confira o papel fosco e a borda preta inteira à vista |
| A foto treme | Cartão pequeno ou longe. Aproxime o celular ou imprima em folha inteira |
| Demora para abrir | A primeira abertura baixa cerca de 4 MB entre bibliotecas e fotos. Depois fica mais rápido |

---

## 9. Fotos de satélite: fontes e direitos de imagem

As três fotos foram obtidas no **Wikimedia Commons**, que as registra como **domínio público** (imagens produzidas pela NASA). Conferi a licença de cada uma em 07/11/2026.

| Arquivo | Imagem | Crédito | Página de origem |
|---|---|---|---|
| `imagens/mar-caspio.jpg` | Mar Cáspio visto do espaço (sem linhas vermelhas) | Jeff Schmaltz, MODIS Rapid Response Team, NASA/GSFC (versão derivada no Commons por IdLoveOne) | https://commons.wikimedia.org/wiki/File:Caspian_Sea_from_orbit-NoRedLines.jpg |
| `imagens/mar-mediterraneo.jpg` | Mar Mediterrâneo, composição "Blue Marble" | NASA, Visible Earth (enviada ao Commons por Sansculotte) | https://commons.wikimedia.org/wiki/File:Mittelmeer_aus_Visible_Earth_-_Blue_Marble.jpg |
| `imagens/mar-do-norte.jpg` | Mar do Norte | MODIS Rapid Response Team, NASA/GSFC | https://commons.wikimedia.org/wiki/File:NASA_North_Sea_ONLY_(cropped).jpg |

As imagens foram apenas reduzidas de tamanho para carregar rápido no celular, sem alteração de conteúdo.

**Aviso sobre direitos de imagem:** nenhuma das fotos usadas exige licença paga ou autorização, pois são de domínio público. Mesmo assim, **mantenha o crédito à NASA** (a própria atividade mostra "Imagem de satélite da NASA (domínio público)" ao lado de cada foto). Se você trocar uma foto por outra, confira a licença: imagens com licença "CC BY" exigem citar o autor, e imagens de outras agências ou empresas podem não ser livres.

---

## 10. Licenças dos programas usados

- **A-Frame 1.0.4** (aframe.io): licença MIT.
- **AR.js** (ar-js-org.github.io): licença MIT.

Os dois são livres para uso em escola, inclusive copiados na pasta `libs/`.

---

## 11. Para quem quiser mudar algo

- Textos, frases, exemplos e perguntas ficam no começo do script dentro de `index.html` (bloco "CONTEÚDO").
- Para refazer os cartões e o PDF: `node ferramentas/gerar-marcadores.js` (precisa do Node instalado). Se refizer, imprima de novo, porque os desenhos e os arquivos `.patt` precisam combinar.
- Se trocar uma foto, mantenha o mesmo nome do arquivo ou ajuste o nome no bloco de conteúdo, e rode `node ferramentas/embutir-dados.js` para atualizar o `dados-embutidos.js`.
