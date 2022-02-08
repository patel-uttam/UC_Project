import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { Provider_OrderDisplay } from 'src/app/Models/Provider_OrderDisplay';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { ProviderService } from 'src/app/Services/provider.service';

@Component({
  selector: 'app-provider-home-page',
  templateUrl: './provider-home-page.component.html',
  styleUrls: ['./provider-home-page.component.css']
})
export class ProviderHomePageComponent implements OnInit {

  constructor(private auth_service:AuthServiceService , private provider_service:ProviderService , private router:Router) 
  { 
  }

  ngOnInit(): void 
  {
    if(this.auth_service.ExpireToken() == true)
    {
      this.auth_service.LogOut();
      this.router.navigate(['Service-Provider/Login']);
    }

    if(localStorage.getItem("Jwt") != null)
    {
      this.provider_service.Order_Assign_Provider().subscribe
      (
        (Response)=>
        {
          for(var o of Response as Provider_OrderDisplay[])
          {
            this.orders.push(o as Provider_OrderDisplay);
          }
        },
        (error)=>
        {
          console.log(error);
        }
      )
    }
    console.log(this.orders);

    this.review_array.push({customer:"user3" , review:"qwertyuioojhgfdsascvbnmjhrewasdfghjol,mnbvcxawertyuiokmnbzxcvbnjkuytfds."});
    this.review_array.push({customer:"user4" , review:"nice service"});
    this.review_array.push({customer:"user5" , review:"nice service"});
    this.review_array.push({customer:"user6" , review:"nice service"});
    this.review_array.push({customer:"user7" , review:"nice service"});

  }

  // variables and object
  orders:Provider_OrderDisplay[]=[];
  rating:number = 5;

  

  review_array:review[]=[]


  // //


  // function
  order_complete()
  {

  }
  // //

}

interface review
{
  customer:string;
  review:string;
}
