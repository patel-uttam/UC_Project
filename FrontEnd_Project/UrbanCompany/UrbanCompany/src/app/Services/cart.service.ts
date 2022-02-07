import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Base } from '../Models/BaseUrl';
import { Cart } from '../Models/Cart';
import { CartDisplay } from '../Models/CartDisplay';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http : HttpClient) 
  {
    if(localStorage.getItem("Jwt"))
    {
      let json:any = localStorage.getItem("data");
      let data = JSON.parse(json);
      this.id = Number(data.CustomerId);
      this.t = localStorage.getItem("Jwt");
  
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

  //

}
