import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { Provider_OrderDisplay } from 'src/app/Models/Provider_OrderDisplay';
import { Provider } from 'src/app/Models/Provider';
import { ReviewRating } from 'src/app/Models/ReviewRating';
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
      let json_data:any = localStorage.getItem("data");
      let data = JSON.parse(json_data);
      let token:any = localStorage.getItem("Jwt");

      this.provider_service.GetProvider(data.CustomerName,token).subscribe
      (
        (Response)=>
        {
          console.log(Response);
          if((Response as Provider).rating > 0)
          {
            this.rating = Number((Response as Provider).rating);
          }
        },
        (error)=>
        {
          console.log("Error in fetching rating");
        }
      )


      this.provider_service.Order_Assign_Provider().subscribe
      (
        (Response)=>
        {
          for(var o of Response as Provider_OrderDisplay[])
          {
            this.orders.push(o as Provider_OrderDisplay);
            if(!this.OrderIds.includes(o.orderId as number))
            {
              this.OrderIds.push(o.orderId as number);
            }
          }
        },
        (error)=>
        {
          console.log(error);
        }
      )

      this.provider_service.GetReviews().subscribe
      (
        (Response)=>
        {
          for(var review of Response as ReviewRating[])
          {
            this.review_array.push(review);
          }
        },
        (error)=>
        {
          console.log("error in fetching reviews");
        }
      )
    }
    console.log(this.orders);



  }

  // variables and object
  orders:Provider_OrderDisplay[]=[];
  rating :number=1;
  OrderIds:number[]=[];
  review_array:ReviewRating[]=[]

  // //


  // function
  order_complete(orderId:number)
  {
    this.provider_service.Order_Complete(orderId).subscribe
    (
      (Response)=>
      {
        alert("Order completed");
      },
      (error)=>
      {
        console.log(error);
      }
    )
  }
  // //

}

interface review
{
  customer:string;
  review:string;
}
