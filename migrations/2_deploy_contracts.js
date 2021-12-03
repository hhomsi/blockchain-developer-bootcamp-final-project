var P2P_Insurance = artifacts.require("./P2P_Insurance.sol");

module.exports = function(deployer) {
  deployer.deploy(P2P_Insurance);
};