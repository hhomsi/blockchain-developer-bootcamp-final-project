const P2P_Insurance = artifacts.require("P2P_Insurance");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("P2P_Insurance", function (/* accounts */) {
  it("should assert true", async function () {
    await P2P_Insurance.deployed();
    return assert.isTrue(true);
  });
});
