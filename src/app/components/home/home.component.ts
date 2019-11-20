import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Web3Service } from "./../../services/web3.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private web3Service: Web3Service,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
  }

  
}
