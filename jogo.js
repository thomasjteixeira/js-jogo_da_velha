const jogadorSelecionado = document.getElementById("jogador-selecionado");
const vencedorSelecionado = document.getElementById("vencedor-selecionado");
const quadrados = Array.from(document.getElementsByClassName("quadrado"));



let jogador = "X";
let vencedor = null;
let quantidadeJogadas = 0;

// Verifica se não houve nenhum ganhador ou se houve empate
const isPlayable = () => (!vencedor && quantidadeJogadas !== 9)

mudarJogador("X");
defineListeners()

//função principal quando seleciona o quadrado
function escolherQuadrado(id) {
  // se já tiver um vencedor, não pode marcar mais quadrados
  if (vencedor !== null) return;
  if (!id) return;
  // pegar o elemento clicado
  const quadrado = document.getElementById(id);

  // se o quadrado já estiver preenchido, sai da função
  if (quadrado.innerHTML !== "-") return;

  quantidadeJogadas++;
  quadrado.innerHTML = jogador;
  quadrado.style.color = "#000";

  // verifica qual é o jogador e muda para o outro
  jogador = jogador === "X" ? "O" : "X";

  mudarJogador(jogador);
  checaVencedor();

  //verifica se deu empate
  verificaEmpate();
}

function mudarJogador(valor) {
  jogador = valor;
  jogadorSelecionado.innerHTML = jogador;
}

function verificaEmpate() {
  if (quantidadeJogadas === 9 && vencedor === null) {
    vencedorSelecionado.innerHTML = "Empate";
    redefineColors();
  }
}

// Verificar todos os quadrados para ver se tem um vencedor
function checaVencedor() {
  const combinacoesVencedoras = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  for (let combinacao of combinacoesVencedoras) {
    //const [quadrado1, quadrado2, quadrado3] = combinacao.map(id => document.getElementById(id));
    const a = document.getElementById(combinacao[0]);
    const b = document.getElementById(combinacao[1]);
    const c = document.getElementById(combinacao[2]);

    if (checaSequencia(a, b, c)) {
      mudarCorQuadrado(a, b, c);
      mudarVencedor(a);
      return true;
    }
  }
}

function checaSequencia(a, b, c) {
  return (
    a.innerHTML !== "-" &&
    a.innerHTML === b.innerHTML &&
    a.innerHTML === c.innerHTML
  );
}

function mudarCorQuadrado(a, b, c) {
  a.style.background = b.style.background = c.style.background = "#0f0";
}

function mudarVencedor(quadrado) {
  vencedor = quadrado.innerHTML;
  vencedorSelecionado.innerHTML = vencedor;
}

function reiniciar() {
  vencedor = null;
  vencedorSelecionado.innerHTML = "";
  quantidadeJogadas = 0;

  for (let quadrado of quadrados) {
    quadrado.style.background = "#eee";
    quadrado.style.color = "#eee";
    quadrado.innerHTML = "-";
  }

  mudarJogador("X");
}
// Volta às definições padrão de estilo em caso de empate
function redefineColors() {
  quadrados.forEach((quadrado) => {
    quadrado.style.background = '#eee'
    quadrado.style.background = '#eee'
  });
}

// Altera a cor do quadrado quando está sob o cursor do mouse
function handleMouseOver(event) {
  const quadrado = event.target;

  if (isPlayable()) {
    quadrado.style.backgroundColor = '#03a9f4';
    quadrado.style.color = (quadrado.innerHTML !== '-' ? '#000' : '#03a9f4');
  }
}

// Retorna à cor padrão quando o cursor do mouse não estiver mais sobre o item
function handleMouseOut(event) {
  const quadrado = event.target;

  if (isPlayable()) {
    quadrado.style.backgroundColor = '#eee';
    quadrado.style.color = (quadrado.innerHTML !== '-' ? '#000' : '#eee');
  }
}

// Mapeia as teclas para as posições do jogo e marca o quadrado correspondente
function playWithKeyboard(event) {
  const key = event.key;
  const keyToPosition = {
    '1': 7,
    '2': 8,
    '3': 9,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 1,
    '8': 2,
    '9': 3
  };

  const position = keyToPosition[key];

  if (isPlayable()) {
    escolherQuadrado(position);
  }
}

// Define os listeners (escutadores) para todos os quadrados do jogo
function defineListeners() {
  document.addEventListener('keydown', playWithKeyboard);
  quadrados.forEach((quadrado) => {
    quadrado.addEventListener('mouseover', handleMouseOver);
    quadrado.addEventListener('mouseout', handleMouseOut);
  });

}