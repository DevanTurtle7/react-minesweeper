import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameScore from "./components/GameScore";
import NewGameButton from "./components/NewGameButton";
import { GAME_NOT_STARTED, GAME_IN_PROGRESS, GAME_OVER } from "./Globals";

const HEIGHT = 15;
const WIDTH = 30;
const NUM_MINES = 50;

function App() {
    const [score, setScore] = useState(0)
    const [gameState, setGameState] = useState(GAME_NOT_STARTED)

    const updateScore = (increase) => {
        setScore(score + (increase ? 1 : -1))
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
            </div>
        </div>
    );
}

export default App;
