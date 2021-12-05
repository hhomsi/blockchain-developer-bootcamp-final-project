/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

/*

This test file has been updated for Truffle version 5.0. If your tests are failing, make sure that you are
using Truffle version 5.0. You can check this by running "trufffle version"  in the terminal. If version 5 is not
installed, you can uninstall the existing version with `npm uninstall -g truffle` and install the latest version (5.0)
with `npm install -g truffle`.

*/

const P2P_Insurance = artifacts.require("./P2P_Insurance.sol");

const InsurancePool = artifacts.require("./InsurancePool.sol");


contract("P2P_Insurance", function ( accounts ) {
  
  /*it("should assert true", async function () {
    await P2P_Insurance.deployed();
    return assert.isTrue(true);
  });*/

  /*it("Testing Owner", async() => {
    const ppOwner = await ppInstance.owner.call();
    assert.equal(ppOwner, accounts[0], "Pool is not created.");
  });*/

  const [poolManager, member1, member2] = accounts;
  const pool = [3, web3.utils.toWei("0.0015"), web3.utils.toWei("0.0045")]; // number of members, premium, max coverage per member

  const getErrorObj = (obj = {}) => {
    const txHash = Object.keys(obj)[0];
    return obj[txHash];
  }

  beforeEach(async () => {
    p2pInstance = await P2P_Insurance.deployed();
  });

  describe ("Pool Creation" , () => {
    it("Pool should be created", async() => {
      await p2pInstance.createNewPool.call (pool[0], pool[1], pool[2],{ from: poolManager, value: pool[1] }); 
      assert.isTrue(true);
    });

    it("Pool should not be created: Amount transfered is less than the pool premium", async() => {
      const amount = pool[1] - web3.utils.toWei("0.0001");
      try {
          await p2pInstance.createNewPool.call (pool[0], pool[1], pool[2],{ from: poolManager, value: amount}); 
      } catch (e) {
          const {error, reason} = getErrorObj(e.data);
          assert.equal(error, "revert");
          assert.equal (reason, "The amount paid is less than the pool premium");
      }
    });
  })

  before(async () => {
    poolInstance = await InsurancePool.new();
    await poolInstance.createPool(poolManager, pool[0], pool[1], pool[2],{value: pool[1]});  
  });

  describe ("Joining a Pool" , () => {
    it("Member1 should be joined the pool successfully", async() => {
      await poolInstance.joinPool (member1,{value: pool[1] });
      assert.isTrue(true);
    });

    it("Member2 should be joined the pool successfully", async() => {
      await poolInstance.joinPool (member2,{ value: pool[1] });
      assert.isTrue(true);
    });

    it("Pool should be now activated", async() => {
      const status = await poolInstance.status.call();
      assert.equal(status , 1, "Pool should be activated");
    });

  });

});
