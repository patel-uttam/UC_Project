import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base } from '../Models/BaseUrl';
import { CartDisplay } from '../Models/CartDisplay';
import { CartOrder } from '../Models/CartOrder';
import { OrderDisplay } from '../Models/OrderDisplay';
import { OrderHistory } from '../Models/OrderHistory';
import { OrderOngoing } from '../Models/OrderOngoing';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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
  
  // variables and object

  B = new Base();
  id:number=0;
  t:any;

  //
  
  // Function

    // Add Order 

    Make_Order(cart:CartOrder[] , date:string , time:string,convenience_fee:number):Observable<boolean>
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
