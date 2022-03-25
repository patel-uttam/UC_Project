import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay, Subject } from 'rxjs';

import { Base } from '../Models/BaseUrl';
import { Category } from '../Models/Category';
import { service } from '../Models/Services';
import { subservice } from '../Models/SubService';
import { Provider } from '../Models/Provider';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) 
  { }

  B  = new Base();
  
  // variables

  // providers = new Subject<Provider>(); 
  
  // methods

  GetCategory(category:string):Observable<Category>
  {
    return this.http.get<Category>(this.B.BaseUrl+category+"/category",{'headers':new HttpHeaders({'content-type': 'application/json'})});
  }


  GetService(category:string ):Observable<service[]>
  {
    return this.http.get<service[]>(this.B.BaseUrl+category+"/services",{'headers':new HttpHeaders({'content-type': 'application/json'})});
  }

  GetSubService(serviceId:number):Observable<subservice[]>
  {
    return this.http.get<subservice[]>(this.B.BaseUrl+serviceId+"/subservices",{'headers':new HttpHeaders({'content-type': 'application/json'})});
  }
  
  GetCategories():Observable<Category[]>
  {
    return this.http.get<Category[]>(this.B.BaseUrl+"categories",{'headers':new HttpHeaders({'content-type':'application/json'})})
  }

  GetServices():Observable<service[]>
  {
    return this.http.get<service[]>(this.B.BaseUrl+"services",{'headers':new HttpHeaders({'content-type':'application/json'})});
  }

  GetSubServices():Observable<subservice[]>
  {
    return this.http.get<subservice[]>(this.B.BaseUrl+"subservices",{'headers':new HttpHeaders({'content-type':'application/json'})});
  }


  // To fetch List of provider based on category_name and District/City

  GetProvider_By_Category_City(categroy_name:string , city:string)
  {
    return this.http.get<Provider[]>(this.B.BaseUrl+"provider/"+categroy_name+"/"+city+"/providers",{'headers':new HttpHeaders({'content-type':'application/json'})});
  }


}
