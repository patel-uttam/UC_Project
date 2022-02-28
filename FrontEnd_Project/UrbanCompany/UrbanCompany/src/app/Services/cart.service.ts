import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Base } from '../Models/BaseUrl';
import { Cart } from '../Models/Cart';
import { CartDisplay } from '../Models/CartDisplay';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient , private customer_service:CustomerService) 
  { 
    if(localStorage.getItem("Jwt") != null)
    {
      if(localStorage.getItem("data") == null)
      {
        let json_token:any = localStorage.getItem("Jwt");
        let payload = JSON.parse(atob(json_token.toString().split('.')[1]));

        customer_service.GetCustomer(payload.username,json_token.toString()).subscribe
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


  // variables and Object

  id:number=0;
  t:any;
  
  B = new Base();

  //


  // methods
  GetCart():Observable<CartDisplay[]>
  {
    console.log(this.id);
    return this.http.get<CartDisplay[]>(this.B.BaseUrl+"customer/"+this.id+"/carts",{headers:new HttpHeaders({'content-type': 'application/json' , "Authorization":"Bearer"+" "+this.t})});
  }

  AddToCart(cart:Cart)
  {
    return this.http.post<boolean>(this.B.BaseUrl+"customer/"+this.id+"/addtocart",cart,{headers:new HttpHeaders({'content-type': 'application/json' , "Authorization":"Bearer"+" "+this.t})});
  }

  DeleteCart(cart_id:number)
  {
    return this.http.delete(this.B.BaseUrl+"customer/"+this.id+"/cartdelete/"+cart_id,{headers:new HttpHeaders({'content-type': 'application/json' , "Authorization":"Bearer"+" "+this.t})})
  }

  DeleteCartAll()
  {
    return this.http.delete(this.B.BaseUrl+"customer/"+this.id+"/cartdelete",{headers:new HttpHeaders({'content-type': 'application/json' , "Authorization":"Bearer"+" "+this.t})})
  }
  //

}
