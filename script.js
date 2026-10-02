const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const setup = document.getElementById("setup");
const game = document.getElementById("game");
const result = document.getElementById("result");
const resultText = document.getElementById("resultText");
const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

let names = { X: "", O: "" };
let board = [];
let turn = "X";
let over = false;

function startGame() {
  names.X = document.getElementById("nameX").value.trim() || "Player X";
  names.O = document.getElementById("nameO").value.trim() || "Player O";
  setup.hidden = true;
  game.hidden = false;
  resetBoard();
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  over = false;
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
  result.hidden = true;
  statusText.textContent = names[turn] + "'s turn (" + turn + ")";
}

function play(i) {
  if (over || board[i] !== "") return;

  board[i] = turn;
  cells[i].textContent = turn;

  if (hasWon()) {
    over = true;
    resultText.textContent = names[turn] + " wins!";
    result.hidden = false;
    return;
  }

  if (!board.includes("")) {
    over = true;
    resultText.textContent = "It's a draw!";
    result.hidden = false;
    return;
  }

  turn = turn === "X" ? "O" : "X";
  statusText.textContent = names[turn] + "'s turn (" + turn + ")";
}

function hasWon() {
  for (let i = 0; i < lines.length; i++) {
    const a = lines[i][0], b = lines[i][1], c = lines[i][2];
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function newMatch() {
  document.getElementById("nameX").value = "";
  document.getElementById("nameO").value = "";
  result.hidden = true;
  game.hidden = true;
  setup.hidden = false;
}

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () { play(i); });
}
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("rematchBtn").addEventListener("click", resetBoard);
document.getElementById("newBtn").addEventListener("click", newMatch);