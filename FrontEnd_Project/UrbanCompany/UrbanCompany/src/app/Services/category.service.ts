import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Base } from '../Models/BaseUrl';
import { Category } from '../Models/Category';
import { service } from '../Models/Services';
import { subservice } from '../Models/SubService';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) 
  { }

  B  = new Base();
  
  
  GetCategory(categoryId:number):Observable<string>
  {
    return this.http.get<string>(this.B.BaseUrl+categoryId+"/category",{'headers':new HttpHeaders({'content-type': 'application/json'})});
  }


  GetService(category:string ):Observable<service[]>
  {
    return this.http.get<service[]>(this.B.BaseUrl+category+"/services",{'headers':new HttpHeaders({'content-type': 'application/json'})});
  }

  GetSubService(serviceId:number):Observable<subservice[]>
  {
    return this.http.get<subservice[]>(this.B.BaseUrl+serviceId+"/subservices",{'headers':new HttpHeaders({'content-type': 'application/json'})});
  }

}
