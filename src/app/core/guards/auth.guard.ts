import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router,
    @Inject(PLATFORM_ID)private platformId: Object) { }

  canActivate(): Observable<boolean | UrlTree> {
    if(isPlatformServer(this.platformId)){
      return of(false);
    }
    return this.authService.preloadCurrentUser().pipe(
      map(user => {
        if (!user) {
          return this.router.createUrlTree(['/login']);
        }
        return true;
      }),
      catchError(() => {
          return of(this.router.createUrlTree(['/login']));
      })
    );
  }
}