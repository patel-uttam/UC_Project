import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { AuthGuard } from '../Guards/auth.guard';
import { Cart } from '../Models/Cart';
import { subservice } from '../Models/SubService';
import { AuthServiceService } from '../Services/auth-service.service';
import { CartService } from '../Services/cart.service';
import { CategoryService } from '../Services/category.service';

@Component({
  selector: 'app-sub-service',
  templateUrl: './sub-service.component.html',
  styleUrls: ['./sub-service.component.css']
})
export class SubServiceComponent implements OnInit {

  constructor(private route : ActivatedRoute,private subservice_service:CategoryService, private cart_service:CartService, private authservice:AuthServiceService) { }

  ngOnInit(): void 
  {

    this.route.params.subscribe((x)=>{console.log(x['S_serviceId']), this.serviceId=x['S_serviceId'] ,this.service_name=x['service']});
    
    this.subservice_service.GetSubService(this.serviceId).subscribe
    (
      (Response)=>
      {
        this.count = this.subservices.length;
        this.subservices=Response as subservice[];
        
        console.log(this.subservices);

        for(var ss of this.subservices)
        {

          this.cart.service = ss.serviceId;
          this.cart.subservice = ss.subServiceId;
          this.cart.cost = ss.cost;
          this.cart.qty = 0;

          this.carts.push(this.cart);
          this.cart = {"customer":0,"service":0,"subservice":0,"cost":0,"qty":0};
          
        }

      },
      (error)=>
      {
        console.log(error);
      }
    )

    this.details.push
    (
      ["Waxing : Full arms(chocolate) + underarms(honey),Full legs chocolate"]
    )
    this.details.push
    (
      ["'Waxing' : Full arms(chocolate) + underarms(honey),Full legs chocolate"]
    )

  }

  // variables and object define

    count:number=0;

    service_name:string="";
    serviceId:number = 0;
    subservices:subservice[]=[];

    cart:Cart = {"customer":0,"service":0,"subservice":0,"cost":0,"qty":0};
    carts:Cart[] = [];

    data:any = localStorage.getItem("data");
    cust_data = JSON.parse(this.data);

    details:string[][]=[];


  //


  // functions

  Add_to_cart(index:number)
  {
    if(this.authservice.IsLoggedIn())
    {
      if(this.authservice.GetUserRole(["Customer"]))
      {
        let data:any = localStorage.getItem("data");
        let id = JSON.parse(data).CustomerId;
        this.carts[index].customer=id;
        this.cart_service.AddToCart(this.carts[index]).subscribe
        (
          (Response)=>
          {
            console.log("AddtoCart" , Response);
          },
          (error)=>
          {
            console.log(error);
          }
        )
      }
      else
      {
        alert("Authorization is Failed...");
      }
    }
    else
    {
      alert("Please LogIn to continue...");
    }

    console.log(this.carts[index]);
  }

  MinQty(i:number)
  {
      this.carts[i].qty = this.carts[i].qty-1;
  }

  MaxQty(i:number)
  {
      this.carts[i].qty = this.carts[i].qty+1;      
  }

  //
}
