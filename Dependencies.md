compiler is 0.8.10+commit

truggle-config .js  //no need
// Configure your compilers
  compilers: {
    solc: {
       version: "0.8.10"

pre-requisits:
- npm install @truffle/hdwallet-provider
- npm install dotenv
- register for a free account on Infura, and creat a new project
- (installing truffle, node , npm, ...)

-in Migration Folder, add a new file: 2_deploy_contracts.js // no need
var <x> = artifacts.require(".<contract_name>.sol");

module.exports = function(deployer) {
  deployer.deploy(<x>);
};


.env file structure and path (copy to the root repo folder)
- MNEMONIC="" // A meta mask wallet with available account fund in rinkeby testnet
- INFURA_URL= "" // your infura url endpoint (on rinkeby network) including your project id.

our public testnet: rinkeby
to get free test ether on rinkeby: https://www.rinkeby.io/#faucet

1- truffle init //no need
2- truffle compile //no need
3- truffle create test "<contract_name>" // no need

migrate and testing on public testnets:
3- truffle migrate --network rinkeby
4- truffle test --network rinkeby

migrate and testing locally:
  way 1:
    1- run truffle develop //open truffle develop console
    2- run truffle(develop)> migrate
    3- truffle(develop)> test 
      or $ truffle test (after exit the truffle develop console )
  Way 2:
    1- run ganache-cli in yout terminal
    2- Edit the truffle-config.j, so that
      development: { 
        host: "127.0.0.1",     // Localhost (default: none)
        port: 8545,            // Standard Ethereum port (default: none)
      }
    3- Keep this tab in your terminal open, but go ahead and open a new one to work out of 
    4- run truffle migrate --network development
    4- run truffle test --network development


