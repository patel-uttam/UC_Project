import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/Models/Customer';
import { AdminService } from 'src/app/Services/admin.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { country } from 'src/app/Models/Country';
import { state } from 'src/app/Models/State';
import { City } from 'src/app/Models/City';
import { Area } from 'src/app/Models/Area';
import { AddressServiceService } from 'src/app/Services/address-service.service';


@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.css']
})
export class AdminCustomerComponent implements OnInit {

  constructor(private admin_service:AdminService , private address_service:AddressServiceService) { }

  ngOnInit(): void 
  {

    this.admin_service.GetCustomers().subscribe
    (
      (Response)=>
      {
        console.log(Response);
        for(var c of Response as Customer[])
        {
          this.customers.push(c as Customer);
        }
      },
      (error)=>
      {
        console.log(error);
      }
    )
    this.GetCountries();

  }

  // variables
  customers:Customer[]=[];
  
  customer:Customer = 
  { 
    customerId:0,
    customerName:"",
    customerPhone:"",
    customerEmail:"",
    customerAddress1:"",
    customerArea1:"",
    customerCity1:"",
    customerState1:"",
    customerAddress2:"",
    customerArea2:"",
    customerCity2:"",
    customerState2:"",
    customerCountry:"",
  };

  countries:country[]=[];
  states:state[]=[];
  cities:City[]=[];
  areas:Area[]=[];

  states2:state[]=[];
  cities2:City[]=[];
  areas2:Area[]=[];

  // // 

  // function

  customer_data = new FormGroup({
    username : new FormControl({value:'',disabled: true}),
    email : new FormControl({value:'',disabled: true}),
    phone : new FormControl({value:'',disabled: true}),
    address1 : new FormControl('',[Validators.required]),
    area1 : new FormControl('',[Validators.required]),
    city1 : new FormControl('',[Validators.required]),
    state1 : new FormControl('',[Validators.required]),
    address2 : new FormControl(''),
    area2 : new FormControl(''),
    city2 : new FormControl(''),
    state2 : new FormControl(''),
    country : new FormControl(''),
  });


  Set_Form(cust_data:Customer)
  {
    this.customer_data.setValue({username:cust_data.customerName,email:cust_data.customerEmail,phone:cust_data.customerPhone,address1:cust_data.customerAddress1,area1:cust_data.customerArea1,city1:cust_data.customerCity1,state1:cust_data.customerState1,address2:cust_data.customerAddress2,area2:cust_data.customerArea2,city2:cust_data.customerCity2,state2:cust_data.customerState2,country:cust_data.customerCountry})
              
    this.customer.customerId = cust_data.customerId;
    this.customer.customerName = cust_data.customerName;
    this.customer.customerPhone = cust_data.customerPhone;
    this.customer.customerEmail = cust_data.customerEmail;

    this.customer.customerAddress1 = cust_data.customerAddress1;
    this.customer.customerArea1 = cust_data.customerArea1;
    this.customer.customerCity1 = cust_data.customerCity1;
    this.customer.customerState1 = cust_data.customerState1;

    this.customer.customerAddress2 = cust_data.customerAddress2;
    this.customer.customerArea2 = cust_data.customerArea2;
    this.customer.customerCity2 = cust_data.customerCity2;
    this.customer.customerState2 = cust_data.customerState2;

    this.customer.customerCountry = cust_data.customerCountry;
    console.log(this.customer);
    
  }
  
  Update_Customer()
  {
    if(this.customer_data.valid)
    {

      let cust_data = this.customer_data.value;

      this.customer.customerAddress1 = cust_data.address1;
      this.customer.customerArea1 = cust_data.area1;
      
      let city1 = this.customer_data.controls['city1'].value;
      this.customer.customerCity1 = city1.cityName;
      let state1 = this.customer_data.controls['state1'].value;
      this.customer.customerState1 = state1.stateName;

      this.customer.customerAddress2 = cust_data.address2;
      this.customer.customerArea2 = cust_data.area2;

      if(this.customer_data.controls['city2'].value != null)
      {
        let city2 = this.customer_data.controls['city2'].value;
        this.customer.customerCity2 = city2.cityName;
        let state2 = this.customer_data.controls['state2'].value;
        this.customer.customerState2 = state2.stateName;  
      }

      let country = this.customer_data.controls['country'].value;
      this.customer.customerCountry = country.countryName;

      console.log(this.customer);
      this.admin_service.UpdateCustomer(this.customer).subscribe
      (
        
        (Response)=>
        {
          console.log(Response);
        },
        (error)=>
        {
          console.log(error);
        }
      );

    }
  }

  // //

    // methd for fetching countries , states , cities ,areas

    GetCountries()
    {
      this.address_service.GetCountries().subscribe
      (
        (Response)=>
        {
          for(var c of Response as country[])
          {
            this.countries.push(c as country);
          }
          console.log("get country" , this.countries);
        }
      )
    }
  
    OnChangeCountry(country:any)
    {
      this.states=[];
      this.states2=[];
      this.cities=[];
      this.cities2=[];
      this.areas=[];
      this.areas2=[];
  
      let c = this.customer_data.controls['country'].value;
      console.log("c" , c);
      let countryId:number = c.countryId;
      if(countryId)
      {
        this.address_service.GetStates(countryId).subscribe
        (
          (Response)=>
          {
            for(var c of Response as state[])
            {
              this.states.push(c as state);
              this.states2.push(c as state);
            }
            console.log(Response);
          }
        )  
      }
      else
      {
        this.states=[];
        this.states2=[];
        this.cities=[];
        this.cities2=[];
        this.areas=[];
        this.areas2=[];
      }
    }
  
    OnChangeState(state:any)
    {
      this.cities=[];
      this.areas=[];
      
      let s = this.customer_data.controls['state1'].value;
      let stateId:number = s.stateId;
      if(stateId)
      {
        this.address_service.GetCities(stateId).subscribe
        (
          (Response)=>
          {
            for(var c of Response as City[])
            {
              this.cities.push(c as City);
            }
            console.log(Response);
          }
        )  
      }
      else
      {
        this.cities=[];
        this.areas=[];
      }  
    }
  
    OnChangeCity(city:any)
    {
      this.areas=[];
  
      let c = this.customer_data.controls['city1'].value;
      let cityId:number = c.cityId;
      if(cityId)
      {
        this.address_service.GetAreas(cityId).subscribe
        (
          (Response)=>
          {
            for(var c of Response as Area[])
            {
              this.areas.push(c as Area);
            }
            console.log(Response);
          }
        )  
      }
      else
      {
        this.areas=[];
      }  
    }
  
  
    
  
    OnChangeState2(state:any)
    {
      this.cities2=[];
      this.areas2=[];
      
      let s = this.customer_data.controls['state2'].value;
      let stateId = s.stateId;
      if(stateId)
      {
        this.address_service.GetCities(stateId).subscribe
        (
          (Response)=>
          {
            for(var c of Response as City[])
            {
              this.cities2.push(c as City);
            }
            console.log(Response);
          }
        )  
      }
      else
      {
        this.cities2=[];
        this.areas2=[];
      }  
    }
  
    OnChangeCity2(city:any)
    {
      this.areas2=[];
  
      let c = this.customer_data.controls['city2'].value;
      let cityId = c.cityId;
      if(cityId)
      {
        this.address_service.GetAreas(cityId).subscribe
        (
          (Response)=>
          {
            for(var c of Response as Area[])
            {
              this.areas2.push(c as Area);
            }
            console.log(Response);
          }
        )  
      }
      else
      {
        this.areas2=[];
      }  
    }
    
  //
}
