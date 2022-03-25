import { NgModule } from '@angular/core';
import {  PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';

import { AuthGuard } from './Guards/auth.guard';
import { PreventRouteGuardGuard } from './Guards/prevent-route-guard.guard';
import { RoleGuard } from './Guards/role.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { OrderServicesComponent } from './order-services/order-services.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { SalonForWomenComponent } from './salon-for-women/salon-for-women.component';
import { CategoryDataService } from './Services/category-data.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SubServiceComponent } from './sub-service/sub-service.component';
import { UnauthorizedAccessComponent } from './unauthorized-access/unauthorized-access.component';

const routes: Routes = 
[
  {path:"",component:HomePageComponent,resolve:{categories:CategoryDataService}},
  {path:"Login",component:LoginComponent},
  {path:"SignUp",component:SignUpComponent},
  {path:"Service/:location/:Category",component:SalonForWomenComponent},
  {path:":Categroy/SubService/:service/:S_serviceId",component:SubServiceComponent},
  {path:"Profile",component:ProfileComponent,canDeactivate:[PreventRouteGuardGuard],data:{Role:['Customer','Admin']}}, //canActivate:[AuthGuard,RoleGuard],
  {path:"OrderService",component:OrderServicesComponent,canActivate:[AuthGuard,RoleGuard],data:{Role:['Customer','Admin']}},
  {path:"Booking",component:BookingsComponent,canActivate:[AuthGuard,RoleGuard],data:{Role:['Customer','Admin']}},
  {path:"RegisterAsProvider/Service-Provider/SignUp",loadChildren:()=>import('./provider/provider.module').then(p=>p.ProviderModule)},
  {path:"Unauth-Access",component:UnauthorizedAccessComponent},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
