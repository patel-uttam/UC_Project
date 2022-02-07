import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  constructor()
  {
    // localStorage.setItem("url","Home");
  }

  User = "";
  phone:number = 0;
  email ="";
  Pass = "";

  loginForm = new FormGroup({
    UserName : new FormControl('',[Validators.required,Validators.minLength(5)]),
    Password : new FormControl('',Validators.minLength(8))
  })

  SignupForm = new FormGroup({
    UserName : new FormControl('',[Validators.required,Validators.minLength(5)]),
    PhoneNumber : new FormControl('',[Validators.minLength(10),Validators.maxLength(10),Validators.min(7299999999)]),
    Email : new FormControl('',Validators.email),
    Password : new FormControl('',Validators.minLength(8))
  })


  Login()
  {
    this.User = this.loginForm.value[0];
    this.Pass  = this.loginForm.value[1];
    console.log(this.User+" "+this.Pass); 
  }

  Signup()
  {
    this.User = this.SignupForm.value[0];
    this.email = this.SignupForm.value[1];
    this.phone = this.SignupForm.value[2];
    this.Pass = this.SignupForm.value[3];
    console.log(this.User+" "+this.Pass); 
  }

  
  data = "initial";
  title = 'UrbanCompany';

}
