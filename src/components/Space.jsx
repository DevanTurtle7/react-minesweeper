import { useEffect, useState } from "react"

function Space(props) {
    const xCoord = props.x
    const yCoord = props.y
    const open = props.open
    const flagged = props.flagged

    const onClick = (e) => {
        let shiftDown = props.shiftDown

        if (!open) {
            if (shiftDown) {
                props.setFlagged(xCoord, yCoord, !flagged)
            } else {
                props.setOpen(xCoord, yCoord)
                props.openSurrounded(xCoord, yCoord)
            }
        }
    }

    const getClassName = () => {
        let className = "board-space " + (open ? "open" : "hidden")

        if (open && props.bomb) {
            className += " bomb"
        }

        if (!open && flagged) {
            className += " flagged"
        }

        return className
    }

    const createCount = () => {
        let count = props.count

        if (open && count > 0 || true) {
            return (<p className="count-text">{props.count}</p>)
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