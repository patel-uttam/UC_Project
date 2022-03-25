import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService implements Resolve<any> {

  constructor( private category : CategoryService ) 
  { 

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.category.GetCategories(); 
  }
}
