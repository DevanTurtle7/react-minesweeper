import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameScore from "./components/GameScore";

const GAME_NOT_STARTED = 0
const GAME_IN_PROGRESS = 1
const GAME_OVER = 2

const HEIGHT = 15;
const WIDTH = 30;
const NUM_MINES = 50;

function App() {
    const [score, setScore] = useState(0)
    const [gameState, setGameState] = useState(GAME_NOT_STARTED)

    const updateScore = (increase) => {
        setScore(score + (increase ? 1 : -1))
    }

    return (
        <div className="center-absolute page">
            <div id="content">
                <div id="info-row">
                    <GameScore score={score} numMines={NUM_MINES} />
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
