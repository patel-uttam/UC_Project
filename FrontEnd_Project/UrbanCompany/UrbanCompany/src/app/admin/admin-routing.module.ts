import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardGuard } from '../Guards/admin-guard.guard';
import { RoleGuard } from '../Guards/role.guard';
import { AdminCustomerComponent } from './admin-customer/admin-customer.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminProviderComponent } from './admin-provider/admin-provider.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = 
[
  {path:'Admin',component:AdminComponent,children:
    [
      {path:'',component:AdminHomeComponent,canActivate:[AdminGuardGuard,RoleGuard],data:{Role:['Admin']}},
      {path:'Customers',component:AdminCustomerComponent,canActivate:[AdminGuardGuard,RoleGuard],data:{Role:['Admin']}},
      {path:'Providers',component:AdminProviderComponent,canActivate:[AdminGuardGuard,RoleGuard],data:{Role:['Admin']}},
      {path:'Login',component:AdminLoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
