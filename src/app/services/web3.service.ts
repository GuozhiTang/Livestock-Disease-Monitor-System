import { Injectable } from "@angular/core";
import contract from "truffle-contract";
import { Subject } from "rxjs";
declare let require: any;
const Web3 = require("web3");

declare let window: any;

@Injectable({
  providedIn: "root"
})
export class Web3Service {
  private web3: any;
  private accounts: string[];
  public ready = false;

  public accountsObservable = new Subject<string[]>();

  constructor() {
    this.bootstrapWeb3();
  }

  public getWeb3() {
    return this.web3;
  }

  public bootstrapWeb3() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:8545")
    );
    setInterval(() => this.refreshAccounts(), 2000);
  }

  public async artifactsToContract(artifacts) {
    if (!this.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    return contractAbstraction;
  }

  private refreshAccounts() {
    // console.log("Refreshing accounts");
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        console.warn("There was an error fetching your accounts.");
        return;
      }
      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn(
          "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
        );
        return;
      }
      this.accountsObservable.next(accs);
      // if (
      //   !this.accounts ||
      //   this.accounts.length !== accs.length ||
      //   this.accounts[0] !== accs[0]
      // ) {
      //   console.log("Observed new accounts");
      //   this.accountsObservable.next(accs);
      //   this.accounts = accs;
      // }
      this.ready = true;
    });
  }
}
