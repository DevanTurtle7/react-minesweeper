
class Tile {
    #x
    #y
    #mine
    #open
    #flagged
    #neighbors

    constructor(x, y, mine) {
        this.#x = x
        this.#y = y
        this.#mine = mine

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
        if (!this.#open && !this.#flagged) {
            this.#open = true

            if (this.isSatisfied()) {
                this.openNeighbors()
            }
        }
    }

    hardOpen() {
        this.#open = true
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
        if (this.#mine) {
            return -1
        }

        let count = 0

        this.#neighbors.forEach((item) => {
            if (item.isMine()) {
                count++
            }
        })

        return count;
    }

    isMine() {
        return this.#mine
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