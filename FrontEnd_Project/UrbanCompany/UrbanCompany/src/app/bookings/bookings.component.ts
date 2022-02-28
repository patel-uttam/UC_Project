import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { OrderDisplay } from '../Models/OrderDisplay';
import { ReviewRating_Adding } from '../Models/ReviewRating_Adding';
import { ReviewRating } from '../Models/ReviewRating';
import { CustomerService } from '../Services/customer.service';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor(private order_service : OrderService , private customer_service:CustomerService) { }

  ngOnInit(): void 
  {
    this.order_service.GetOnGoingOrder().subscribe
    (
      (Response)=>
      {
        for(var oo of Response as OrderDisplay[])
        {
          console.log(oo as OrderDisplay);
          this.ongoing_order.push(oo);          
        }
        console.log(this.ongoing_order);

      },
      (error)=>
      {
        console.log(error);
      }
    )

    this.order_service.GetHistoryOrder().subscribe
    (
      (Response)=>
      {
        for(var oh of Response as OrderDisplay[])
        {
          this.history_order.push(oh);
        }
      },
      (error)=>
      {
        console.log(error);
      }
    )

  }


  // variables and object

  ongoing_order:OrderDisplay[]=[];
  history_order:OrderDisplay[]=[];


  //

  // Form and Method

  reviewform = new FormGroup({
    review:new FormControl(),
    rating:new FormControl()
  })

  Review_Submit(order:OrderDisplay)
  {
    let reviewform_value = this.reviewform.value;
    
    var review_rating:ReviewRating_Adding={
      reviewId:0,
      review: reviewform_value.review,
      rating: reviewform_value.rating,
      customerId: order.customer,
      providerId: order.provider,
      orderHistoryId: order.orderDisplayId,
      service: order.service,
      subService: order.subService
    }

    this.customer_service.AddReview(review_rating).subscribe
    (
      (Response)=>
      {
        console.log(Response);
      },
      (error)=>
      {
        console.log(error);
      }
    )
    

  }
}
