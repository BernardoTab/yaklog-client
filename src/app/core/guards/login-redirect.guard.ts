import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../../features/auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // User already logged in, redirect to /overview
      this.router.navigate(['/overview']);
      return false; // block access to login
    }
    return true; // allow access to login
  }
}