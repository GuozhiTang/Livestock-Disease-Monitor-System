import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { TestComponent } from './components/test/test.component';
import { TesthomeComponent } from './components/testhome/testhome.component';
import { TestloginComponent } from './components/testlogin/testlogin.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "test", component: TestComponent },
  { path: "testhome", component: TesthomeComponent },
  { path: "testlogin", component: TestloginComponent },
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "**", component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TestComponent,
    TesthomeComponent,
    TestloginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
