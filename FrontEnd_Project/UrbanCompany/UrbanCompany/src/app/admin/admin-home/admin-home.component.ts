import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Area } from 'src/app/Models/Area';
import { Category } from 'src/app/Models/Category';
import { City } from 'src/app/Models/City';
import { country } from 'src/app/Models/Country';
import { service } from 'src/app/Models/Services';
import { state } from 'src/app/Models/State';
import { subservice } from 'src/app/Models/SubService';
import { AddressServiceService } from 'src/app/Services/address-service.service';
import { AdminService } from 'src/app/Services/admin.service';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private auth_service:AuthServiceService , private admin_service:AdminService , private category_service:CategoryService , private address_service : AddressServiceService , private router:Router)
  { 

  }

  ngOnInit(): void
  {
    if(this.auth_service.ExpireToken() == true)
    {
      this.auth_service.LogOut();
      this.router.navigate(['Admin/Login']);
    }

    if(localStorage.getItem("Jwt") != null)
    {
      //to fetch categories 
      this.category_service.GetCategories().subscribe
      (
        (Response)=>
        {
          for(var cat of Response as Category[])
          {
            this.Categories.push(cat as Category);
            this.Categories.sort();
            
          }
          console.log(this.Categories);
        },
        (error)=>
        {
          console.log(error);
        }
      )

      // to fetch services
      this.category_service.GetServices().subscribe
      (
        (Response)=>
        {
          for(var cat of Response as service[])
          {
            this.Services.push(cat as service);
            this.Services.sort();
          }
        },
        (error)=>
        {
          console.log(error);
        }
      )

      // to fetch subservices
      this.category_service.GetSubServices().subscribe
      (
        (Response)=>
        {
          for(var cat of Response as subservice[])
          {
            this.SubServices.push(cat as subservice);
            this.SubServices.sort();
          }
        },
        (error)=>
        {
          console.log(error);
        }
      )

      // to fetch country 
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

  }

  // variables and object


  // data field for country ,state , acity ,area
    countries:country[]=[];
    states:state[]=[];
    cities:City[]=[];
    areas:Area[]=[];
    states_for_city:state[]=[];
    states_for_area:state[]=[];
    cities_for_area:City[]=[];

  // data field for category , service , sub service
    Categories:Category[]=[];
    Services:service[]=[];
    SubServices:subservice[]=[];

    category:Category={
      categoryId: 0,
      categoryName: '',
      logoImg: '',
      bgImg: '',
      description: ''
    }

    service:service={
      serviceId: 0,
      serviceName: '',
      categoryId: 0,
      rating: 0
    }

    subservice:subservice={
      subServiceId: 0,
      subServiceName: '',
      serviceId: 0,
      cost: 0,
      discount: 0,
      serviceTime: 0,
      img1: '',
      img2: '',
      img3: '',
      rating: 0,
      details: ''
    }
  
    // define for image
    Category_logo:any;
    Category_bg:any;
  
  // //



  // form

  // add new category
  Add_category = new FormGroup({
    categoryname:new FormControl('',[Validators.required]),
    logoimg:new FormControl(),
    bgimg:new FormControl(),
    description:new FormControl()
  });

  // add new service
  Add_service = new FormGroup({
    servicename:new FormControl('',[Validators.required]),
    category:new FormControl('',[Validators.required]), 
  });

  // add new subservice
  Add_subservice = new FormGroup({
    subservicename:new FormControl('',[Validators.required]),
    service:new FormControl('',[Validators.required]),
    cost:new FormControl('',[Validators.required]),
    discount:new FormControl(),
    servicetime:new FormControl(),
    img1:new FormControl(),
    img2:new FormControl(),
    img3:new FormControl(),
    detail:new FormControl()
  })

  // Update Category
  Update_category = new FormGroup({
    categoryname:new FormControl({value:'',disabled:true}),
    logoimg:new FormControl(),
    bgimg:new FormControl(),
    description:new FormControl()
  });

  // update subservice
  Update_subservice = new FormGroup({
    subservicename:new FormControl({value:'',disabled:true}),
    service:new FormControl({value:'',disabled:true}),
    cost:new FormControl('',Validators.required),
    discount:new FormControl(),
    servicetime:new FormControl(),
    img1:new FormControl(),
    img2:new FormControl(),
    img3:new FormControl(),
    detail:new FormControl()
  })

  Add_country = new FormGroup({
    countryname:new FormControl('',Validators.required)
  })

  Add_state = new FormGroup({
    statename:new FormControl('',Validators.required),
    country:new FormControl('',Validators.required)
  })

  Add_city = new FormGroup({
    cityname:new FormControl('',Validators.required),
    state:new FormControl('',Validators.required),
    country:new FormControl('',Validators.required)
  })

  Add_area = new FormGroup({
    areaname:new FormControl('',Validators.required),
    pincode:new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(6)]),
    city:new FormControl('',Validators.required),
    state:new FormControl('',Validators.required),
    country:new FormControl('',Validators.required)
  })

  //



  // methods

  // for upload img
  UpdatePreviewImg(event:Event)
{

  let img:any = (event.target as HTMLInputElement).files;

  
  if((event.target as HTMLInputElement).id=="cat_input2" || (event.target as HTMLInputElement).id=="cat_input2")
  {    

    this.Category_logo = img as File;
  }
  else if((event.target as HTMLInputElement).id=="cat_input3")
  {
    this.Category_bg = img as File;
  }
  console.log("logo" , this.Category_logo , "bg" , this.Category_bg);
  console.log("Update_Category" , this.Update_category.value)
  img = null;
}
  


  // set value to category form
  Set_Category(category:Category)
  {
    console.log(category);
    this.Update_category.reset;
    this.category = category as Category;
  }

  // update categroy
  Update_Category()
  {
    if(this.Update_category.valid && this.Update_category.dirty)
    {
      let form_value = this.Update_category.value;
      
      this.category.logoImg = form_value.logoimg;
      this.category.bgImg = form_value.bgimg;
      this.category.description = form_value.description;
      console.log(this.category);
      
      this.admin_service.Update_Category(this.category,this.Category_logo as File,this.Category_bg as File).subscribe
      (
        (Response)=>
        {
          alert("Category updated successful");
        },
        (error)=>
        {
          console.log(error);
        }
      )
      
    }
  }

  // set values to subservice form
  Set_SubService(ss:subservice)
  {
    console.log(ss);
    this.Update_subservice.setValue({subservicename:ss.subServiceName,service:ss.serviceId,cost:ss.cost,discount: ss.discount ,servicetime: ss.serviceTime ,img1: ss.img1,img2: ss.img2,img3: ss.img3,detail: ss.details});
    this.subservice = ss as subservice;
  }

  // update subservice
  Update_SubService()
  {
    if(this.Update_subservice.valid && this.Update_subservice.dirty)
    {
      let form_value = this.Update_subservice.value;

      this.subservice.cost=form_value.cost;
      this.subservice.discount=form_value.discount;
      this.subservice.serviceTime=form_value.servicetime;
      this.subservice.img1=form_value.img1;
      this.subservice.img2=form_value.img2;
      this.subservice.img3=form_value.img3;
      this.subservice.details=form_value.detail;

      console.log(this.subservice);
      this.admin_service.Update_SubService(this.subservice).subscribe
      (
        (Response)=>
        {
          console.log(Response);
          alert("Sub Service Updated successful");
        },
        (error)=>
        {
          console.log(error);
        }
      )
    }
  }


  // add new category

  Add_Category()
  {
    let form_value = this.Add_category.value;

    let category:Category={
      categoryId: 0,
      categoryName: form_value.categoryname,
      logoImg: form_value.logoimg,
      bgImg: form_value.bgimg,
      description: form_value.description
    }
    this.admin_service.Add_Category(category,this.Category_logo as File,this.Category_bg as File).subscribe
    (
      (Response)=>
      {
        if(Response == true)
        {
          alert("Category added successful");
        }
        else
        {
          alert("Category not created successfully");
        }

      },
      (error)=>
      {
        console.log(error);
      }
    )
  }

  // add new service

  Add_Service()
  {
    let form_value = this.Add_service.value;
    let service:service={
      serviceId: 0,
      serviceName: form_value.servicename,
      categoryId: form_value.category,
      rating: 0
    }
    this.admin_service.Add_Service(service).subscribe
    (
      (Response)=>
      {
        alert("Service added successful");
      },
      (error)=>
      {
        console.log(error);
      }
    )
  }

  // add new sub service
  Add_SubService()
  {
    let form_value = this.Add_subservice.value;

    let subservice:subservice={
      subServiceId: 0,
      subServiceName: form_value.subservicename,
      serviceId: form_value.service,
      cost: form_value.cost,
      discount: form_value.discount,
      serviceTime: form_value.servicetime,
      img1: form_value.img1,
      img2: form_value.img2,
      img3: form_value.img3,
      rating: 0,
      details: form_value.detail
    };
    console.log(form_value);
    this.admin_service.Add_SubService(subservice).subscribe
    (
      (Response)=>
      {
        alert("Sub Service added successful");
      },
      (error)=>
      {
        console.log(error);
      }
    )
  }

  // Add Country

  Add_Country()
  {
    let form_value = this.Add_country.value;

    let new_country:string = form_value.countryname;
    console.log(new_country);
    this.address_service.AddCountries(new_country).subscribe
    (
      (Response)=>
      {
        alert("country added successful");
      },
      (error)=>
      {
        console.log(error);
      }
    )

  }
  // Add State
  Add_State()
  {
    let form_value = this.Add_state.value;

    let new_state:state = {
      stateId: 0,
      stateName: form_value.statename,
      countryId: form_value.country
    };
    this.address_service.AddStates(new_state).subscribe
    (
      (Response)=>
      {
        alert("state added successful");
      },
      (error)=>
      {
        console.log(error);
      }
    )

  }
  // Add City
  Add_City()
  {
    let form_value = this.Add_city.value;

    let new_city:City ={
      cityId: 0,
      cityName: form_value.cityname,
      stateId: form_value.state
    } ;
    this.address_service.AddCities(new_city).subscribe
    (
      (Response)=>
      {
        alert("city added successful");
      },
      (error)=>
      {
        console.log(error);
      }
    )
  }
  // Add Area
  Add_Area()
  {
    let form_value = this.Add_area.value;

    let new_area:Area={
      areaId: 0,
      areaName: form_value.areaname,
      pinCode: form_value.pincode,
      cityId: form_value.city
    };
    this.address_service.AddAreas(new_area).subscribe
    (
      (Response)=>
      {
        alert("area added successful");
      },
      (error)=>
      {
        console.log(error);
      }
    )
  }

  // //



  OnChangeCountry_for_city(country:any)
  {
    this.states_for_city=[];

    let s = this.Add_city.controls['country'].value;
    let countryId:number = s as number;
    if(countryId)
    {
      this.address_service.GetStates(countryId).subscribe
      (
        (Response)=>
        {
          for(var c of Response as state[])
          {
            this.states_for_city.push(c as state);
          }
          console.log("state" , Response);
        }
      )  
    }
    else
    {
      this.states_for_city=[];
    }
  }


  OnChangeCountry_for_area(country:any)
  {
    this.states_for_area=[];
    this.cities_for_area=[];

    let s = this.Add_area.controls['country'].value;
    let countryId:number = s as number;
    if(countryId)
    {
      this.address_service.GetStates(countryId).subscribe
      (
        (Response)=>
        {
          for(var c of Response as state[])
          {
            this.states_for_area.push(c as state);
          }
          console.log(Response);
        }
      )  
    }
    else
    {
      this.states_for_area=[];
      this.cities_for_area=[];

    }
  }

  OnChangeState_for_area(state:any)
  {
    this.cities_for_area=[];
    
    let s = this.Add_area.controls['state'].value;
    let stateId:number = s as number;
    if(stateId)
    {
      this.address_service.GetCities(stateId).subscribe
      (
        (Response)=>
        {
          for(var c of Response as City[])
          {
            this.cities_for_area.push(c as City);
          }
          console.log(Response);
        }
      )  
    }
    else
    {
      this.cities_for_area=[];
    }  
  }

}
