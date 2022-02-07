import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthServiceService } from '../Services/auth-service.service';
import { Login } from '../Models/login';
import { CustomerService } from '../Services/customer.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private router : Router,  private service : AuthServiceService , private customer_service : CustomerService) { }

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

              let payload = JSON.parse(atob(token.split('.')[1]));

              this.customer_service.GetCustomer(payload.username,token).subscribe
              (
                (Response)=>
                {
                   const cust_data:object= {
                    CustomerId : (<any>Response).customerId,
                    CustomerName : (<any>Response).customerName,
                  }
                  localStorage.setItem("data",JSON.stringify(cust_data));
                }
              )
              this.router.navigate(['']);
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
        this.loginForm.reset();
      }
    }
  }
}
