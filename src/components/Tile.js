
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

    isSatisfied() {
        let numFlags = 0

        this.#neighbors.forEach((item) => {
            if (item.isFlagged()) {
                numFlags++
            }
        })

        return numFlags === this.getCount()
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
        console.log('opening neighbors')
        this.#neighbors.forEach((item) => {
            item.setOpen()
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