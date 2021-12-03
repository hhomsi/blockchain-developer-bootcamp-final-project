// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

//Member interface to be inherited by the Insurance Pool contract
interface PoolMember {
    struct Member 
    {
        address payable memberAddress; // member address
        uint balance; // in Wei
        uint totalClaims; // in a specific pool - in Wei
    }
    
    function getMemberBalance(address _memberAddress) external view returns (uint);
    function getMemberTotalClaims(address _memberAddress) external view returns(uint);
    function getMemberRemainingCoverage(address _memberAddress) external view returns (uint);


    function createPool(address _memberAddress, uint _minNumberOfMembers, uint _premium, uint _maxCoveragePerMember) external payable;
    function joinPool(address _memberAddress) external payable;
    function cancelPool(address _memberAddress) external;
    function cancelSubscription(address _memberAddress) external returns (bool);
    function finishPool(address _memberAddress) external returns (bool);
    function requestClaim(address _memberAddress, uint _claimAmount) external returns (bool);
    function withdrawBalance(address _memberAddress) external;
}