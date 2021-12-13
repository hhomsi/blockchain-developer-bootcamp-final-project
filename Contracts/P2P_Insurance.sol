// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "./InsurancePool.sol";

// @title P2P insurance through creating insurance pools
// @author Houmam Homsi
// @notice using the factory design pattern: P2P_Insurance (the factory) that creates objects/smart contracts(InsurancePool)
// @dev Using wei as the payment unit (eth unit at the frontend level)
// @custom: This is an MVP contract.
contract P2P_Insurance {
    
    address public immutable owner; //owner = platform
    uint public poolCount =0;
    InsurancePool[] pools;
    //mapping(address => InsurancePool) public pools; // The pool address is the bridge between frontend and backend

    function getPools() public view returns (InsurancePool[] memory)
    {
        return pools;
    }
    
    modifier onlyOwner(){
        require (msg.sender == owner,"It is not the contract owner");
        _;
    }

    modifier enoughPremiumPaid (uint _premium, uint _value) {
        require (_value >= _premium,"The amount paid is less than the pool premium");
        _;
    }

    modifier notFinishedOrCanceledPool (uint _poolId) {
        require (pools[_poolId].status() == InsurancePool.PoolStatus.Initiated || pools[_poolId].status() == InsurancePool.PoolStatus.Active,
        "The pool status is either finished or canceled");
        _;
    }

    //Register Events
    event poolCreated (address indexed _memberAddress, string _message);
    event memberJoined (address indexed _memberAddress, string _message);
    event poolActivated (uint indexed _poolId, string _message);
    event poolFinished (address indexed _memberAddress, string _message);
    event poolCanceled (address indexed _memberAddress, string _message);
    event memberUnsubscibed (address indexed _memberAddress, string _message);
    event claimRequested (address indexed _memberAddress, string _message);
    event balanceWithdrawed (address indexed _memberAddress, string _message);

    event fallbackReceived(address sender, string message);

    constructor () 
    {
        owner = msg.sender;
    }

    function getPoolDetails(uint _poolId) public view 
    returns (address _poolAddress,uint _minMembers,uint _premium,uint _maxCoverage,uint _status,uint _startDate,uint _poolBalance, uint _poolFund,uint _memberCount)
    {
        _poolAddress = pools[_poolId].getPoolAddress();
        _minMembers = pools[_poolId].minNumberOfMembers();
        _premium = pools[_poolId].premium();
        _maxCoverage = pools[_poolId].maxCoveragePerMember();
        _status = uint(pools[_poolId].status());
        _startDate = pools[_poolId].policyStartDate();
        _poolBalance = pools[_poolId].getPoolTotalBalance();
        _poolFund = pools[_poolId].getPoolAvailableBalance();
        _memberCount = pools[_poolId].getMembersCount();              
    }

    function getMemberDetails(uint _poolId, address _memberAddress) public view 
    returns (int _poolMemberId , uint _balance, uint _totalClaims, uint _remainingCoverage )
    {
        return pools[_poolId].getMemberDetails(_memberAddress);
    }

    //Anyone can create a new pool that is open for other members to join'.
    // each pool has a unique contract address as an escrew account for that specific pool.
    function createNewPool(uint _minNumberOfMembers, uint _premium, uint _maxCoveragePerMember) public payable enoughPremiumPaid(_premium, msg.value)
    {
        uint _value = msg.value;
        address _memberAddress = msg.sender;

        // create a new pool instance
        InsurancePool pool = new InsurancePool();
        // create a new pool and transfer the premim to the pool contract
        if (pool.createPool {value: _value}(_memberAddress,_minNumberOfMembers,_premium,_maxCoveragePerMember))
        {
            pools.push(pool);
            poolCount ++;
            emit poolCreated (_memberAddress, "The pool is sucessfully created!");
        }
    } 

    // User can join an address and pay the premium, as a result he becomes a pool member
    function joinPool(uint _poolId) public payable notFinishedOrCanceledPool(_poolId) enoughPremiumPaid(pools[_poolId].premium(), msg.value)
    {
        address _memberAddress = msg.sender;
        (bool isJoined , bool isPoolActivated)  = pools[_poolId].joinPool{value: msg.value}(_memberAddress);
        if (isJoined)
            emit memberJoined (_memberAddress, "The member has joined the pool sucessfully!");
        if (isPoolActivated)
            emit poolActivated (_poolId, "The pool is sucessfully activated!");
    }

    //Only the pool manager can cancel a pool if it is still in the initiated status - as example, for long time the pool not reaches the minimum requirements to be activated
    function cancelPool (uint _poolId) public
    {
        address _memberAddress = msg.sender;
        if (pools[_poolId].cancelPool(_memberAddress))
            emit poolCanceled (_memberAddress, "The pool is sucessfully canceled!");
    }

    // the pool is finshed once the policy expired after one year since activation (UI/Frontend validation)
    // Only the pool manager has the right to call this function
    function finshPool (uint _poolId) public
    {
        address _memberAddress = msg.sender;
        if( pools[_poolId].finishPool(_memberAddress))
            emit poolFinished (_memberAddress, "The pool is sucessfully finished!");
        //do we need to empty the pool? I think No, because we need to have the pool history onchain for transparency
        //In future, we can offer to renew the pool once policy is expired
    }

    // member can cancel his subscription in a specific pool as long as the pool is not activated. 
    //The pool will refund the premium to his balance
    function cancelMembershipBeforPoolActivation (uint _poolId) public
    {
        address _memberAddress = msg.sender;
        if (pools[_poolId].cancelSubscription(_memberAddress))
            emit memberUnsubscibed (_memberAddress, "The member has unsubscibed from the pool sucessfully!");
    }

    /* There should be an eligibility process in place to validate the claims' reqests, 
       but this will not be developed in the current project.
       At this project(MVP), we consider the claim request is eligible and approved by majority of pool members
    */ 
    function requestClaim(uint _poolId, uint _claimAmount) public
    {
        address _memberAddress = msg.sender;
        if (pools[_poolId].requestClaim(_memberAddress, _claimAmount))
            emit claimRequested (_memberAddress, "The request claim has processed sucessfully!");
    } 

    // member can withdraw his avialable balance (in case of cancelation, refund , etc.)
    function withdrawBalance(uint _poolId) public
    {
        address _memberAddress = msg.sender;
        if (pools[_poolId].withdrawBalance(_memberAddress))
            emit balanceWithdrawed (_memberAddress, "The balance withdrawal has processed sucessfully!");
    }

    //fall back function 
    //it is not payable - not accepting to receive plain ether and this will raise an exception!    
    fallback() external  {
        emit fallbackReceived(msg.sender,"P2P_Insurance Fallback was called");
    }
}
