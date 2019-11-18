import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Web3Service } from "../../services/web3.service";
import { LocalStorageService } from "../../services/local-storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  model = {
    accounts: []
  };

  constructor(
    private router: Router,
    private web3Service: Web3Service,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.watchAccounts();
  }

  watchAccounts() {
    this.web3Service.accountsObservable.subscribe(accounts => {
      this.model.accounts = accounts;
      // console.log("Subscribed to accounts = ", this.model.accounts);
    });
  }

  login(selectedAccount) {
    this.localStorageService.putUser(selectedAccount);
    this.router.navigateByUrl("home");
  }

  // async login() {
  //   let router = this.router;
  //   this.validateCredentials(this.model.username, this.model.password)
  //     .then(function(result) {
  //       router.navigateByUrl("home");
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });

  //   console.log("load something in the background..");
  // }

  // async validateCredentials(username, password) {
  //   return new Promise(function(resolve, reject) {
  //     setTimeout(function() {
  //       if (username == "user" && password == "pass") {
  //         resolve("Valid Credentials");
  //       } else {
  //         reject("Invalid Credentials");
  //       }
  //     }, 2000);
  //   });
  // }
}
