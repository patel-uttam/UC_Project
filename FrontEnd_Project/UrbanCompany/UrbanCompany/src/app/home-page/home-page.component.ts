import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import * as $  from 'jquery';
import { FormsModule } from '@angular/forms';
import { NgModel, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { CustomerService } from '../Services/customer.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent implements OnInit {

  constructor(private router : Router , private auth_service : AuthServiceService , private customer_service : CustomerService) 
  {
  }

  // variables,object define

  link="Login";
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
      // login_logout.innerHTML="LogOut";
      // profile.style.visibility=`visible`;
      // cart.style.visibility=`visible`;
      // booking.style.visibility=`visible`;
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
  
  //
  


/* ngOninit */

  ngOnInit(): void 
  {

    // login functionalty
        

    let login_logout = document.querySelector("#login_logout") as HTMLElement;
    let profile = document.querySelector("#profile") as HTMLElement;
    let cart = document.querySelector("#cart") as HTMLElement;
    let booking = document.querySelector("#booking") as HTMLElement;

    profile.style.visibility=`hidden`;
    cart.style.visibility=`hidden`;
    booking.style.visibility=`hidden`;

    if(this.auth_service.ExpireToken() == true)
    {
      this.link="Login";
      login_logout.innerHTML="Login/Sign Up";
      profile.style.visibility=`hidden`;
      cart.style.visibility=`hidden`;
      booking.style.visibility=`hidden`;
      this.auth_service.LogOut();
    }

    if(localStorage.getItem("Jwt") != null)
    {
      this.link="";
      login_logout.innerHTML="LogOut";
      profile.style.visibility=`visible`;
      cart.style.visibility=`visible`;
      booking.style.visibility=`visible`;


    } 

    //


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


    //     // first sider
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
