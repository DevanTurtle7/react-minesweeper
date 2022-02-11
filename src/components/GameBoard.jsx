import { useEffect, useState } from "react";
import Space from './Space';
import Tile from './Tile';

const GAME_NOT_STARTED = 0
const GAME_IN_PROGRESS = 1
const GAME_OVER = 2
    
const HEIGHT = 15;
const WIDTH = 30;
const NUM_MINES = 50;

function GameBoard(props) {
    const [layout, setLayout] = useState([])
    const [update, setUpdate] = useState(false)
    const [gameState, setGameState] = useState(GAME_NOT_STARTED)

    useEffect(() => {
        if (layout.length === 0) {
            generateLayout()
        }

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

    const generateLayout = () => {
        let mines = new Set()
        let availablePos = new Set()
        let keys = {}

        // Add all the positions to the set and keys db
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                let key = (y * WIDTH) + x
                let coords = [x, y]

                keys[key] = coords
                availablePos.add(key)
            }
        }

        // Draw random positions to get mines
        for (let i = 0; i < NUM_MINES; i++) {
            let positions = Array.from(availablePos);
            let key = positions[Math.floor(Math.random() * positions.length)];
            mines.add(key)
            availablePos.delete(key)
        }

        let tileLayout = []
        let count = 0

        for (let y = 0; y < HEIGHT; y++) {
            let row = []

            for (let x = 0; x < WIDTH; x++) {
                // Random for now
                let key = (y * WIDTH) + x
                let bomb = mines.has(key)
                let tile = new Tile(x, y, bomb)

                if (bomb) {
                    count++
                }

                row.push(tile)
            }

            tileLayout.push(row)
        }
        console.log(count)

        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                let current = tileLayout[y][x]

                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        let newY = i + y
                        let newX = j + x

                        let validY = newY >= 0 && newY < HEIGHT
                        let validX = newX >= 0 && newX < WIDTH
                        let validCoords = (newX !== x || newY !== y)

                        if (validCoords && validX && validY) {
                            let neighbor = tileLayout[newY][newX]
                            current.addNeighbor(neighbor)
                        }
                    }
                }
            }
        }

        setLayout(tileLayout)
    }

    const createGrid = () => {
        let grid = []

        for (let y = 0; y < layout.length; y++) {
            let current = layout[y]
            let row = []

            for (let x = 0; x < current.length; x++) {
                let tile = layout[y][x]

                row.push(
                    <Space
                        shiftDown={props.shiftDown}
                        tile={tile}
                        hardUpdate={hardUpdate}
                        gameOver={gameOver}
                        key={x + "" + y}
                    />
                )
            }

            grid.push(<div className="board-row" key={y}>{row}</div>)
        }

        return grid
    }

    return (
        <div className="board">
            {createGrid()}
        </div>
    )
}

export default GameBoard;