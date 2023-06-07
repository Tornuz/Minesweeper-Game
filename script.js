import { createBoard, markTile } from "./minesweeper.js";


// 1. Populate the board with Tiles/Mines

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 6

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector("[data-mine-count]")

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)

    // 2. Left click on Tiles

        tile.element.addEventListener("click", () => {})

    // 3. Right click on Tiles

        tile.element.addEventListener("contextmenu", e => {
            e.preventDefault()
            markTile(tile)
        })
        
    })
})

boardElement.style.setProperty("--size", BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES



// 1. Populate the board with Tiles/Mines
// 2. Left click on Tiles
    // 2.1=> Reveal Tiles
// 3. Right click on Tiles
    // 3.1=> Mark Tiles
// 4. Check for Win/Lose