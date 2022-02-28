import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-provider-header',
  templateUrl: './provider-header.component.html',
  styleUrls: ['./provider-header.component.css']
})
export class ProviderHeaderComponent implements OnInit {

  constructor(private auth_service : AuthServiceService , private router:Router) { }

  ngOnInit(): void 
  {

  }

  // variables and object

  // //

  // function
  LogOut()
  {
    this.auth_service.LogOut();
    // this.router.navigate(['Service-Provider/Login']);
  }

  // //
}
