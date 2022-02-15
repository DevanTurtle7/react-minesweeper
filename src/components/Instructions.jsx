
function Instructions(props) {
    return (
        <div id="instructions">
            <p>The numbers in each tile represent the number of mines in it's perimeter.</p>
            <p>Use Shift+Click to flag suspected mines.</p>
            <p>After a tile has the correct number of flags in it's perimeter, the tile can be clicked to expand all of the surrounding tiles.</p>
            <p>Flag all the mines to win.</p>
        </div>
    )
}

export default Instructions