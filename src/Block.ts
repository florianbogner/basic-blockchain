import { createHash } from "crypto"
import { Transaction } from "./Transaction"

export class Block {
    data: Transaction | null
    hash: String
    previousHash: String | null
    timestamp: Date
    pow: number

    constructor(data: Transaction | null, previousHash: String | null) {
        this.data = data
        this.hash = "0"
        this.previousHash = previousHash
        this.timestamp = new Date()
        this.pow = 0
    }

    mine(difficulty: number) {
        const regex = new RegExp(`^(0){${difficulty}}.*`);
        while (!this.hash.match(regex)) {
            this.pow++
            this.hash = calculateHash(this)
        }
    }
}

export const calculateHash = (block: Block) => {
    const data = JSON.stringify(block.data)
    const blockData = data + block.previousHash + block.timestamp.toISOString() + block.pow.toString()

    return createHash("sha256").update(blockData).digest("hex")
}