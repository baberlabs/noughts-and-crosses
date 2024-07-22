const resetButton = document.getElementById("reset-button");
const turn = document.getElementById("turn");
const gameBoard = document.querySelector(".game-board");
const message = document.getElementById("message");

let currentTurn = "X";

function updateTurn() {
  if (currentTurn === "X") {
    currentTurn = "O";
  } else {
    currentTurn = "X";
  }
}

function checkGame() {
  const tiles = [...gameBoard.children];
  const tileObj = {};
  tiles.forEach((tile, index) => {
    tileObj[index + 1] = tile;
  });

  const winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  winCombinations.forEach((combo) => {
    const firstTile = tileObj[combo[0]].innerText;
    const secondTile = tileObj[combo[1]].innerText;
    const thirdTile = tileObj[combo[2]].innerText;

    if (firstTile === "X" && secondTile === "X" && thirdTile === "X") {
      message.innerText = `X wins!`;
    } else if (firstTile === "O" && secondTile === "O" && thirdTile === "O") {
      message.innerText = `O wins!`;
    }
  });
}

gameBoard.addEventListener("click", (event) => {
  const tile = event.target;
  if (!tile.classList.contains("true")) {
    tile.innerText = currentTurn;
    tile.classList.add("true");
    tile.classList.add(currentTurn);
    checkGame();
    updateTurn();
  }
});

resetButton.addEventListener("click", () => {
  currentTurn = "X";

  const tiles = [...gameBoard.children];
  tiles.forEach((tile) => {
    tile.innerText = "";
    tile.classList = "tile";
  });
  message.innerText = "";
});
