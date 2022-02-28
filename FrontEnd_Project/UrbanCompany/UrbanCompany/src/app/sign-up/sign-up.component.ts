import { Component, OnInit ,OnChanges } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUp } from '../Models/signup';
import { Login } from '../Models/login';
import { AuthServiceService } from '../Services/auth-service.service';
import { SignUpService } from '../Services/sign-up.service';
import { CustomerService } from '../Services/customer.service';
import { ManagingUsersAccountService } from '../Services/managing-users-account.service';
import { ConfirmEmail } from '../Models/ConfirmEmail';
import { AddressDisplay } from '../Models/AddressDisplay';
import { Customer } from '../Models/Customer';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private router : Router , private service : SignUpService , private login_service : AuthServiceService , private customer_service : CustomerService , private user_manager:ManagingUsersAccountService) { }

  
  ngOnInit(): void 
  { 
    if(localStorage.getItem("Jwt") != null)
    {
      this.router.navigate(['']);
    }
    let signup_error = document.getElementById("SignUp_error") as HTMLElement;
    signup_error.style.visibility=`hidden`;
    let   otp_F = document.getElementById("otp_F") as HTMLElement;
    otp_F.style.visibility=`hidden`;
  }

  // variables and object define
  data:SignUp = {username:"",email:"",phonenumber:"",password:""};
  cred:Login={username:"",password:""};
  date:string="";
  //

  // forms
  SignupForm = new FormGroup({
    UserName : new FormControl('',[Validators.required,Validators.minLength(5)]),
    PhoneNumber : new FormControl('',[Validators.required,Validators.pattern("^[7-9]{1}[0-9]{9}$")]),
    Email : new FormControl('',[Validators.required,Validators.email]),
    PassWord : new FormControl('',[Validators.required,Validators.minLength(7),Validators.maxLength(16)])
  });

  EmailOtpForm = new FormGroup({
    otp: new FormControl('',[Validators.required,Validators.pattern("^[0-9]{4,6}$")])
  })
  //


  // SignUp method
  Signup()
  {
    if(this.SignupForm.valid)
    {
      let signup_F = document.getElementById("SignUp_F") as HTMLElement;
      signup_F.style.visibility=`hidden`;

      let signup_error = document.getElementById("SignUp_error") as HTMLElement;

      let values = this.SignupForm.value;
      this.data.username = values.UserName;
      this.data.email = values.Email;
      this.data.phonenumber = values.PhoneNumber.toString();
      this.data.password = values.PassWord;

      // to signup user 
      this.service.SignUp(this.data).subscribe
      (
        (Response)=>
        {
          const sts = (<any>Response).status;
          if(sts == 200)
          {
            let otp_F = document.getElementById("otp_F") as HTMLElement;
            otp_F.style.visibility=`visible`;
          }
        },
        (error)=>
        {
          this.SignupForm.setValue({UserName:null,PhoneNumber:null,Email:null,PassWord:null});
          console.log(error.status);
          
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

  // verification method

  verifyemail()
  {
    if(this.EmailOtpForm.valid)
    {
      let signup_F = document.getElementById("SignUp_F") as HTMLElement;
      signup_F.style.visibility=`hidden`;
      
      let signup_error = document.getElementById("SignUp_error") as HTMLElement;
  
      let otp_Value = this.EmailOtpForm.value;
      let emailotp:ConfirmEmail = 
      {
        code: otp_Value.otp,
        username:this.data.username
      }

      // to verify email of user 
      this.user_manager.VerifyUserEmail(emailotp).subscribe
      (
        (Response)=>
        {
          console.log(Response);
          const sts = (<any>Response).status;
          if(sts == 200)
          {
            this.cred.username = this.data.username;
            this.cred.password = this.data.password;
  
            // for logging user 
            this.login_service.Logging(this.cred).subscribe(
              (Response)=>
              {
                const sts_login = Response.status;
                if(sts_login == 200)
                {
                  const token = Response.token;

                  // storing token and exiration data
                  localStorage.setItem("Jwt",token);
                  localStorage.setItem("e_year",Response.expiration_year);
                  localStorage.setItem("e_month",Response.expiration_month);
                  localStorage.setItem("e_day",Response.expiration_day);
                  localStorage.setItem("e_hour",Response.expiration_hour);
                  localStorage.setItem("e_minute",Response.expiration_minute);
                  localStorage.setItem("e_second",Response.expiration_second);
  
                  let payload = JSON.parse(atob(token.split('.')[1]));
  
                  // fetching user data
                  this.customer_service.GetCustomer(payload.username,token).subscribe
                  (
                    (Response)=>
                    {
                      const cust_data:object= 
                      { 
                        CustomerId : (<any>Response).customerId,
                        CustomerName : (<any>Response).customerName,
                      }

                      // to store user id and name
                      localStorage.setItem("data",JSON.stringify(cust_data));

                        // to store user addresses

                        let locations:AddressDisplay[]=[]

                        let location = {addressLine:(Response as Customer).customerAddress1 , area : (Response as Customer).customerArea1 , city :(Response as Customer).customerCity1 , state : (Response as Customer).customerState1 ,country : (Response as Customer).customerCountry} as AddressDisplay
                        locations.push(location);
                        
                        if((Response as Customer).customerAddress2 != null && (Response as Customer).customerArea2 != null)
                        {
                          location = {addressLine:(Response as Customer).customerAddress2 , area : (Response as Customer).customerArea2 , city :(Response as Customer).customerCity2 , state : (Response as Customer).customerState2 ,country : (Response as Customer).customerCountry} as AddressDisplay
                        
                          locations.push(location);  
                        }
                        localStorage.setItem("location" , JSON.stringify(locations));
                      
                      this.router.navigate(['']);
                    }
                  );   
                }
              });
          }
          else if(sts == 400)
          {
            signup_error.innerHTML="Email Verification is Failed";
          }
        },
        (error)=>
        {
          console.log(error);
        }
      )  
    }
  }

  
}