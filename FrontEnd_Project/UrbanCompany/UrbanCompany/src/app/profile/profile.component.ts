import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Base } from '../Models/BaseUrl';
import { Customer } from '../Models/Customer';
import { CustomerService } from '../Services/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private service:CustomerService) 
  {

  }

  
  ngOnInit(): void 
  {
    this.json = localStorage.getItem("data");
    this.data = JSON.parse(this.json);
    this.t = localStorage.getItem("Jwt");
    
    this.service.GetCustomer(this.data.CustomerName,this.t).subscribe
    (
      (Response)=>
      {
        const cust_data = (Response as Customer);
        this.customer_data.setValue({username:cust_data.customerName,email:cust_data.customerEmail,phone:cust_data.customerPhone,address:cust_data.customerAddress1,city:cust_data.customerCity,district:cust_data.customerDistrict})
        
        this.customer.customerId = cust_data.customerId;
        this.customer.customerName = cust_data.customerName;
        this.customer.customerPhone = cust_data.customerPhone;
        this.customer.customerEmail = cust_data.customerEmail;
        this.customer.customerAddress1 = cust_data.customerAddress1;
        this.customer.customerCity = cust_data.customerCity;
        this.customer.customerDistrict = cust_data.customerDistrict;
        console.log(this.customer)
      }
    )

  }


  // variables and objects

  customer:Customer = 
  { 
    customerId:0,
    customerName:"",
    customerPhone:"",
    customerEmail:"",
    customerAddress1:"",
    customerCity:"",
    customerDistrict:""
  } 

  json:any
  data:any
  t:any
  //

  // methods and Forms

  customer_data = new FormGroup({
    username : new FormControl({value:'',disabled: true}),
    email : new FormControl({value:'',disabled: true}),
    phone : new FormControl({value:'',disabled: true}),
    address : new FormControl('',[Validators.required]),
    city : new FormControl('',[Validators.required]),
    district : new FormControl('',[Validators.required])
  });

  
  Update_Customer()
  {
    if(this.customer_data.valid && this.customer_data.dirty)
    {
      let cust_data = this.customer_data.value;

      this.customer.customerAddress1 = cust_data.address;
      this.customer.customerCity = cust_data.city;
      this.customer.customerDistrict = cust_data.district;

      console.log(this.customer);
      this.service.UpdateCustomer(this.customer).subscribe
      (
        
        data=>
        {
          
          console.log(data);
          this.service.GetCustomer(this.data.CustomerName,this.t).subscribe
    (
      (Response)=>
      {
        const cust_data = (Response as Customer);
        this.customer_data.setValue({username:cust_data.customerName,email:cust_data.customerEmail,phone:cust_data.customerPhone,address:cust_data.customerAddress1,city:cust_data.customerCity,district:cust_data.customerDistrict})
        
        this.customer.customerId = cust_data.customerId;
        this.customer.customerName = cust_data.customerName;
        this.customer.customerPhone = cust_data.customerPhone;
        this.customer.customerEmail = cust_data.customerEmail;
        this.customer.customerAddress1 = cust_data.customerAddress1;
        this.customer.customerCity = cust_data.customerCity;
        this.customer.customerDistrict = cust_data.customerDistrict;
        console.log(this.customer)
      }
    )
        },
        (error)=>
        {
          console.log(error);
        }
      );

    }
  }

  //

}
