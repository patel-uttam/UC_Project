import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUp } from '../../Models/signup';
import { Login } from '../../Models/login';
import { AuthServiceService } from '../../Services/auth-service.service';
import { SignUpService } from '../../Services/sign-up.service';
import { ProviderService } from '../../Services/provider.service';
import { StatisticDataService } from 'src/app/Services/statistic-data.service';
import { ConfirmEmail } from 'src/app/Models/ConfirmEmail';
import { ManagingUsersAccountService } from 'src/app/Services/managing-users-account.service';

@Component({
  selector: 'app-provider-sign-up',
  templateUrl: './provider-sign-up.component.html',
  styleUrls: ['./provider-sign-up.component.css']
})
export class ProviderSignUpComponent implements OnInit {

  constructor(private router : Router , private service : SignUpService , private login_service : AuthServiceService , private provider_service : ProviderService , private user_manager:ManagingUsersAccountService , private statisticdata : StatisticDataService) { }

  ngOnInit(): void 
  { 

    this.statisticdata.GetStatisticData().subscribe
    (
      (Response)=>
      {
        this.totalprovider = (<any>Response).totalProvider;
        this.totalamount = (<any>Response).totalAmount;
        this.totalorder = (<any>Response).totalOrder;
      },
      (error)=>
      {
        console.log(error);
      }
    )

  }

  // variables and object define

  totalprovider:number=0;
  totalamount:number=0;
  totalorder:number=0;

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

      let signup_error = document.getElementById("SignUp_error") as HTMLElement;

      let values = this.SignupForm.value;
      this.data.username = values.UserName;
      this.data.email = values.Email;
      this.data.phonenumber = values.PhoneNumber.toString();
      this.data.password = values.PassWord;

      // to signup user 
      this.service.Provider_SignUp(this.data).subscribe
      (
        (Response)=>
        {
          const sts = (<any>Response).status;
          if(sts == 200)
          {
            let signup_F = document.getElementById("SignUp_F") as HTMLElement;
            signup_F.style.visibility=`hidden`;
            this.SignupForm.setValue({UserName:null,PhoneNumber:null,Email:null,PassWord:null});
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
      let signup_success = document.getElementById("SignUp_success") as HTMLElement;
      let signup_success_p = document.getElementById("SignUp_success_p") as HTMLElement;
  
      let otp_Value = this.EmailOtpForm.value;
      let emailotp:ConfirmEmail = 
      {
        code: otp_Value.otp.toString(),
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
            signup_success.style.visibility=`visible`;
            signup_success.style.backgroundColor=`green`;
            signup_success_p.innerHTML="Registration successful..";
            signup_success_p.style.visibility=`visible`;
            this.EmailOtpForm.reset;
            this.SignupForm.reset;
          }
          if(sts == 400)
          {
            signup_success.style.visibility=`visible`;
            signup_success.style.backgroundColor=`red`;
            signup_success_p.innerHTML="Email Verification is fail..";
            signup_success_p.style.visibility=`visible`;
            this.EmailOtpForm.reset;
            this.SignupForm.reset;
          }
        },
        (error)=>
        {
          signup_success.style.visibility=`visible`;
          signup_success.style.backgroundColor=`red`;
          signup_success_p.innerHTML="Email Verification is fail..";
          signup_success_p.style.visibility=`visible`;
          this.EmailOtpForm.reset;
          this.SignupForm.reset;
        }
      )  
    }
  }

  dismiss_signupsuccess()
  {
      let signup_success = document.getElementById("SignUp_success") as HTMLElement;
      let signup_success_p = document.getElementById("SignUp_success_p") as HTMLElement;

      signup_success.style.visibility=`hidden`;
      signup_success_p.style.visibility=`hidden`;
  }
}
