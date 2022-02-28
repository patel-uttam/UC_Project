import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Base } from '../Models/BaseUrl';
import { ConfirmEmail } from '../Models/ConfirmEmail';

@Injectable({
  providedIn: 'root'
})
export class ManagingUsersAccountService {

  constructor(private http:HttpClient)
  { 

  }

  // variables
  B = new Base();
  // 

  VerifyUserEmail(emailconfirm:ConfirmEmail)
  {
    return this.http.post(this.B.BaseUrl+"authentication/confirm-email",emailconfirm,{headers:({'content-type':'application/json'})});
  }

  UpdatePassword()
  {
    
  }
}
