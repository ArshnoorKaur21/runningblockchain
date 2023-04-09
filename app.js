let Block=require('./block')
let Transaction=require('./transaction')
let Blockchain=require('./block-chain')


//create genesis block
let genesisblock=new Block()
let blockchain=new Blockchain(genesisblock)

//creating a transaction
let transaction=new Transaction('mary','john',100)
let block=blockchain.getNextBlock([transaction])
blockchain.addBlock(block)

let anotherTransaction=new Transaction("Azam","Jerry",10)
let block1 = blockchain.getNextBlock([anotherTransaction,transaction])
blockchain.addBlock(block1)



console.log(blockchain)