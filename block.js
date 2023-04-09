const Transaction = require("./transaction")
//create an address just for minting.
const EC=require('elliptic').ec,ec=new EC('secp256k1')

class Block{
    constructor()
    {
        this.index=0
        this.previoushash=""
        this.hash=""
        this.transactions=[]
        this.nonce=0
    }

    addTransaction(transaction)
    {
       this.transactions.push(transaction)
    }

    get key(){
        return JSON.stringify(this.transactions)+this.index+this.previoushash+this.nonce
    }


}

module.exports=Block