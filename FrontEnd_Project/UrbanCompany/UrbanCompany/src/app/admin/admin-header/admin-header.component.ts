import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

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
