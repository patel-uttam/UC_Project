import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { SalonForWomenComponent } from './salon-for-women/salon-for-women.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthServiceService } from './Services/auth-service.service';
import { LoginComponent } from './login/login.component';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LogOutComponent } from './log-out/log-out.component';
import { ProviderRoutingModule } from './provider/provider-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SubServiceComponent } from './sub-service/sub-service.component';
import { OrderServicesComponent } from './order-services/order-services.component';
import { ProviderModule } from './provider/provider.module';
import { CustomerService } from './Services/customer.service';
import { SignUpService } from './Services/sign-up.service';
import { CartService } from './Services/cart.service';
import { CategoryService } from './Services/category.service';
import { BookingsComponent } from './bookings/bookings.component';
import { OrderService } from './Services/order.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    SalonForWomenComponent,
    LoginComponent,
    SignUpComponent,
    LogOutComponent,
    ProfileComponent,
    SubServiceComponent,
    OrderServicesComponent,
    BookingsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgbModule,
    ProviderModule,
    ProviderRoutingModule,
    AppRoutingModule,
    
  ],
  providers: [AuthServiceService,CustomerService,SignUpService,CartService,CategoryService,OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
