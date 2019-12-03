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
      if (result == 'dist') { this.router.navigate(['/distributor']); };
      if (result == 'mfg') { this.router.navigate(['/manufacturer']); };
      if (result == 'retail') { this.router.navigate(['/retailer']); };
      if (result == 'supplier') { this.router.navigate(['/supplier']); };
    });
  }
}
