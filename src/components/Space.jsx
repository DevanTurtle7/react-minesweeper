
function Space(props) {

    const getClassName = () => {
        let open = true
        let className = "board-space " + (open ? "open" : "hidden")

        if (props.bomb) {
            className += " bomb"
        }

        return className
    }

    return (
        <div className={getClassName()}>
            <p>{props.count}</p>
        </div>
    )
}

export default Space