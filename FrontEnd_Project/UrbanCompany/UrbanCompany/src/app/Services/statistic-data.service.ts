import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Base } from '../Models/BaseUrl';

@Injectable({
  providedIn: 'root'
})
export class StatisticDataService {

  constructor(private http:HttpClient ) 
  {

  }

  // variables

  B = new Base();

  //

  // method
  GetStatisticData()
  {
    return this.http.get(this.B.BaseUrl+"statisticdata",{headers: new HttpHeaders({'content-type':'application/json'})});
  }
  //
}
