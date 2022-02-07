import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base } from '../Models/BaseUrl';
import { CartDisplay } from '../Models/CartDisplay';
import { OrderDisplay } from '../Models/OrderDisplay';
import { OrderHistory } from '../Models/OrderHistory';
import { OrderOngoing } from '../Models/OrderOngoing';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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
  
  // variables and object

  B = new Base();
  id:number=0;
  t:any;

  //
  
  // Function

    // Add Order 

    Make_Order(cart:CartDisplay[] , date:string , time:string, convenience_fee:number):Observable<boolean>
    {
      return this.http.post<boolean>(this.B.BaseUrl+"customer/"+this.id+"/orderservice/"+date+"/"+time+"/"+convenience_fee, cart, {headers: new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
    }

    // Get Ongoin Order
    GetOnGoingOrder():Observable<OrderDisplay[]>
    {
      return this.http.get<OrderDisplay[]>(this.B.BaseUrl+"customer/"+this.id+"/order/ongoing", {headers: new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
    }

    // Get Ongoin Order
    GetHistoryOrder():Observable<OrderDisplay[]>
    {
      return this.http.get<OrderDisplay[]>(this.B.BaseUrl+"customer/"+this.id+"/order/history", {headers: new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
    }

    // Add Complete Order to OrderHistory

    Order_Complete(ongoing_order:OrderOngoing[]):Observable<boolean>
    {
      return this.http.post<boolean>(this.B.BaseUrl+"customer/"+this.id+"/ordercomplete", ongoing_order, {headers: new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
    }


  // //
}
