import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-provider-header',
  templateUrl: './provider-header.component.html',
  styleUrls: ['./provider-header.component.css']
})
export class ProviderHeaderComponent implements OnInit {

  constructor(private auth_service : AuthServiceService) { }

  ngOnInit(): void 
  {

  }

  // variables and object

  

  // //

  // function
  LogOut()
  {
    this.auth_service.LogOut();
    
  }

  // //
}
