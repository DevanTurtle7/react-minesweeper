
function EmptySpace(props) {
    const onClick = () => {
        let x = props.x
        let y = props.y

        props.onClick(x, y)
    }

    return (
        <div className="board-space-container">
            <div className={"board-space hidden"} onClick={onClick}>
            </div>
        </div>
    )
}

export default EmptySpace