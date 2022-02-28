import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/Services/provider.service';
import { Provider } from 'src/app/Models/Provider'
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/Models/Category';
import { AddressServiceService } from 'src/app/Services/address-service.service';
import { country } from 'src/app/Models/Country';
import { state } from 'src/app/Models/State';
import { City } from 'src/app/Models/City';
import { Area } from 'src/app/Models/Area';


@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.css']
})
export class ProviderProfileComponent implements OnInit {

  constructor(private provider_service : ProviderService , private category_service : CategoryService , private address_service:AddressServiceService , private router : Router) { }

  ngOnInit(): void 
  {
    this.json = localStorage.getItem("data");
    this.data = JSON.parse(this.json);
    this.t = localStorage.getItem("Jwt");

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

    console.log(this.categories);

    this.provider_service.GetProvider(this.data.CustomerName,this.t).subscribe
    (
      (Response)=>
      {
        const pr_data = (Response as Provider);
              
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

        console.log(pr_data);
        console.log(this.provider);
      }
    )

    this.GetCountries();
  }

    // variables and objects

    json:any;
    data:any;
    t:any;
    cty:string="";
    
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
    //
  
    // methods and Forms

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
  
    Update_Provider()
    {
      if(this.provider_data.valid && this.provider_data.dirty)
      {
        let pr_data = this.provider_data.value;
        console.log(pr_data);
        
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
        this.provider_service.UpdateProvider(this.provider).subscribe
        (
          (data)=>
          {
            console.log(data);
            this.provider_service.GetProvider(this.provider.userName,this.t).subscribe
            (
              (Response)=>
              {
                const pr_data = (Response as Provider);       
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
                console.log(this.provider);
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
