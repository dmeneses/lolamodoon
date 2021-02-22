import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isUserAuthenticated()
        .pipe(map((isAuthenticated) => {
          if (!state.url.includes('login') && !isAuthenticated) {
            this.router.navigate(['login']);
            return false;
          }

          if (state.url.includes('login') && isAuthenticated) {
            this.router.navigate(['foods']);
            return false;
          }

          return true;
        }));
    }
}
