import { Component, OnInit, ViewChild } from '@angular/core';
import { IpfsService } from '../services/ipfs.service';
import 'rxjs/add/operator/map';
import { ContractService } from '../services/contract.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
declare const Materialize;

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

  dataValue = [];
  @ViewChild('product') product: any;
  @ViewChild('orderNo') orderNo: any;
  @ViewChild('deliveryDate') deliveryDate: any;
  @ViewChild('temp') temp: any;
  @ViewChild('price') price: any;
  @ViewChild('quantity') quantity: any;
  @ViewChild('report') report: any;

  @ViewChild('prod') product1: any;
  @ViewChild('order') orderNo1: any;
  @ViewChild('ddate') deliveryDate1: any;
  @ViewChild('cost') price1: any;
  @ViewChild('quant') quantity1: any;

  Role = 'Manufacturer';

  constructor(
    private ipfs: IpfsService,
    private contract: ContractService,
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.contract.checkMfgTrigger.subscribe(result => {
      if (result !== 'noop') {
      this.setData(result);
      }
    });
    this.contract.checkReportTrigger.subscribe(result => {
      if (result.length >= 1) {
      this.setReport(result);
      }
    });
    this.auth.getRole(this.Role);
  }

  /**
   * 
   * @param event 
   */
  fileChange(event: any) {
    this.ipfs.fileChange(event.target.files).subscribe(
      data => { this.report.nativeElement.value = data.msg; },
      error => {console.log(error)}
      );
  }

  /**
   * 
   * @param orderno 
   */
  setData(orderno) {
    console.log(orderno);
    this.contract.fetchInitialDetails(orderno).then(result => {
      console.log(result);
      Materialize.toast('New Order Received. Order No: ' + orderno, 4000);
      this.product.nativeElement.value = result[0];
      this.orderNo.nativeElement.value = orderno;
      this.orderNo1.nativeElement.value = orderno;
      this.temp.nativeElement.value = result[2];
      this.price.nativeElement.value = result[2];
      Materialize.updateTextFields();
    });
    this.contract.getDistValues(orderno).then(result => {
      this.deliveryDate.nativeElement.value = result[1];
      this.price.nativeElement.value = result[2];
      this.quantity.nativeElement.value = result[3];
      Materialize.updateTextFields();
    });
  }

  /**
   * 
   * @param result 
   */
  setReport(result) {
    if ( result[1] == '3') {
      this.http.get('http://127.0.0.1:8080/ipfs/' + result[2], { responseType: 'text'}).subscribe(response => {
        this.dataValue.push({orderno: result[0], fileInfo: response + result[2]});
      });
    }
  }

  /**
   * The function to submit the report to IPFS
   * @param event 
   */
  onSubmitReport(event) {
    this.contract.setReport(
      this.orderNo.nativeElement.value, 2,
      this.report.nativeElement.value).then(result => {
      Materialize.toast('Shipment sent. Tx id: ' + result.tx, 4000);
    });
  }

  /**
   * Set, store and print the data typed by manufacturer
   * @param event 
   */
  onSubmit(event) {
    this.contract.setMfgValues(this.orderNo1.nativeElement.value,
      this.Role,
      this.product1.nativeElement.value,
      this.deliveryDate1.nativeElement.value,
      this.price1.nativeElement.value,
      this.quantity1.nativeElement.value).then(result => {
      console.log(result);
      Materialize.toast('Request Created. Tx id: ' + result.tx, 4000);
    });
  }
}