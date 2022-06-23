let board = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];
let gameOver = false;
let playerRed = "red";
let playerYellow = "yellow";
let currentPlayer = playerRed;
let rows = 6;
let columns = 7;
let turnCounter = 0;
console.log("Reds turn");

function takeTurn(row, column) {
  console.log("takeTurn was called with row: " + row + ", column:" + column);
  console.log(`takeTurn was called with row: ${row}, column: ${column}`);
  if (!gameOver) {
    for (let row = 5; row >= 0; row--) {
      if (board[row][column] === null && currentPlayer === playerRed) {
        board[row][column] = "red";
        currentPlayer = playerYellow;
        break;
      } else if (
        board[row][column] === null &&
        currentPlayer === playerYellow
      ) {
        board[row][column] = "yellow";
        currentPlayer = playerRed;
        console.log(board);
        break;
      }
    }
  }
  turnCounter++;
}

function checkWinner() {
  drawCheck();
  horizontalWinner();
  verticalWinner();
  diagonalWinnerOne();
  diagonalWinnerTwo();
}

function horizontalWinner() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns - 3; col++) {
      if (board[row][col] != null)
        if (
          board[row][col] == board[row][col + 1] &&
          board[row][col + 1] == board[row][col + 2] &&
          board[row][col + 2] == board[row][col + 3]
        ) {
          //if board has a piece {
          setWinner(row, col);
          return;
        }
    }
  }
}

function verticalWinner() {
  for (let col = 0; col < columns; col++) {
    for (let row = 0; row < rows - 3; row++) {
      if (board[row][col] != null) {
        if (
          board[row][col] == board[row + 1][col] &&
          board[row + 1][col] == board[row + 2][col] &&
          board[row + 2][col] == board[row + 3][col]
        ) {
          setWinner(row, col);
          return;
        }
      }
    }
  }
}
function diagonalWinnerOne() {
  for (let row = 0; row < rows - 3; row++) {
    for (let col = 0; col < columns - 3; col++) {
      if (board[row][col] != null) {
        if (
          board[row][col] == board[row + 1][col + 1] &&
          board[row + 1][col + 1] == board[row + 2][col + 2] &&
          board[row + 2][col + 2] == board[row + 3][col + 3]
        ) {
          setWinner(row, col);
          return;
        }
      }
    }
  }
}

function diagonalWinnerTwo() {
  for (let row = 3; row < rows; row++) {
    for (let col = 0; col < columns - 3; col++) {
      if (board[row][col] != null) {
        if (
          board[row][col] == board[row - 1][col + 1] &&
          board[row - 1][col + 1] == board[row - 2][col + 2] &&
          board[row - 2][col + 2] == board[row - 3][col + 3]
        ) {
          setWinner(row, col);
          console.log(board);
          return;
        }
      }
    }
  }
}

function drawCheck() {
  const gameBoard = document.getElementById("grid");
  let winner = document.getElementById("winner-name");
  if (turnCounter >= 42) {
    winner.innerText = "It is a draw! Please restart the game";
    gameOver = true;
    gameBoard.style.display = "none";
  }
}

function setWinner(row, col) {
  const playerOne = document.getElementById("playerOneName").value;
  const playerTwo = document.getElementById("playerTwoName").value;
  let winner = document.getElementById("winner-name");
  if (board[row][col] == "red") {
    winner.innerText = "🔴 " + playerOne + " wins!";
    gameOver = true;
  } else if (board[row][col] == "yellow") {
    winner.innerText = "🟡 " + playerTwo + " wins!";
    console.log("yellow");
    gameOver = true;
  }
}

//clear the board
function resetGame() {
  const gameBoard = document.getElementById("grid");
  board = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];
  console.log("resetGame was called");
  console.log(board);
  gameOver = false;
  currentPlayer = playerRed;
  turnCounter = 0;
  gameBoard.style.display = "grid";
  playerOneName.value = "";
  playerTwoName.value = "";
  console.log("Red token Turn");
}

function isValidRowOrColumn(array) {
  return Array.isArray(array) && array.length === 6;
}

function getBoard() {
  console.log("getBoard was called");
  return board;
}

if (typeof exports === "object") {
  console.log("Running in Node");
  // Node. Does not work with strict CommonJS, but only CommonJS-like
  // environments that support module.exports, like Node.
  module.exports = {
    takeTurn,
    checkWinner,
    resetGame,
    getBoard,
    isValidRowOrColumn,
  };
} else {
  console.log("Running in Browser");
}
