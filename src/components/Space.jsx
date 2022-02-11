import { useEffect, useState } from "react"

function Space(props) {
    const tile = props.tile
    const xCoord = tile.getX()
    const yCoord = tile.getY()
    const open = tile.isOpen()
    const flagged = tile.isFlagged()
    const bomb = tile.isBomb()
    const count = tile.getCount()

    console.log(tile.isOpen())

    const onClick = (e) => {
        let shiftDown = props.shiftDown

        if (!open) {
            if (shiftDown) {
            } else {
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