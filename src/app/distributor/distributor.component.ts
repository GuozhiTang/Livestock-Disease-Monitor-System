import { Component, OnInit, ViewChild } from '@angular/core';
import { IpfsService } from '../services/ipfs.service';
import 'rxjs/add/operator/map';
import { ContractService } from '../services/contract.service';
import * as Report from '../../app/reports';
declare const Materialize;

@Component({
  selector: 'app-distributor',
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {

  dataValue=[];
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

  Role = 'Distributor';

  constructor(
    private ipfs: IpfsService,
    private contract: ContractService,
  ) { }

  ngOnInit() {
    this.contract.checkOrderGen.subscribe(result => {
      if (result !== 'noop') {
      this.setData(result);
      }
    });

    this.contract.checkReportTrigger.subscribe(result => {
      // console.log('result' + result);
      if (result.length >= 1) {
      this.setReport(result);
      }
    });
  }

  /**
   * Method to upload the file to IPFS distributed system as well as local directory '../../../uploads'
   * @param event the upload event with speicific file
   */
  fileUpload(event: any) {
    this.ipfs.fileUpload(event.target.files).subscribe(
      data => { 
        this.report.nativeElement.value = data.msg;
        console.log('Uploaded file Hash: ' + data.msg);
      },
      error => {console.log('Error: ' + error)}
      );
  }

  /**
   * Check whether there exists report from manufacturer, if yes, display it
   * @param result the return result from manufacturer submission
   */
  setReport(result) {
    // console.log(result);
    var Role;
    if (result[1] == '3') Role = 'Farmer';
    else if (result[1] == '2') Role = 'Manufacturer';
    else if (result[1] == '1') Role = 'Distributor';

    if (result[1] == '2') {
      this.dataValue.push({
        orderno: result[0],
        role: Role,
        fileInfo: 'https://gateway.ipfs.io/ipfs/' + result[2]
        }
      );
    }
  }

  /**
   * Set all the data with existed value from retailer
   * @param orderno the orderno created by retailer
   */
  setData(orderno) {
    // console.log(orderno);
    this.contract.fetchInitialDetails(orderno).then(result => {
      // console.log(result);
      Materialize.toast('New Order Received. Order No: ' + orderno, 4000);
      this.product.nativeElement.value = result[0];
      this.product1.nativeElement.value = result[0];

      this.orderNo.nativeElement.value = orderno;
      this.orderNo1.nativeElement.value = orderno;

      this.deliveryDate.nativeElement.value = result[1];
      this.temp.nativeElement.value = result[2];
      this.price.nativeElement.value = result[4];
      this.quantity.nativeElement.value = result[3];
      Materialize.updateTextFields();
    });
  }

  /**
   * The function to submit the report and relevant information
   */
  onSubmitReport() {
    this.contract.setReport(
      this.orderNo.nativeElement.value, 1,
      this.report.nativeElement.value).then(result => {
        console.log('Send Shipment with QA File to Retailer:');
        console.log(result);
        Materialize.toast('Shipment Sent. Tx id: ' + result.tx, 4000);
    });
    Report.reports.push({
      orderno: this.orderNo.nativeElement.value,
      role: 'Distributor',
      fileInfo: 'https://gateway.ipfs.io/ipfs/' + this.report.nativeElement.value
    });
  }

  /**
   * Send the request of shipment and store the data typed by distributor
   */
  onSubmitReq() {
    this.contract.setDistValues(this.orderNo1.nativeElement.value,
      this.Role,
      this.deliveryDate1.nativeElement.value,
      this.price1.nativeElement.value,
      this.quantity1.nativeElement.value).then(result => {
        console.log('Send Request to Manufacturer:');
        console.log(result);
        Materialize.toast('Request Created. Tx id: ' + result.tx, 4000);
    });
  }
}
