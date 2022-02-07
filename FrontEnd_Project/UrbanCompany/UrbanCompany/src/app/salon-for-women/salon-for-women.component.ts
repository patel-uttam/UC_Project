import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { service } from '../Models/Services';
import { CategoryService } from '../Services/category.service';

@Component({
  selector: 'app-salon-for-women',
  templateUrl: './salon-for-women.component.html',
  styleUrls: ['./salon-for-women.component.css']
})
export class SalonForWomenComponent implements OnInit {

  constructor(private service:CategoryService) 
  {   }

  ngOnInit(): void {

    this.service.GetService("Salon For Women").subscribe
    (
      (Response)=>
      {
        console.log("Response");
        console.log(Response);
        this.services_list = Response;
        console.log(this.services_list);
      },
      (error)=>
      {
        console.log(error);
      }

    );

  }
  services_list:service[]=[];


  
}
