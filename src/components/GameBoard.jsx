import { useEffect, useState } from "react";
import Space from './Space';
import Tile from './Tile';

function GameBoard(props) {
    const HEIGHT = 15;
    const WIDTH = 30;
    const [layout, setLayout] = useState([])
    const [update, setUpdate] = useState(false)

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
        alert("game over")
    }

    const generateLayout = () => {
        let tileLayout = []

        for (let y = 0; y < HEIGHT; y++) {
            let row = []

            for (let x = 0; x < WIDTH; x++) {
                // Random for now
                let bomb = Math.random() < 0.2
                let tile = new Tile(x, y, bomb)

                row.push(tile)
            }

            tileLayout.push(row)
        }

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

    console.log('rendering')
    return (
        <div className="board">
            {createGrid()}
        </div>
    )
}

export default GameBoard;