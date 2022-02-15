import { Block, calculateHash } from "./Block";
import { Transaction } from "./Transaction";

export class Blockchain {

    genesisBlock: Block
    chain: Block[]
    difficulty: number
    blocktime: number

    constructor(genesisBlock: Block, chain: Block[], difficulty: number, blocktime: number) {
        this.genesisBlock = genesisBlock
        this.chain = chain
        this.difficulty = difficulty
        this.blocktime = blocktime
    }

    static create(difficulty: number, blocktime: number) {
        const genesisBlock = new Block(null, null);
        return new Blockchain(genesisBlock, [genesisBlock], difficulty, blocktime)
    }

    addBlock({ from, to, amount }: Transaction) {
        const blockData: Transaction = { from, to, amount }
        const lastBlock: Block = this.chain[this.chain.length - 1]
        const newBlock = new Block(blockData, lastBlock.hash)
        newBlock.mine(this.difficulty)
        this.chain.push(newBlock)

        this.difficulty += (Date.now() - newBlock.timestamp.getTime() > this.blocktime ? -1 : 1)
    }

    isValid() {
        if (this.chain.length === 1) return true

        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if (currentBlock.hash !== calculateHash(currentBlock) || previousBlock.hash !== currentBlock.previousHash) {
                return false
            }
            return true
        }
    }
}
