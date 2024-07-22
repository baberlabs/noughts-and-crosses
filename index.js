const resetButton = document.querySelector("#reset-button");
const turn = document.querySelector("#turn");
const gameBoard = document.querySelector(".game-board");
const message = document.querySelector("#message");
const player1Score = document.querySelector("#p-1");
const player2Score = document.querySelector("#p-2");

const gameState = {
  p1: {
    tile: "X",
    score: 0,
  },
  p2: {
    tile: "O",
    score: 0,
  },
  turn: "X",
  gameOver: false,
  counter: 0,
};

function updateTurn() {
  if (gameState.turn === "X") {
    gameState.turn = "O";
    turn.innerText = `Player 2 (${gameState.turn})`;
  } else {
    gameState.turn = "X";
    turn.innerText = `Player 1 (${gameState.turn})`;
  }
}

function updateBoard() {
  const tiles = [...gameBoard.children];
  tiles.forEach((tile) => {
    if (tile.disabled) {
      tile.disabled = false;
    } else {
      tile.disabled = true;
    }
  });
}

function checkGame() {
  gameState.counter++;
  console.log(gameState.counter);
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
      gameState.gameOver = true;
      updateBoard();
      player1Score.innerText = Number(player1Score.innerText) + 1;
    } else if (firstTile === "O" && secondTile === "O" && thirdTile === "O") {
      message.innerText = `O wins!`;
      gameState.gameOver = true;
      updateBoard();
      player2Score.innerText = Number(player2Score.innerText) + 1;
    }

    if (gameState.counter === 9 && gameState.gameOver === false) {
      message.innerText = "Draw";
      gameState.gameOver = true;
      updateBoard();
    }
  });
}

gameBoard.addEventListener("click", (event) => {
  if (event.target.className === "tile") {
    const tile = event.target;
    if (!tile.classList.contains("true")) {
      console.log(gameState.turn);
      tile.innerText = gameState.turn;
      tile.classList.add("true");
      tile.classList.add(gameState.turn);
      checkGame();
      updateTurn();
    }
  }
});

resetButton.addEventListener("click", () => {
  turn.innerText = `Player 1 ${gameState.turn}`;
  gameState.counter = 0;
  gameState.gameOver = false;
  const tiles = [...gameBoard.children];
  tiles.forEach((tile) => {
    tile.innerText = "";
    tile.classList = "tile";
    tile.disabled = false;
  });
  message.innerText = "";
});
