function addPoolRow(poolId, poolAddress, minNumberOfMembers, premium, maxCoveragePerMember, poolStatus, policyStartDate, poolBalance, availableFund, membersCount,addJoinPoolButton) {
         
    var table = document.getElementById("poolsList");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    
    // instantiate web3 instance
    var web3 = new Web3(window.ethereum)

    row.insertCell(0).innerHTML= poolId;
    row.insertCell(1).innerHTML= poolAddress;
    row.insertCell(2).innerHTML= minNumberOfMembers;
    row.insertCell(3).innerHTML= web3.utils.fromWei(premium , 'ether');
    row.insertCell(4).innerHTML= web3.utils.fromWei(maxCoveragePerMember , 'ether');
    row.insertCell(5).innerHTML= getPoolStatus(poolStatus);
    row.insertCell(6).innerHTML= getPolicyDate (policyStartDate);
    row.insertCell(7).innerHTML= web3.utils.fromWei(poolBalance , 'ether');
    row.insertCell(8).innerHTML= web3.utils.fromWei(availableFund , 'ether');
    row.insertCell(9).innerHTML= membersCount;

    const memberActions = (addJoinPoolButton) ? '<input type="button" value = "Join Pool" style="margin:5px" onClick="Javacsript:joinP(this)">' : 'Joined'
    row.insertCell(10).innerHTML= memberActions

}

function addMemberRow(poolId, memberId, balance, totalClaims, remainingCoverage )

{ 
    var table = document.getElementById("memberPools");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    // instantiate web3 instance
    var web3 = new Web3(window.ethereum)

    row.insertCell(0).innerHTML= poolId;
    row.insertCell(1).innerHTML= web3.utils.fromWei(balance , 'ether');
    row.insertCell(2).innerHTML= web3.utils.fromWei(totalClaims , 'ether');
    row.insertCell(3).innerHTML= web3.utils.fromWei(remainingCoverage , 'ether');
    row.insertCell(4).innerHTML= (memberId == 0) ? 'Yes' : 'No';

    const memberActions = '<div>' +
                    '<input type="button" value = "Withdraw Balance" style="margin:5px" onClick="Javacsript:withdraw(this)">' +
                    '<input type="button" value = "Finish Pool" style="margin:5px" onClick="Javacsript:finishP(this)">' +
                    '<input type="button" value = "Cancel Pool" style="margin:5px" onClick="Javacsript:cancelP(this)">' +
                    '<input type="button" value = "Cancel Membership" style="margin:5px" onClick="Javacsript:cancelM(this)">' +
                    '</div>'
    row.insertCell(5).innerHTML= memberActions;
}

function getPoolStatus(_poolStatus)
{
    if (_poolStatus == 0) 
        return 'Initiated';
    else
        if (_poolStatus == 1)
            return 'Active';
        else
            if (_poolStatus == 2)
                return 'Finished';
            else
                return 'Canceled';
}

function getPolicyDate(_policyDate)
{
    if (_policyDate == 0)
        return "NA"
    else
        return new Date (_policyDate * 1000);
}

function refreshPoolTable()
{
    var tableHeaderRowCount = 1; 
    var table = document.getElementById('poolsList');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++)
        table.deleteRow(tableHeaderRowCount); 
}

function refreshMemberTable()
{
    var tableHeaderRowCount = 1; 
    var table = document.getElementById('memberPools');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++)
        table.deleteRow(tableHeaderRowCount); 
}

function withdraw (obj)
{
    var index = obj.parentNode.parentNode.parentNode.rowIndex
    var memberDetails = document.getElementById("memberPools").rows[index].cells;
    poolId = memberDetails[0].innerHTML;
    if (memberDetails[1].innerHTML > 0)
        withdrawBalance(poolId);
    else
        alert ('There is no avialable balance!');
}

function finishP (obj)
{
    var index = obj.parentNode.parentNode.parentNode.rowIndex
    var memberDetails = document.getElementById("memberPools").rows[index].cells;
    poolId = memberDetails[0].innerHTML;
    finishPool(poolId);
}

function cancelP (obj)
{
    var index = obj.parentNode.parentNode.parentNode.rowIndex
    var memberDetails = document.getElementById("memberPools").rows[index].cells;
    poolId = memberDetails[0].innerHTML;
    cancelPool(poolId);
}

function cancelM (obj)
{
    var index = obj.parentNode.parentNode.parentNode.rowIndex
    var memberDetails = document.getElementById("memberPools").rows[index].cells;
    poolId = memberDetails[0].innerHTML;
    cancelMembership(poolId);
}

function joinP (obj)
{
    var index = obj.parentNode.parentNode.rowIndex
    var memberDetails = document.getElementById("poolsList").rows[index].cells;
    poolId = memberDetails[0].innerHTML;
    var web3 = new Web3(window.ethereum)
    amount = web3.utils.toWei(memberDetails[3].innerHTML.toString() , 'ether');
    joinPool(poolId , amount);
}