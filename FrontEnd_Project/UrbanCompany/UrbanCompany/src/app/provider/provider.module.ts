import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderHomePageComponent } from './provider-home-page/provider-home-page.component';
import { ProviderLoginComponent } from './provider-login/provider-login.component';
import { ProviderSignUpComponent } from './provider-sign-up/provider-sign-up.component';
import { ProviderHeaderComponent } from './provider-header/provider-header.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';


@NgModule({
  declarations: [
    ServiceProviderComponent,
    ProviderHomePageComponent,
    ProviderLoginComponent,
    ProviderSignUpComponent,
    ProviderHeaderComponent,
    ProviderProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ProviderRoutingModule
  ]
})
export class ProviderModule { }
