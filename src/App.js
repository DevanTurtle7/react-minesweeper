import { useState } from "react";
import GameBoard from "./components/GameBoard";

function App() {
    const [shiftDown, setShiftDown] = useState(false)

    const handleKeyDown = (e) => {
        if (e.code === "ShiftLeft") {
            setShiftDown(true)
        }
    }

    const handleKeyUp = (e) => {
        if (e.code === "ShiftLeft") {
            setShiftDown(false)
        }
    }

    return (
        <div className="center-absolute page" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex="0">
            <GameBoard shiftDown={shiftDown}/>
        </div>
    );
}

export default App;
