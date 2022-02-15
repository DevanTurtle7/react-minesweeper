import { GAME_NOT_STARTED, GAME_IN_PROGRESS, GAME_WON, GAME_LOST } from "../Globals";

function GameStateLabel(props) {

    const getStateMessage = () => {
        if (props.gameState === GAME_WON) {
            return "You won!"
        } else if (props.gameState === GAME_LOST) {
            return "You lost"
        } else if (props.gameState === GAME_NOT_STARTED) {
            return "Click anywhere to start"
        } else {
            return "Game in progress"
        }
    }

    const getClassNames = () => {
        let classNames = "game-state-label"

        if (props.gameState === GAME_WON || props.gameState === GAME_LOST || props.gameState === GAME_NOT_STARTED) {
            classNames += " visible"
        }

        return classNames
    }

    return <p className={getClassNames()}>{getStateMessage()}</p>
}

export default GameStateLabel