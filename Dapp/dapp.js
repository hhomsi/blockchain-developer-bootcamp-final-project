// contract address on Rinkeby:
const ppAddress = '0x44a170Ba86bf31bC6746775A5337410a589C4A08'

// add contract ABI from Remix:
const ppABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_memberAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "balanceWithdrawed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_memberAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "claimRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "fallbackReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_memberAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "memberJoined",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_memberAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "memberUnsubscibed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_poolId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "poolActivated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_memberAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "poolCanceled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_memberAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "poolCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_memberAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "poolFinished",
    "type": "event"
  },
  {
    "stateMutability": "nonpayable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "poolCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getPools",
    "outputs": [
      {
        "internalType": "contract InsurancePool[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_poolId",
        "type": "uint256"
      }
    ],
    "name": "getPoolDetails",
    "outputs": [
      {
        "internalType": "address",
        "name": "_poolAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_minMembers",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_premium",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_maxCoverage",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_status",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_startDate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_poolFund",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_memberCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_poolId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_memberAddress",
        "type": "address"
      }
    ],
    "name": "getMemberDetails",
    "outputs": [
      {
        "internalType": "int256",
        "name": "_poolMemberId",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "_balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_totalClaims",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_remainingCoverage",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_minNumberOfMembers",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_premium",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_maxCoveragePerMember",
        "type": "uint256"
      }
    ],
    "name": "createNewPool",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_poolId",
        "type": "uint256"
      }
    ],
    "name": "joinPool",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_poolId",
        "type": "uint256"
      }
    ],
    "name": "cancelPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_poolId",
        "type": "uint256"
      }
    ],
    "name": "finshPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_poolId",
        "type": "uint256"
      }
    ],
    "name": "cancelMembershipBeforPoolActivation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_poolId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_claimAmount",
        "type": "uint256"
      }
    ],
    "name": "requestClaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_poolId",
        "type": "uint256"
      }
    ],
    "name": "withdrawBalance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

// Using the 'load' event listener for Javascript to
// check if window.ethereum is available

window.addEventListener('load', function() {
  
  if (typeof window.ethereum !== 'undefined') {
    console.log('window.ethereum is enabled')
    if (window.ethereum.isMetaMask === true) {
      console.log('MetaMask is active')
      let mmDetected = document.getElementById('mm-detected')
      mmDetected.innerHTML += 'MetaMask Is Available!'

      // add in web3 herwindowe
      var web3 = new Web3(window.ethereum)

    } else {
      console.log('MetaMask is not available')
      let mmDetected = document.getElementById('mm-detected')
      mmDetected.innerHTML += 'MetaMask Not Available!'
      // let node = document.createTextNode('<p>MetaMask Not Available!<p>')
      // mmDetected.appendChild(node)
    }
  } else {
    console.log('window.ethereum is not found')
    let mmDetected = document.getElementById('mm-detected')
    mmDetected.innerHTML += '<p>MetaMask Not Available!<p>'
  }
})

// Grabbing the button object,  

const mmEnable = document.getElementById('mm-connect');

// since MetaMask has been detected, we know
// `ethereum` is an object, so we'll do the canonical
// MM request to connect the account. 
// 
// typically we only request access to MetaMask when we
// need the user to do something, but this is just for
// an example
 
mmEnable.onclick = async () => {
  await ethereum.request({ method: 'eth_requestAccounts'})
  // grab mm-current-account
  // and populate it with the current address
  var mmCurrentAccount = document.getElementById('mm-current-account');
  mmCurrentAccount.innerHTML = 'Current Account: ' + ethereum.selectedAddress
}

// grab the button for input to a contract:

const ppCreatePool = document.getElementById('create-pool-button');

ppCreatePool.onclick = async () => {
  
    // instantiate web3 instance
    var web3 = new Web3(window.ethereum)

  // grab value from input
  var ppNumOfMemebers = document.getElementById('pp-pool-numOfMemebers').value
  var ppPremium = document.getElementById('pp-pool-premium').value.toString()
  ppPremium = web3.utils.toWei(ppPremium,'ether');
  var ppMaxCoverage = document.getElementById('pp-pool-maxCoveragePerMember').value.toString()
  ppMaxCoverage = web3.utils.toWei(ppMaxCoverage,'ether');

  // instantiate smart contract instance
  var P2P_Insurance = new web3.eth.Contract(ppABI, ppAddress);
  P2P_Insurance.setProvider(window.ethereum);

  //Create a new pool
   await P2P_Insurance.methods.createNewPool(ppNumOfMemebers,ppPremium,ppMaxCoverage).send({from: ethereum.selectedAddress, value: ppPremium})
    
  //Get pool details
  const poolCount = await P2P_Insurance.methods.poolCount().call()
  const poolDetails = await P2P_Insurance.methods.getPoolDetails (poolCount - 1).call()
  
  //display the pool details to the html
  addPoolRow(poolCount - 1, poolDetails[0], poolDetails[1], poolDetails[2], poolDetails[3], poolDetails[4], poolDetails[5], poolDetails[6], poolDetails[7])


  //Read the count of pools
  //const poolCount = await P2P_Insurance.methods.poolCount().call()
  //const pools  = await P2P_Insurance.methods.getPools().call()
  //const poolAddress = await pools.at(poolCount - 1); // address of new pool contract
  //await P2P_Insurance.methods.getPoolDetails (poolAddress).call()
  //display the pool details to the html

}

const ppGetValue = document.getElementById('pp-get-value')

ppGetValue.onclick = async () => {
  
  // instantiate web3 instance
  var web3 = new Web3(window.ethereum)

  // instantiate smart contract instance
  const P2P_Insurance = new web3.eth.Contract(ppABI, ppAddress);
  P2P_Insurance.setProvider(window.ethereum);

  const poolCount = await P2P_Insurance.methods.poolCount().call()
  for (let i=0; i < poolCount; i++)
  {
	const poolDetails = await P2P_Insurance.methods.getPoolDetails(i).call()

	//display each pool details to the html
  refreshPoolTable();
  addPoolRow(i, poolDetails[0], poolDetails[1], poolDetails[2], poolDetails[3], poolDetails[4], poolDetails[5], poolDetails[6], poolDetails[7])

  const memberDetails = await P2P_Insurance.methods.getMemberDetails(i , ethereum.selectedAddress).call()

  //display each pool details to the html
  if (memberDetails[0] != -1)
    {
      refreshMemberTable();
      addMemberRow(i, memberDetails[0], memberDetails[1], memberDetails[2], memberDetails[3] )
    }
  }

}

const ppJoinPool = document.getElementById('join-pool')
ppJoinPool.onclick = async () => {

	// instantiate web3 instance
	var web3 = new Web3(window.ethereum)
  
	// instantiate smart contract instance
	const P2P_Insurance = new web3.eth.Contract(ppABI, ppAddress);
	P2P_Insurance.setProvider(window.ethereum);

	var poolId = document.getElementById('join-pool-id').value
	var premAmount = document.getElementById('join-amount').value.toString()
	premAmount = web3.utils.toWei(premAmount,'ether');

	await P2P_Insurance.methods.joinPool(poolId).send({from: ethereum.selectedAddress, value: premAmount})

  const memberDetails = await P2P_Insurance.methods.getMemberDetails(poolId , ethereum.selectedAddress).call()

	  //display each pool details to the html
    if (memberDetails[0] != -1)
      addMemberRow(poolId, memberDetails[0], memberDetails[1], memberDetails[2], memberDetails[3] )

  
  }
	//const ppDisplayValue = document.getElementById('pp-display-value')
	//ppDisplayValue.innerHTML = ' Pool 0: ' + pool1


/*
const pools  = await P2P_Insurance.methods.getPools().call()
const pool1 = await pools.at(0); // address of first pool contract!
const InsurancePool = new web3.eth.Contract(poolABI, pool1);
InsurancePool.setProvider(window.ethereum);
const premium  = await InsurancePool.methods.premium().call()
*/

// web3.utils.fromWei(premium , 'ether') 

/*   
  await P2P_Insurance.methods.createNewPool(ppNumOfMemebers,ppPremium,ppMaxCoverage).send({from: ethereum.selectedAddress, value: ppPremium})
  	.on ('transactionHash' , function (hash) {
  	})
  	.on ('receipt' , function (receipt) {
		console.log (receipt);
  	})
  	.on('error', function (error,receipt) {
  		console.log(error);
  	});
*/