import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Base } from '../Models/BaseUrl';
import { AddressDisplay } from '../Models/AddressDisplay';
import { Area } from '../Models/Area';
import { state } from '../Models/State';
import { City } from '../Models/City';
import { country } from '../Models/Country';


@Injectable({
  providedIn: 'root'
})
export class AddressServiceService {

  constructor(private http:HttpClient)
  { 

  }

  B = new Base();


  // to get countries
  GetCountries():Observable<country[]>
  {
    return this.http.get<country[]>(this.B.BaseUrl+"country");
  }
  // to get states
  GetStates(id:number):Observable<state[]>
  {
    return this.http.get<state[]>(this.B.BaseUrl+"state/"+id);
  }
  // to get Cities
  GetCities(id:number):Observable<City[]>
  {
    return this.http.get<City[]>(this.B.BaseUrl+"city/"+id);
  }
  // to get Areas
  GetAreas(id:number):Observable<Area[]>
  {
    return this.http.get<Area[]>(this.B.BaseUrl+"area/"+id);
  }

    // to get countries
    AddCountries(country_name:string)
    {
      return this.http.post<boolean>(this.B.BaseUrl+"country/addnew",country_name);
    }
    // to get states
    AddStates(state:state)
    {
      return this.http.post<boolean>(this.B.BaseUrl+"state/addnew",state);
    }
    // to get Cities
    AddCities(city:City)
    {
      return this.http.post<boolean>(this.B.BaseUrl+"city/addnew",city);
    }
    // to get Areas
    AddAreas(area:Area)
    {
      return this.http.post<boolean>(this.B.BaseUrl+"area/addnew",area);
    }
  


  // for fetching list of addresses
  GetAddresses():Observable<AddressDisplay[]>
  {
    return this.http.get<AddressDisplay[]>(this.B.BaseUrl+"addresses");
  }
}
