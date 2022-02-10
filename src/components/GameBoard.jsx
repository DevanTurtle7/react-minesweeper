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
                row.push(0)
            }

            newLayout.push(row)
        }

        setLayout(newLayout)
    }

    const createGrid = () => {
        let grid = []

        for (let i = 0; i < layout.length; i++) {
            let current = layout[i]
            let row = []

            for (let j = 0; j < current.length; j++) {
                row.push(
                    <Space
                        key={i + "" + j}
                    />
                )
            }

            grid.push(<div className="board-row" key={i}>{row}</div>)
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