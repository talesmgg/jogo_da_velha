const currentPlayer = document.querySelector(".currentPlayer");
const player1ScoreElement = document.querySelector("#player1-score");
const player2ScoreElement = document.querySelector("#player2-score");


let selected;
let player = "X";
let player1Score = 0;
let player2Score = 0;

let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function init() {
  selected = [];

  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

init();

function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = player;
  e.target.classList.add(player === "X" ? "player-x" : "player-o");
  e.target.removeEventListener("click", newMove);
  selected[index] = player;

  setTimeout(() => {
    check();
  }, [100]);

  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}




function check() {
  let playerLastMove = player === "X" ? "O" : "X";

  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      winSound.play();
      alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
      init();
      if (playerLastMove === "X") {
        player1Score++;
        player1ScoreElement.textContent = player1Score;
      } else {
        player2Score++;
        player2ScoreElement.textContent = player2Score;
      }
      return;
    }
  }

  if (selected.filter((item) => item).length === 9) {
    drawSound.play();
    alert("DEU VELHA!");
    init();
    return;
  }
}
