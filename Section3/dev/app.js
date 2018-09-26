var express = require('express')
var app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const port = process.argv[2];

const nodeAddress = uuid().split('-').join('');

const chain = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
 
app.get('/blockchain', function(req, res){
    res.send(chain);

});

app.post('/transaction', function(req, res){
    const blockIndex = chain.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({note: `Transaction will be added in block ${blockIndex}.`});
});

app.get('/mine', function(req, res){
    const lastBlock = chain.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    
    const currentBlockData = {
        transactions: chain.pendingTransactions,
        index: lastBlock['index'] + 1
    }

    const nonce = chain.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = chain.hashBlock(previousBlockHash, currentBlockData, nonce);
    
    chain.createNewTransaction(12.5 ,"00", nodeAddress);

    const newBlock = chain.createNewBlock(nonce, previousBlockHash, blockHash);

    res.json({
        note: "New block mined successfully",
        block : newBlock
    });
    
});


 
app.listen(port, function(){
    console.log(`Listening on port ${port} ...`);
});