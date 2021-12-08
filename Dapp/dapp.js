// contract address on Rinkeby:
const ssAddress = '0xb8e3f1d7280bcd69c908f3bc6a9d9b8da9b0554e' // from Infura
//'0xC409768A336951Ce85F5a7a8f30016aA85CD972a' // from remix

// add contract ABI from Remix:
ppABI = [
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			}
		],
		"name": "cancelMembershipBeforPoolActivation",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isCanceled",
				"type": "bool"
			}
		],
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
		"name": "cancelPool",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isCanceled",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
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
		"outputs": [
			{
				"internalType": "bool",
				"name": "isCreated",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "_poolAddress",
				"type": "address"
			}
		],
		"stateMutability": "payable",
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
		"outputs": [
			{
				"internalType": "bool",
				"name": "isFinished",
				"type": "bool"
			}
		],
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
				"internalType": "address",
				"name": "_memberAddress",
				"type": "address"
			}
		],
		"name": "getMemberBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
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
				"internalType": "address",
				"name": "_memberAddress",
				"type": "address"
			}
		],
		"name": "getMemberRemainingCoverage",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
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
				"internalType": "address",
				"name": "_memberAddress",
				"type": "address"
			}
		],
		"name": "getMemberTotalClaims",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPoolCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
		"name": "joinPool",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isJoined",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isPoolActivated",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
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
		"type": "function"
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
		"outputs": [
			{
				"internalType": "bool",
				"name": "isClaimed",
				"type": "bool"
			}
		],
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
		"outputs": [
			{
				"internalType": "bool",
				"name": "isWithdrawed",
				"type": "bool"
			}
		],
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

// instantiate web3 instance
var web3 = new Web3(window.ethereum)

// instantiate smart contract instance
const P2P_Insurance = new web3.eth.Contract(ppABI, ssAddress);
P2P_Insurance.setProvider(window.ethereum);

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
  
  let ppNumOfMemebers = document.getElementById('pp-pool-numOfMemebers').value
  let ppPremium = document.getElementById('pp-pool-premium').value.toString()
  ppPremium = web3.utils.toWei(ppPremium,'ether');
  let ppMaxCoverage = document.getElementById('pp-pool-maxCoveragePerMember').value.toString()
  ppMaxCoverage = web3.utils.toWei(ppMaxCoverage,'ether');


  console.log(ppNumOfMemebers + " , " + ppPremium + " , " + ppMaxCoverage);

  // instantiate smart contract instance
  const P2P_Insurance = new web3.eth.Contract(ppABI, ssAddress);
  P2P_Insurance.setProvider(window.ethereum);
  
  await P2P_Insurance.methods.createNewPool(ppNumOfMemebers,ppPremium,ppMaxCoverage).send({from: ethereum.selectedAddress, value: ppPremium})
  .on ('transactionHash' , function (hash) {

  })
  .on ('receipt' , function (receipt) {
	console.log (receipt);
  })
  .on('error', function (error,receipt) {
  console.log(error);
  });
  //await p2pInstance.createNewPool (ppNumOfMemebers, ppPremium, ppMaxCoverage,{ from: ethereum.selectedAddress, value: ppPremium }); 




  var poolsCount = await P2P_Insurance.methods.getPoolCount.call()

  console.log(poolsCount)


}

const ppGetValue = document.getElementById('pp-get-value')

ppGetValue.onclick = async () => {

  // instantiate web3 instance
  var web3 = new Web3(window.ethereum)

  // instantiate smart contract instance
  //const P2P_Insurance = new web3.eth.Contract(ppABI, ssAddress);
  //P2P_Insurance.setProvider(window.ethereum);

  var owner = await P2P_Insurance.methods.owner().call()

  console.log(owner)

  const ppDisplayValue = document.getElementById('pp-display-value')

  ppDisplayValue.innerHTML = 'Current Owner: ' + owner 

}
