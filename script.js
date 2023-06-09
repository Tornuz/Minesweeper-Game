import {
  createBoard,
  markTile,
  TILE_STATUSES,
  revealTile,
  checkWin,
  checkLose,
} from "./minesweeper.js";

// 1. Populate the board with Tiles/Mines

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 15;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");
const minesLeftText = document.querySelector("[data-mine-count]");
const messageText = document.querySelector(".subtext")

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);

    // 2. Left click on Tiles

    tile.element.addEventListener("click", () => {
      // 2.1=> Reveal Tiles

      revealTile(board, tile);

      // 4. Check for Win/Lose

      checkGameEnd();
    });

    // 3. Right click on Tiles

    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      // 3.1=> Mark Tiles

      markTile(tile);
      listMinesLeft();
    });
  });
});

boardElement.style.setProperty("--size", BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    );
  }, 0);
  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}

function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if(win || lose) {
    boardElement.addEventListener("click", stopProp, {capture: true})
    boardElement.addEventListener("contextmenu", stopProp, {capture: true})

    if(win) messageText.textContent = "Congratulation! You Won"
    if(lose) {
        messageText.textContent = "You Lost"
        board.forEach(row => {
            row.forEach(tile => {
                if(tile.status === TILE_STATUSES.MARKED) markTile(tile)
                if(tile.mine) revealTile(board, tile)
            })
        })
    }
  }
}

function stopProp(e) { 
    e.stopImmediatePropagation()
 }

// 1. Populate the board with Tiles/Mines
// 2. Left click on Tiles
// 2.1=> Reveal Tiles
// 3. Right click on Tiles
// 3.1=> Mark Tiles
// 4. Check for Win/Lose
