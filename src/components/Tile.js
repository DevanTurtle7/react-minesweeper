
class Tile {
    #x
    #y
    #bomb
    #open
    #flagged
    #neighbors

    constructor(x, y, bomb) {
        this.#x = x
        this.#y = y
        this.#bomb = bomb

        this.#open = false
        this.#flagged = false

        this.#neighbors = new Set()
    }

    addNeighbor(neighbor) {
        this.#neighbors.add(neighbor)
    }

    numFlags() {
        let numFlags = 0

        this.#neighbors.forEach((item) => {
            if (item.isFlagged()) {
                numFlags++
            }
        })

        return numFlags
    }

    isSatisfied() {
        return this.numFlags() === this.getCount()
    }

    setOpen() {
        if (!this.#open) {
            this.#open = true

            if (this.isSatisfied()) {
                this.openNeighbors()
            }
        }
    }

    openNeighbors() {
        this.#neighbors.forEach((item) => {
            if (!item.isFlagged()) {
                item.setOpen()
            }
        })
    }

    toggleFlagged() {
        this.#flagged = !this.#flagged
    }

    isFlagged() {
        return this.#flagged
    }

    getCount() {
        if (this.#bomb) {
            return -1
        }

        let count = 0

        this.#neighbors.forEach((item) => {
            if (item.isBomb()) {
                count++
            }
        })

        return count;
    }

    isBomb() {
        return this.#bomb
    }

    getX() {
        return this.#x
    }

    getY() {
        return this.#y
    }

    isOpen() {
        return this.#open
    }

}

export default Tile