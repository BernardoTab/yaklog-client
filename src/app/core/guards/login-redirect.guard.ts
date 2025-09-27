import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../../features/auth/services/auth.service";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {

  successUrl = "to-do"

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      tap(user => this.authService.currentUserSubject.next(user)),
      map(user => {
        if (user) {
          // User already logged in, redirect to /overview
          this.router.navigate([this.successUrl]);
          return false; // block access to login
        }
        return true;
      }),
      catchError(() => {
        return of(true);
      })
    );
  }
}