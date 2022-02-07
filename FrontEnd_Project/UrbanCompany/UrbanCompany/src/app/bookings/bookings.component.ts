import { Component, OnInit } from '@angular/core';
import { OrderDisplay } from '../Models/OrderDisplay';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor(private order_service : OrderService) { }

  ngOnInit(): void 
  {
    this.data.data1="asdfgh";
    this.data.data2="zxcvbb";

    this.order_service.GetOnGoingOrder().subscribe
    (
      (Response)=>
      {
        for(var oo of Response as OrderDisplay[])
        {
          console.log(oo as OrderDisplay);
          this.ongoing_order.push(oo);          
        }
        console.log(this.ongoing_order[1].customer);

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

  data={data1:"",data2:""};

  //
}
