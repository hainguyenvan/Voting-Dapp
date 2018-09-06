const fs = require("fs");
const abiDecoder = require('abi-decoder');
const Web3 = require('web3');
const solc = require('solc');

const NETWORK_ADDRS = "http://localhost:7545";
let provider = new Web3.providers.HttpProvider(NETWORK_ADDRS);
const web3 = new Web3(provider);


class Handler {

    // getAccounts
    getAccounts() {
        return new Promise((fulfill, reject) => {
            web3.eth.getAccounts().then(accounts => {
                fulfill(accounts);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

module.exports = Handler;