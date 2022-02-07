import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterLink, RouterLinkActive, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderGuardGuard implements CanActivate {

  constructor(private authservice : AuthServiceService , private router : Router)
  {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.authservice.IsLoggedIn())
    {
      return true;
    }
    else
    {
      this.router.navigate(['Service-Provider/Login']);
      return false;
    }
  }
  
}
