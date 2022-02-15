import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameScore from "./components/GameScore";
import NewGameButton from "./components/NewGameButton";
import Instructions from "./components/Instructions";
import { GAME_NOT_STARTED, GAME_IN_PROGRESS, GAME_WON, GAME_LOST } from "./Globals";

const HEIGHT = 15;
const WIDTH = 30;
const NUM_MINES = 100;

function App() {
    const [score, setScore] = useState(0)
    const [gameState, setGameState] = useState(GAME_NOT_STARTED)

    const updateScore = (increase) => {
        setScore(score + (increase ? 1 : -1))
    }

    const gameLost = () => {

    }

    const gameWin = () => {
    }

    const newGame = () => {
        setScore(0)
        setGameState(GAME_NOT_STARTED)
    }

    return (
        <div className="center-absolute page">
            <div id="content">
                <div id="info-row">
                    <GameScore score={score} numMines={NUM_MINES} />
                    <NewGameButton newGame={newGame}/>
                </div>
                <GameBoard
                    height={HEIGHT}
                    width={WIDTH}
                    numMines={NUM_MINES}
                    updateScore={updateScore}
                    gameState={gameState}
                    setGameState={setGameState}
                />
                <Instructions/>
            </div>
        </div>
    );
}

export default App;
