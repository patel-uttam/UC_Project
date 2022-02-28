
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../Models/Category';
import { Provider } from '../Models/Provider';
import { service } from '../Models/Services';
import { CategoryService } from '../Services/category.service';

@Component({
  selector: 'app-salon-for-women',
  templateUrl: './salon-for-women.component.html',
  styleUrls: ['./salon-for-women.component.css']
})
export class SalonForWomenComponent implements OnInit {

  constructor(private route:ActivatedRoute , private category_service:CategoryService) 
  {   }

  ngOnInit(): void {

    this.route.params.subscribe((X)=>{this.location=X['location'],this.category=X['Category']});

    this.category_service.GetCategory(this.category).subscribe
    (
      (Response)=>
      {
        let category_value = Response as Category;
        this.description = category_value.description;
      },
      (error)=>
      {

      }
    )

    console.log("cat : "+this.category)
    this.category_service.GetService(this.category).subscribe
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

    this.category_service.GetProvider_By_Category_City(this.category,this.location).subscribe
    (
      (Response)=>
      {
        console.log(Response);
        for(var P of Response as Provider[])
        {
          this.providers.push(P as Provider);
        }
      },
      (error)=>
      {
        console.log(error);
      }
    )
  }

  // variables
  
  category:string="";
  location:string="";
  description:string="";

  services_list:service[]=[];
  providers:Provider[]=[];

  
}
