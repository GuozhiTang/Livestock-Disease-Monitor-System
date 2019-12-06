# Livestock-Disease-Monitor-System

![](https://img.shields.io/badge/solidity-^0.5.8-red.svg) ![](https://img.shields.io/badge/angular-^4.0.0-green.svg)	![](https://img.shields.io/badge/materialize-^1.0.0-green.svg)![](https://img.shields.io/badge/truffle-^2.0.5-blue.svg)	![](https://img.shields.io/badge/express-^4.15.4-blue.svg)	![](https://img.shields.io/badge/IPFS-^0.4.22-blue.svg)	

Implemented blockchain technology to track the meat supply chain, guarantee the trust of meat safety and reduce the economic impact caused from livestock disease.

Built a blockchain web application that all levels of participants in meat supply chain can access to certify their duties. 

Adopted Solidity to build the smart contracts. Applied Angular-CLI + Materialize for the UI interface. Guaranteed the connection between front and back end by Web3js + Truffle + IPFS + Ethereum

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Nodejs should be installed.

  ```Bash
  brew install node
  ```

* IFPS should be installed.

* Truffle framework should be installed.

* Ganache/Ganache-CLI should be installed.

  ```Bash
  npm install -g truffle
  ```

* Testrpc can also be installed if it needed.

  ```Bash
  npm install -g ethereumjs-testrpc
  ```

### Installing

* Install all the dependencies:

  ```Bash
  npm install
  ```

### Configuration

#### a. Keystore & password

* All the relevant keystore and password can be found in `./keys`

#### b. Login

* In order to login, the application needs your speicific keystore file with relevant password

* Currently, the accounts which can login are hardcoded in `./src/app/services/auth.service.ts` with their roles.

## Running the project

* First, open a new terminal and start IPFS daemon:
```Bash
ipfs daemon
```

* Then there are two ways to run the backend environment:

  * Strat Ganache-CLI in new terminal:

    ```Bash
    Ganache-cli
    ```
  
  * Start testrpc in new terminal:

    ```Bash
    testrpc -l 47000000000000
    ```

* From inside the project directory, compile the contracts and deploy them to the network:

  ```Bash
  truffle compile && truffle migrate
  ```

* Now finally, start the project in a new terminal

  ```Bash
  npm start
  ```
Then, we can see our project locally on http://localhost:4200.

## Acknowledgments

* [Nikhil Bhaskar](https://github.com/Nikhil22) for [Angular CLI + Truffle Starter Dapp](https://github.com/Nikhil22/angular4-truffle-starter-dapp)
* [MyEtherWallet](https://github.com/kvhnuke/etherwallet)
* [Shubhendu Shekhar](https://github.com/shekhar-shubhendu) for [Supply Chain](https://github.com/shekhar-shubhendu/supply-chain)

## Built With

* [Truffle](https://www.trufflesuite.com/) - A framework for building, testing, and deploying applications on the Ethereum network
* [IPFS](https://www.ipfs.com/) - A protocol and peer-to-peer network for storing and sharing data in a distributed file system.
* [Express](https://expressjs.com/) - Web backend framework.
* [Angular4](https://angular.io/) - Web frontend framework.
* [Nodejs](https://nodejs.org/en/) - Javascript running environment.
* [Materialize](https://materializecss.com/) - A modern responsive front-end framework based on Material Design