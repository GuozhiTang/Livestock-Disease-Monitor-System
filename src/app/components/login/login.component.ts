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

  constructor(
  ) {}

  ngOnInit() {
  }
}
