const jogadorSelecionado = document.getElementById("jogador-selecionado");
const vencedorSelecionado = document.getElementById("vencedor-selecionado");
const quadrados = Array.from(document.getElementsByClassName("quadrado"));

let jogador = "X";
let vencedor = null;
let quantidadeJogadas = 0;

// mapear todos os quadrados

mudarJogador("X");

//função principal quando seleciona o quadrado
function escolherQuadrado(id) {
  // se já tiver um vencedor, não pode marcar mais quadrados
  if (vencedor !== null) return;

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
      return;
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
