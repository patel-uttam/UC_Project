import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../Models/signup';
import { Base } from '../Models/BaseUrl';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http : HttpClient , private route : Router) 
  { }
  
  B = new Base();

  SignUp(signup_data : SignUp)
  {
    const data = JSON.stringify(signup_data);
    return this.http.post(this.B.BaseUrl+"authentication/register-customer",data,{'headers':new HttpHeaders({'content-type': 'application/json'})});
  }
  
  Provider_SignUp(signup_data : SignUp)
  {
    const data = JSON.stringify(signup_data);
    return this.http.post(this.B.BaseUrl+"authentication/register-provider",data,{'headers':new HttpHeaders({'content-type': 'application/json'})});
  }
  
  Admin_SignUp(signup_data : SignUp)
  {
    const data = JSON.stringify(signup_data);
    return this.http.post(this.B.BaseUrl+"authentication/register-admin",data,{'headers':new HttpHeaders({'content-type': 'application/json'})});
  }
}
