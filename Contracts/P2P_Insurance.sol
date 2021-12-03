// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./InsurancePool.sol";

/** 
 - Implements p2p insurance through creating insurance pools
 - I am using the factory design pattern: P2P_Insurance (the factory) that creates objects/smart contracts (InsurancePool)
 - Using wei as the payment unit (eth unit at the frontend level)
 - how to transfer to Wei in frontend :example: contracts['CrowdFunder'].contract.contribute({value: web3.toWei(12, 'ether')});
 */

contract P2P_Insurance {
    
    address immutable owner; //owner = platform
    mapping(address => InsurancePool) public pools; // The pool address is the bridge between frontend and backend
    
    modifier onlyOwner(){
        require (msg.sender == owner,"It is not the contract owner");
        _;
    }

    modifier enoughPremiumPaid (uint _premium, uint _value) {
        require (_value >= _premium,"The amount paid is less than the pool premium");
        _;
    }

    modifier notFinishedOrCanceledPool (address _poolAddress) {
        require (pools[_poolAddress].status() == InsurancePool.PoolStatus.Initiated || pools[_poolAddress].status() == InsurancePool.PoolStatus.Active,
        "The pool status is either finished or canceled");
        _;
    }

    //Register Events
    event fallbackReceived(address sender, string message);


    constructor () 
    {
        owner = msg.sender;
    }

    function getMemberBalance(address poolAddress, address _memberAddress) public view returns (uint)
    {
        return pools[poolAddress].getMemberBalance(_memberAddress); 
    }
    function getMemberTotalClaims(address poolAddress, address _memberAddress) public view returns(uint) 
    {
        return pools[poolAddress].getMemberTotalClaims(_memberAddress);
    }
    function getMemberRemainingCoverage(address poolAddress, address _memberAddress) public view returns (uint)
    {
        return pools[poolAddress].getMemberRemainingCoverage(_memberAddress);
    }

    //Anyone can create a new pool that is open for other members to join'.
    // each pool has a unique contract address as an escrew account for that specific pool.
    // payment unit in Wei
    //returns the pool address for the frontend
    function createNewPool(uint _minNumberOfMembers, uint _premium, uint _maxCoveragePerMember) public payable enoughPremiumPaid(_premium, msg.value) returns (address _poolAddress)
    {
        uint _value = msg.value;
        // create a new pool instance
        InsurancePool pool = new InsurancePool();
        _poolAddress = address(pool);
        // create a new pool and transfer the premim to the pool contract
        pool.createPool {value: _value}(msg.sender,_minNumberOfMembers,_premium,_maxCoveragePerMember);
        pools[_poolAddress] = pool;
    } 

    // User can join an address and pay the premium, as a result he becomes a pool member
    function joinPool(address _poolAddress) public payable notFinishedOrCanceledPool(_poolAddress) enoughPremiumPaid(pools[_poolAddress].premium(), msg.value)
    {
        pools[_poolAddress].joinPool{value: msg.value}(msg.sender);
    }

    //The pool manager can cancel a pool if it is still in the initiated status - as example, for long time the pool not reaches the minimum requirements to be activated
    function cancelPool (address _poolAddress) public
    {
        pools[_poolAddress].cancelPool(msg.sender);
    }

    // the pool is finshed once the policy expired after one year since activation (UI/Frontend validation)
    // Only the pool manager has the right to call this function
    function finshPool (address _poolAddress) public returns (bool)
    {
        return pools[_poolAddress].finishPool(msg.sender);
        //do we need to empty the pool? I think No, because we need to have the pool history onchain for transparency
        //In future, we can offer to renew the pool once policy is expired
    }

    // member can cancel his subscription in a specific pool as long as the pool is not activated. The pool will refund the premium to his balance
    function cancelMembershipBeforPoolActivation (address _poolAddress) public returns (bool)
    {
        return pools[_poolAddress].cancelSubscription(msg.sender);
    }

    /* There should be an eligibility process in place to validate the claims' reqests, 
       but this will not be developed in the current project.

        checks for claims could be managed later through hybrid ways :
            1-  Mainly, building a consensys voting mechansim, where the pool members vote to reimburse a teammate
            2-  offchain integration with trusted external data sources
            3-  Connecting to offchain/onchain oracles, such as delayed flights,etc.

        At this project (POC), we consider the claim request is eligible and approved by majority of pool members
    */ 
    function requestClaim(address _poolAddress, uint _claimAmount) public returns (bool)
    {
        return pools[_poolAddress].requestClaim(msg.sender, _claimAmount); 
    } 

    // member can withdraw his avialable balance (in case of cancelation, refund , etc.)
    function withdrawBalance(address _poolAddress) public //
    {
        pools[_poolAddress].withdrawBalance(msg.sender);
    }

    //fall back function 
    //it is not payable - not accepting to receive plain ether and this will raise an exception !    
    fallback() external  {
        emit fallbackReceived(msg.sender,"P2P_Insurance Fallback was called");
    }
}
