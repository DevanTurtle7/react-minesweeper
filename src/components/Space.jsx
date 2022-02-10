import { useState } from "react"

function Space(props) {
    const [open, setOpen] = useState(false)

    const onClick = () => {
        if (!open) {
            setOpen(true)
        }
    }

    const getClassName = () => {
        let className = "board-space " + (open ? "open" : "hidden")

        if (open && props.bomb) {
            className += " bomb"
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