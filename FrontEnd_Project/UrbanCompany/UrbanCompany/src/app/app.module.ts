import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { ProviderService } from './Services/provider.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnauthorizedAccessComponent } from './unauthorized-access/unauthorized-access.component';
import { StatisticDataService } from './Services/statistic-data.service';

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
    PageNotFoundComponent,
    UnauthorizedAccessComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ProviderModule,
    AdminModule,
    ProviderRoutingModule,
    AdminRoutingModule,
    AppRoutingModule,
    
  ],
  providers: [AuthServiceService,CustomerService,SignUpService,CartService,CategoryService,OrderService,ProviderService,StatisticDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

/// UAN –                                   101795356098
// PF –                                        GJAHD00587890000010773