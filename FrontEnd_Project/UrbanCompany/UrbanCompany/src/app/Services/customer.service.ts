import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base } from '../Models/BaseUrl';
import { Customer } from '../Models/Customer';
import { ReviewRating_Adding } from '../Models/ReviewRating_Adding';
import { ReviewRating } from '../Models/ReviewRating';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) 
  { 
    if(localStorage.getItem("Jwt") != null)
    {
      if(localStorage.getItem("data") == null)
      {
        let json_token:any = localStorage.getItem("Jwt");
        let payload = JSON.parse(atob(json_token.toString().split('.')[1]));

        this.GetCustomer(payload.username,json_token.toString()).subscribe
        (
          (Response)=>
          {
             const cust_data:object= {
              CustomerId : (<any>Response).customerId,
              CustomerName : (<any>Response).customerName,
            }
            localStorage.setItem("data",JSON.stringify(cust_data));
            let json:any = localStorage.getItem("data");
            let data = JSON.parse(json);
            this.id = Number(data.CustomerId);
            this.t = localStorage.getItem("Jwt");
          }
        )
      }
      else
      {
        let json:any = localStorage.getItem("data");
        let data = JSON.parse(json);
        this.id = Number(data.CustomerId);
        this.t = localStorage.getItem("Jwt");
  
      }
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

  AddReview(Review:ReviewRating_Adding)
  {
    return this.http.post(this.B.BaseUrl+"reviewrating/addnew",Review,{ headers : new HttpHeaders({"Authorization":"Bearer"+" "+this.t})})
  }
}
