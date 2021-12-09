function addPoolRow(poolId, poolAddress, minNumberOfMembers, premium, maxCoveragePerMember, poolStatus, policyStartDate, availableFund, membersCount) {
         
    var table = document.getElementById("poolsList");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    //web3.utils.fromWei(premium , 'ether')

    row.insertCell(0).innerHTML= poolId;
    row.insertCell(1).innerHTML= poolAddress;
    row.insertCell(2).innerHTML= minNumberOfMembers;
    row.insertCell(3).innerHTML= premium;
    row.insertCell(4).innerHTML= maxCoveragePerMember;
    row.insertCell(5).innerHTML= poolStatus;
    row.insertCell(6).innerHTML= policyStartDate;
    row.insertCell(7).innerHTML= availableFund;
    row.insertCell(8).innerHTML= membersCount;
      


}

function addMemberRow(poolId, balance, totalClaims, remainingCoverage, isPoolManager ) 
{ 
         
    var table = document.getElementById("memberPools");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    //web3.utils.fromWei(premium , 'ether')

    row.insertCell(0).innerHTML= poolId;
    row.insertCell(1).innerHTML= balance;
    row.insertCell(2).innerHTML= totalClaims;
    row.insertCell(3).innerHTML= remainingCoverage;
    row.insertCell(4).innerHTML= isPoolManager;

}