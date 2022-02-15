
function GameScore(props) {
    return (<p id="game-score">{props.score} / {props.numMines} mines</p>)
}

export default GameScore