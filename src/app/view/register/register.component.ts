import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth: AuthService, private router: Router) { }

  registerUserData = {
    email: '',
    password: ''
  };
  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/special-events']);
      },
      (err) => { console.log(err); }
    );
  }
}
