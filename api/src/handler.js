const Web3 = require('web3');

const NETWORK_ADDRS = "http://localhost:7545";
let provider = new Web3.providers.HttpProvider(NETWORK_ADDRS);
const web3 = new Web3(provider);

const CONFIG = require('./config');
const TruffleContract = require('truffle-contract');
var resolve = require('path').resolve;
var pathFileContracts = resolve('../contracts/build/contracts/Voting.json');
const votingArtifacts = require(pathFileContracts);


class Handler {

    constructor() {
        let contract = TruffleContract(votingArtifacts);
        contract.setProvider(web3.currentProvider);
        if (typeof contract.currentProvider.sendAsync !== "function") {
            contract.currentProvider.sendAsync = function () {
                return contract.currentProvider.send.apply(
                    contract.currentProvider,
                    arguments
                );
            };
        }
        this.voting = contract.at(CONFIG.CONTRACTS_ID);
    }

    // get accounts
    getAccounts() {
        return new Promise((fulfill, reject) => {
            web3.eth.getAccounts().then(accounts => {
                fulfill(accounts);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // get candidates
    async getCandidates() {
        return new Promise((fulfill, reject) => {
            let candidates = [];
            this.voting.candidatesCount().then(count => {
                if (count == 0) {
                    fulfill(candidates);
                }

                for (let i = 1; i <= count; i++) {
                    this.voting.candidates(i).then(candidate => {
                        let id = candidate[0];
                        let name = candidate[1];
                        let voteCount = candidate[2];

                        let item = {
                            id: Number(id),
                            name: name,
                            voteCount: Number(voteCount)
                        };
                        candidates.push(item);
                        if (i == count) {
                            fulfill(candidates);
                        }
                    });
                }

            }).catch(err => {
                reject(err);
            });
        });
    }
}

module.exports = Handler;