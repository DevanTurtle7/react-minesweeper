import { useEffect, useState } from "react"

function Space(props) {
    const tile = props.tile
    const xCoord = tile.getX()
    const yCoord = tile.getY()
    const open = tile.isOpen()
    const flagged = tile.isFlagged()
    const bomb = tile.isBomb()
    const count = tile.getCount()
    const numFlags = tile.numFlags()
    const hardUpdate = props.hardUpdate
    const gameOver = props.gameOver

    const [needsUpdate, setUpdate] = useState(false)

    useEffect(() => {
        if (needsUpdate) {
            setUpdate(false)
        }

        if (bomb && open) {
            gameOver()
        }
    })

    const onClick = (e) => {
        let shiftDown = props.shiftDown

        if (!open) {
            if (shiftDown) {
                props.updateScore(!flagged)
                tile.toggleFlagged()
                setUpdate(true)
            } else {
                if (!flagged) {
                    tile.setOpen()
                    setUpdate(true)

                    if (count === 0) {
                        hardUpdate()
                    }
                }
            }
        } else {
            if (tile.isSatisfied()) {
                tile.openNeighbors()
                hardUpdate()
            }
        }
    }

    const getClassName = () => {
        let className = "board-space " + (open ? "open" : "hidden")

        if (open && bomb) {
            className += " bomb"
        }

        if (!open && flagged) {
            className += " flagged"
        }

        if (open && !bomb && (numFlags > count)) {
            className += " overflagged"
        }

        return className
    }

    const createCount = () => {
        let text = (bomb ? "" : count)

        if (open && count > 0) {
            return (<p className="count-text">{text}</p>)
        } else {
            return null
        }
    }

    return (
        <div className={getClassName()} onClick={onClick}>
            {createCount()}
        </div>
    )
}

export default Space