const Blockchain = require('./blockchain');
const chain = new Blockchain();


var bc1 = {
    "chain": [
    {
    "index": 1,
    "timestamp": 1537976569252,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1537976571825,
    "transactions": [],
    "nonce": 363,
    "hash": "005c850455f8bf8801a8901d9908cb6acd33bc49c9d718fcf30867c3cbc91ee3",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1537976625689,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "d2561640c1a211e8b20acb28c57d4413",
    "transactionId": "d3eac000c1a211e8b20acb28c57d4413"
    },
    {
    "amount": 124,
    "sender": "Amy",
    "recipient": "Alice"
    }
    ],
    "nonce": 966,
    "hash": "00e565f774490d5af321141ab1badba5c5cf1bb99a6f2867569f2b041f93e596",
    "previousBlockHash": "005c850455f8bf8801a8901d9908cb6acd33bc49c9d718fcf30867c3cbc91ee3"
    },
    {
    "index": 4,
    "timestamp": 1537976675030,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "d2561640c1a211e8b20acb28c57d4413",
    "transactionId": "f3fd3300c1a211e8b20acb28c57d4413"
    },
    {
    "amount": 52,
    "sender": "Amy",
    "recipient": "Alice"
    },
    {
    "amount": 124,
    "sender": "Kenneth",
    "recipient": "Alice"
    },
    {
    "amount": 35,
    "sender": "Kenneth",
    "recipient": "Dan"
    }
    ],
    "nonce": 315,
    "hash": "00eecf00469305505e7f1104c64966ba97e1fee58c1589426b918d636cb1646e",
    "previousBlockHash": "00e565f774490d5af321141ab1badba5c5cf1bb99a6f2867569f2b041f93e596"
    }
    ],
    "pendingTransactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "d2561640c1a211e8b20acb28c57d4413",
    "transactionId": "11648330c1a311e8b20acb28c57d4413"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    };

console.log('Valid :  ' + chain.chainIsValid(bc1.chain));
