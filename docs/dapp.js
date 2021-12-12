// contract address on Rinkeby:
const ppAddress = '0xa53C3219b80F90C9294BDA42C191fE530b369CE7'

// add contract ABI from Remix:
const ppABI =  [
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

const initialize = () => 
{
    //Basic Actions Section
    const mmEnable = document.getElementById('mm-connect');
    const mmDetected = document.getElementById('mm-detected')

    //Created check function to see if the MetaMask extension is installed
    const isMetaMaskInstalled = () => 
    {
      //Have to check the ethereum binding on the window object to see if it's installed
      const { ethereum } = window;
      return Boolean(ethereum && ethereum.isMetaMask);
    }

    const MetaMaskClientCheck = () => {
      //Now we check to see if Metmask is installed
      if (!isMetaMaskInstalled()) {
        mmDetected.innerHTML += 'MetaMask Not Available!'
        //If it isn't installed we ask the user to click to install it
        mmEnable.innerText = 'Click here to install MetaMask!';
        //When the button is clicked we call th is function
        mmEnable.onclick = onClickInstall;
        //The button is now disabled
        mmEnable.disabled = false;
      } else {
        mmDetected.innerHTML += 'MetaMask Is Available!'
        //If MetaMask is installed we ask the user to connect to their wallet
        mmEnable.innerText = 'Connect to MetaMask';
        //When the button is clicked we call this function to connect the users MetaMask Wallet
        mmEnable.onclick = onClickConnect;
        //The button is now disabled
        mmEnable.disabled = false;
      }
    };

    MetaMaskClientCheck();
}
//We create a new MetaMask onboarding object to use in our app
const onboarding = new MetaMaskOnboarding();
const onClickInstall = () => {
  const mmEnable = document.getElementById('mm-connect');
  mmEnable.innerText = 'Onboarding in progress';
  mmEnable.disabled = true;
  //On this object we have startOnboarding which will start the onboarding process for our end user
  onboarding.startOnboarding();
};

const onClickConnect = async () => {
  try {
    // Will open the MetaMask UI
    // You should disable this button while the request is pending!
    await ethereum.request({ method: 'eth_requestAccounts' });

    // grab mm-current-account and populate it with the current address
    var mmCurrentAccount = document.getElementById('mm-current-account');
    mmCurrentAccount.innerHTML = 'Current Account: ' + ethereum.selectedAddress

  } catch (error) {
    console.error(error);
  }
};

// Using the 'load' event listener for Javascript to
// check if window.ethereum is available
window.addEventListener('load', initialize);

const ppGetValue = document.getElementById('pp-get-value')
ppGetValue.onclick = async () => {
  getPoolsAndMembersDetails();}

const ppCreatePool = document.getElementById('create-pool-button');
ppCreatePool.onclick = async () => {
  createPool();}

const ppRequestClaim = document.getElementById('request-claim-button');
ppRequestClaim.onclick = async () => {
  requestClaim();}


async function getPoolsAndMembersDetails ()
{
  // instantiate web3 instance
  var web3 = new Web3(window.ethereum)

  // instantiate smart contract instance
  const P2P_Insurance = new web3.eth.Contract(ppABI, ppAddress);
  P2P_Insurance.setProvider(window.ethereum);

  refreshPoolTable();
  refreshMemberTable();

  const poolCount = await P2P_Insurance.methods.poolCount().call()
  for (let i=0; i < poolCount; i++)
  {
	  const poolDetails = await P2P_Insurance.methods.getPoolDetails(i).call()
    const memberDetails = await P2P_Insurance.methods.getMemberDetails(i , ethereum.selectedAddress).call()
    const isMemberJoined = (memberDetails[0] != -1) ? true : false;

	  //display each pool details to the html
    addPoolRow(i, poolDetails[0], poolDetails[1], poolDetails[2], poolDetails[3], poolDetails[4], poolDetails[5], poolDetails[6], poolDetails[7], poolDetails[8], !isMemberJoined)

    //display each pool details to the html
    if (isMemberJoined)
      {
        addMemberRow(i, memberDetails[0], memberDetails[1], memberDetails[2], memberDetails[3] )
      }
  }
}

async function createPool()
{
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
  try 
  { 
    await P2P_Insurance.methods.createNewPool(ppNumOfMemebers,ppPremium,ppMaxCoverage).send({from: ethereum.selectedAddress, value: ppPremium})
    
    //Get pool details
    const poolCount = await P2P_Insurance.methods.poolCount().call()
    const poolDetails = await P2P_Insurance.methods.getPoolDetails (poolCount - 1).call()
  
    //display the pool details to the html
    getPoolsAndMembersDetails(); // refresh the tables by reading the updated blockchain state variables

  } catch (error) {
      alert("The pool can't be created!")}
}

async function requestClaim ()
{
  var web3 = new Web3(window.ethereum)
  const P2P_Insurance = new web3.eth.Contract(ppABI, ppAddress);
  P2P_Insurance.setProvider(window.ethereum);

  // grab value from input
  var poolId = document.getElementById('pool-id').value
  var amount = document.getElementById('claim-amount').value.toString()
  amount = web3.utils.toWei(amount,'ether');

  try
  {
    await P2P_Insurance.methods.requestClaim(poolId, amount).send({from: ethereum.selectedAddress})
    getPoolsAndMembersDetails()
  } catch (error){
    alert("The claim request can't be completed!")}
}

async function joinPool(poolId, amount)
{
  // instantiate web3 instance
	var web3 = new Web3(window.ethereum)
  
	// instantiate smart contract instance
	const P2P_Insurance = new web3.eth.Contract(ppABI, ppAddress);
	P2P_Insurance.setProvider(window.ethereum);

	//var poolId = document.getElementById('join-pool-id').value
	//var premAmount = document.getElementById('join-amount').value.toString()
	//premAmount = web3.utils.toWei(premAmount,'ether');

	try
  {
    await P2P_Insurance.methods.joinPool(poolId).send({from: ethereum.selectedAddress, value: amount})
  
    const memberDetails = await P2P_Insurance.methods.getMemberDetails(poolId , ethereum.selectedAddress).call()

	  //display each pool details to the html
    if (memberDetails[0] != -1)
    {
      getPoolsAndMembersDetails(); // refresh the tables by reading the updated blockchain state variables
    }  
  } catch (error) {
      alert("The member can't join the pool!");
    }
}

async function withdrawBalance (poolId)
{
  var web3 = new Web3(window.ethereum)
  const P2P_Insurance = new web3.eth.Contract(ppABI, ppAddress);
  P2P_Insurance.setProvider(window.ethereum);

  try
  {
    await P2P_Insurance.methods.withdrawBalance(poolId).send({from: ethereum.selectedAddress})

    getPoolsAndMembersDetails();
  } catch (error) {
    alert("The withdrawal can't be completed!")}
}

async function finishPool (poolId)
{
  var web3 = new Web3(window.ethereum)
  const P2P_Insurance = new web3.eth.Contract(ppABI, ppAddress);
  P2P_Insurance.setProvider(window.ethereum);

  try
  {
    await P2P_Insurance.methods.finshPool(poolId).send({from: ethereum.selectedAddress})

    getPoolsAndMembersDetails();
  } catch (error) {
    alert("The pool can't be finished!")}
}

async function cancelPool (poolId)
{
  var web3 = new Web3(window.ethereum)
  const P2P_Insurance = new web3.eth.Contract(ppABI, ppAddress);
  P2P_Insurance.setProvider(window.ethereum);

  try
  {
    await P2P_Insurance.methods.cancelPool(poolId).send({from: ethereum.selectedAddress})
    getPoolsAndMembersDetails()
  } catch (error){
    alert("The pool can't be canceled!")}
}

async function cancelMembership (poolId)
{
  var web3 = new Web3(window.ethereum)
  const P2P_Insurance = new web3.eth.Contract(ppABI, ppAddress);
  P2P_Insurance.setProvider(window.ethereum);

  try
  {
    await P2P_Insurance.methods.cancelMembershipBeforPoolActivation(poolId).send({from: ethereum.selectedAddress})

    getPoolsAndMembersDetails();
  } catch (error) {
    alert("Member can't cancel his membership!")}
}

/*
const pools  = await P2P_Insurance.methods.getPools().call()
const pool1 = await pools.at(0); // address of first pool contract!
const InsurancePool = new web3.eth.Contract(poolABI, pool1);
InsurancePool.setProvider(window.ethereum);
const premium  = await InsurancePool.methods.premium().call()
*/

/*   
   P2P_Insurance.methods.createNewPool(ppNumOfMemebers,ppPremium,ppMaxCoverage).send({from: ethereum.selectedAddress, value: ppPremium})
  	.on ('transactionHash' , function (hash) {
  	})
  	.on ('receipt' , function (receipt) {
		console.log (receipt);
  	})
  	.on('error', function (error,receipt) {
  		console.log(error);
  	});
*/