# Livestock-Disease-Monitor-System

![](https://img.shields.io/badge/solidity-^0.5.8-red.svg) ![](https://img.shields.io/badge/angular-^7.1.0-green.svg)

Implemented blockchain technology to track the meat supply chain, guarantee the trust of meat safety and reduce the economic impact caused from livestock disease.

Built a blockchain web application that all levels of participants in meat supply chain can access to certify their duties. 

Adopted Solidity to build the smart contracts. Applied Angular-CLI for the UI interface. Guaranteed the connection between front and back end by Web3js.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Nodejs should be installed in your OS

```Bash
brew install node
```

### Installing

* Install the dependencies for angular frontend seperately at root folder:

```Bash
cd angular-src

npm install
```


## Running the project

* First, run the `ganache-cli` in Terminal:
```Bash
ganache-cli
```

* Then to compile and migrate truffle in another Terminal:
```Bash
truffle compile && truffle migrate
```

* Finally, run the front-end server at root directory:
```Bash
ng serve
```

## Authors

* Guozhi Tang - [Guozhi Tang](https://github.com/GuozhiTang)
* Mengqi Wang

## Built With

* [MongoDB/Mongoose](https://www.npmjs.com/package/mongoose) - The database for the project and the related small API.
* [Express](https://expressjs.com/) - Web backend framework.
* [Angular7](https://angular.io/) - Web frontend framework.
* [Nodejs](https://nodejs.org/en/) - Javascript running environment.