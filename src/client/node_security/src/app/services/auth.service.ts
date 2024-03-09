import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment.development";
import {SignUpDTO} from "../components/register.component";
import {loginDTO} from "../components/login/login/login.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signUp(data: SignUpDTO) {
    return this.http.post(environment.API_URL + 'register', data);
  }

  signIn(data: loginDTO) {
    return this.http.post(environment.API_URL + 'login', data);
  }

  signInGoogle() {
    return this.http.get(environment.API_URL + 'userinfo', {withCredentials: true});
  }
}
