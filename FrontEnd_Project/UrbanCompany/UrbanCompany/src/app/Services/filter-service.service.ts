import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base } from '../Models/BaseUrl';
import { SearchFilter } from '../Models/SearchFilter';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  constructor(private http :HttpClient) { }

  // variable 
  B = new Base();
  // method for home-page search result

  GetSearchResult(value:string):Observable<SearchFilter[]>
  {
    var searchvalue  = JSON.stringify(value);
    return this.http.post<SearchFilter[]>(this.B.BaseUrl+"searchbar/search",searchvalue,{headers:new HttpHeaders({'content-type':'application/json'})});
  }
}
