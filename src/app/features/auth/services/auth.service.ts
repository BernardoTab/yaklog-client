import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserInput } from '../models/user-input';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { isPlatformBrowser } from '@angular/common';
import { LoggedInUser } from '../models/logged-in-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  public currentUserSubject = new BehaviorSubject<LoggedInUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private readonly http:HttpClient) { }

    
  // Preload current user for app init
  preloadCurrentUser(): Observable<LoggedInUser | null> {
    if (this.currentUserSubject.value) {
      // Already loaded, no need to call backend
      return of(this.currentUserSubject.value);
    }
    return this.getCurrentUser().pipe(
      tap(user => this.currentUserSubject.next(user))
    );
  }
  
  login(user:UserInput): Observable<LoggedInUser | null> {
    return this.http.post(this.apiUrl+"/api/auth/login", user, { withCredentials: true })
      .pipe(
        switchMap(() => this.getCurrentUser()),
        tap(user => this.currentUserSubject.next(user))
      );
  }
  
  getCurrentUser(): Observable<LoggedInUser | null> {
    return this.http.get<LoggedInUser>(this.apiUrl+'/api/auth/me', { withCredentials: true }).pipe(
      catchError(() => of(null))
    );
  }

  register(user:UserInput): Observable<LoggedInUser | null> {
    return this.http.post(this.apiUrl+"/api/auth/register", user, { withCredentials: true }).pipe(
      switchMap(() => this.getCurrentUser()),
      tap(user => this.currentUserSubject.next(user))
    )
  }
    
  logout(): Observable<void> {
    return this.http.post<void>(this.apiUrl+"/api/auth/logout", {}, { withCredentials: true }).pipe(
      tap(() => this.currentUserSubject.next(null))
    );
  }
  
  get email(): string | null {
    return this.currentUserSubject.value?.email ?? null;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
