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
  public events:any= [];
  public id;
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    

    this.auth.event().subscribe(
      res=>{
        console.log(res),
        this.events = res
      },
      err=> {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
      }
      }
    )
  }

  onSelect(e){
    if(this.auth.loggedIn()){
      this.router.navigate(['/event',e._id]);
    }else{
      this.router.navigate(['/login']);
    } 
  }

  delete(id:String){
    this.id = id;
    if(confirm('Are you sure you want to delete??'))  {
    this.auth.eventDelete(id).subscribe(
        res => 
        {
          console.log(res);
          this.ngOnInit();
        },
        err => console.log(err)
    );
  }
}

}
