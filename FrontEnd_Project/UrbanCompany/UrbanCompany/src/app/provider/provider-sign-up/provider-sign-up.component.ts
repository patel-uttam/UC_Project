import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUp } from '../../Models/signup';
import { Login } from '../../Models/login';
import { AuthServiceService } from '../../Services/auth-service.service';
import { SignUpService } from '../../Services/sign-up.service';
import { ProviderService } from '../../Services/provider.service';

@Component({
  selector: 'app-provider-sign-up',
  templateUrl: './provider-sign-up.component.html',
  styleUrls: ['./provider-sign-up.component.css']
})
export class ProviderSignUpComponent implements OnInit {

  constructor(private router : Router , private service : SignUpService , private login_service : AuthServiceService , private provider_service : ProviderService) { }

  ngOnInit(): void 
  { 
    let signup_error = document.getElementById("SignUp_error") as HTMLElement;
    signup_error.style.visibility=`hidden`;
  }


  // variables and object define
  
  totalprovider:number=3000;
  totalpaid:number=1234567856654;
  totaldelivered:number=700000;

  signup_data:SignUp = {username:"",email:"",phonenumber:"",password:""};

  cred:Login={username:"",password:""};

  //

  
  SignupForm = new FormGroup({
    UserName : new FormControl('',[Validators.required,Validators.minLength(5)]),
    PhoneNumber : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    Email : new FormControl('',[Validators.required,Validators.email]),
    PassWord : new FormControl('',[Validators.required,Validators.minLength(7),Validators.maxLength(16)])
  });

  ProfileForm = new FormGroup({
    Address : new FormControl('',[Validators.required]),
    City : new FormControl('',[Validators.required]),
    District : new FormControl('',[Validators.required])
  });

  Signup()
  {
    if(this.SignupForm.valid)
    {

      let values = this.SignupForm.value;
      
      this.signup_data.username = values.UserName;
      this.signup_data.email = values.Email;
      this.signup_data.phonenumber = values.PhoneNumber.toString();
      this.signup_data.password = values.PassWord;

      this.service.Provider_SignUp(this.signup_data).subscribe
      (
        (Response)=>
        {
          const sts = (<any>Response).status;
          if(sts == 200)
          {
            this.cred.username = this.signup_data.username;
            this.cred.password = this.signup_data.password;

            this.login_service.Logging(this.cred).subscribe(
              async (Response)=>
              {
                const sts = Response.status;
                if(sts == 200)
                {
                  const token = Response.token;
                  localStorage.setItem("Jwt",token);
                  localStorage.setItem("e_year",Response.expiration_year);
                  localStorage.setItem("e_month",Response.expiration_month);
                  localStorage.setItem("e_day",Response.expiration_day);
                  localStorage.setItem("e_hour",Response.expiration_hour);
                  localStorage.setItem("e_minute",Response.expiration_minute);
                  localStorage.setItem("e_second",Response.expiration_second);

                  let payload = JSON.parse(atob(token.split('.')[1]));

                  await this.provider_service.GetProvider(payload.username,token).subscribe
                  (
                    (Response)=>
                    {
                      const cust_data:object= {           
                        CustomerId : (<any>Response).providerId,
                        CustomerName : (<any>Response).userName,
                      }
                      localStorage.setItem("data",JSON.stringify(cust_data));
                    }
                  )

                  this.router.navigate(['Profile']);
                }
                // console.log(Response);
              })

            
          }
        },
        (error)=>
        {
          this.SignupForm.setValue({UserName:null,PhoneNumber:null,Email:null,PassWord:null});
          console.log(error.status);
          let signup_error = document.getElementById("SignUp_error") as HTMLElement;
          if(error.status == 302)
          {
            signup_error.style.visibility=`visible`;
            signup_error.innerHTML = "UserName is already taken, Use Unique one.. ";
          }
          else if(error.status == 500)
          {
            signup_error.style.visibility=`visible`;
            signup_error.innerHTML = "Registration not Complete Or Email is Taken Already";
          }
          else
          {
            signup_error.style.visibility=`visible`;
            signup_error.innerHTML = "..Issue while Registration";
          }
        }
      );      
    }

  }
}
