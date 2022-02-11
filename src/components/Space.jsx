import { useEffect, useState } from "react"

function Space(props) {
    const tile = props.tile
    const xCoord = tile.getX()
    const yCoord = tile.getY()
    const open = tile.isOpen()
    const flagged = tile.isFlagged()
    const bomb = tile.isBomb()
    const count = tile.getCount()
    const hardUpdate = props.hardUpdate

    const [needsUpdate, setUpdate] = useState(false)

    useEffect(() => {
        if (needsUpdate) {
            setUpdate(false)
        }
    })

    const onClick = (e) => {
        let shiftDown = props.shiftDown

        if (!open) {
            if (shiftDown) {
                tile.toggleFlagged()
                setUpdate(true)
            } else {
                tile.setOpen()
                setUpdate(true)
            }
        } else {
            console.log(tile.isSatisfied())
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

        return className
    }

    const createCount = () => {
        let text = (bomb ? "" : count)

        if (open && count > 0 || true) {
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