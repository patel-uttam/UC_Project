import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/Services/provider.service';
import { Provider } from 'src/app/Models/Provider'
import { CategoryService } from 'src/app/Services/category.service';
import { CustomerService } from 'src/app/Services/customer.service';


@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.css']
})
export class ProviderProfileComponent implements OnInit {

  constructor(private provider_service : ProviderService , private category_service : CategoryService , private router : Router) { }

  ngOnInit(): void 
  {
    var json:any = localStorage.getItem("data");
    var data = JSON.parse(json);
    var t:any = localStorage.getItem("Jwt");
    this.provider_service.GetProvider(data.CustomerName,t).subscribe
    (
      (Response)=>
      {
        const pr_data = (Response as Provider);
        let cty:string="";
        
        this.category_service.GetCategory(1).subscribe
        (
          (data)=>
          {
            cty = (<string>data);
            console.log(data);
          },
          (error)=>
          {
            console.log(error);
            cty=(error.text);
          }
        )
      
        this.provider.providerId = pr_data.providerId;
        this.provider.userName = pr_data.userName;
        this.provider.firstName = pr_data.firstName;
        this.provider.lastName = pr_data.lastName;
        this.provider.providerPhone = pr_data.providerPhone;
        this.provider.providerEmail = pr_data.providerEmail;
        this.provider.providerCity = pr_data.providerCity;
        this.provider.providerDistrict = pr_data.providerDistrict;
        this.provider.rating = pr_data.rating;
        this.provider.category = pr_data.category;

        this.provider_data.setValue({username:this.provider.userName,firstname:this.provider.firstName,lastname:this.provider.lastName ,email:this.provider.providerEmail,phone:this.provider.providerPhone,city:this.provider.providerCity,district:this.provider.providerDistrict,rating:this.provider.rating,category:cty});

        console.log(pr_data);
        console.log(this.provider);
      }
    )
  }

    // variables and objects

    provider:Provider = 
    { 
      providerId:0,
      userName:"",
      firstName:"",
      lastName:"",
      providerPhone:0,
      providerEmail:"",
      providerCity:"",
      providerDistrict:"",
      rating:0,
      category:0
    } 
  
    //
  
    // methods and Forms
    provider_data = new FormGroup({
      username : new FormControl({value: ' ', disabled: true}),
      firstname : new FormControl('',Validators.required),
      lastname : new FormControl('',  Validators.required),
      email : new FormControl({value: ' ', disabled: true}),
      phone : new FormControl({value: ' ', disabled: true}),
      city : new FormControl({value: ' ', disabled: true}),
      district : new FormControl({value: ' ', disabled: true}),
      rating : new FormControl({value: ' ', disabled: true}),
      category : new FormControl({value: ' ', disabled: true})
    });
  
    //
  

}
