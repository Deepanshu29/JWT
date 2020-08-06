import { Router } from '@angular/router';
import { EventService } from './../../event.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = [];

  constructor(private _specialEvent: EventService,private router: Router) { }

  ngOnInit(): void {
    this._specialEvent.getSpecialEvents().subscribe(
      (res) => { return this.specialEvents = res },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      }
    )
  }

}
