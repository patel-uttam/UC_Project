import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/Models/Provider';
import { AdminService } from 'src/app/Services/admin.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/Models/Category';
import { country } from 'src/app/Models/Country';
import { state } from 'src/app/Models/State';
import { City } from 'src/app/Models/City';
import { Area } from 'src/app/Models/Area';
import { AddressServiceService } from 'src/app/Services/address-service.service';

@Component({
  selector: 'app-admin-provider',
  templateUrl: './admin-provider.component.html',
  styleUrls: ['./admin-provider.component.css']
})
export class AdminProviderComponent implements OnInit {

  constructor(private admin_service:AdminService , private category_service:CategoryService , private address_service:AddressServiceService) { }

  ngOnInit(): void 
  {
    this.category_service.GetCategories().subscribe
    (
      (Response)=>
      {
        for(var cat of Response as Category[])
        {
          this.categories.push(cat);
        }
      },
      (error)=>
      {
        console.log(error);
      }
    )

    this.admin_service.GetProviders().subscribe
    (
      (Response)=>
      {
        console.log(Response);
        for(var c of Response as Provider[])
        {
          this.providers.push(c as Provider);
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
  providers:Provider[]=[];
  
  categories:Category[]=[];
  
  provider:Provider = 
  { 
    providerId:0,
    userName:"",
    firstName:"",
    lastName:"",
    providerPhone:"",
    providerEmail:"",
    providerArea:"",
    providerCity:"",
    providerState:"",
    providerCountry:"",
    rating:0,
    category:0,
    isAvailable:true
  }

  countries:country[]=[];
  states:state[]=[];
  cities:City[]=[];
  areas:Area[]=[];

  // // 

  // function

  provider_data = new FormGroup({
    username : new FormControl({value:'', disabled: true}),
    firstname : new FormControl('',Validators.required),
    lastname : new FormControl('',  Validators.required),
    email : new FormControl({value:'', disabled: true}),
    phone : new FormControl({value:'', disabled: true}),
    area : new FormControl('',[Validators.required]),
    city : new FormControl('',[Validators.required]),
    state : new FormControl('',[Validators.required]),
    country : new FormControl('',[Validators.required]),
    category : new FormControl('',[Validators.required]),
    avabillity_status:new FormControl('',[Validators.required])
  });

  Set_Form(pr_data:Provider)
  {    
    this.provider.providerId = pr_data.providerId;
    this.provider.userName = pr_data.userName;
    this.provider.firstName = pr_data.firstName;
    this.provider.lastName = pr_data.lastName;
    this.provider.providerPhone = pr_data.providerPhone;
    this.provider.providerEmail = pr_data.providerEmail;
    this.provider.providerArea = pr_data.providerArea;
    this.provider.providerCity = pr_data.providerCity;
    this.provider.providerState = pr_data.providerState;
    this.provider.providerCountry = pr_data.providerCountry;
    this.provider.rating = pr_data.rating;
    this.provider.category = pr_data.category;
    this.provider.isAvailable = pr_data.isAvailable;

    this.provider_data.setValue({username:this.provider.userName,firstname:this.provider.firstName,lastname:this.provider.lastName ,email:this.provider.providerEmail,phone:this.provider.providerPhone,area:this.provider.providerArea,city:this.provider.providerCity,state:this.provider.providerState,country:this.provider.providerCountry,category:pr_data.category,avabillity_status:this.provider.isAvailable});
  }
  
  Update_Provider()
  {
    if(this.provider_data.valid && this.provider_data.dirty)
    {
      let pr_data = this.provider_data.value;
        
      this.provider.firstName = pr_data.firstname;
      this.provider.lastName = pr_data.lastname;
      this.provider.providerArea = pr_data.area;
      let city = this.provider_data.controls['city'].value;
      this.provider.providerCity = city.cityName;
      let state = this.provider_data.controls['state'].value;
      this.provider.providerState = state.stateName;
      let country = this.provider_data.controls['country'].value;
      this.provider.providerCountry = country.countryName;

      this.provider.category = pr_data.category;
      if(this.provider_data.controls['avabillity_status'].value == true)
      {
        this.provider.isAvailable = true;
      }
      else
      {
        this.provider.isAvailable = false;
      }
      
      console.log(this.provider);
      this.admin_service.UpdateProvider(this.provider).subscribe
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

  //

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
    this.cities=[];
    this.areas=[];

    let c = this.provider_data.controls['country'].value;
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
          }
          console.log(Response);
        }
      )  
    }
    else
    {
      this.states=[];
      this.cities=[];
      this.areas=[];
    }
  }

  OnChangeState(state:any)
  {
    this.cities=[];
    this.areas=[];
    
    let s = this.provider_data.controls['state'].value;
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

    let c = this.provider_data.controls['city'].value;
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
  //
  

}
