import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events:any= [];
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.event().subscribe(
      res=>{console.log(res);this.events = res},
      err=> {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
      }
      }
    )
  }

}
