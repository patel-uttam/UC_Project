import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressDisplay } from '../Models/AddressDisplay';
import { CartDisplay } from '../Models/CartDisplay';
import { CartOrder } from '../Models/CartOrder';
import { CartService } from '../Services/cart.service';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-order-services',
  templateUrl: './order-services.component.html',
  styleUrls: ['./order-services.component.css']
})
export class OrderServicesComponent implements OnInit {

  constructor(private cart_service:CartService , private order_service:OrderService) { }

  ngOnInit(): void 
  {
    this.cart_service.GetCart().subscribe
    (
      (Response)=>
      {

        for(var c of Response as CartDisplay[])
        {
          this.carts.push(c as CartDisplay);
        }



        if(this.carts != null)
        {
          for(var c of this.carts)
          {
            if(c.category == 1)
            {
              this.Salon_For_Women_1.push(c);
            }
            else if(c.category == 2)
            {
              this.Hair_Services_For_Women_2.push(c);
            }
            else if(c.category == 3)
            {
              this.Salon_For_Men_3.push(c);
            }
            else if(c.category == 4)
            {
              this.Spa_For_Women_4.push(c);
            }
            else if(c.category == 5)
            {
              this.Massage_For_Men_5.push(c);
            }
            else if(c.category == 6)
            {
              this.Applicants_6.push(c);
            }
            else if(c.category == 7)
            {
              this.Plumbers_7.push(c);
            }
            else if(c.category == 8)
            {
              this.Electricians_8.push(c);
            }
            else if(c.category == 9)
            {
              this.Carpenters_9.push(c);
            }
            else if(c.category == 10)
            {
              this.Pest_Control_10.push(c);
            }
            else if(c.category == 11)
            {
              this.Cleaning_11.push(c);
            }
            else
            {
              console.log(c.category);
            }
          }
        }
      },
      (error)=>
      {
        console.log(error);
      }
    )

    if(localStorage.getItem("location") != null)
    {
      let json_location:any = localStorage.getItem("location");
      let loc:AddressDisplay[] = JSON.parse(json_location);
    
      if(loc.length != null)
      {
        for(var i=0;i<loc.length;i++)
        {
          this.locations.push(loc[i] as AddressDisplay); 
        }
      }
  
    }
  }

  // variables and object

    locations:AddressDisplay[]=[];

    carts:CartDisplay[] = [];

    // category wise cart
    Salon_For_Women_1:CartDisplay[] = [];
    Hair_Services_For_Women_2:CartDisplay[] = [];
    Salon_For_Men_3:CartDisplay[] = [];
    Spa_For_Women_4:CartDisplay[] = [];
    Massage_For_Men_5:CartDisplay[] = [];
    Applicants_6:CartDisplay[] = [];
    Plumbers_7:CartDisplay[] = [];
    Electricians_8:CartDisplay[] = [];
    Carpenters_9:CartDisplay[] = [];
    Pest_Control_10:CartDisplay[] = [];
    Cleaning_11:CartDisplay[] = [];


    // order cart 
    order_cart:CartDisplay[] = [];
    
    // total amount
    total_bill : number =0;
    convenience_fee :number =49;

    // Html elements   


  // 




  // function and form 

  Date_Time_Address_Form = new FormGroup({
      date : new FormControl('',[Validators.required]),
      time : new FormControl('',[Validators.required]),
      address : new FormControl('',[Validators.required])
  })


  // set services for place single order

  Add_to_order_cart(service:CartDisplay)
  {
    this.total_bill = 0;
    this.order_cart = [];
    
    this.order_cart.push(service);
    this.total_bill += (service.cost*service.qty)+this.convenience_fee;
    console.log(this.order_cart);
  }

  // set services for place all order of same category

  Add_to_order_carts(services:CartDisplay[])
  {
    this.total_bill = 0;

    this.order_cart = [];
    for(var s of services)
    {
      this.order_cart.push(s);
      this.total_bill += (s.cost*s.qty)+this.convenience_fee;
    } 
    console.log(this.order_cart);
  }

  // place final order for service

  OrderServices(services:CartDisplay[])
  {
    if(this.Date_Time_Address_Form.valid)
    {
      let date_time = this.Date_Time_Address_Form.value;

      let address_value:AddressDisplay = this.Date_Time_Address_Form.controls['address'].value;

      let final_order:CartOrder[]=[];
      for(var S of services)
      {
        let order:CartOrder = {cartId:S.cartId,customer:S.customer,category:S.category,service:S.service,SubService:S.subService,cost:S.cost,qty:S.qty,addressLine:address_value.addressLine,area:address_value.area,city:address_value.city};
        final_order.push(order);
      }

      this.order_service.Make_Order(final_order,date_time.date,date_time.time,this.convenience_fee).subscribe
      (
        (Response)=>
        {
            console.log(Response);
            alert("Order place for Service is sucess.");
        },
        (error)=>
        {
          alert("Order not place successfully \n Possibly provider in your area not available for now");
        }
      )
    }
  }


  // remove service from cart

  Remove_service(cartid:number)
  {
    this.cart_service.DeleteCart(cartid).subscribe
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

  // remove all services from cart 

  Remove_services()
  {
    this.cart_service.DeleteCartAll().subscribe
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


  // //
}
