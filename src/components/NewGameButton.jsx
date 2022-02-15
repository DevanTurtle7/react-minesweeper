
function NewGameButton(props) {
    const onClick = () => {
        props.newGame()
    }

    return (<button id="new-game-btn" onClick={onClick}>New Game</button>)
}

export default NewGameButton