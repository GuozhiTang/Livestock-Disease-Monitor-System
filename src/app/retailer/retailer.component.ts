import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractService } from '../services/contract.service'
declare const Materialize;

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements OnInit {
  Role = 'Retailer';
  dataValue = [];

  @ViewChild('product') product: any;
  @ViewChild('orderNo') orderNo: any;
  @ViewChild('deliveryDate') deliveryDate: any;
  @ViewChild('temp') temp: any;
  @ViewChild('price') price: any;
  @ViewChild('quantity') quantity: any;

  constructor(
    private contract: ContractService,
  ) { }

  ngOnInit() {
    console.log('retailer ngOnInit works!');
    this.contract.checkReportTrigger.subscribe(result => {
      console.log('result' + result);
      if (result.length >= 1) {
      this.setReport(result);
      }
    });
  }

  /**
   * Check whether there exists report from distributor, if yes, display it
   * @param result the return result from manufacturer submission
   */
  setReport(result) {
    console.log(result);
    var Role;
    if (result[1] == '3') Role = 'Supplier';
    else if (result[1] == '2') Role = 'Manufacturer';
    else if (result[1] == '1') Role = 'Distributor';

    if (result[1] == '1') {
      this.dataValue.push({
        orderno: result[0],
        role: Role,
        fileInfo: 'https://gateway.ipfs.io/ipfs/' + result[2]
        }
      );
    }
  }

  /**
   * Send the request of shipment and store the data typed by retailer
   */
  onSubmitReq() {
    this.contract.createOrder(this.orderNo.nativeElement.value,
      this.product.nativeElement.value,
      this.deliveryDate.nativeElement.value.toString(),
      this.temp.nativeElement.value,
      this.price.nativeElement.value,
      this.quantity.nativeElement.value).then(result => {
      console.log(result);
      Materialize.toast('Request Created. Tx id: ' + result.tx, 4000);
    });
  }

}
