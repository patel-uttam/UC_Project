import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';

import { AuthGuard } from './Guards/auth.guard';
import { RoleGuard } from './Guards/role.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { OrderServicesComponent } from './order-services/order-services.component';
import { ProfileComponent } from './profile/profile.component';
import { ProviderSignUpComponent } from './provider/provider-sign-up/provider-sign-up.component';
import { SalonForWomenComponent } from './salon-for-women/salon-for-women.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SubServiceComponent } from './sub-service/sub-service.component';

const routes: Routes = 
[
  {path:"",component:HomePageComponent},
  {path:"Login",component:LoginComponent},
  {path:"SignUp",component:SignUpComponent},
  {path:"Salon For Women",component:SalonForWomenComponent},
  {path:"Salon For Women/:service/:S_serviceId",component:SubServiceComponent},
  {path:"Profile",component:ProfileComponent,canActivate:[AuthGuard,RoleGuard],data:{Role:['Customer']}},
  {path:"OrderService",component:OrderServicesComponent,canActivate:[AuthGuard,RoleGuard],data:{Role:['Customer']}},
  {path:"Booking",component:BookingsComponent,canActivate:[AuthGuard,RoleGuard],data:{Role:['Customer']}},
  {path:"RegisterAsProvider",component:ProviderSignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
