import { useEffect, useState } from "react";
import EmptySpace from "./EmptySpace";
import Space from './Space';
import Tile from './Tile';

const GAME_NOT_STARTED = 0
const GAME_IN_PROGRESS = 1
const GAME_OVER = 2

function GameBoard(props) {
    const [layout, setLayout] = useState([])
    const [update, setUpdate] = useState(false)
    const [gameState, setGameState] = useState(GAME_NOT_STARTED)

    const height = props.height
    const width = props.width
    const numMines = props.numMines

    useEffect(() => {
        if (update) {
            setUpdate(false)
        }
    })

    const hardUpdate = () => {
        setUpdate(true)
    }

    const gameOver = () => {
        if (gameState != GAME_OVER) {
            alert("game over")
            setGameState(GAME_OVER)
        }
    }

    const updateScore = (increase) => {
        props.updateScore(increase)
    }

    const generateLayout = (startX, startY) => {
        let mines = new Set()
        let availablePos = new Set()
        let keys = {}
        let ignored = new Set()

        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                let currentX = startX + x
                let currentY = startY + y
                let key = (currentY * width) + currentX

                ignored.add(key)
            }
        }

        // Add all the positions to the set and keys db
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let key = (y * width) + x

                if (!ignored.has(key)) {
                    let coords = [x, y]

                    keys[key] = coords
                    availablePos.add(key)
                }
            }
        }

        // Draw random positions to get mines
        for (let i = 0; i < numMines; i++) {
            let positions = Array.from(availablePos);
            let key = positions[Math.floor(Math.random() * positions.length)];
            mines.add(key)
            availablePos.delete(key)
        }

        let tileLayout = []

        for (let y = 0; y < height; y++) {
            let row = []

            for (let x = 0; x < width; x++) {
                // Random for now
                let key = (y * width) + x
                let bomb = mines.has(key)
                let tile = new Tile(x, y, bomb)

                row.push(tile)
            }

            tileLayout.push(row)
        }

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let current = tileLayout[y][x]

                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        let newY = i + y
                        let newX = j + x

                        let validY = newY >= 0 && newY < height
                        let validX = newX >= 0 && newX < width
                        let validCoords = (newX !== x || newY !== y)

                        if (validCoords && validX && validY) {
                            let neighbor = tileLayout[newY][newX]
                            current.addNeighbor(neighbor)
                        }
                    }
                }
            }
        }

        tileLayout[startY][startX].setOpen()

        setGameState(GAME_IN_PROGRESS)
        setLayout(tileLayout)
    }

    const createGrid = () => {
        if (gameState === GAME_NOT_STARTED) {
            let grid = []

            for (let y = 0; y < height; y++) {
                let current = layout[y]
                let row = []

                for (let x = 0; x < width; x++) {
                    row.push(<EmptySpace
                        onClick={generateLayout}
                        x={x}
                        y={y}
                        key={x + "" + y}
                    />)
                }

                grid.push(<div className="board-row" key={y}>{row}</div>)
            }

            return grid
        } else {
            let grid = []

            for (let y = 0; y < layout.length; y++) {
                let current = layout[y]
                let row = []

                for (let x = 0; x < current.length; x++) {
                    let tile = layout[y][x]

                    row.push(
                        <Space
                            tile={tile}
                            hardUpdate={hardUpdate}
                            gameOver={gameOver}
                            updateScore={updateScore}
                            key={x + "" + y}
                        />
                    )
                }

                grid.push(<div className="board-row" key={y}>{row}</div>)
            }

            return grid
        }
    }

    return (
        <div className="board">
            {createGrid()}
        </div>
    )
}

export default GameBoard;