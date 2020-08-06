import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    email: '',
    password: ''
  }

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this._auth.loginUsers(this.loginUserData).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/special-events']);
      },
      (err) => { console.log(err) }

    )
  }

}
