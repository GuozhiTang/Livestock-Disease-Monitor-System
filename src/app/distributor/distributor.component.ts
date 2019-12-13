import { Component, OnInit, ViewChild } from '@angular/core';
import { IpfsService } from '../services/ipfs.service';
import 'rxjs/add/operator/map';
import { ContractService } from '../services/contract.service';
import { HttpClient } from '@angular/common/http'
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
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.contract.checkOrderGen.subscribe(result => {
      if (result !== 'noop') {
      this.setData(result);
      }
    });

    this.contract.checkReportTrigger.subscribe(result => {
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
      data => { this.report.nativeElement.value = data.msg; },
      error => {console.log(error)}
      );
  }

  /**
   * Check whether there exists report from manufacturer, if yes, display it
   * @param result the return result from manufacturer submission
   */
  setReport(result) {
    this.dataValue.push({
      orderno: result[0],
      fileInfo: 'https://gateway.ipfs.io/ipfs/' + result[2]
    }
  );
    // this.http.get('http://127.0.0.1:8080/ipfs/' + result[2], { responseType: 'text'}).subscribe(response => {
    //   this.dataValue.push({orderno: result[0], fileInfo: response + result[2]});
    // });
  }

  /**
   * Set all the data with existed value from retailer
   * @param orderno the orderno created by retailer
   */
  setData(orderno) {
    console.log(orderno);
    this.contract.fetchInitialDetails(orderno).then(result => {
      console.log(result);
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
      console.log(result);
      Materialize.toast('Shipment sent. Tx id: ' + result.tx, 4000);
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
      console.log(result);
      Materialize.toast('Request Created. Tx id: ' + result.tx, 4000);
    });
  }
}
