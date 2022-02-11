import { useState } from "react";
import GameBoard from "./components/GameBoard";

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
        <div className="center-absolute page">
            <GameBoard
                height={HEIGHT}
                width={WIDTH}
                num_mines={NUM_MINES}
                updateScore={updateScore}
            />
        </div>
    );
}

export default App;
