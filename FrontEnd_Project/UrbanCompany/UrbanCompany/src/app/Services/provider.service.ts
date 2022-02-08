import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Base } from '../Models/BaseUrl';
import { Provider } from '../Models/Provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http : HttpClient) 
  {
    if(localStorage.getItem("Jwt")!=null)
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

  GetProvider(provider:String , t:string)
  {
    return this.http.get(this.B.BaseUrl+"Provider/"+provider,{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+t})});
  }

  UpdateProvider(provider:Provider)
  {
    return this.http.put(this.B.BaseUrl+"Provider/"+this.id,provider,{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
  }

  Order_Assign_Provider()
  {
    console.log(this.id);
    return this.http.get(this.B.BaseUrl+"Provider/"+5+"/assign order",{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+this.t})});
  }
}
