let Block = require('./block')
let sha256 = require('js-sha256')
const Transaction = require('./transaction')
const EC=require('elliptic').ec,ec=new EC('secp256k1')
const MINT_KEY_PAIR=ec.genKeyPair()
const MINT_PUBLIC_ADDRESS=MINT_KEY_PAIR.getPublic('hex')
const holderKeyPair = ec.genKeyPair();



class Blockchain{

   constructor(genesisBlock) {
    //In the genesis block, creating a transaction for inital coin release.
     const initialCoinRelease=new Transaction(MINT_PUBLIC_ADDRESS,holderKeyPair.getPublic('hex'),10000)
     this.blocks = []
     this.addBlock(genesisBlock)
   }

   addBlock(block) {

      if(this.blocks.length == 0) {
        block.previousHash = "0000000000000000"
        block.hash = this.generateHash(block)
      }
      this.blocks.push(block)
   }

   getNextBlock(transactions) {

      let block = new Block()

      transactions.forEach(function(transaction){
        block.addTransaction(transaction)
      })

      let previousBlock = this.getPreviousBlock()
      block.index = this.blocks.length
      block.previousHash = previousBlock.hash
      block.hash = this.generateHash(block)
      return block
   }

   generateHash(block) {

     let hash = sha256(block.key)

     while(!hash.startsWith("00")) {
       block.nonce += 1
       hash = sha256(block.key)
       console.log(hash)
     }

     return hash

   }

   getPreviousBlock() {
     return this.blocks[this.blocks.length - 1]
   }


   

}

module.exports = Blockchain