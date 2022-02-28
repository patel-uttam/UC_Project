import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base } from '../Models/BaseUrl';
import { Provider } from '../Models/Provider';


@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http:HttpClient) 
  { 
    if(localStorage.getItem("Jwt") != null)
    {
      if(localStorage.getItem("data") == null)
      {
        let json_token:any = localStorage.getItem("Jwt");
        let payload = JSON.parse(atob(json_token.toString().split('.')[1]));

        this.GetProvider(payload.username,json_token.toString()).subscribe
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

  GetProvider(provider:String , t:string)
  {
    return this.http.get(this.B.BaseUrl+"Provider/"+provider,{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+t})});
  }

  GetReviews()
  {
    return this.http.get(this.B.BaseUrl+"reviewrating/"+this.id,{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
  }
  
  UpdateProvider(provider:Provider)
  {
    return this.http.put(this.B.BaseUrl+"Provider/"+this.id,provider,{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
  }

  Order_Assign_Provider()
  {
    console.log(this.id);
    return this.http.get(this.B.BaseUrl+"Provider/"+this.id+"/assign order",{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
  }

  Order_Complete(orderId:number)
  {
    return this.http.post(this.B.BaseUrl+"customer/ordercomplete",orderId,{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
  }
}
