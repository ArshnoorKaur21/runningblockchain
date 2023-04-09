const { SHA256 } = require('crypto-js')

const EC=require('elliptic').ec,ec=new EC('secp256k1')
const keyPair=ec.genKeyPair()

class Transaction{
    constructor(from,to,amount)
    {
        this.from=from
        this.to=to
        this.amount=amount
    }

    sign(keyPair)
    {
        //checking if public key matches the from address of transaction
        if(keyPair.getPublic('hex')===this.from)
        {
            //signing the transaction
            this.signature=keyPair.sign(SHA256(this.from+this.to+this.amount+this.gas),"base64").toDER('hex')

        }
    }

}

module.exports=Transaction