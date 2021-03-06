# blockchain-developer-bootcamp-final-project

# Project Name

Peer-to-peer (P2P) insurance platform

# Project Desciption

Building a Peer-to-peer (P2P) insurance platform that allows a group of insureds to pool their capital, self-organize, and self-administer their own insurance. The core idea of P2P is that a set of like-minded people with mutual interests group their insurance policies together introducing a sense of control, trust, and transparency while at the same time reducing costs. This model of insurance combines traditional pooling and sharing of losses in a decentralized way, providing a product for increasingly savvy consumers who require transparency in an on-demand economy. 

# Deployed version url

https://hhomsi.github.io/blockchain-developer-bootcamp-final-project/

# How to run this project locally:

## Prerequisites

- Solidity compiler is 0.8.10+commit (used specific pragma solidity 0.8.10)
- Node >= v15.0
- npm
- Truffle: npm install -g truffle
- Ganache-Cli: npm install -g ganache-cli

## Cloning the project repo

First, in your terminal, open a new project folder and run:
  git clone https://github.com/hhomsi/blockchain-developer-bootcamp-final-project.git

## Contracts

- Run npm install in project root to install Truffle build and smart contract dependencies (@truffle/hdwallet-provider, dotenv)
- In your terminal/project root, run local testnet in port 8545 with: Ganache-Cli (and keep it open!)
- Open a new terminal, run: truffle migrate --network development
- Run: truffle test --network development

## Frontend

- The MetaMask Extension is installed
- Using eth as the payment unit in fronend transactions
- Using Rinkeby testnet / with pre-funded accounts
- To get free test ether on rinkeby: https://www.rinkeby.io/#faucet

- Inside folder docs > open terminal > run: node UIServer.js
- Then, you can access http://localhost:3000/ to view the frontend locally

# Screencast link

https://www.loom.com/share/ae6d264d5364482a9483af6ad465157d

# Public Ethereum wallet for certification

0xC63c10e691a8Fb1B277c9A6d6a42Ad662646FFAB

# Directory structure

- docs: Project's frontend.
- contracts: Smart contracts that are deployed in the Rinkeby testnet.
- build: The compiled smart contracts / json files
- migrations: Migration files for deploying contracts in contracts directory.
- test: Tests for smart contracts.
- truffle-config.js: The configuration file of truffle

# Environment variables (not needed for running project locally)

## .env file structure and path (copy to the root repo folder):
  - MNEMONIC= ""    // A meta mask wallet with available account fund in rinkeby testnet
  - INFURA_URL= ""  // your infura url endpoint (on rinkeby network) including your project id.

# Main Workflows in a nutshell:

## Create/Join Pools

  - The user can ask to join an exiting pool or create a new pool
  - The user accepts the pool terms and conditions defined by the pool creator/manager (off-chain)
  - The user pay the anuual premuim to join that pool and becomes a member
  - The premiums are transfered and locked into an escrew account (Pool Contract)
  - The insurance policy is activated once the minimum number of members has reached
  
## Request Claims

  - A pool member can submit a claim in case of occured incident
  - The platform checks the eligibility of the request (offchain / onchain)
  - Later, there could be a voting mechanism (members consenus) to approve claims
  - The insured will be received the requested amount in his own wallet

## Finish Pool / Policy Expiry

  - The pool could be finished only by the pool manager
  - The policy is expired after one year of actication date
  - At the policy expiry, the remaining money is equally distributed to the members

## Cancel Pool / Membership

  - The pool could be canceled only by the pool manager, and if the pool is not active yet
  - The premiums will be refunded to the members and will be available for withrdwal
  - A pool member can unsubscibe as long as the pool is not activated yet, then the premium is refunded  

# TODO features

- Excess in pool Coverage (reimbursement through the re-insurer / with sharing part of premium/contribution)
- Eligibility for the claims requests of members:
    - Mainly, building a consensys voting mechansim, where the pool members vote to reimburse a teammate
    - Offchain integration with trusted external data sources
    - Connecting to offchain/onchain oracles, such as delayed flights,etc.
- Offchain Checks / Validation such as pool terms and conditions, pool coverage, max number of members, etc.
- Partial reimbursement if the avialable fund is not enought for the whole requested claim
- Partial reimbursement if the claim has exceeded the maxCoveragePerMember