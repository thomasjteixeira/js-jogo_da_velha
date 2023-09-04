var jogador = null;
var jogadorSelecionado = document.getElementById("jogador-selecionado");

mudarJogador("X");

function escolherQuadrado(id) {
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
}

function mudarJogador(valor) {
  jogador = valor;
  jogadorSelecionado.innerHTML = jogador;
}
