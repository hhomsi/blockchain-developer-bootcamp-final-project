function addPoolRow(poolId, poolAddress) {
         
    var table = document.getElementById("poolsList");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= poolId;
    row.insertCell(1).innerHTML= poolAddress;

}

function addMemberRow(poolId, poolAddress) {
         
    var table = document.getElementById("memberPools");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= poolId;
    row.insertCell(1).innerHTML= poolAddress;

}