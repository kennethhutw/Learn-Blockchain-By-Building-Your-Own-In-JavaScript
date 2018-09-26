var express = require('express')
var app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const port = process.argv[2];
const rp = require('request-promise');

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

// register a node and broadcase it the network
app.post('/register-and-broadcast-node', function(req, res){
    const newNodeUrl =  req.body.newNodeUrl;
    if(chain.networkNodes.indexOf(newNodeUrl) == -1)
        chain.networkNodes.push(newNodeUrl);

    const regNodesPromises = [];
    chain.networkNodes.forEach(networkNodeUrl =>{
        const requestOptions = {
            uri: networkNodeUrl+ '/register-node',
            method: 'POST',
            body :{newNodeUrl: newNodeUrl},
            json: true
        };

        regNodesPromises.push(rp(requestOptions));
    });

    Promise.all(regNodesPromises)
    .then(data =>{
        // use the data

        const bulkRegisterOptions = {
            uri : newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body : { allNetworkNodes :[ ...chain.networkNodes, chain.currentNodeUrl]},
            json: true
        }
        return rp(bulkRegisterOptions);
    })
    .then(data =>{
        res.json({ note : 'New node registered with network successfully.'});
    });
});

// register a node with the network
app.post('/register-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = chain.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = chain.currentNodeUrl !== newNodeUrl;
    if(nodeNotAlreadyPresent && notCurrentNode) 
        chain.networkNodes.push(newNodeUrl);
    res.json({note:'New node registered successfully with node'});
});

//register multiple nodes at once. 
app.post('/register-nodes-bulk', function(req, res){ 
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl =>{
        const nodeNotAlreadyPresent = chain.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = chain.currentNodeUrl !== networkNodeUrl;
        if(nodeNotAlreadyPresent && notCurrentNode) 
            chain.networkNodes.push(networkNodeUrl);
    });

    res.json({note: 'Bulk registeration successful.'});
});


 
app.listen(port, function(){
    console.log(`Listening on port ${port} ...`);
});