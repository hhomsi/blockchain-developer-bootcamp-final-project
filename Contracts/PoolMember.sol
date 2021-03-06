// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

//@title PoolMember interface to be inherited by the Insurance Pool contract
interface PoolMember {
    struct Member 
    {
        address payable memberAddress; // member address
        uint balance; // in Wei
        uint totalClaims; // in a specific pool - in Wei
    }
    
    function getMemberDetails(address _memberAddress) external view 
        returns (int _poolMemberId , uint _balance, uint _totalClaims, uint _remainingCoverage);

    function createPool(address _memberAddress, uint _minNumberOfMembers, uint _premium, uint _maxCoveragePerMember) external payable returns (bool);
    function joinPool(address _memberAddress) external payable returns (bool,bool);
    function cancelPool(address _memberAddress) external returns (bool); 
    function cancelSubscription(address _memberAddress) external returns (bool);
    function finishPool(address _memberAddress) external returns (bool);
    function requestClaim(address _memberAddress, uint _claimAmount) external returns (bool);
    function withdrawBalance(address _memberAddress) external returns (bool);
}