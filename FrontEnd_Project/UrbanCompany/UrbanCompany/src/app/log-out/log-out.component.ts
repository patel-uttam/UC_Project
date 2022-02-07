import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    
    localStorage.removeItem("Jwt");
    localStorage.removeItem("data");
    localStorage.removeItem("e_year");
    localStorage.removeItem("e_month");
    localStorage.removeItem("e_day");
    localStorage.removeItem("e_hour");
    localStorage.removeItem("e_minute");
    localStorage.removeItem("e_second");
    this.router.navigate(['']);
  }

}
      