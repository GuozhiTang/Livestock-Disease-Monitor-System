import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  constructor() {}

  getUser() {
    try {
      return localStorage.getItem("user");
    } catch (e) {
      return null;
    }
  }

  putUser(address) {
    localStorage.setItem("user", address);
  }
}
