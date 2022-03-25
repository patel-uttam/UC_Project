import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import * as $  from 'jquery';
import { FormsModule } from '@angular/forms';
import { NgModel, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { Category } from '../Models/Category'
import { CategoryService } from '../Services/category.service';
import { AddressServiceService } from '../Services/address-service.service';
import { AddressDisplay } from '../Models/AddressDisplay';
import { SearchFilter } from '../Models/SearchFilter';
import { FilterServiceService } from '../Services/filter-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent implements OnInit {

  constructor(private router : Router , private activatedroute : ActivatedRoute , private auth_service : AuthServiceService ,private category_service:CategoryService , private address_service:AddressServiceService , private searchfilter:FilterServiceService) 
  {
  }

  // variables,object define

  link="Login";
  selected_location:string="Gota";
  selected_pin:string="";
  location:AddressDisplay={addressLine:"",country:"",state:"",city:"",area:"",pincode:0};
  locations:AddressDisplay[]=[];
  categories:Category[]=[]
  searchresult:SearchFilter[]=[];
  //

  // Function
  
  Login_Logout()
  {
    let login_logout = document.querySelector("#login_logout") as HTMLElement;
    let profile = document.querySelector("#profile") as HTMLElement;
    let cart = document.querySelector("#cart") as HTMLElement;
    let booking = document.querySelector("#booking") as HTMLElement;

    if(this.link == "Login")
    {
      this.router.navigate(['Login']);      
    }
    else
    {
      this.auth_service.LogOut();
      this.link="Login";
      login_logout.innerHTML="Login/Sign Up";
      profile.style.visibility=`hidden`;
      cart.style.visibility=`hidden`;
      booking.style.visibility=`hidden`;
      
    }

  }

  // fetching Addresses

  Addresses()
  {
    this.address_service.GetAddresses().subscribe
    (
      (Response)=>
      {
        console.log(Response);
        for(var loc of Response as AddressDisplay[])
        {
          this.locations.push(loc as AddressDisplay);
        }
        this.location.area = this.locations[0].area;
        this.location.country = this.locations[0].country;
        this.location.state = this.locations[0].state;
        this.location.city = this.locations[0].city;
        this.location.pincode = this.locations[0].pincode;
      },
      (error)=>
      {
        console.log(error);
      }
    );
    console.log(this.location);
  }

  // fetching categories
  // GetCategories()
  // {
  //   this.category_service.GetCategories().subscribe
  //   (
  //     (Response)=>
  //     { 
  //       for(var category of Response as Category[])
  //       {
  //         this.categories.push(category as Category)
  //       }
  //     },
  //     (error)=>
  //     {
  //       console.log(error);
  //     }
  //   );
  // }

  // check is logging session expire
  IFLogout()
  {
    let login_logout = document.querySelector("#login_logout") as HTMLElement;
    let profile = document.querySelector("#profile") as HTMLElement;
    let cart = document.querySelector("#cart") as HTMLElement;
    let booking = document.querySelector("#booking") as HTMLElement;

    if(this.auth_service.ExpireToken() == true)
    {
      this.link="Login";
      login_logout.innerHTML="Login/Sign Up";
      profile.style.visibility=`hidden`;
      cart.style.visibility=`hidden`;
      booking.style.visibility=`hidden`;
      this.auth_service.LogOut();
    }  
  }  

  // if user logging
  IfLogging()
  {
    let login_logout = document.querySelector("#login_logout") as HTMLElement;
    let profile = document.querySelector("#profile") as HTMLElement;
    let cart = document.querySelector("#cart") as HTMLElement;
    let booking = document.querySelector("#booking") as HTMLElement;

    if(localStorage.getItem("Jwt") != null)
    {
      this.link="";
      login_logout.innerHTML="LogOut";
      profile.style.visibility=`visible`;
      cart.style.visibility=`visible`;
      booking.style.visibility=`visible`;

      let json_location:any = localStorage.getItem("location");
      let loc = JSON.parse(json_location);

      if(loc != null)
      {
        if(loc[0] != null)
        {
          this.selected_location = loc[0].city;
          for(var L of loc as AddressDisplay[])
          {
            this.locations.push(L as AddressDisplay);
          }
          console.log(this.locations);
        }
      }
      else
      {
        this.Addresses();
      }
    }
    else
    {
      this.Addresses();
    }
  }

  SearchResult(event:Event)
  {
    let value:string = (event.target as HTMLInputElement).value;
    (event.target as HTMLInputElement).value
    this.searchfilter.GetSearchResult(value).subscribe
    (
      (Response)=>
      {
        this.searchresult = Response as SearchFilter[];
      },
      (error)=>
      {
        console.log(error);
      }
    );
  }
  
  // //
  


/* ngOninit */

  ngOnInit(): void 
  {

    // login functionalty
    let profile = document.querySelector("#profile") as HTMLElement;
    let cart = document.querySelector("#cart") as HTMLElement;
    let booking = document.querySelector("#booking") as HTMLElement;
    profile.style.visibility=`hidden`;
    cart.style.visibility=`hidden`;
    booking.style.visibility=`hidden`;
    
    // //categories
    // this.GetCategories();

    this.categories = this.activatedroute.snapshot.data['categories'] as Category[];

    //logout
    this.IFLogout();
    //logging
    this.IfLogging();



    // jquery & script
    (function($)
    {
      $(document).ready(()=>
      {
        $('.navscroll').hide();
        
        $(window).scroll(()=>
        {
          if(window.scrollY>850)
          {
              $(".navscroll").fadeIn();
          }
          else
          {
            $(".navscroll").fadeOut();
          }
        });
      });
    }(jQuery));


    // first sider
    var prev = document.querySelector('.prev') as HTMLElement;
    var next = document.querySelector('.next') as HTMLElement;

    const track = document.querySelector('.track') as HTMLElement;
    var carouselcontainerwidth = document.querySelector('.carousel-container')?.clientWidth as number;

    let nextWidth=288;
    let prevWidth=0;
    prev.style.visibility= `hidden`;
    next.addEventListener('click',
    () =>
    {
        if(nextWidth <= 2304)
        {
            if(nextWidth+288 >= 2304)
            {
                next.style.visibility= `hidden`;
            }
            track.style.transform = `translateX(-${nextWidth}px)`;
            prevWidth = nextWidth;
            nextWidth += 288;
            prev.style.visibility= `visible`;

            
        }
        else
        {
            next.style.visibility= `hidden`;
        }
    })

    prev.addEventListener('click',
    () =>
    {

        if(prevWidth >= 0 )
        {
            if(prevWidth <=288)
            {
                prevWidth = 0;
                prev.style.visibility= `hidden`;
            }
            else
            {
                prevWidth -= 288;
                next.style.visibility= `visible`;
            }
            track.style.transform = `translateX(-${prevWidth}px)`;
            nextWidth = prevWidth+288;
        }
    })

  }

////////////////////////////////////////////////////////////////////////////////////////////////////////

}
