import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { ContractService } from './services/contract.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RetailerComponent } from './retailer/retailer.component';
import { DistributorComponent } from './distributor/distributor.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { SupplierComponent } from './supplier/supplier.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component'

import { IpfsService } from './services/ipfs.service';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'manufacturer', component: ManufacturerComponent },
  { path: 'distributor', component: DistributorComponent },
  { path: 'retailer', component: RetailerComponent },
  // { path: 'navbar', component: NavbarComponent },
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    AppComponent,
    RetailerComponent,
    DistributorComponent,
    ManufacturerComponent,
    SupplierComponent,
    LoginComponent,
    NavbarComponent
  ],
  providers: [AuthService, ContractService, IpfsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
