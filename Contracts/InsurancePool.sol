// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "./PoolMember.sol";

// @title Insurance Pool - the escrew account is the pool contract address
// @author Houmam Homsi
/* @notice Later, There will be other attributes offchain/frontend such as pool terms and conditions, pool coverage, max number of members, etc.
        Max number of members could be important for Block Gas Limit DoS - to limit members array size
*/
/* @notice Later, we can add Re-Insurer capability - when we manage the re-insurance process:
        the pool members get themselves covered with the help of reinsurance in case of exceeding pool coverage.
        And of course, some part of premium/contribution is shared with reinsurers 
*/
// @dev Using wei as the payment unit (eth unit at the frontend level)
// @custom: This is an MVP contract.

contract InsurancePool is PoolMember{

    bool locked; // used for reentrancy checks
    PoolMember.Member[] public members; // Always members[0] is the pool manager
    uint public minNumberOfMembers; // the minimum number of members in a pool - Unit256 as there is no potential packing here
    uint public premium; // the pool premium in Wei
    uint public maxCoveragePerMember; // the maximum coverage by a pool to a member - in Wei
    PoolStatus public status; //the pool status
    uint public policyStartDate; // the policy start date / activation date (policy validity is one year by default)

    enum PoolStatus {
        Initiated,
        Active,
        Finished,
        Canceled
    }

    modifier onlyInitiatedPool () {
        require (status == PoolStatus.Initiated,"The pool status is not initiated");
        _;
    }

    modifier onlyActivePool () {
        require (status == PoolStatus.Active,"The pool status is not active");
        _;
    }

    modifier onlyFinishedPool () {
        require (status == PoolStatus.Finished,"The pool status is not finished");
        _;
    }

    modifier onlycanceledPool () {
        require (status == PoolStatus.Canceled,"The pool status is not canceled");
        _;
    }

    // the pool manager is the first member and it is initiated with the create pool function
    modifier onlyPoolManager (address _sender) {
        require (_sender == members[0].memberAddress,"It is not the pool manager");
        _;
    }
    
    // to check if there is available fund to process the member claim
    modifier availableFundInPool (uint _value) {
        require (getPoolAvailableBalance() >= _value,"The pool has no enough fund ");
        _;
    }

   // protect against reentrant calls 
   modifier noReentrancy() 
    { 
        require( !locked, "Reentrant call." );
        locked = true;
        _;
        locked = false;
    }

    //Register Events
    event fallbackReceived(address sender, string message);

    //return the current balance at the pool
    function getPoolTotalBalance() public view returns (uint)
    {
        return address (this).balance; 
    }

    function getPoolAddress() public view returns (address)
    {
        return address (this); 
    }

    //return the available fund in pool after deducting the members balances (that are due and not withdrawed yet) 
    function getPoolAvailableBalance() public view returns (uint)
    {
        uint sumBalances = 0; // sum the balances of members that are due and not withdrawed yet. 
        for (uint i = 0; i < members.length; i++)
            sumBalances += members[i].balance;    
        return getPoolTotalBalance() - sumBalances;
    }

    function getMembersCount() public view returns (uint)  
    {
        return members.length;
    }

    function getMemberIndex(address _memberAddress) private view returns (int poolMemberId)  
    {
        poolMemberId = -1;
        for (uint i = 0; i < members.length; i++){
            if (members[i].memberAddress == _memberAddress) {
                poolMemberId = int(i);
                break;
            } 
        }
    }

    // The pool will be activated automatically when reaches its minimum number of members
    function activatePool () private onlyInitiatedPool()
    {
        status = PoolStatus.Active;
        policyStartDate = block.timestamp;
    }
    
    constructor ()  {}

    /* implementing PoolMember Interface Functions: */

    function getMemberDetails(address _memberAddress) external view override
    returns (int _poolMemberId , uint _balance, uint _totalClaims, uint _remainingCoverage)
    {
         _poolMemberId = getMemberIndex (_memberAddress); //-1 not a member, 0 pool manager, >0 pool member
         if (_poolMemberId >=0 )
         {
            PoolMember.Member memory member = members[uint(_poolMemberId)];

            _balance =  member.balance;
            _totalClaims = member.totalClaims;
            _remainingCoverage = maxCoveragePerMember - member.totalClaims;
         }
    }

    //already checked (at factory contract) if enough premium paid before creating the InsurancePool instance
    function createPool(address _memberAddress, uint _minNumberOfMembers, uint _premium, uint _maxCoveragePerMember) external payable override returns (bool)
    {
        minNumberOfMembers = _minNumberOfMembers;  // 
        premium = _premium; // _premium in Wei
        maxCoveragePerMember = _maxCoveragePerMember; // in wei

        //for Gaz Optimization - not using the struct construtor, instead assign variables to values
        PoolMember.Member memory member;
        member.memberAddress = payable(_memberAddress);
        member.totalClaims = 0;
        member.balance = msg.value - _premium; // to refund extra amount than the premium
        members.push(member);
        //members.push(Member(_memberAddress , msg.value - _premium, 0)); // Adding the pool manager

        status = PoolStatus.Initiated;
        return true;
    }

    //already checked (at factory contract) if enough premium paid before calling this function
    function joinPool(address _memberAddress) external payable override returns (bool isJoined,bool isPoolActivated)
    {
        require (getMemberIndex(_memberAddress) == -1,"Member already joined this pool");

        //for Gaz Optimization - not using the struct construtor, instead assign variables to values
        PoolMember.Member memory member;
        member.memberAddress = payable(_memberAddress);
        member.totalClaims = 0;
        member.balance = msg.value - premium; // to refund extra amount than the premium
        members.push(member);
        //members.push(Member(_memberAddress , msg.value - premium, 0));
        isJoined = true;

        if (members.length == minNumberOfMembers) {
            activatePool();
            isPoolActivated = true;
        }
    }

    //The pool manager can cancel a pool if it is still in the initiated status - as example, long time the pool not reaches the minimum requirements to be activated
    function cancelPool (address _memberAddress) external override onlyPoolManager(_memberAddress) onlyInitiatedPool returns (bool)
    {
        status = PoolStatus.Canceled;
        //return already paid premiums to members
        for (uint i = 0; i < members.length; i++){
            members[i].balance += premium;
            //members[i].memberAddress.transfer(premium);
        }
        return true;
    }

    // cancel membership of a pool member if only the pool is not activated yet
    function cancelSubscription (address _memberAddress) external override onlyInitiatedPool() noReentrancy returns (bool)
    {
        // Checks-effects-interactions pattern:

        //checks if he is a pool member (checks)
        int poolMemberId = getMemberIndex (_memberAddress);
        require (poolMemberId > 0, "Not a pool member or he is the pool manager");
        uint uintPoolMemberId = uint(poolMemberId);
        address payable _address = members[uintPoolMemberId].memberAddress;

        //Now he is no longer a pool member (effects)
        members[uintPoolMemberId] = members[members.length - 1];
        members.pop();

        //we need to transfer back its premium (interactions) 
        _address.transfer(premium);
        return true;
    }

    // the pool is finshed once the policy expired after one year since activation (UI/Frontend validation)
    // Only the pool manager has the right to call this function    
    function finishPool(address _memberAddress) external override onlyPoolManager(_memberAddress) onlyActivePool returns (bool) 
    {
        status = PoolStatus.Finished;

        uint poolSurplus = getPoolAvailableBalance();
        if (poolSurplus > 0) {
            uint memberShareInSurplus = poolSurplus / members.length; // not correct as balance changed this
            for (uint i = 0; i < members.length; i++){
                members[i].balance += memberShareInSurplus;
                //members[i].memberAddress.transfer(memberShareInSurplus);
            }
        }
        return true;
    }

    //availableFundInPool(claimAmount) checks if the pool availabe fund covers the requested claim
    function requestClaim(address _memberAddress, uint _claimAmount) external override onlyActivePool() availableFundInPool(_claimAmount) noReentrancy returns (bool)
    {
        //expected _claimAmount in Wei
         int poolMemberId = getMemberIndex (_memberAddress);
         require (poolMemberId >=0 ,"It is not a pool member");
         PoolMember.Member storage member = members[uint(poolMemberId)];
         //check entitlements 
        require (member.totalClaims + _claimAmount <= maxCoveragePerMember,
        "The claim can't be processed because the member has exceeded its maximum coverage");

        member.totalClaims += _claimAmount; // before the actual transfer (Checks-effects-interactions pattern)
        member.memberAddress.transfer(_claimAmount);
        return true;
    } 

    // this function will refund the member any extra amount (when deposit the premium), cancelation cases or when distributing the surplus at policy expiry
    function withdrawBalance(address _memberAddress) external override noReentrancy returns (bool)//
    {
        //Checks-effects-interactions pattern

        //checks if send is a pool member
        int poolMemberId = getMemberIndex (_memberAddress);
        require (poolMemberId >= 0,"Not a pool member");
        uint uintPoolMemberId = uint(poolMemberId);

        //checks available balance
        uint balance = members[uintPoolMemberId].balance;
        require (balance > 0 , "No available balance");

        //effects: set balance to 0
        members[uintPoolMemberId].balance = 0;

        //Then transfer
        (bool success,) = _memberAddress.call{value:balance}("");
        require (success, "Transfer failed");

        //if (status == PoolStatus.Canceled && getPoolTotalBalance() == 0)
            //selfDestructPool();

        return true;
    } 
    
    /* implementing PoolMember Interface Functions has been Completed */

    //fall back function  is not payable - not accepting to receive plain ether and this will raise exception!
    fallback() external  {
        emit fallbackReceived(msg.sender,"P2P_Insurance Fallback was called");
    }

    /* @notice
        //clean up the canceled pool (for Gaz Optimization / return gaz) ?
        //because the policy is not activated and no important transactions to keep stored on blockchain
        //We can destruct the pool, and have the archive of canceled pools offchain if needed
        function selfDestructPool() private onlycanceledPool 
        {
            assert(getPoolTotalBalance() == 0); // the pool fund should be already empty
            selfdestruct(payable(msg.sender)); // we are sure that there is no remaining Ether before the self destruction
        }
    */
}