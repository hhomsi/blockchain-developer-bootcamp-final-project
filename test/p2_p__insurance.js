/*

This test file has been updated for Truffle version 5.0. If your tests are failing, make sure that you are
using Truffle version 5.0. You can check this by running "trufffle version"  in the terminal. If version 5 is not
installed, you can uninstall the existing version with `npm uninstall -g truffle` and install the latest version (5.0)
with `npm install -g truffle`.

*/

const P2P_Insurance = artifacts.require("./P2P_Insurance.sol");
const InsurancePool = artifacts.require("./InsurancePool.sol");

contract("P2P_Insurance", function ( accounts ) {

  const [poolManager, member1, member2] = accounts;
  const pool = [3, web3.utils.toWei("0.0015" , 'ether'), web3.utils.toWei("0.0030" , 'ether')]; // number of members, premium, max coverage per member

  const getErrorObj = (obj = {}) => {
    const txHash = Object.keys(obj)[0];
    return obj[txHash];
  }

  beforeEach(async () => {
    p2pInstance = await P2P_Insurance.deployed();
  });

  describe ("Pool Creation" , () => {
    it("New pool should be created", async() => {
      const poolCountBefore = await p2pInstance.poolCount.call()
      await p2pInstance.createNewPool (pool[0], pool[1], pool[2],{ from: poolManager, value: pool[1] }); 
      const poolCountAfter = await p2pInstance.poolCount.call()
      assert.notEqual(poolCountBefore , poolCountAfter , "The pool can't be created!");
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
    it("Member1 " + member1 +  " should be joined the pool successfully", async() => {
      await poolInstance.joinPool (member1,{value: pool[1] });
      assert.isTrue(true);
    });

    it("Member2 " + member2 +  " should be joined the pool successfully", async() => {
      await poolInstance.joinPool (member2,{ value: pool[1] });
      assert.isTrue(true);
    });

    it("Pool should be now activated", async() => {
      const status = await poolInstance.status.call();
      assert.equal(status , 1, "Pool should be activated");
    });

    describe ("Requesting a Claim" , () => {
      it("A claim should not be processed! : " + member1 + " exceeded his maximum coverage", async() => {
        const claimAmount = web3.utils.toWei("0.0031");
        try {
            await poolInstance.requestClaim (member1, claimAmount); 
        } catch (e) {
            const {error, reason} = getErrorObj(e.data);
            assert.equal(error, "revert");
            assert.equal (reason, "The claim can't be processed because the member has exceeded its maximum coverage");
        }
      });

      it("A claim should be processed successfully", async() => {
        const claimAmount = web3.utils.toWei("0.002");
        await poolInstance.requestClaim (member1,claimAmount);
        assert.isTrue(true);
      });

      describe ("Finish a Pool / Policy Expiry" , () => {
        it("The pool should not be finished! : " + member1 + " is not the pool manager", async() => {
          try {
              await poolInstance.finishPool (member1); 
          } catch (e) {
              const {error, reason} = getErrorObj(e.data);
              assert.equal(error, "revert");
              assert.equal (reason, "It is not the pool manager");
          }
        });

        it("The pool should be finished successfully", async() => {
          const availableBalanceBefore = await poolInstance.getPoolAvailableBalance.call();
          await poolInstance.finishPool (poolManager);
          const availableBalanceAfter = await poolInstance.getPoolAvailableBalance.call();
          assert.notEqual(availableBalanceBefore.toNumber() , availableBalanceAfter.toNumber() , "The surplus should be distributed before finishing the pool!");
        });

        describe ("Distribute surplus to the members" , () => {
          it("Member " + member1 + " should withdraw the available balance successfully", async() => {
            const memberBefore = await poolInstance.members.call(1);
            memberBalanceBefore = memberBefore[1].toNumber();

            await poolInstance.withdrawBalance (member1);

            const memberAfter = await poolInstance.members.call(1);
            const memberBalanceAfter = memberAfter[1].toNumber();

            assert.notEqual(memberBalanceBefore, memberBalanceAfter, "The withdrawal has failed!");
          });

        });

      });

    });

  });

});

/*
await p2pInstance.createNewPool (pool[0], pool[1], pool[2],{ from: poolManager, value: pool[1] }); 
const poolCount = await p2pInstance.poolCount.call()
const pools = await p2pInstance.getPools.call();
const newPool = await pools.at(poolCount - 1 );
let poolInstance = await InsurancePool.at(newPool);
const premium = await poolInstance.premium.call();
...
*/