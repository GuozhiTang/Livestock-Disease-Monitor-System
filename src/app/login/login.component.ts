import { Component, ViewChild, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('keyFile') keyFile: any;
  @ViewChild('passwd') passwd: any;

  private fileContent: any;

  constructor(
    private auth: AuthService,
    private router: Router
    ) {
  }

  ngOnInit() {
  }

  /**
   * Function to upload the keystore file
   * @param event the exact event of uploading file
   */
  fileChange(event: any) {
    this.readThis(event.target);
  }

  /**
   * Function to read the uploaded file
   * @param inputValue the actural value which is demanded to be read
   */
  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.fileContent = myReader.result;
    }
    myReader.readAsText(file);
  }

  /**
   * The function for login to the management system
   * Navigate to different components after successfully login
   */
  login() {
    const password = this.passwd.nativeElement.value;
    const response = this.auth.checkCredential(this.fileContent, password).then(result => {
      console.log('Login as ' + result);
      if (result == 'distributor') { this.router.navigate(['/distributor']); };
      if (result == 'manufacturer') { this.router.navigate(['/manufacturer']); };
      if (result == 'retailer') { this.router.navigate(['/retailer']); };
      if (result == 'farmer') { this.router.navigate(['/farmer']); };
      if (result == 'customer') { this.router.navigate(['/customer']); };
    });
  }
}
