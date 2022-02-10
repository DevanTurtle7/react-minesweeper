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
        let newLayout = []

        for (let i = 0; i < HEIGHT; i++) {
            let row = []

            for (let j = 0; j < WIDTH; j++) {
                // Random for now
                let bomb = Math.random() < 0.3
                row.push(bomb)
            }

            newLayout.push(row)
        }

        setLayout(newLayout)
    }

    const createGrid = () => {
        let grid = []

        for (let y = 0; y < layout.length; y++) {
            let current = layout[y]
            let row = []

            for (let x = 0; x < current.length; x++) {
                let count = 0;
                let bomb = current[x] === true

                if (!bomb) {
                    for (let i = -1; i < 2; i++) {
                        for (let j = -1; j < 2; j++) {
                            let newY = i + y
                            let newX = j + x

                            let validY = newY >= 0 && newY < HEIGHT
                            let validX = newX >= 0 && newX < WIDTH
                            let validCoords = (newX !== x || newY !== y)

                            console.log(newX, newY, validX, validY, validCoords)

                            if (validCoords && validX && validY) {
                                if (layout[newY][newX] === true) {
                                    count++;
                                }
                            }
                        }
                    }
                }

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