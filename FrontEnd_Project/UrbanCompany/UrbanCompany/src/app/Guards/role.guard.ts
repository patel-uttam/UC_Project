import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth_service : AuthServiceService , private router : Router)
  {

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      let isrolematch:boolean = true;
      let role = route.data['Role'] as string[];
      if(role)
      {
        isrolematch =  this.auth_service.GetUserRole(role);
      }
      
      if(isrolematch)
      {
        return true;
      }
      else
      {
        this.router.navigate(['Unauth-Access']);
        return false;
      }
      
    }
  
}
