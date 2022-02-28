import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { FormGroupName,FormGroup,FormControl,Validators } from '@angular/forms';
import { Login } from 'src/app/Models/login';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  constructor(private service : AuthServiceService , private router : Router) { }

  ngOnInit(): void 
  {
    let unauth =  document.querySelector("#login_unauth") as HTMLElement;
    unauth.style.visibility=`hidden`;
    
  }

  // Function and Form

  cred:Login={username:"",password:""};

  loginForm = new FormGroup({
    UserName : new FormControl('',[Validators.required,Validators.minLength(5)]),
    PassWord : new FormControl('',[Validators.required, Validators.minLength(7)])
  });
  
  Login()
  {
    if(localStorage.getItem("Jwt") != null)
    {
      this.router.navigate(['/Admin']);
    }
    else
    {
      if(this.loginForm.valid)
      {
        let values = this.loginForm.value;
        this.cred.username = values.UserName;
        this.cred.password = values.PassWord;
        
        this.service.Logging(this.cred).subscribe(
          (Response)=>
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

              this.router.navigate(['/Admin']);
            }

          },
          (error)=>
          {
            let unauth = document.querySelector("#login_unauth") as HTMLElement;

            if(error.status ==401)
            {
              unauth.style.visibility=`visible`;
              unauth.innerHTML="invalid UserName or PassWord";
            }
            else
            {
              unauth.style.visibility=`visible`;
              unauth.innerHTML="Server is Down";
            }
          },
          ()=>
          {
            return null;
          }

        );
      }
    }
  }

}

