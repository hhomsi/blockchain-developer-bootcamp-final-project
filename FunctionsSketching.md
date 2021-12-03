1. User can create a new insurance pool that is open for other users to subscribe and join

function createPool(address poolManager, uint minNumberOfMembers, uint premium, uint maxCoveragePerMember) returns (uint poolId) {

	// create a new insurance pool

};
	
2. A pool manager have to pay the premium to initiate the pool (pool manager is also a pool member)

function DepositePremium(uint poolId, uint amount) return (bool){

	// pay the required premium 

};
	
3. Users can join a specific pool and pay the pool premium

function joinPool(uint poolId, uint amount) return (bool){

	// join the pool, and pay the required premium 

};

4. User can't send amount less than the premium value.

modifier validPremium(uint premium, uint amount) { 
	// checks if the sender sends enough amount >= premium, in order to join the pool
	_;
	
};
	
5. The smart contract refunds any extra amount deposited more than the premium amount

function refundExtraAmount(addres sender, uint extraAmount) return (bool){

	// extra amount than premium is refunded to the sender

};

6. A member can request for a claim in case of incident occured.  

function requestClaim(addres member, uint claimAmount) return (bool){

	// process the claim request and transfer the amount, if eligible

};