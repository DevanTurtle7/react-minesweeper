import { useEffect, useState } from "react";
import Space from './Space';

function GameBoard(props) {
    const HEIGHT = 15;
    const WIDTH = 30;
    const [layout, setLayout] = useState([])

    useEffect(() => {
        generateLayout()
    }, [])

    const generateLayout = () => {
        let bombLayout = []

        for (let y = 0; y < HEIGHT; y++) {
            let row = []

            for (let x = 0; x < WIDTH; x++) {
                // Random for now
                let bomb = Math.random() < 0.3
                row.push(bomb)
            }

            bombLayout.push(row)
        }

        let newLayout = []

        for (let y = 0; y < HEIGHT; y++) {
            let row = []

            for (let x = 0; x < WIDTH; x++) {
                let bomb = bombLayout[y][x]

                row.push({
                    bomb: bomb,
                    count: getCount(x, y, bombLayout)
                })
            }

            newLayout.push(row)
        }

        setLayout(newLayout)
    }

    const getCount = (x, y, bombLayout) => {
        let count = 0

        if (bombLayout[y][x] === true) {
            return 0
        }

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let newY = i + y
                let newX = j + x

                let validY = newY >= 0 && newY < HEIGHT
                let validX = newX >= 0 && newX < WIDTH
                let validCoords = (newX !== x || newY !== y)

                if (validCoords && validX && validY) {
                    if (bombLayout[newY][newX] === true) {
                        count++;
                    }
                }
            }
        }

        return count
    }

    const createGrid = () => {
        let grid = []

        for (let y = 0; y < layout.length; y++) {
            let current = layout[y]
            let row = []

            for (let x = 0; x < current.length; x++) {
                let count = current[x].count
                let bomb = current[x].bomb === true

                row.push(
                    <Space
                        bomb={bomb}
                        count={count}
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