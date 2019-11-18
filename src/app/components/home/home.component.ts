import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Web3Service } from "./../../services/web3.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { Router } from "@angular/router";

declare let require: any;
const metacoin_artifacts = require("../../../../build/contracts/MetaCoin.json");

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  accounts: string[];
  MetaCoin: any;

  model = {
    userAccount: "",
    userBalance: 0,
    userBalanceInEth: 0,
    toAccount: "",
    toManyAccounts: [],
    amount: 1,
    amountToMany: 1,
    amountToMint: 1,
    amountToBurn: 1,
  };

  status = "";

  constructor(
    private router: Router,
    private web3Service: Web3Service,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    let userAccount = this.localStorageService.getUser();
    if (userAccount == null || userAccount == "") {
      alert("Please login..");
      this.router.navigateByUrl("login");
    } else {
      this.model.userAccount = userAccount;
    }

    this.web3Service
      .artifactsToContract(metacoin_artifacts)
      .then(MetaCoinAbstraction => {
        this.MetaCoin = MetaCoinAbstraction;
        this.MetaCoin.deployed().then(deployed => {
          this.watchAccount();
          this.getAccountBalance(this.model.userAccount).then(userBalance => {
            this.model.userBalance = userBalance;
            console.log("user balance = ", this.model.userBalance);
          });
          this.getAccountBalanceInEth(this.model.userAccount).then(balanceInEth => {
            this.model.userBalanceInEth = balanceInEth;
          })
          // this.model.userBalanceInEth = await this.getAccountBalanceInEth(
          //   this.model.userAccount
          // );
        });
      });
  }

  async getUserBalance() {
    this.model.userBalance = await this.getAccountBalance(
      this.model.userAccount
    );
    console.log("user balance = ", this.model.userBalance);
    this.model.userBalanceInEth = await this.getAccountBalanceInEth(
      this.model.userAccount
    );
  }

  logout() {
    this.localStorageService.putUser("");
    this.router.navigateByUrl("login");
  }

  async toAccountOnChange(toAccount) {
    this.model.toAccount = toAccount;
  }

  async toManyAccountsOnChange(toManyAccounts) {
    // console.log("toManyAccounts = ", toManyAccounts.options);
    this.model.toManyAccounts = [];
    for (let option of toManyAccounts.options) {
      if (option.selected) {
        // console.log('option = ', option);
        this.model.toManyAccounts.push(option.value);
      }
    }
    console.log("to accounts = ", this.model.toManyAccounts);
  }

  async getAccountBalance(account) {
    let deployedMetaCoin = await this.MetaCoin.deployed();
    let balance = await deployedMetaCoin.getBalance.call(account);
    return balance;
  }

  async getAccountBalanceInEth(account) {
    let balanceInWei = await this.web3Service.getWeb3().eth.getBalance(account);
    let balanceEth = this.web3Service
      .getWeb3()
      .utils.fromWei(balanceInWei, "ether");
    return balanceEth;
  }

  async sendCoin() {
    let fromAccount = this.model.userAccount;
    let toAccount = this.model.toAccount;
    let amount = this.model.amount;

    if (fromAccount == "" || toAccount == "") {
      alert("Please select from and to accounts");
      return;
    }

    if (fromAccount == toAccount) {
      alert("From and to accounts cannot be the same");
      return;
    }

    if (!(typeof amount == "number" && amount > 0)) {
      alert("Amount should be a positive number");
      return;
    }

    if (!this.MetaCoin) {
      alert("Metacoin contract is not loaded, unable to send transaction");
      return;
    }

    console.log("Sending " + amount + " coins to " + toAccount);

    let deployedMetaCoin = await this.MetaCoin.deployed();
    deployedMetaCoin.sendCoin.sendTransaction(toAccount, amount,{
      from: fromAccount
    })
      .on("transactionHas", hash => {
        console.log("Transaction Hash = ", hash);
      }).on("receipt", receipt => {
        console.log("Receipt = ", receipt);
      }).catch(error => {
        console.log("Error = ", error);
      })
      .finally(() => {
        console.log("Done...");
        this.getUserBalance();
      });
  }

  async sendCoinsToMany() {
    let fromAccount = this.model.userAccount;
    let toAccounts = this.model.toManyAccounts;
    let amount = this.model.amountToMany;

    if (fromAccount == "" || toAccounts.length == 0) {
      alert("Please select from and to accounts");
      return;
    }

    if (!(typeof amount == "number" && amount > 0)) {
      alert("Amount should be a positive number");
      return;
    }

    if (!this.MetaCoin) {
      alert("Metacoin contract is not loaded, unable to send transaction");
      return;
    }

    // console.log("Sending " + amount + " coins to " + toAccounts);

    let deployedMetaCoin = await this.MetaCoin.deployed();
    deployedMetaCoin.sendCoinsToMany.sendTransaction(toAccounts, amount,{
      from: fromAccount
    })
      .on("transactionHas", hash => {
        console.log("Transaction Hash = ", hash);
      }).on("receipt", receipt => {
        console.log("Receipt = ", receipt);
      }).catch(error => {
        console.log("Error = ", error);
      })
      .finally(() => {
        console.log("Done...");
        this.getUserBalance();
      });
  }

  async mintCoins() {
    let fromAccount = this.model.userAccount;
    let amount = this.model.amountToMint;

    let deployedMetaCoin = await this.MetaCoin.deployed();
    deployedMetaCoin.mint.sendTransaction(amount,{
      from: fromAccount
    })
      .on("transactionHas", hash => {
        console.log("Transaction Hash = ", hash);
      }).on("receipt", receipt => {
        console.log("Receipt = ", receipt);
      }).catch(error => {
        console.log("Error = ", error);
      })
      .finally(() => {
        console.log("Done...");
        this.getUserBalance();
      });
  }

  async burnCoins() {
    let fromAccount = this.model.userAccount;
    let amount = this.model.amountToBurn;

    let deployedMetaCoin = await this.MetaCoin.deployed();
    deployedMetaCoin.burn.sendTransaction(amount,{
      from: fromAccount
    })
      .on("transactionHas", hash => {
        console.log("Transaction Hash = ", hash);
      }).on("receipt", receipt => {
        console.log("Receipt = ", receipt);
      }).catch(error => {
        console.log("Error = ", error);
      })
      .finally(() => {
        console.log("Done...");
        this.getUserBalance();
      });
  }

  async sendEther() {
    let fromAccount = this.model.userAccount;
    let toAccount = this.model.toAccount;
    let amount = this.model.amount;

    let amountInWei = this.web3Service
      .getWeb3()
      .utils.toWei("" + amount, "ether");

    let deployedMetaCoin = await this.MetaCoin.deployed();
    deployedMetaCoin.sendEther.sendTransaction(toAccount,{
      from: fromAccount,
      value: amountInWei
    })
      .on("transactionHas", hash => {
        console.log("Transaction Hash = ", hash);
      }).on("receipt", receipt => {
        console.log("Receipt = ", receipt);
      }).catch(error => {
        console.log("Error = ", error);
      })
      .finally(() => {
        console.log("Done...");
        this.getUserBalance();
      });
  }

  watchAccount() {
    console.log("watching accounts");
    this.web3Service.accountsObservable.subscribe(accounts => {
      this.accounts = accounts;
      // console.log("Accounts = ", this.accounts);
    });
  }
}
