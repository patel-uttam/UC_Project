import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Base } from '../Models/BaseUrl';
import { Customer } from '../Models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) 
  { 
    if(localStorage.getItem("Jwt"))
    {
      let json:any = localStorage.getItem("data");
      let data = JSON.parse(json);
      this.id = Number(data.CustomerId);
      this.t = localStorage.getItem("Jwt");
  
    }  
  }

  // variables and object

  id:number=0;
  t:any;
  B = new Base();

  //

  // Function 

  GetCustomer(user:string, t:string)
  {
    
    return this.http.get(this.B.BaseUrl+"Customer/"+user,{ headers : new HttpHeaders({"Authorization":"Bearer"+" "+t})});
  }

  UpdateCustomer(customer:Customer)
  {
    return this.http.put(this.B.BaseUrl+"Customer/"+this.id,customer,{ headers : new HttpHeaders({"Authorization":"Bearer"+" "+this.t})});
  }
}
