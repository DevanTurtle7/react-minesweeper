import { useEffect, useState } from "react"

function Space(props) {
    const [open, setOpen] = useState(false)
    const [flagged, setFlagged] = useState(false)

    const onClick = (e) => {
        let shiftDown = props.shiftDown

        if (!open) {
            if (shiftDown) {
                setFlagged(!flagged)
            } else {
                setOpen(true)
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

        if (open && count > 0) {
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