import { Component, OnInit, ViewChild } from '@angular/core';
import { IpfsService } from '../services/ipfs.service';
import 'rxjs/add/operator/map';
import { ContractService } from '../services/contract.service';
declare const Materialize;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  Role = 'Supplier'

  @ViewChild('product') product: any;
  @ViewChild('orderNo') orderNo: any;
  @ViewChild('deliveryDate') deliveryDate: any;
  @ViewChild('temp') temp: any;
  @ViewChild('price') price: any;
  @ViewChild('quantity') quantity: any;
  @ViewChild('report') report: any;

  constructor(
    private ipfs: IpfsService,
    private contract: ContractService
  ) { }

  ngOnInit() {
    this.contract.checkSupplierTrigger.subscribe(result => {
      if (result !== 'noop') {
      this.setData(result);
      }
    });
  }

  /**
   * If there exists an order number settled by manufacturer, then directly load the data in text fields
   * @param orderno The order number submitted by manufacturer
   */
  setData(orderno) {
    console.log(orderno);
    this.contract.getMfgDetails(orderno).then(result => {
      console.log(result);
      this.product.nativeElement.value = result[4];
      this.orderNo.nativeElement.value = orderno;
      this.deliveryDate.nativeElement.value = result[1];
      this.price.nativeElement.value = result[2];
      this.quantity.nativeElement.value = result[3];
      Materialize.updateTextFields();
    })};


  /**
   * Method to upload the file to IPFS distributed system as well as local directory '../../../uploads'
   * @param event the upload event with speicific file
   */
  fileUpload(event: any) {
    console.log(event.target.files);
    // this.ipfs.fileChange(event.target.files);
    this.ipfs.fileUpload(event.target.files).subscribe(
      data => { 
        this.report.nativeElement.value = data.msg;
        console.log('datamsg: ' + data.msg);
      },
      error => {console.log('error: ' + error)}
    );
  }

  /**
   * The function to submit the report and relevant information
   */
  onSubmitReport() {
    console.log(this.orderNo.nativeElement.value);
    // the IPFS Hash value
    console.log(this.report.nativeElement.value);
    this.contract.setReport(
      this.orderNo.nativeElement.value, 3,
      this.report.nativeElement.value).then(result => {
      Materialize.toast('Shipment sent. Tx id: ' + result.tx, 4000);
    });
  }

}
