import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpBaseUrl: string = "http://9bcb-223-233-77-6.ngrok.io";

  constructor(private myhttp: HttpClient) { }
  login(username: any, password: any) {
    return this.myhttp.post(this.httpBaseUrl + "/loginRequest", username, password);
  }
  register() {
    return this.myhttp.get(this.httpBaseUrl + "/saveUserSecret");
  }
}
