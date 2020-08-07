import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  _registerUrl = 'api/register';
  _loginUrl = 'api/login';

  _eventUrl = 'api/events';

  Register(user){
    return this.http.post<any>(this._registerUrl,user);
  }

  Login(user){
    return this.http.post<any>(this._loginUrl,user);
  }

  event(){
    return this.http.get(this._eventUrl);
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
