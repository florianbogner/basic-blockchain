import { Blockchain } from "./Blockchain"

console.log("Started!")

const blockchain = Blockchain.create(2, 10000)
blockchain.addBlock({ from: "Bob", to: "Jimi", amount: 10 })
blockchain.addBlock({ from: "Bob", to: "Jimi", amount: 10 })
blockchain.addBlock({ from: "Bob", to: "Jimi", amount: 10 })
blockchain.addBlock({ from: "Bob", to: "Jimi", amount: 10 })
blockchain.addBlock({ from: "Bob", to: "Jimi", amount: 10 })
blockchain.addBlock({ from: "Bob", to: "Jimi", amount: 10 })
blockchain.addBlock({ from: "Bob", to: "Jimi", amount: 10 })
blockchain.addBlock({ from: "Bob", to: "Jimi", amount: 10 })

console.log(blockchain)
console.log("Is unmodified blockchain valid? " + blockchain.isValid())
blockchain.chain[1].data!.amount = 200
console.log("Is modified blockchain valid? " + blockchain.isValid())