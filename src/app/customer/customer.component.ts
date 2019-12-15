import { Component, OnInit } from '@angular/core';
import * as Report from '../../app/reports';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  Role = "Customer";
  dataValue = [];

  constructor(
  ) { }

  ngOnInit() {
    console.log(Report.reports);
    this.setTable();
  }

  /**
   * Method to setup the table with global variable Report.reports
   */
  setTable() {
    var reports = Report.reports;
    for (var i = 0; i < reports.length; i++) {
      this.dataValue.push(reports[i]);
    }
  }

}
