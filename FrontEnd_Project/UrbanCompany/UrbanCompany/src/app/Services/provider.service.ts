import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Base } from '../Models/BaseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

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

  GetProvider(provider:String , t:string)
  {
    return this.http.get(this.B.BaseUrl+"Provider/"+provider,{headers:new HttpHeaders({"content-type":"application/json" , "Authorization":"Bearer "+t})});
  }
}
