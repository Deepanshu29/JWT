import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerurl = 'http://localhost:3000/api/register';
  private _loginurl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerurl, user);
  }

  loginUsers(user) {
    return this.http.post<any>(this._loginurl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/events']);
  }
}
