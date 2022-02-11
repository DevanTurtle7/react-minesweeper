
class Tile {
    constructor(x, y, bomb) {
        this.x = x
        this.y = y
        this.bomb = bomb

        this.open = false
        this.flagged = false

        this.neighbors = new Set()
    }

    addNeighbor(neighbor) {
        this.neighbors.add(neighbor)
    }

    isSatisfied() {
        let numFlags = 0

        this.neighbors.forEach((item) => {
            if (item.isFlagged()) {
                numFlags++
            }
        })

        return numFlags === this.count
    }

    setOpen() {
        this.open = true
    }

    setFlagged(flagged) {
        this.flagged = flagged
    }

    isFlagged() {
        return this.flagged
    }

    getCount() {
        if (this.bomb) {
            return -1
        }

        let count = 0

        this.neighbors.forEach((item) => {
            if (item.isBomb()) {
                count++
            }
        })

        return count;
    }

    isBomb() {
        return this.bomb
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    isOpen() {
        return this.isOpen
    }
}

export default Tile