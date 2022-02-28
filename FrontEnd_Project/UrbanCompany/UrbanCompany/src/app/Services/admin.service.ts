import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base } from '../Models/BaseUrl';
import { Category } from '../Models/Category';
import { Customer } from '../Models/Customer';
import { Provider } from '../Models/Provider';
import { service } from '../Models/Services';
import { subservice } from '../Models/SubService';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) 
  {
    if(localStorage.getItem("Jwt")!=null)
    {
      this.t=localStorage.getItem("Jwt")?.toString();
    }
  }

  // variables and object
  B = new Base();
  t:any
  // //


  // function

  GetCustomers():Observable<Customer[]>
  {
    return this.http.get<Customer[]>(this.B.BaseUrl+"customer"+"/customers",{headers:new HttpHeaders({'content-type':'application/json','Authorization':'Bearer '+this.t})});
  }

  UpdateCustomer(customer:Customer)
  {
    return this.http.put(this.B.BaseUrl+"Customer/"+customer.customerId,customer,{ headers : new HttpHeaders({"Authorization":"Bearer"+" "+this.t})});
  }
  
  GetProviders():Observable<Provider[]>
  {
    return this.http.get<Provider[]>(this.B.BaseUrl+"provider"+"/providers",{ headers : new HttpHeaders({"Authorization":"Bearer"+" "+this.t})});
  }

  UpdateProvider(provider:Provider)
  {
    return this.http.put(this.B.BaseUrl+"Provider/"+provider.providerId,provider,{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
  }


  // category ,service ,sub service

  Add_Category(category:Category)
  {
    return this.http.post(this.B.BaseUrl+"new/category",category,{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
  }
  

  Add_Service(service:service)
  {
    return this.http.post(this.B.BaseUrl+"new/service",service,{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
  }

  Add_SubService(subservice:subservice)
  {
    return this.http.post(this.B.BaseUrl+"new/subservice",subservice,{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
  }

  Update_SubService(subservice:subservice)
  {
    return this.http.put(this.B.BaseUrl+"changes/subservice",subservice,{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
  }

  Update_Category(category:Category)
  {
    return this.http.put(this.B.BaseUrl+"changes/category",category,{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
  }


  // //
}
