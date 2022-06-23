function clearBoard() {
  for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
      document.getElementById(
        `row-${rowIndex}-column-${columnIndex}`
      ).innerHTML = "";
    }
  }
}

function drawBoard(board) {
  clearBoard();
  for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
      if (!board[rowIndex][columnIndex]) {
        continue;
      }
      const cellText = board[rowIndex][columnIndex] === "red" ? "🔴" : "🟡"; // the question mark is testing the statement, if nought it will be red or it will be yellow. change to red to start and find counter 🟡 🔴
      document.getElementById(
        `row-${rowIndex}-column-${columnIndex}`
      ).innerText = cellText;
    }
  }
}

function isValidColumn(columnArray) {
  return (
    isValidRowOrColumn(columnArray) &&
    columnArray.every(function (item) {
      return ["red", "yellow", null].includes(item);
    })
  );
}

function positionClick(rowIndex, columnIndex, event) {
  takeTurn(rowIndex, columnIndex);

  drawBoard(board);
  const winner = checkWinner();
  if (winner) {
    if (
      typeof winner !== "string" || //or if not the string red, yellow, nobody or if not a string at all
      !["red", "yellow", "nobody"].includes(winner)
    ) {
      throw (
        "Expecting 'checkWinner' to return null or one of the strings 'yellow', 'red' or 'nobody'. Actually received: " +
        winner
      );
    }
    const winnerName = document.getElementById("winner-name");
    winnerName.innerText = winner;
    const winnerDisplay = document.getElementById("winner-display");
    winnerDisplay.style.display = "block";
  }
}

function resetClick(event) {
  resetGame();
  const winnerName = document.getElementById("winner-name");
  winnerName.innerText = "";

  clearBoard();
}

for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
  for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
    const gridPosition = document.getElementById(
      `row-${rowIndex}-column-${columnIndex}`
    );
    gridPosition.addEventListener(
      "click",
      positionClick.bind(null, rowIndex, columnIndex)
    );
  }
}

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetClick);

function formValue(event) {
  event.preventDefault();
  let playerOneName = document.getElementById("playerOneName");
  console.log(`Player one your name is: ${playerOneName.value}`);
  let playerTwoName = document.getElementById("playerTwoName");
  console.log(`Player two your name is: ${playerTwoName.value}`);
}
let submitForm = document.getElementById("playerNames");
submitForm.addEventListener("submit", formValue);

if (typeof exports === "object") {
  console.log("Running in Node");

  // Node. Does not work with strict CommonJS, but only CommonJS-like
  // environments that support module.exports, like Node.
  module.exports = {
    clearBoard,
    drawBoard,
    isValidColumn,
    positionClick,
    resetClick,
    playerNames,
  };
} else {
  console.log("Running in Browser");
}
