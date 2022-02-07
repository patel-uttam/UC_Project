import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule , FormGroup , FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as $ from 'jquery'; 
import { AuthServiceService } from '../Services/auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router , private auth_service : AuthServiceService) 
  { }

  
  ngOnInit()
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
}

// variables and object
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
    this.link="";
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


// //


}
