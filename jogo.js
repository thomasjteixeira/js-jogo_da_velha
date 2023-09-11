var jogador = null,
  vencedor = null;
var jogadorSelecionado = document.getElementById("jogador-selecionado");
var vencedorSelecionado = document.getElementById("vencedor-selecionado");
var quantidadeJogadas = 0;

// mapear todos os quadrados
var quadrados = document.getElementsByClassName("quadrado");

mudarJogador("X");

//função principal quando seleciona o quadrado
function escolherQuadrado(id) {
  // se já tiver um vencedor, não pode marcar mais quadrados
  if (vencedor !== null) return;

  // pegar o elemento clicado
  var quadrado = document.getElementById(id);

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
    const quadrado1 = document.getElementById(combinacao[0]);
    const quadrado2 = document.getElementById(combinacao[1]);
    const quadrado3 = document.getElementById(combinacao[2]);

    if (checaSequencia(quadrado1, quadrado2, quadrado3)) {
      mudarCorQuadrado(quadrado1, quadrado2, quadrado3);
      mudarVencedor(quadrado1);
      return;
    }
  }
}

function checaSequencia(quadrado1, quadrado2, quadrado3) {
  return (
    quadrado1.innerHTML !== "-" &&
    quadrado1.innerHTML === quadrado2.innerHTML &&
    quadrado1.innerHTML === quadrado3.innerHTML
  );
}

function mudarCorQuadrado(quadrado1, quadrado2, quadrado3) {
  quadrado1.style.background =
    quadrado2.style.background =
    quadrado3.style.background =
      "#0f0";
}

function mudarVencedor(quadrado) {
  vencedor = quadrado.innerHTML;
  vencedorSelecionado.innerHTML = vencedor;
}

function reiniciar() {
  vencedor = null;
  vencedorSelecionado.innerHTML = "";
  quantidadeJogadas = 0;

  for (var i = 1; i <= quadrados.length; i++) {
    var quadrado = document.getElementById(i);
    quadrado.style.background = "#eee";
    quadrado.style.color = "#eee";
    quadrado.innerHTML = "-";
  }

  mudarJogador("X");
}
