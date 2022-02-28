import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';

import { AuthGuard } from './Guards/auth.guard';
import { RoleGuard } from './Guards/role.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { OrderServicesComponent } from './order-services/order-services.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { ProviderSignUpComponent } from './provider/provider-sign-up/provider-sign-up.component';
import { SalonForWomenComponent } from './salon-for-women/salon-for-women.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SubServiceComponent } from './sub-service/sub-service.component';
import { UnauthorizedAccessComponent } from './unauthorized-access/unauthorized-access.component';

const routes: Routes = 
[
  {path:"",component:HomePageComponent},
  {path:"Login",component:LoginComponent},
  {path:"SignUp",component:SignUpComponent},
  {path:":location/:Category",component:SalonForWomenComponent},
  {path:":Category/:service/:S_serviceId",component:SubServiceComponent},
  {path:"Profile",component:ProfileComponent,canActivate:[AuthGuard,RoleGuard],data:{Role:['Customer','Admin']}},
  {path:"OrderService",component:OrderServicesComponent,canActivate:[AuthGuard,RoleGuard],data:{Role:['Customer','Admin']}},
  {path:"Booking",component:BookingsComponent,canActivate:[AuthGuard,RoleGuard],data:{Role:['Customer','Admin']}},
  {path:"RegisterAsProvider",component:ProviderSignUpComponent},
  {path:"Unauth-Access",component:UnauthorizedAccessComponent},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
