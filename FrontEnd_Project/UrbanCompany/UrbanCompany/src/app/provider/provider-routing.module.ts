import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderGuardGuard } from '../Guards/provider-guard.guard';
import { RoleGuard } from '../Guards/role.guard';
import { ProviderHomePageComponent } from './provider-home-page/provider-home-page.component';
import { ProviderLoginComponent } from './provider-login/provider-login.component';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';
import { ProviderSignUpComponent } from './provider-sign-up/provider-sign-up.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';

const routes: Routes = 
[
  {path:"Service-Provider",component:ServiceProviderComponent,children:
  [
    {path:"",component:ProviderHomePageComponent,canActivate:[ProviderGuardGuard,RoleGuard],data:{Role:['Provider','Admin']}},
    {path:"Profile",component:ProviderProfileComponent,canActivate:[ProviderGuardGuard,RoleGuard],data:{Role:['Provider','Admin']}},
    {path:"Login",component:ProviderLoginComponent},
    {path:"SignUp",component:ProviderSignUpComponent},
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
