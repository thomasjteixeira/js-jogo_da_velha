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
  quantidadeJogadas++;
  // se já tiver um vencedor, não pode marcar mais quadrados
  if (vencedor !== null) {
    return;
  }

  // pegar o elemento clicado
  var quadrado = document.getElementById(id);

  // se o quadrado já estiver preenchido, sai da função
  if (quadrado.innerHTML !== "-") {
    return;
  }

  quadrado.innerHTML = jogador;
  quadrado.style.color = "#000";

  // verifica qual é o jogador e muda para o outro
  if (jogador === "X") {
    jogador = "O";
  } else {
    jogador = "X";
  }

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
  if (quantidadeJogadas === 9) {
    jogadorSelecionado.innerHTML = "Empate";
    vencedorSelecionado.innerHTML = "Empate";

    return;
  }
}

// Verificar todos os quadrados para ver se tem um vencedor
function checaVencedor() {
  var quadrado1 = document.getElementById(1);
  var quadrado2 = document.getElementById(2);
  var quadrado3 = document.getElementById(3);
  var quadrado4 = document.getElementById(4);
  var quadrado5 = document.getElementById(5);
  var quadrado6 = document.getElementById(6);
  var quadrado7 = document.getElementById(7);
  var quadrado8 = document.getElementById(8);
  var quadrado9 = document.getElementById(9);

  if (checaSequencia(quadrado1, quadrado2, quadrado3)) {
    mudarCorQuadrado(quadrado1, quadrado2, quadrado3);
    mudarVencedor(quadrado1);
    return;
  }

  if (checaSequencia(quadrado4, quadrado5, quadrado6)) {
    mudarCorQuadrado(quadrado4, quadrado5, quadrado6);
    mudarVencedor(quadrado4);
    return;
  }

  if (checaSequencia(quadrado7, quadrado8, quadrado9)) {
    mudarCorQuadrado(quadrado7, quadrado8, quadrado9);
    mudarVencedor(quadrado7);
    return;
  }

  if (checaSequencia(quadrado1, quadrado4, quadrado7)) {
    mudarCorQuadrado(quadrado1, quadrado4, quadrado7);
    mudarVencedor(quadrado1);
    return;
  }

  if (checaSequencia(quadrado2, quadrado5, quadrado8)) {
    mudarCorQuadrado(quadrado2, quadrado5, quadrado8);
    mudarVencedor(quadrado2);
    return;
  }

  if (checaSequencia(quadrado3, quadrado6, quadrado9)) {
    mudarCorQuadrado(quadrado3, quadrado6, quadrado9);
    mudarVencedor(quadrado3);
    return;
  }

  if (checaSequencia(quadrado1, quadrado5, quadrado9)) {
    mudarCorQuadrado(quadrado1, quadrado5, quadrado9);
    mudarVencedor(quadrado1);
    return;
  }

  if (checaSequencia(quadrado3, quadrado5, quadrado7)) {
    mudarCorQuadrado(quadrado3, quadrado5, quadrado7);
    mudarVencedor(quadrado3);
    return;
  }
}

function checaSequencia(quadrado1, quadrado2, quadrado3) {
  var eigual = false;

  if (
    quadrado1.innerHTML !== "-" &&
    quadrado1.innerHTML === quadrado2.innerHTML &&
    quadrado1.innerHTML === quadrado3.innerHTML
  ) {
    eigual = true;
  }

  return eigual;
}

function mudarCorQuadrado(quadrado1, quadrado2, quadrado3) {
  quadrado1.style.background = "#0f0";
  quadrado2.style.background = "#0f0";
  quadrado3.style.background = "#0f0";
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
