import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameScore from "./components/GameScore";

const HEIGHT = 15;
const WIDTH = 30;
const NUM_MINES = 50;

function App() {
    const [score, setScore] = useState(0)

    const updateScore = (increase) => {
        setScore(score + (increase ? 1 : -1))
    }

    console.log(score + "/" + NUM_MINES)

    return (
        <div>
            <GameScore score={score} numMines={NUM_MINES}/>
            <div className="center-absolute page">
                <GameBoard
                    height={HEIGHT}
                    width={WIDTH}
                    numMines={NUM_MINES}
                    updateScore={updateScore}
                />
            </div>
        </div>
    );
}

export default App;
