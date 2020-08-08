import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  eventForm = this.fb.group({
    ename: ['', Validators.minLength(5)],
    edesc: ['', Validators.minLength(20)]
  });

  ngOnInit(): void {
  }

  onSubmit(){
    this.auth.addEvent(this.eventForm.value).subscribe(
      data => console.log(data),
      err => console.log(err)
    )
  }

}
