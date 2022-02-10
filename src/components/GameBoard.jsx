import { useEffect, useState } from "react";
import Space from './Space';

function GameBoard(props) {
    const HEIGHT = 15;
    const WIDTH = 30;
    const [layout, setLayout] = useState([])
    const [toOpenX, setToOpenX] = useState(null)
    const [toOpenY, setToOpenY] = useState(null)

    useEffect(() => {
        generateLayout()
    }, [])

    const generateLayout = () => {
        let bombLayout = []

        for (let y = 0; y < HEIGHT; y++) {
            let row = []

            for (let x = 0; x < WIDTH; x++) {
                // Random for now
                let bomb = Math.random() < 0.2
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
                    count: getCount(x, y, bombLayout),
                    open: false,
                    flagged: false
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

    const isSatisfied = (x, y) => {
        let countRequired = layout[y][x].count
        let currentCount = 0

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let newY = i + y
                let newX = j + x

                let validY = newY >= 0 && newY < HEIGHT
                let validX = newX >= 0 && newX < WIDTH
                let validCoords = (newX !== x || newY !== y)

                if (validCoords && validX && validY) {
                    let current = layout[newY][newX]

                    if (current.flagged) {
                        currentCount++
                    }
                }
            }
        }

        return currentCount === countRequired
    }

    const openSurrounded = (x, y) => {
        console.log('opening surrounded')
        const clone = [...layout]

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let newY = i + y
                let newX = j + x

                let validY = newY >= 0 && newY < HEIGHT
                let validX = newX >= 0 && newX < WIDTH
                let validCoords = (newX !== x || newY !== y)

                if (validCoords && validX && validY) {
                    clone[newY][newX].open = true
                }
            }
        }

        setLayout(clone)
    }

    const setOpen = (x, y) => {
        const clone = [...layout]
        clone[y][x].open = true
        setLayout(clone)
    }

    const setFlagged = (x, y, flagged) => {
        const clone = [...layout]
        clone[y][x].flagged = flagged
        setLayout(clone)
    }

    console.log(layout)

    const createGrid = () => {
        let grid = []

        for (let y = 0; y < layout.length; y++) {
            let current = layout[y]
            let row = []

            for (let x = 0; x < current.length; x++) {
                let count = current[x].count
                let bomb = current[x].bomb === true
                let satisfied = isSatisfied(x, y)

                row.push(
                    <Space
                        bomb={bomb}
                        count={count}
                        shiftDown={props.shiftDown}
                        open={current[x].open}
                        flagged={current[x].flagged}
                        setOpen={setOpen}
                        setFlagged={setFlagged}
                        satisfied={satisfied}
                        openSurrounded={openSurrounded}
                        x={x}
                        y={y}
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