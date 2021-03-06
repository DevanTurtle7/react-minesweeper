import { useEffect, useState } from "react"

function Space(props) {
    const tile = props.tile
    const open = tile.isOpen()
    const flagged = tile.isFlagged()
    const mine = tile.isMine()
    const count = tile.getCount()
    const numFlags = tile.numFlags()
    const hardUpdate = props.hardUpdate
    const gameOver = props.gameOver

    const [needsUpdate, setUpdate] = useState(false)

    useEffect(() => {
        if (needsUpdate) {
            setUpdate(false)
        }

        if (mine && open) {
            gameOver()
        }
    }, [needsUpdate, mine, open, gameOver])

    const onClick = (e) => {
        let shiftDown = e.shiftKey

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

        if (open && mine) {
            className += " mine"
        }

        if (!open && flagged) {
            className += " flagged"
        }

        if (open && !mine && (numFlags > count)) {
            className += " overflagged"
        }

        return className
    }

    const createCount = () => {
        let text = (mine ? "" : count)

        if (open && count > 0) {
            let className = "count-text count-" + count
            return (<p className={className}>{text}</p>)
        } else {
            return null
        }
    }

    return (
        <div className="board-space-container">
            <div className={getClassName()} onClick={onClick}>
                {createCount()}
            </div>
        </div>
    )
}

export default Space