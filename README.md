## Install ENV
* NodeJS 8.11.3
* Ganache
* Truffle

## Run Voting DAPP
### Config Voting
* Build contracts
```
$ cd contracts
$ truffle migrate --reset
```
* Edit config **api/config**
```
// address of contracts in file Voting.json
CONTRACTS_ID: '0x69f1cec32fa899417dcdbcd091193f1f0ddfded6'
```
* Edit config **web/src/public/js/app.js**
```
var ROOT_API = 'http://192.168.109.134:3002/api';
```
### Run Voting DAPP
* Run ganache
* Run server
```
$ cd api
$ npm install
$ npm start
```
* Run web
```
$ cd web
$ npm install
$ npm start
```

## Ref
### NodeJS with Web3
* https://dzone.com/articles/ethereum-hello-world-example-using-solc-and-web3
* https://medium.com/@codetractio/try-out-ethereum-using-only-nodejs-and-npm-eabaaaf97c80
* https://davekiss.com/ethereum-web3-node-tutorial/
* https://github.com/Imaginea/lms/blob/master/server/routes.js