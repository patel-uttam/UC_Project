import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../Models/login';
import { Base } from '../Models/BaseUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router : Router , private http : HttpClient)
  {

  }


  // url
  //

  Logging(credintial : Login):Observable<any>
  {
    const B = new Base();
    
    const headers = new HttpHeaders({ 'content-type': 'application/json'});
    const body = JSON.stringify(credintial);

  
    return this.http.post(B.BaseUrl+"authentication/login",body,{'headers':headers});
    
  }

  IsLoggedIn():Boolean
  {
    let token = localStorage.getItem("Jwt");
    if(token != null)
    {
      return true;
    }
    else
    {
      return false;
    }
  }


  LogOut()
  {
    localStorage.removeItem("Jwt");
    localStorage.removeItem("data");
    localStorage.removeItem("e_year");
    localStorage.removeItem("e_month");
    localStorage.removeItem("e_day");
    localStorage.removeItem("e_hour");
    localStorage.removeItem("e_minute");
    localStorage.removeItem("e_second");
    localStorage.removeItem("location");
  }

  ExpireToken()
  {
    let isexpire:boolean = false;

    var e_year:any = localStorage.getItem("e_year");
    var e_month:any = localStorage.getItem("e_month");
    var e_day:any = localStorage.getItem("e_day");
    var e_hour:any = localStorage.getItem("e_hour");
    var e_minute:any = localStorage.getItem("e_minute");

    var D = new Date();
    console.log( D.getUTCFullYear(), D.getUTCMonth()+1 , D.getUTCDate() , D.getUTCHours() , D.getUTCMinutes());
    console.log( e_year, e_month , e_day , e_hour , e_minute);

    if(D.getUTCFullYear() > e_year)
    {
      isexpire = true;
      console.log("year");
    }
    else
    {
      if( D.getUTCFullYear() >= e_year && (Number(D.getUTCMonth())+1) > e_month)
      {
        isexpire = true;
        console.log("month");
      } 
      else
      {
        if( D.getUTCFullYear() >= e_year && (Number(D.getUTCMonth())+1) >= e_month && D.getUTCDate() > e_day)
        {
          isexpire = true;
          console.log("day");
        }  
        else
        {
          if( D.getUTCFullYear() >= e_year && (Number(D.getUTCMonth())+1) >= e_month && D.getUTCDate  () >= e_day && D.getUTCHours() > e_hour)
          {
            isexpire = true;
            console.log("hour");

          }
          else
          {
            if( D.getUTCFullYear() >= e_year && (Number(D.getUTCMonth())+1) >= e_month && D.getUTCDate  () >= e_day && D.getUTCHours() >= e_hour && D.getUTCMinutes() > e_minute)
            {
              isexpire = true;
              console.log("min");
            }
          }
        }
      }   
    }

    return isexpire;
  }
  


  GetUserRole(requiredRole:string[]):boolean
  {
    let token:any = localStorage.getItem('Jwt');
    var payload =JSON.parse(window.atob(token.split('.')[1]));
    let roles = payload.roles as string[];

    if((roles.includes(requiredRole[0])) && (!roles.includes(requiredRole[1])) )
    {
      return true;
    }
    else
    {
      alert("Authorization is Failed...");
      return false;
    }
  }

}
