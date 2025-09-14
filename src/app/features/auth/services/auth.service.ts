import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserInput } from '../models/user-input';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private readonly http:HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  login(user:UserInput): Observable<LoginResponse>{
    return this.sendAndAuthenticate(user, "login");
  }

  sendAndAuthenticate(user: UserInput, endpoint:string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.apiUrl+"/api/auth/"+endpoint,user)
          .pipe(
            tap(
              response => {
                localStorage.setItem("token",response.token);
                localStorage.setItem("email",response.user?.email);
              }
            )
          )
  }

  register(user:UserInput): Observable<LoginResponse>{
    return this.sendAndAuthenticate(user, "register");
  }

  isLoggedIn(){
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem("token") !== null;
    }
    return false;
  }

  logout(){
    localStorage.removeItem("token");
  }
}
